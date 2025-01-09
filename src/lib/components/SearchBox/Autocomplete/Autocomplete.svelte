<script lang="ts">
	import type { SearchBoxSuggestionResponse } from '@mapbox/search-js-core';
	import Suggestion from './Suggestion/Suggestion.svelte';

	interface Props {
		suggestions: SearchBoxSuggestionResponse;
	}

	let { suggestions }: Props = $props();
</script>

<ul data-testid="autocomplete" class="menu rounded-btn bg-base-200">
	{#each suggestions.suggestions as suggestion}
		<Suggestion {suggestion} />
	{/each}
</ul>
