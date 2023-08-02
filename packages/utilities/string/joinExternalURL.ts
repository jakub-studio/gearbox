const joinExternalURL = (baseURL: string, path: string) => {
	if (path.startsWith("http")) return path;

	return new URL(path, baseURL).toString();
}

export default joinExternalURL;