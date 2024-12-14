<script lang="ts">
	import { reverseGeocode } from '$lib/utils/geocode/geocode';
	import { fade } from 'svelte/transition';
	import type Marker from '../Map/mapbox/marker';

	interface Props {
		marker: Marker;
	}

	let { marker }: Props = $props();
</script>

<div
	class="m-2 flex flex-row justify-center rounded border-2 border-black p-2"
	role="menuitem"
	transition:fade
>
	<input
		type="text"
		bind:value={marker.name}
		class="input w-full max-w-xs"
	/>
</div>
