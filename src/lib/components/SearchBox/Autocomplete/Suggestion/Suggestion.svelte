<script lang="ts">
	import type { Suggestion } from '$lib/utils/searcher/types/types';

	interface Props {
		suggestion: Suggestion;
	}

	let { suggestion }: Props = $props();
</script>

<li>
	<!-- svelte-ignore a11y_missing_attribute -->
	<a>{suggestion.name}</a>
</li>
