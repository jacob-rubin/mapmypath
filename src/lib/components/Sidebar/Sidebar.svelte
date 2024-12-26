<script lang="ts">
	import MdiKeyboardArrowLeft from '~icons/mdi/keyboard-arrow-left';
	import MdiKeyboardArrowRight from '~icons/mdi/keyboard-arrow-right';
	import { fly } from 'svelte/transition';
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';
	import { cubicOut } from 'svelte/easing';

	let sidebar: HTMLDivElement | null = $state(null);

	let isOpen: boolean = $state(true);
	let mapSize: number = $derived(mapState.getMarkers().length);

	function toggleSidebar() {
		isOpen = !isOpen;
	}

	$effect(() => {
		if (sidebar && mapSize > 0) {
			sidebar.scrollTo({
				top: sidebar.scrollHeight
			});
		}
	});
</script>

{#snippet sidebarButton()}
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
{/snippet}

{#if isOpen}
	<div
		class="flex h-screen items-center py-2"
		transition:fly={{
			x: '-20rem',
			opacity: 100,
			easing: cubicOut
		}}
	>
		<div
			bind:this={sidebar}
			data-testid={'sidebar'}
			class="card card-normal h-full w-80 overflow-auto bg-neutral-content p-2"
		>
			{#each mapState.getMarkers() as marker (marker.id)}
				<SidebarItem {marker} />
			{/each}
		</div>
		{@render sidebarButton()}
	</div>
{:else}
	<div class="flex h-screen items-center">
		<div class="h-full"></div>
		{@render sidebarButton()}
	</div>
{/if}
