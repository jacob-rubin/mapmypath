<script lang="ts">
	import { getContext } from 'svelte';

	interface Props {
		text: string;
	}

	let text: string = getContext('text');
</script>

<div>
	<p>{text}</p>
</div>
