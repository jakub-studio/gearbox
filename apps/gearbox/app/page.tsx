"use client";

import { useEntryPoints } from "engine";
import { FormEventHandler, useCallback } from "react";

export default function Page() {
	const state = useEntryPoints();

	console.log(state);

	state.entryPoints.forEach(entryPoint => {
		entryPoint.process();
	});

	const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
		e => {
			e.preventDefault();

			// get form data from react form submit event
			const formData = new FormData(e.target as HTMLFormElement);
			const url = formData.get("url") as string;

			state.createEntryPoint({ url });
		},
		[state]
	);

	return (
		<>
			<h1>Welcome to Gearbox</h1>
			<hr />
			<form onSubmit={onSubmit}>
				<label htmlFor="url">URL</label>
				<input type="text" name="url" placeholder="https://example.com" />
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
