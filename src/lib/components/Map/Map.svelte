<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { mapState } from '$lib/state/mapState/mapState.svelte';
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
				id: mapState.getMarkers().length, //TODO: This causes bug bc
				lngLat: e.lngLat,
				name: `Stop ${mapState.getMarkers().length + 1}`
			});

			map.addMarker(marker);
			mapState.addMarker(marker);
			map.renderPath(mapState.getMarkers().map((m) => m.lngLat));

			marker.addDragListener((markerData: MarkerData) => {
				mapState.updateMarker({
					id: markerData.id,
					lngLat: markerData.lngLat
				});
				map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
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
