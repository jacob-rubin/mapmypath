<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import {
		getMapStateContext,
		setMapStateContext
	} from './mapStateContext';
	import { MapState } from '$lib/state/mapState/mapState.svelte';
	import Marker, {
		type MarkerData
	} from '$lib/utils/marker/marker.svelte';
	import Mapbox from '$lib/utils/mapbox/mapbox';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let map: Mapbox;
	let container: HTMLDivElement;

	setMapStateContext(new MapState());
	const mapState: MapState = getMapStateContext();

	function addMapClickListener(map: Mapbox) {
		map.addClickListener((e: mapboxgl.MapMouseEvent) => {
			const marker: Marker = new Marker({
				id: mapState.getMarkers().length,
				lngLat: e.lngLat,
				name: `Stop ${mapState.getMarkers().length + 1}`
			});

			map.addMarker(marker);
			mapState.addMarker(marker);
			map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
			addMarkerDragListener(marker);
		});
	}

	function addMarkerDragListener(marker: Marker) {
		marker.addDragListener((markerData: MarkerData) => {
			mapState.updateMarker({
				id: markerData.id,
				lngLat: markerData.lngLat
			});
			map.renderPath(mapState.getMarkers().map((m) => m.lngLat));
		});
	}

	onMount(async () => {
		let center: mapboxgl.LngLat = new mapboxgl.LngLat(
			-71.224518,
			42.213995
		);
		let zoom: number = 9;

		map = new Mapbox(container, center, zoom);
		await map.awaitLoad();
		map.initializeStyles();

		addMapClickListener(map);
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

{#if children}
	{@render children()}
{/if}
