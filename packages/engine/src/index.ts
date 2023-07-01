import Project from "./structs/Project";

interface RequestOptions {
	cors: boolean;
}

const defaultRequestOptions: RequestOptions = {
	cors: false
};

class Engine {
	private _requestOpts: RequestOptions = defaultRequestOptions;
	project = new Project();

	setRequestOptions(opts: Partial<RequestOptions>) {
		this._requestOpts = { ...opts, ...defaultRequestOptions };
	}
}

const engine = new Engine();

export default engine;
