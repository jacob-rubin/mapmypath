import type { MapState } from '$lib/state/mapState/mapState.svelte';
import { getContext, setContext } from 'svelte';

const mapStateKey: string = 'mapState';

export function setMapStateContext(mapState: MapState) {
	setContext(mapStateKey, mapState);
}

export function getMapStateContext(): MapState {
	return getContext(mapStateKey) as MapState;
}
