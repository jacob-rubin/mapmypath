<script lang="ts">
	import MdiKeyboardArrowLeft from '~icons/mdi/keyboard-arrow-left';
	import MdiKeyboardArrowRight from '~icons/mdi/keyboard-arrow-right';

	interface Props {
		isOpen: boolean;
		onClick: () => void;
	}

	let { isOpen, onClick }: Props = $props();
</script>

<div
	data-testid={'tooltip'}
	class="tooltip tooltip-right flex"
	data-tip={isOpen ? 'Collapse' : 'Expand'}
>
	<button
		class="h-10 rounded-l-none rounded-r-lg border-none bg-neutral-content"
		onclick={onClick}
	>
		{#if isOpen}
			<MdiKeyboardArrowLeft data-testid={'collapse'} class="size-6" />
		{:else}
			<MdiKeyboardArrowRight data-testid={'expand'} class="size-6" />
		{/if}
	</button>
</div>
