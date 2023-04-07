const errorExists = (errorsObj, error) => {
	if (errorsObj[error] !== undefined) {
		return true;
	}
	else {
		return false;
	}
}

export default errorExists;
