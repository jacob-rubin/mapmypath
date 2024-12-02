<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';
	import MdiLocation from '~icons/mdi/location';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';

	// TODO: Remove coupling
	let isOpen: boolean = false;
	let cardWidth: string = 'w-10';

	function toggleSidebar() {
		isOpen = !isOpen;
		cardWidth = isOpen ? 'w-72' : 'w-10';
	}
</script>

<div data-testid="sidebar" class="h-screen p-2">
	<div
		class="card h-full {cardWidth} bg-neutral-content transition-all"
	>
		<button
			data-testid="sidebar-button"
			class="btn btn-ghost p-0"
			onclick={toggleSidebar}
		>
			<MdiMenu class="size-5 text-neutral" />
		</button>
		<div class="divider"></div>
		{#if isOpen}
			<div class="overflow-y-auto">
				{#each mapState.getMarkers() as marker}
					<div
						class="card m-2 border-2 border-solid border-black p-2"
					>
						{marker.lngLat.lng}, {marker.lngLat.lat}
					</div>
				{/each}
			</div>
		{:else}
			<div class="self-center overflow-hidden hover:overflow-y-auto">
				{#each mapState.getMarkers() as marker, index}
					<MdiLocation
						data-testid={`marker${index}`}
						class="size-8 text-neutral"
					/>
					<div class="divider"></div>
				{/each}
			</div>
		{/if}
	</div>
</div>
