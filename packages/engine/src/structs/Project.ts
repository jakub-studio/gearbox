import EntryPoint from "./EntryPoint";
import { create } from "zustand";

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
const useProject = create((set, get) => ({
	entryPoints: [],
	created: new Date(),
	addEntryPoint: async (entryPointSource: string) => {
		const entryPoint = new EntryPoint({
			url: entryPointSource
		});

		entryPoint.init();

		// set({ entryPoints: [...get(), entryPoint] });
	}
}));
