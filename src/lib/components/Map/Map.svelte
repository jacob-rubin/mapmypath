<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy } from 'svelte';
	import { mapState } from '$lib/shared/mapState.svelte';

	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;
	let lng: number, lat: number, zoom: number;

	lng = -71.224518;
	lat = 42.213995;
	zoom = 9;

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		map.on('click', (e) => {
			new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
			mapState.addMarker(e.lngLat);
		});
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div data-testid="map" class="h-screen w-screen" bind:this={mapContainer}></div>
