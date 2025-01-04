<script lang="ts">
	import Map from '../Map.svelte';
	import Fragment from '$lib/components/Fragment/Fragment.svelte';

	interface Props {
		context?: Record<string, unknown>;
	}

	let { context }: Props = $props();
</script>

<Fragment {context}>
	<Map></Map>
</Fragment>
