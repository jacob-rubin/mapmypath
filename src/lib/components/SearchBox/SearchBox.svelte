<script lang="ts">
	import { getMapStateContext } from '../Map/utils/mapStateContext';
	import type { MapState } from '$lib/state/mapState/mapState.svelte';
	import Autocomplete from './Autocomplete/Autocomplete.svelte';
	import { mockSearchBoxSuggestionResponse } from './mocks/searchBoxSuggestionResponseMock';

	const mapState: MapState = getMapStateContext();

	// TODO: Implement the following
	// 1) Add stateful variable for search
	// 2) When variable changes, call suggest
	// 3) Pass suggestions to autocomplete
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
	<input
		data-testid="search-box"
		type="text"
		placeholder="Search"
		class="input input-bordered"
		id="search"
	/>
	<Autocomplete suggestions={mockSearchBoxSuggestionResponse}
	></Autocomplete>
</div>
