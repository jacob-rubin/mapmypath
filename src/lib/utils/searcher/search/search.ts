import SessionToken from '../sessionToken/sessionToken';
import type { SuggestionResponse } from '../types/types';

class Search {
	#sessionToken: SessionToken;

	constructor() {
		this.#sessionToken = new SessionToken();
	}

	async suggest(query: string): Promise<SuggestionResponse> {
		const params: URLSearchParams = new URLSearchParams({
			q: query,
			access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			session_token: this.#sessionToken.id
		});

		const response = await fetch(
			`https://api.mapbox.com/search/searchbox/v1/suggest?${params}`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch');
		}

		return response.json();
	}
}

export default Search;