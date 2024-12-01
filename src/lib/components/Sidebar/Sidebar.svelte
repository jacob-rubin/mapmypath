<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';
	import MdiLocation from '~icons/mdi/location';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';

	// TODO: Remove coupling
	let isOpen: boolean = true;
	let cardWidth: string = 'w-72';

	function toggleSidebar() {
		isOpen = !isOpen;
		cardWidth = isOpen ? 'w-72' : 'w-10';
	}
</script>

<div class="h-screen p-2">
	<div
		data-testid={'sidebar'}
		class="card h-full {cardWidth} bg-neutral-content transition-all"
	>
		<button class="btn btn-ghost p-0" onclick={toggleSidebar}>
			<MdiMenu class="size-5 text-neutral" />
		</button>
		{#each mapState.getMarkers() as marker}
			{marker.lngLat.lng}, {marker.lngLat.lat}
		{/each}
	</div>
</div>
