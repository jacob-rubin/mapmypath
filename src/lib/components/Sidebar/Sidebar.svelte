<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';

	let isOpen: boolean = false;
	let cardWidth: string = 'w-10';

	function toggleSidebar() {
		isOpen = !isOpen;
		cardWidth = isOpen ? 'w-72' : 'w-10';
	}
</script>

<div class="h-screen p-2">
	<div
		class="card h-full {cardWidth} bg-neutral-content transition-all"
	>
		<button class="btn btn-ghost p-0" onclick={toggleSidebar}>
			<MdiMenu class="size-5 text-neutral" />
		</button>
	</div>
</div>

<!-- {#snippet card(width: string)}
	<div
		data-testid="sidebar"
		class="card h-full {width} bg-neutral-content"
	>
		<button
			data-testid="sidebar-button"
			class="btn btn-ghost"
			onclick={toggleSidebar}
		>
			<MdiMenu class="text-neutral" />
		</button>
		<div class="overflow-auto">
			{#if isOpen}
				{#each mapState.getMarkers() as marker}
					<div
						class="card m-2 border-2 border-solid border-black p-2"
					>
						{marker.lngLat.lng}, {marker.lngLat.lat}
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/snippet}

<div data-testid="sidebar-div" class="h-screen p-2">
	{#if isOpen}
		{@render card('w-72')}
	{:else}
		{@render card('w-min')}
	{/if}
</div> -->
