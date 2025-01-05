<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import {
		getMapStateContext,
		setMapStateContext
	} from './utils/mapStateContext';
	import { MapState } from '$lib/state/mapState/mapState.svelte';
	import Mapbox from '$lib/utils/mapbox/mapbox';
	import { addMapListeners } from './utils/mapHelpers';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let map: Mapbox;
	let container: HTMLDivElement;

	setMapStateContext(new MapState());
	const mapState: MapState = getMapStateContext();

	onMount(async () => {
		let center: mapboxgl.LngLat = new mapboxgl.LngLat(
			-71.224518,
			42.213995
		);
		let zoom: number = 9;

		map = new Mapbox(container, center, zoom);
		await map.awaitLoad();
		map.initializeStyles();

		addMapListeners(map, mapState);
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
