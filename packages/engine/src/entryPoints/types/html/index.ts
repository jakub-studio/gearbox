import { AxiosResponse } from "axios";
import EntryPoint from "../_shared";
import { getScriptsFromAST, getTitle, parseHTML } from "html-ast";
import proxyRequest from "../../../request/proxy";
import joinExternalURL from "utilities/string/joinExternalURL";
import { javascriptContentType } from "../javascript";

export const htmlContentType = "text/html";
export const htmlFileExtension = "html";

export interface HTMLScript {
	type: "inline" | "external";
	content: string;
	contentType: string;
	name?: string;
	src?: string;
	id?: string;
}

class HTMLEntryPoint extends EntryPoint {
	url: string;
	rawHTML: string;

	title: string | undefined;
	scripts: HTMLScript[] = [];
	private _processing: boolean = false;

	ast;
	
	constructor(options, response: AxiosResponse<string>) {
		super();

		this.url = options.url;
		this.rawHTML = response.data;
	}

	private async _handleScripts () {
		const scripts = getScriptsFromAST(this.ast);

		for (const script of scripts) {
			const { attribs, firstChild } = script;

			let type: HTMLScript["type"] = "inline";

			if (attribs.src) {
				type = "external";
			}

			if (type === "inline") {
				if (!("data" in firstChild)) continue;

				this.scripts.push({
					type,
					content: firstChild.data,
					contentType: attribs.type || javascriptContentType,
					id: attribs.id
				});

				continue;
			} else {
				if (!attribs.src) continue;

				console.log(this.url, attribs.src);
				const src = joinExternalURL(this.url, attribs.src);
				const req = await proxyRequest(src)

				this.scripts.push({
					type,
					src,
					content: req.data,
					contentType: attribs.type || javascriptContentType,
					name: attribs.src,
					id: attribs.id
				});
			}
		}
	}

	private _setTitle () {
		this.title = getTitle(this.ast);
	}

	async process () {
		if (this._processing) return;
		this._processing = true;

		this.ast = parseHTML(this.rawHTML);
		this._setTitle();
		await this._handleScripts();
		console.log("done")
	}
}

export default HTMLEntryPoint;
