<!-- This component injects context into all children. Used for testing only! -->
<!-- Svelte 5 version of svelte-fragment-component https://github.com/kenoxa/svelte-fragment-component -->

<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	interface Props {
		context?: Record<string, unknown>;
		children?: Snippet;
	}

	let { context, children }: Props = $props();

	if (context) {
		Object.keys(context).forEach((key) => {
			setContext(key, context[key]);
		});
	}
</script>

{#if children}
	{@render children()}
{/if}
