<script lang="ts">
	/* TODOs: 
	- Have sidebar item slide with sidebar on close
	*/

	import MdiKeyboardArrowLeft from '~icons/mdi/keyboard-arrow-left';
	import MdiKeyboardArrowRight from '~icons/mdi/keyboard-arrow-right';
	import { slide } from 'svelte/transition';
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';

	let isOpen: boolean = true;

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

<div class="flex h-screen w-72 flex-grow flex-row items-center py-2">
	{#if isOpen}
		<div
			data-testid={'sidebar'}
			class="card card-normal h-full w-full overflow-hidden bg-neutral-content p-2 hover:overflow-auto"
			transition:slide={{ axis: 'x' }}
		>
			{#each mapState.getMarkers() as marker}
				<SidebarItem text={marker.lngLat.toString()} />
			{/each}
		</div>
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
