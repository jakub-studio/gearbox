export default class Initializeable {
	private _init: boolean = false;

	protected async onInitialize() {
		this._init = true;
	}

	public get initialized () {
		return this._init;
	}
}