<script lang="ts">
	import Sidebar from '../Sidebar.svelte';
	import Fragment from '$lib/components/Fragment/Fragment.svelte';

	interface Props {
		context?: Record<string, unknown>;
	}

	let { context }: Props = $props();
</script>

<Fragment {context}>
	<Sidebar></Sidebar>
</Fragment>
