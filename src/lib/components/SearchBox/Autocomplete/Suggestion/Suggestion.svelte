<script lang="ts">
	import { getMapStateContext } from '$lib/components/Map/utils/mapStateContext';
	import type { MapState } from '$lib/state/mapState/mapState.svelte';
	import type Searcher from '$lib/utils/searcher/searcher.svelte';
	import type {
		FeatureResponse,
		Suggestion
	} from '$lib/utils/searcher/types/types';
	import mapboxgl from 'mapbox-gl';
	import { getSearcherContext } from '../../context/searcherContext';

	interface Props {
		suggestion: Suggestion;
	}

	let { suggestion }: Props = $props();
	let isHovering: boolean = $state(false);

	const searcher: Searcher = getSearcherContext();
	const mapState: MapState = getMapStateContext();

	const setHover = (hover: boolean) => () => {
		isHovering = hover;
	};

	async function handleClick() {
		console.log('clicked');
		searcher.text = suggestion.name;
		await retreiveFeature();
	}

	async function retreiveFeature() {
		const featureCoordinates: mapboxgl.LngLat =
			await getFeatureCoordinates();

		mapState.map.flyTo(featureCoordinates);
		mapState.addMarker(featureCoordinates);
	}

	async function getFeatureCoordinates(): Promise<mapboxgl.LngLat> {
		const feature: FeatureResponse =
			await searcher.retrieve(suggestion);

		return mapboxgl.LngLat.convert(
			feature.features[0].geometry.coordinates
		);
	}
</script>

<li>
	<button
		onmousedown={handleClick}
		onmouseenter={setHover(true)}
		onmouseleave={setHover(false)}
		class="flex w-full flex-col justify-start justify-items-start rounded-btn p-2"
		class:bg-gray-300={isHovering}
	>
		<p class="text-ellipsis text-base">
			{suggestion.name}
		</p>
		<p class="text-ellipsis text-xs">
			{suggestion.place_formatted}
		</p>
	</button>
</li>
