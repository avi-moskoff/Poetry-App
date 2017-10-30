interface IList {
	list: {
		category: string,
		synonyms: string
	}
}

interface IResponse {
	response: [IList]
}

export { IResponse, IList }
