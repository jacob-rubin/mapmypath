<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';
	import { slide, fly } from 'svelte/transition';
	import { mapState } from '$lib/shared/mapState.svelte';

	let isOpen: boolean = true;

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

{#snippet card(width: string)}
	<div data-testid="sidebar" class="card h-full {width} bg-neutral-content">
		<button data-testid="sidebar-button" class="btn btn-ghost" onclick={toggleSidebar}>
			<MdiMenu class="text-neutral" />
		</button>
		<div class="overflow-auto">
			{#if isOpen}
				{#each mapState.getMarkers() as marker}
					<div class="card m-2 border-2 border-solid border-black p-2">
						{marker.lng}, {marker.lat}
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
</div>
