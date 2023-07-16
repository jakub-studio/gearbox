import { parse } from "content-type";
import { EntryPointContentTypes } from "../types";
import { htmlContentType, htmlFileExtension } from "../types/html";
import {
	javascriptContentType,
	javascriptFileExtension
} from "../types/javascript";
import getObjectValueWithAnyCapitalization from "utilities/object/getObjectValueWithAnyCapitalization";
import { AxiosHeaders, AxiosResponseHeaders } from "axios";

const contentTypeHeaderName = "content-type";

const _getContentTypeViaURL = (url: string): EntryPointContentTypes | null => {
	const urlParts = url.split(".");
	const extension = urlParts[urlParts.length - 1];

	switch (extension) {
		case htmlFileExtension:
			return htmlContentType;
		case javascriptFileExtension:
			return javascriptContentType;
		default:
			return null;
	}
};

const _getContentTypeViaHeaders = (
	headers: Record<string, string>
): EntryPointContentTypes | null => {
	const contentTypeHeader = getObjectValueWithAnyCapitalization(
		headers,
		contentTypeHeaderName
	);

	if (!contentTypeHeader) {
		return null;
	}

	const contentType = parse(contentTypeHeader);

	switch (contentType.type) {
		case htmlContentType:
			return htmlContentType;
		case javascriptContentType:
			return javascriptContentType;
		default:
			return null;
	}
};

export const getContentType = (
	url: string,
	headers: {}
): EntryPointContentTypes | null => {
	const contentTypeViaHeader = _getContentTypeViaHeaders(headers);

	if (contentTypeViaHeader) {
		return contentTypeViaHeader;
	}

	const contentTypeViaURL = _getContentTypeViaURL(url);

	if (contentTypeViaURL) {
		return contentTypeViaURL;
	}

	return null;
};
