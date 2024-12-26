<script lang="ts">
	import { fly } from 'svelte/transition';
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';
	import { linear } from 'svelte/easing';
	import SidebarButton from './SidebarButton.svelte';

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

{#if isOpen}
	<div
		class="flex h-screen items-center py-2"
		transition:fly={{
			x: '-20rem',
			opacity: 100,
			easing: linear,
			duration: 300
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
		<SidebarButton {isOpen} onClick={toggleSidebar} />
	</div>
{:else}
	<div class="flex h-screen items-center">
		<div class="h-full"></div>
		<SidebarButton {isOpen} onClick={toggleSidebar} />
	</div>
{/if}
