<script lang="ts">
	import { getContext } from 'svelte';

	let text: string = getContext('text');
</script>

<div>
	<p>{text}</p>
</div>
