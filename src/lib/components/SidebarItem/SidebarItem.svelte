<script lang="ts">
	import { fade } from 'svelte/transition';
	import MdiDelete from '~icons/mdi/delete';
	import MdiLocationRadius from '~icons/mdi/location-radius';
	import type Marker from '$lib/utils/marker/marker.svelte';
	import type { MapState } from '$lib/state/mapState/mapState.svelte';
	import { getMapStateContext } from '../Map/utils/mapStateContext';
	import { flip } from 'svelte/animate';

	interface Props {
		marker: Marker;
	}

	let { marker }: Props = $props();
	let isHovering: boolean = $state(false);
	let mapState: MapState = getMapStateContext();

	function remove() {
		mapState.deleteMarker(marker.id);
	}
</script>

<div
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}
	role="menuitem"
	tabindex={marker.id}
	data-testid="sidebar-item-{marker.id}"
	class={`relative m-2 flex flex-col rounded p-2 outline outline-offset-2 ${isHovering ? 'outline-4' : 'outline-2'}`}
>
	{#if isHovering}
		<button
			class="btn btn-square btn-sm absolute right-0 top-0"
			onclick={remove}
		>
			<MdiDelete class="size-4" />
		</button>
	{/if}
	<input
		type="text"
		bind:value={marker.name}
		class="input w-full max-w-xs"
	/>
	<div class="flex h-8 items-center gap-1 pt-2">
		<MdiLocationRadius class="size-4 shrink-0" />
		<div data-testid="geocode">
			{#await marker.getGeocodeName() then geocodeName}
				<div class="overflow-none text-xs" transition:fade>
					{geocodeName}
				</div>
			{/await}
		</div>
	</div>
</div>
