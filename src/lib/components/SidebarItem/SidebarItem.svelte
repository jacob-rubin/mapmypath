<script lang="ts">
	import { fade } from 'svelte/transition';
	import type Marker from '../Map/mapbox/marker.svelte';
	import MdiLocationRadius from '~icons/mdi/location-radius';
	import { reverseGeocode } from '$lib/utils/geocode/utils';

	interface Props {
		marker: Marker;
	}

	let { marker }: Props = $props();
</script>

<div
	class="m-2 flex flex-col rounded border-2 border-black p-2"
	role="menuitem"
	transition:fade
>
	<input
		type="text"
		bind:value={marker.name}
		class="input w-full max-w-xs"
	/>
	<div class="flex flex-auto items-center gap-2 pt-2">
		<MdiLocationRadius class="size-8 shrink-0" />
		<div class="p-0 leading-none" placeholder="Geocoding...">
			{#await reverseGeocode(marker.lngLat) then location}
				{location}
			{/await}
		</div>
	</div>
</div>
