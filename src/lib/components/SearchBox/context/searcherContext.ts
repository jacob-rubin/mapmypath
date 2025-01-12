import type Searcher from '$lib/utils/searcher/searcher.svelte';
import { getContext, setContext } from 'svelte';

const key: string = 'searcher';

export function setSearcherContext(searcher: Searcher): void {
	setContext('searcher', searcher);
}

export function getSearcherContext(): Searcher {
	return getContext(key) as Searcher;
}
