const charsToEncode = /[\u007f-\uffff]/g;

// https://stackoverflow.com/questions/9779860/using-json-string-in-the-http-header
const encodeInvisibleCharacters = (str: string): string => {
	return str.replace(charsToEncode, function (c) {
		return "\\u" + ("000" + c.charCodeAt(0).toString(16)).slice(-4);
	});
};

export default encodeInvisibleCharacters;