<script lang="ts">
	import { getContext } from 'svelte';

	let statefulContext: number = getContext('count');
	console.log('count in child: ', statefulContext);
</script>

<div>
	<p>Count: {statefulContext}</p>
</div>
