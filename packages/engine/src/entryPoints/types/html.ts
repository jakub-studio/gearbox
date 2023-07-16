import { AxiosResponse } from "axios";
import EntryPoint from "./_shared";
import { parseHTML } from "html-ast";

export const htmlContentType = "text/html";
export const htmlFileExtension = "html";

class HTMLEntryPoint extends EntryPoint {
	url: string;
	rawHTML: string;

	title: string | undefined;
	scripts: any[] = [];

	documentAst;
	
	constructor(options, response: AxiosResponse<string>) {
		super();

		this.url = options.url;
		this.rawHTML = response.data;
	}

	process () {
		parseHTML(this.rawHTML);
	}
}

export default HTMLEntryPoint;
