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
	import { slide } from 'svelte/transition';

	// TODO: Remove coupling
	let isOpen: boolean = true;
	let cardWidth: string = 'w-72';

	function toggleSidebar() {
		isOpen = !isOpen;
		cardWidth = isOpen ? 'w-72' : 'w-0';
	}
</script>

<div class="flex h-screen w-72 flex-grow flex-row items-center py-2">
	{#if isOpen}
		<div
			data-testid={'sidebar'}
			class="card card-normal h-full w-full bg-neutral-content"
			transition:slide={{ axis: 'x' }}
		></div>
	{/if}

	<div
		data-testid={'tooltip'}
		class="tooltip tooltip-right flex"
		data-tip={isOpen ? 'Collapse' : 'Expand'}
	>
		<button
			class="h-10 rounded-l-none rounded-r-lg border-none bg-neutral-content"
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
