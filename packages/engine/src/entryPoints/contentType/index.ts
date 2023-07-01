import { parse } from "content-type";
import { EntryPointContentTypes, EntryPointRequestResult } from "../types";

const contentTypeHeaderName = "content-type";

const _getContentTypeViaURL = (url: string): EntryPointContentTypes | null => {
	const urlParts = url.split(".");
	const extension = urlParts[urlParts.length - 1];

	switch (extension) {
		case "html":
			return "text/html";
		case "js":
			return "application/javascript";
		default:
			return null;
	}
};

const _getContentTypeViaHeader = (
	res: EntryPointRequestResult
): EntryPointContentTypes | null => {
	const contentTypeHeader = res.response.headers[contentTypeHeaderName];

	if (!contentTypeHeader) {
		return null;
	}

	const contentType = parse(contentTypeHeader);

	switch (contentType.type) {
		case "text/html":
			return "text/html";
		case "application/javascript":
			return "application/javascript";
		default:
			return null;
	}
};

export const getContentType = (
	res: EntryPointRequestResult
): EntryPointContentTypes | null => {
	const contentTypeViaHeader = _getContentTypeViaHeader(res);

	if (contentTypeViaHeader) {
		return contentTypeViaHeader;
	}

	const contentTypeViaURL = _getContentTypeViaURL(res.url);

	if (contentTypeViaURL) {
		return contentTypeViaURL;
	}

	return null;
};
