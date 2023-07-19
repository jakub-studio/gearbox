import createPlainHeadersObject from "utilities/fetch/createPlainHeadersObject";
import encodeInvisibleCharacters from "utilities/string/encodeInvisibleCharacters";
import { getToken } from "next-auth/jwt";

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const session = await getToken({ req: request });

	if (!session) {
		return new Response("401 Unauthorized", {
			status: 401,
			statusText: "Unauthorized",
			headers: {
				"content-type": "text/plain",
			}
		});
	}

	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	if (!url) {
		return new Response("400 Bad Request. No URL Specified", {
			status: 400,
			statusText: "Bad Request",
			headers: {
				"content-type": "text/plain",
			}
		});
	}

	let appendHeaders = false;
	if (searchParams.get("headers") === "true") {
		appendHeaders = true;
	}

	const res = await fetch(url);

	const headers = {
		"content-type": res.headers.get("content-type"),
		"x-proxy-origin-url": url,
		"x-proxy-origin-status": res.status.toString(),
		"x-proxy-origin-status-text": res.statusText,
	};

	if (appendHeaders) {
		headers["x-proxy-origin-headers"] = encodeInvisibleCharacters(
			JSON.stringify(createPlainHeadersObject(request.headers))
		);
	}

	return new Response(res.body, {
		headers
	});
}
