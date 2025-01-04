<script lang="ts">
	import { getContext } from 'svelte';
	import type { ContextObject } from './contextObject';

	let contextObject: ContextObject = getContext('contextObject');
</script>

<div>
	<p>Ranking: {contextObject.ranking}</p>
	<p>Text: {contextObject.text}</p>
</div>
