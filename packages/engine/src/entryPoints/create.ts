import request from "../request";
import { getContentType } from "./contentType";
import { EntryPoints } from "./types";
import HTMLEntryPoint, { htmlContentType } from "./types/html";
import JavascriptEntryPoint, {
	javascriptContentType
} from "./types/javascript";
import getPlainHeadersObject from "utilities/fetch/createPlainHeadersObject";

export interface CreateEntryPointOptions {
	url: string;
	headers?: Record<string, string>;
}

const createEntryPoint = async (
	opts: CreateEntryPointOptions
): Promise<EntryPoints | undefined> => {
	const response = await fetch(opts.url, {
		mode: "no-cors"
	});

	console.log(response, opts);

	const type = getContentType(
		opts.url,
		getPlainHeadersObject(response.headers)
	);

	if (!type) {
		throw new Error(
			`Could not determine content type OR entry point handler is not implemented for ${opts.url}`
		);
	}

	if (type === htmlContentType) {
		return new HTMLEntryPoint();
	}

	if (type === javascriptContentType) {
		return new JavascriptEntryPoint();
	}
};

export default createEntryPoint;
