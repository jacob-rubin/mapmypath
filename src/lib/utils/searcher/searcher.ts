import {
	SearchBoxCore,
	SearchSession,
	type SearchBoxRetrieveResponse,
	type SearchBoxSuggestionResponse,
	type SearchBoxSuggestion,
	type SearchBoxOptions
} from '@mapbox/search-js-core';

class Searcher {
	#session: SearchSession<
		SearchBoxOptions,
		SearchBoxSuggestion,
		SearchBoxSuggestionResponse,
		SearchBoxRetrieveResponse
	>;

	constructor() {
		const search = new SearchBoxCore({
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			limit: 5
		});

		this.#session = new SearchSession(search, 200);
	}

	get session(): SearchSession<
		SearchBoxOptions,
		SearchBoxSuggestion,
		SearchBoxSuggestionResponse,
		SearchBoxRetrieveResponse
	> {
		return this.#session;
	}

	suggest(query: string): Promise<SearchBoxSuggestionResponse> {
		return this.#session.suggest(query);
	}

	retreive(
		suggestion: SearchBoxSuggestion
	): Promise<SearchBoxRetrieveResponse> {
		return this.#session.retrieve(suggestion);
	}
}

export default Searcher;
