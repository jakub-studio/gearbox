import HTMLEntryPoint from "./types/html";
import JavascriptEntryPoint from "./types/javascript";

export type HtmlContentType = "text/html";
export type JavascriptContentType = "application/javascript";

export type EntryPointContentTypes = HtmlContentType | JavascriptContentType;
export type EntryPoints = HTMLEntryPoint | JavascriptEntryPoint;
