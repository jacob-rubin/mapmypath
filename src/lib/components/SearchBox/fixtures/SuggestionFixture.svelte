<script lang="ts">
	import Fragment from '$lib/components/Fragment/Fragment.svelte';
	import { mockMultiSuggestions } from '$lib/utils/searcher/mocks/mockMultiSuggestions';
	import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';
	import Suggestion from '../Autocomplete/Suggestion/Suggestion.svelte';

	interface Props {
		context?: Record<string, unknown>;
	}

	let { context }: Props = $props();
</script>

<Fragment {context}>
	<Suggestion suggestion={mockMultiSuggestions.suggestions[0]}
	></Suggestion>
</Fragment>
