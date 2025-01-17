<script lang="ts">
	import Fragment from '$lib/components/Fragment/Fragment.svelte';
	import Suggestion from '../Autocomplete/Suggestion/Suggestion.svelte';
	import type { Suggestion as SuggestionType } from '$lib/utils/searcher/types/types';

	interface Props {
		context?: Record<string, unknown>;
		suggestion: SuggestionType;
	}

	let { context, suggestion }: Props = $props();
</script>

<Fragment {context}>
	<Suggestion {suggestion}></Suggestion>
</Fragment>
