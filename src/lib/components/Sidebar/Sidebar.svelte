<script lang="ts">
	/* TODOs: 
	- Remove coupling of of isOpen, cardWidth
	- Refactor data-tip to be cleaner
	- Hide sidebar completely on collapse. 
		- Consier using svelte:transitions
			,and remove it from the DOM
	*/

	import MdiKeyboardArrowLeft from '~icons/mdi/keyboard-arrow-left';
	import MdiKeyboardArrowRight from '~icons/mdi/keyboard-arrow-right';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';

	// TODO: Remove coupling
	let isOpen: boolean = true;
	let cardWidth: string = 'w-72';

	function toggleSidebar() {
		isOpen = !isOpen;
		cardWidth = isOpen ? 'w-72' : 'w-10';
	}
</script>

<div
	class="flex h-screen {cardWidth} flex-grow flex-row items-center py-2 transition-all"
>
	<div
		data-testid={'sidebar'}
		class="card card-normal h-full w-full -translate-x-3 border-none bg-neutral-content"
	></div>

	<div
		data-testid={'tooltip'}
		class="tooltip tooltip-right flex"
		data-tip={isOpen ? 'Collapse' : 'Expand'}
	>
		<button
			class="h-10 -translate-x-3 rounded-l-none rounded-r-lg border-none bg-neutral-content"
			onclick={toggleSidebar}
		>
			{#if isOpen}
				<MdiKeyboardArrowLeft
					data-testid={'collapse'}
					class="h-6 w-6"
				/>
			{:else}
				<MdiKeyboardArrowRight
					data-testid={'expand'}
					class="h-6 w-6"
				/>
			{/if}
		</button>
	</div>
</div>
