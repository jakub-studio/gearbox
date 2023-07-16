export async function GET(request: Request) {

	return new Response("401 Unauthorized", {
		status: 401,
		statusText: "Unauthorized",
		headers: {
			"content-type": "text/plain",
		}
	});

	const { searchParams } = new URL(request.url);
	const url = searchParams.get("url");
	console.log(url);

	const res = await fetch(url);
	const text = await res.text();

	return new Response(text, {
		headers: {
			"content-type": res.headers.get("content-type"),
		},
	});
}
