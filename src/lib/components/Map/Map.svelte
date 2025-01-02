<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { mapController } from '$lib/shared/mapController/mapController.svelte';
	import mapboxgl from 'mapbox-gl';
	import Mapbox from '../../utils/mapbox/mapbox';
	import Marker from '$lib/utils/marker/marker.svelte';
	import type { MarkerData } from '$lib/utils/marker/marker.svelte';

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

		map.addClickListener((e: mapboxgl.MapMouseEvent) => {
			const marker: Marker = new Marker({
				id: mapController.getMarkers().length, //TODO: This causes bug bc
				lngLat: e.lngLat,
				name: `Stop ${mapController.getMarkers().length + 1}`
			});

			map.addMarker(marker);
			mapController.addMarker(marker);
			map.renderPath(mapController.getMarkers().map((m) => m.lngLat));

			marker.addDragListener((markerData: MarkerData) => {
				mapController.updateMarker({
					id: markerData.id,
					lngLat: markerData.lngLat
				});
				map.renderPath(
					mapController.getMarkers().map((m) => m.lngLat)
				);
			});
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
