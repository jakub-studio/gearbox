import request from "./index";

const proxyRequest = (url: string) => {
	console.log("proxying", url);
	return request({ url: "/api/proxy", params: { url }});
}

export default proxyRequest;