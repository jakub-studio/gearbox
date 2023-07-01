const getObjectValueWithAnyCapitalization = <T extends {}>(
	obj: T,
	key: string
): string | undefined => {
	const lowercaseKey = key.toLowerCase();
	const matchingKey = Object.keys(obj).find(
		key => key.toLowerCase() === lowercaseKey
	);
	return matchingKey ? obj[matchingKey] : undefined;
};

export default getObjectValueWithAnyCapitalization;
