<script lang="ts">
	import { getMapStateContext } from '../Map/utils/mapStateContext';
	import type { MapState } from '$lib/state/mapState/mapState.svelte';
	import Autocomplete from './Autocomplete/Autocomplete.svelte';
	import Searcher from '$lib/utils/searcher/searcher.svelte';

	const searcher: Searcher = new Searcher();
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
	<input
		bind:value={searcher.text}
		data-testid="search-box"
		type="text"
		placeholder="Search"
		class="input input-bordered"
		id="search"
	/>
	<Autocomplete suggestionResponse={searcher.suggestions}
	></Autocomplete>
</div>
