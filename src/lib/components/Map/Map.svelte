<script lang="ts">
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import { setMapStateContext } from './utils/mapStateContext';
	import { MapState } from '$lib/state/mapState/mapState.svelte';
	import Mapbox from '$lib/utils/mapbox/mapbox';
	import { CENTER, ZOOM } from './utils/constants';
	import { addMapClickListeners } from '$lib/state/mapState/utils';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let map: Mapbox;
	let container: HTMLDivElement;
	let isMapLoaded: boolean = $state(false);

	async function initializeStyles(map: Mapbox) {
		await map.awaitLoad();
		map.initializeStyles();
	}

	onMount(async () => {
		map = new Mapbox(container, CENTER, ZOOM);
		const mapState = new MapState(map);
		setMapStateContext(mapState);

		isMapLoaded = true;
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
