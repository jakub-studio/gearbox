import { Button, Header } from "ui";
import engine from "engine";

export default function Page() {
	return (
		<>
			<h1>Welcome to Gearbox</h1>
			<hr />
			<form>
				<label htmlFor="url">URL</label>
				<input type="text" name="url" placeholder="https://example.com" />
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
