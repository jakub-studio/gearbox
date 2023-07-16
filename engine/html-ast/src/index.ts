import * as htmlParser2 from 'htmlparser2';

export const parseHTML = (html: string) => {
	const doc = htmlParser2.parseDocument(html);
	htmlParser2.DomUtils.findAll((el) => {
		return Boolean(el.name === 'script' && el.attribs && el.attribs.src);
	}, [doc]);
};