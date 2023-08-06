const truthyValues = ["true", "1", "yes", "y", "on"];

const isTruthy = (value: string) => {
	if (typeof value === "boolean") {
		return value;
	}

	if (typeof value === "string") {
		return truthyValues.includes(value.toLowerCase());
	}

	return false;
};

export default isTruthy;