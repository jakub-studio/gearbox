import { AxiosResponse } from "axios";

export type HtmlContentType = "text/html";
export type JavascriptContentType = "application/javascript";

export type EntryPointContentTypes = HtmlContentType | JavascriptContentType;

export interface EntryPointRequestResult {
	url: string;
	response: AxiosResponse;
}
