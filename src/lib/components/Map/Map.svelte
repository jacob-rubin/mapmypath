<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';
	import mapboxgl from 'mapbox-gl';
	import Mapbox from './mapbox/mapbox';
	import type { MarkerData } from '$lib/markerData';

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
			const markerData: MarkerData = {
				id: mapState.getMarkers().length,
				lngLat: e.lngLat
			};

			map.addMarker(markerData, (marker: MarkerData) => {
				mapState.updateMarker(marker.id, marker.lngLat);
				map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
			});
			mapState.addMarker(markerData);
			map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
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
