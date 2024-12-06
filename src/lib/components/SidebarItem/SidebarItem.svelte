<script lang="ts">
	import type { MarkerData } from '$lib/markerData';
	import { reverseGeocode } from '$lib/utils/geocode/geocode';
	import { fade } from 'svelte/transition';

	interface Props {
		marker: MarkerData;
	}

	let { marker }: Props = $props();
</script>

<div
	class="m-2 flex flex-row justify-center rounded border-2 border-black p-2"
	role="menuitem"
	transition:fade
>
	{#await reverseGeocode(marker.lngLat) then geocode}
		<input
			type="text"
			value={geocode}
			class="input w-full max-w-xs"
		/>
	{/await}
</div>
