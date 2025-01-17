<script lang="ts">
	import Autocomplete from './Autocomplete/Autocomplete.svelte';
	import Searcher from '$lib/utils/searcher/searcher.svelte';
	import { setSearcherContext } from './context/searcherContext';

	const searcher: Searcher = new Searcher();
	setSearcherContext(searcher);
</script>

<div class="flex w-72 flex-col gap-2">
	<input
		bind:value={searcher.text}
		data-testid="searchbox"
		type="text"
		placeholder="Search"
		class="input input-bordered"
		id="search"
	/>
	<Autocomplete suggestionResponse={searcher.suggestions}
	></Autocomplete>
</div>
