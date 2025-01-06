<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import { setMapStateContext } from './utils/mapStateContext';
	import { MapState } from '$lib/state/mapState/mapState.svelte';
	import Mapbox from '$lib/utils/mapbox/mapbox';
	import {
		addMapListeners,
		initializeStyles
	} from './utils/mapHelpers';
	import { CENTER, ZOOM } from './utils/constants';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let map: Mapbox;
	let container: HTMLDivElement;
	let isMapLoaded: boolean = $state(false);

	function initializeLoad(map: Mapbox, mapState: MapState) {
		addMapListeners(map, mapState);
		isMapLoaded = true;
	}

	onMount(async () => {
		map = new Mapbox(container, CENTER, ZOOM);
		const mapState = new MapState(map);
		setMapStateContext(mapState);

		initializeLoad(map, mapState);
		await initializeStyles(map);
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

{#if isMapLoaded && children}
	{@render children()}
{/if}
