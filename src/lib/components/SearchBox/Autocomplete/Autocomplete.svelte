<script lang="ts">
	import type { SuggestionResponse } from '$lib/utils/searcher/types/types';
	import Suggestion from './Suggestion/Suggestion.svelte';

	interface Props {
		suggestionResponse: SuggestionResponse;
	}

	let { suggestionResponse }: Props = $props();
</script>

<ul data-testid="autocomplete" class="rounded-btn bg-base-200">
	{#each suggestionResponse.suggestions as suggestion}
		<Suggestion {suggestion} />
	{/each}
</ul>
