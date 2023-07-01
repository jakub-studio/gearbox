import EntryPoint from "./EntryPoint";

export default class Project {
	entryPoints: EntryPoint[];
	created = new Date();

	async addEntryPoint(entryPointSource: string): Promise<void> {
		const entryPoint = new EntryPoint({
			url: entryPointSource
		});

		entryPoint.init();

		this.entryPoints.push(entryPoint);
	}
}