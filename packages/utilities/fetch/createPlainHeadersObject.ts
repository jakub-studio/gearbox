function createPlainHeadersObject(headers: Headers): Record<string, string> {
	const plainHeaders: Record<string, string> = {};

	headers.forEach((value, key) => {
		plainHeaders[key] = value;
	});

	return plainHeaders;
}

export default createPlainHeadersObject;
