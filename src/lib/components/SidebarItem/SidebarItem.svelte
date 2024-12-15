<script lang="ts">
	import { fade } from 'svelte/transition';
	import type Marker from '../Map/mapbox/marker.svelte';
	import MdiLocationRadius from '~icons/mdi/location-radius';

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
	<div class="flex flex-row pt-2">
		<MdiLocationRadius class="h-6 w-6" />
		<div>Geocode Here</div>
	</div>
</div>
