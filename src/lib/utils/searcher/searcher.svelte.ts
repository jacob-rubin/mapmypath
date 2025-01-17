import debounce from '../debounce/debounce';
import Search from './search/search';
import type {
	FeatureResponse,
	Suggestion,
	SuggestionResponse
} from './types/types';

class Searcher {
	#text: string = $state('');
	#suggestions: SuggestionResponse = $state({
		suggestions: [],
		attribution: ''
	});
	#search: Search; // TODO: How to handle when session token expires?
	#debounce: () => void;

	constructor() {
		this.#search = new Search();
		this.#debounce = debounce(() => this.#suggest(), 200);
	}

	async #suggest(): Promise<void> {
		this.#suggestions = await this.#search.suggest(this.#text);
	}

	get text() {
		return this.#text;
	}

	set text(value: string) {
		this.#text = value;
		this.#debounce();
	}

	get suggestions() {
		return this.#suggestions;
	}

	async retrieve(suggestion: Suggestion): Promise<FeatureResponse> {
		return await this.#search.retrieve(suggestion);
	}
}

export default Searcher;
