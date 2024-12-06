<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<div
	class="m-2 flex flex-row justify-center rounded border-2 border-black p-2"
	role="menuitem"
	transition:fade
>
	<input type="text" value={text} class="input w-full max-w-xs" />
</div>
