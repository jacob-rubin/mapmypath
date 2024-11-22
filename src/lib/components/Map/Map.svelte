<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { mapState } from '$lib/shared/mapState.svelte';
	import Mapbox from './mapbox';
	import mapboxgl from 'mapbox-gl';

	let map: Mapbox;
	let container: HTMLDivElement;

	onMount(async () => {
		let center: mapboxgl.LngLat = new mapboxgl.LngLat(
			-71.224518,
			42.213995
		);
		let zoom: number = 9;

		map = new Mapbox(container, center, zoom);
		await map.awaitLoad();
		map.initializeStyles();

		map.addClickListener((e) => {
			map.addMarker(e.lngLat);
			mapState.addMarker(e.lngLat);
			map.renderPath(mapState.getMarkers());
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div
	data-testid="map"
	class="h-screen w-screen"
	bind:this={container}
></div>
