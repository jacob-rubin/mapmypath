<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<div
	class="m-2 flex flex-row justify-center rounded border-2 border-black p-2"
	role="menuitem"
>
	<input type="text" value={text} class="input w-full max-w-xs" />
</div>
