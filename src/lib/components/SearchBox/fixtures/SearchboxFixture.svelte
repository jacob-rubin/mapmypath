<script lang="ts">
	import Fragment from '$lib/components/Fragment/Fragment.svelte';
	import SearchBox from '../SearchBox.svelte';

	interface Props {
		context?: Record<string, unknown>;
	}

	let { context }: Props = $props();
</script>

<Fragment {context}>
	<SearchBox></SearchBox>
</Fragment>
