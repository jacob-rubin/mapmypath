import Search from './search/search';
import type { SuggestionResponse } from './types/types';

class Searcher {
	#search: Search; // TODO: How to handle when session token expires?
	#text: string = $state('');
	#suggestions: Promise<SuggestionResponse> = $derived.by(
		async () => {
			if (this.#text.length == 0) {
				return Promise.resolve({
					suggestions: [],
					attribution: ''
				});
			}

			return this.#search.suggest(this.#text);
		}
	);

	constructor() {
		this.#search = new Search();
	}

	get text() {
		return this.#text;
	}

	set text(value: string) {
		this.#text = value;
	}

	get suggestions() {
		return this.#suggestions;
	}
}

export default Searcher;
