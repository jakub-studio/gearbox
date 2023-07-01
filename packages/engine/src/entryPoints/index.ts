import { create } from "zustand";
import createEntryPoint, { CreateEntryPointOptions } from "./create";
import { EntryPoints } from "./types";

interface EntryPointState {
	entryPoints: EntryPoints[];
	createEntryPoint: (
		opts: CreateEntryPointOptions
	) => Promise<EntryPoints | undefined>;
}

export const useEntryPoints = create<EntryPointState>((set, get) => ({
	entryPoints: [],
	createEntryPoint: async (
		opts: CreateEntryPointOptions
	): Promise<EntryPoints | undefined> => {
		try {
			const entryPoint = await createEntryPoint(opts);
			if (!entryPoint) {
				return;
			}

			set(state => ({
				entryPoints: [...state.entryPoints, entryPoint]
			}));

			return entryPoint;
		} catch (e) {
			console.error("failed", e);
		}
	}
}));
