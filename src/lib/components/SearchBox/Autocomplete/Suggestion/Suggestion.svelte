<script lang="ts">
	import { getMapStateContext } from '$lib/components/Map/utils/mapStateContext';
	import type { SearchBoxSuggestion } from '@mapbox/search-js-core';

	interface Props {
		suggestion: SearchBoxSuggestion;
	}

	let { suggestion }: Props = $props();

	// TODO
	// 1) On click, retreive the coordinates from searcher
	// 2) Fly map to coordinates
	// 3) Place marker on map
</script>

<li>
	<!-- svelte-ignore a11y_missing_attribute -->
	<a>{suggestion.name}</a>
</li>
