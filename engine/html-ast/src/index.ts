import { parseDocument, DomUtils } from "htmlparser2";
import { AnyNode, Element } from "domhandler";

export const parseHTML = (html: string) => {
	const doc = parseDocument(html);
	return doc;
};

const scriptsFilter = (el: AnyNode): el is Element => {
	if (!("name" in el)) return false;
	return Boolean(el && el.name && el.name === "script");
};

export const getScriptsFromAST = (ast: AnyNode): Element[] => {
	return DomUtils.filter(scriptsFilter, ast, true, 999) as Element[];
};

export const getTitle = (ast: AnyNode) => {
	const title = DomUtils.filter((el: AnyNode): el is Element => {
		if (!("name" in el)) return false;
		return Boolean(el && el.name && el.name === "title");
	}, ast, true, 1);

	if (!title) return;

	const titleText = DomUtils.textContent(title);

	return titleText;
}