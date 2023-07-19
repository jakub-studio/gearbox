import { AxiosResponse } from "axios";
import EntryPoint from "../_shared";
import { getScriptsFromAST, getTitle, parseHTML } from "html-ast";

export const htmlContentType = "text/html";
export const htmlFileExtension = "html";

export interface HTMLScript {
	type: "inline" | "external";
	content: string;
	src?: string;
}

class HTMLEntryPoint extends EntryPoint {
	url: string;
	rawHTML: string;

	title: string | undefined;
	scripts: HTMLScript[] = [];

	ast;
	
	constructor(options, response: AxiosResponse<string>) {
		super();

		this.url = options.url;
		this.rawHTML = response.data;
	}

	private _fetchScript (element) {
		let type: HTMLScript["type"] = "inline";

		if (element.attribs.src) {
			type = "external";
		}
	}

	private setTitle () {
		this.title = getTitle(this.ast);
	}

	process () {
		this.ast = parseHTML(this.rawHTML);
		this.setTitle();
		const scripts = getScriptsFromAST(this.ast);
		console.log(scripts);
	}
}

export default HTMLEntryPoint;
