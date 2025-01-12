<script lang="ts">
	import type { SuggestionResponse } from '$lib/utils/searcher/types/types';
	import Suggestion from './Suggestion/Suggestion.svelte';

	interface Props {
		suggestionResponse: Promise<SuggestionResponse>;
	}

	let { suggestionResponse }: Props = $props();
</script>

<ul data-testid="autocomplete" class="menu rounded-btn bg-base-200">
	{#await suggestionResponse then suggestions}
		{#each suggestions.suggestions as suggestion}
			<Suggestion {suggestion} />
		{/each}
	{/await}
</ul>
