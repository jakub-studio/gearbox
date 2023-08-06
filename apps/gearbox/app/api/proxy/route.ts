import { getServerSession } from "next-auth";
import createPlainHeadersObject from "utilities/fetch/createPlainHeadersObject";
import encodeInvisibleCharacters from "utilities/string/encodeInvisibleCharacters";
import isTruthy from "utilities/string/isTruthy";

import { authOptions } from "../auth/[...nextauth]/route";

// https://stackoverflow.com/questions/2773396/whats-the-content-length-field-in-http-header
const MAX_CONTENT_LENGTH = 1024 * 1024 * 5; // 5 MB

const paramNames = {
	url: "url",
	attachAllHeaders: "return_all_headers",
	header: "header",
	method: "method"
}

// Basic forward proxy
export async function GET(request, response) {
	const session = await getServerSession(request, response, authOptions);

	if (!session) {
		return new Response("401 Unauthorized", {
			status: 401,
			statusText: "Unauthorized",
			headers: {
				"content-type": "text/plain"
			}
		});
	}

	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");

	let attachAllHeaders = false;
	if (isTruthy(searchParams.get("headers"))) {
		attachAllHeaders = true;
	}

	const res = await fetch(url);

	const responseHasContentLengthHeader = res.headers.has("content-length");

	if (Number(res.headers.get("content-length")) > MAX_CONTENT_LENGTH) {
		return new Response("413 Payload Too Large", {
			status: 413,
			statusText: "Payload Too Large",
			headers: {
				"content-type": "text/plain"
			}
		});
	}

	const headers = {
		"content-type": res.headers.get("content-type"),
		"x-proxy-origin-url": url,
		"x-proxy-origin-status": res.status.toString(),
		"x-proxy-origin-status-text": res.statusText
	};

	if (attachAllHeaders) {
		headers["x-proxy-origin-headers"] = encodeInvisibleCharacters(
			JSON.stringify(createPlainHeadersObject(request.headers))
		);
	}

	return new Response(res.body, {
		headers
	});
}

// Response body size limit
// ---
// const url = "your_url_here";
// const maxSizeBytes = 5 * 1024 * 1024; // 5MB in bytes

// const controller = new AbortController();
// const signal = controller.signal;

// let currentSizeBytes = 0;

// fetch(url, { method: "GET", signal: signal })
// 	.then(response => {
// 		const reader = response.body.getReader();
// 		return new ReadableStream({
// 			start(controller) {
// 				function read() {
// 					reader.read().then(({ done, value }) => {
// 						if (done) {
// 							controller.close();
// 							return;
// 						}

// 						currentSizeBytes += value.byteLength;

// 						if (currentSizeBytes > maxSizeBytes) {
// 							controller.error(
// 								new Error("Response body too large. Request cancelled.")
// 							);
// 							return;
// 						}

// 						controller.enqueue(value);
// 						read();
// 					});
// 				}

// 				read();
// 			}
// 		});
// 	})
// 	.then(stream => new Response(stream))
// 	.then(response => response.json())
// 	.then(data => {
// 		// Handle the response data
// 	})
// 	.catch(error => {
// 		if (error.name === "AbortError") {
// 			console.error("Request cancelled:", error.message);
// 		} else {
// 			console.error("Error:", error.message);
// 		}
// 	});
