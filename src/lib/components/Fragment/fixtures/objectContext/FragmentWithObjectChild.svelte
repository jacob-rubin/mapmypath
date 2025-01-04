<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import Fragment from '../../Fragment.svelte';
	import ObjectChild from './ObjectChild.svelte';
	import type { ContextObject } from './contextObject';

	const contextObject: ContextObject = {
		text: 'Hello World!',
		ranking: 1
	};
</script>

<Fragment context={{ contextObject: contextObject }}>
	<ObjectChild></ObjectChild>
</Fragment>
