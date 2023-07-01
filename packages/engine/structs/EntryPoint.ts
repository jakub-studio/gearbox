import Initializeable from "./Initializable";

export type EntryPointType = "html" | "js";
export interface EntryPointConstructorOptions {
	url: string;
}

export default class EntryPoint extends Initializeable {
	public readonly type: EntryPointType;

	constructor(opts: EntryPointConstructorOptions) {
		super();
	}

	public async init() {
		super.onInitialize();
	}
}

