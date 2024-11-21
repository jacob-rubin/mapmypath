<script lang="ts">
	import mapboxgl, { type LngLat, type Point } from 'mapbox-gl';
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

		map.on('load', () => {
			const click1: Point = new mapboxgl.Point(400, 400);
			const click2: Point = new mapboxgl.Point(500, 500);

			const lngLat1: LngLat = map.unproject(click1);
			const lngLat2: LngLat = map.unproject(click2);

			map.addSource('line', {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: [lngLat1.toArray(), lngLat2.toArray()]
					}
				}
			});

			map.addLayer({
				id: 'line',
				type: 'line',
				source: 'line',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#888',
					'line-width': 8
				}
			});

			new mapboxgl.Marker()
				.setLngLat(map.unproject(click1))
				.addTo(map);
			new mapboxgl.Marker()
				.setLngLat(map.unproject(click2))
				.addTo(map);
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
	bind:this={mapContainer}
></div>
