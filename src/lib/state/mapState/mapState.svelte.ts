import { addMapClickListeners } from '$lib/state/mapState/utils';
import type Mapbox from '$lib/utils/mapbox/mapbox';
import Marker from '$lib/utils/marker/marker.svelte';
import type { MarkerData } from '$lib/utils/marker/marker.svelte';

export class MapState {
	#map: Mapbox;
	#markers: Marker[] = $state([]); //TODO: consider making this collection instead of a list

	#counter: number = 0; // TODO: Extrapolate this into a counter class?

	constructor(map: Mapbox) {
		this.#map = map;
		this.#markers = [];

		addMapClickListeners(this.#map, this);
	}

	get markers(): Marker[] {
		return this.#markers;
	}

	set markers(value: Marker[]) {
		this.#markers = value;
	}

	get map(): Mapbox {
		return this.#map;
	}

	getMarkerById(id: number): Marker {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.id === id
		);

		if (!marker) {
			throw new Error(`Marker with id ${id} not found`);
		}

		return marker;
	}

	addMarker(lngLat: mapboxgl.LngLat): Marker {
		// TODO: How can I make this method smaller?
		const marker: Marker = new Marker({
			id: this.#counter++,
			lngLat,
			name: `Stop ${this.#markers.length + 1}`
		});

		marker.addDragListener((markerData: MarkerData) => {
			this.updateMarker({
				id: markerData.id,
				lngLat: markerData.lngLat
			});
			this.#map.renderPath(this.#markers.map((m) => m.lngLat));
		});

		this.#markers.push(marker);
		this.#map.addMarker(marker);
		this.#map.renderPath(this.#markers.map((m) => m.lngLat));

		return marker;
	}

	updateMarker(markerData: MarkerData): void {
		// TODO: Do I need to update the marker lnglat, since it's only updated when dragged?
		//TODO: Can I remove this usage of MarkerData and replace with marker?
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.id === markerData.id
		);

		if (!marker) {
			throw new Error(`Marker with id ${markerData.id} not found`);
		}

		marker.lngLat = markerData.lngLat;
	}

	deleteMarker(id: number): Marker {
		const marker: Marker | undefined = this.#markers.find(
			(marker) => marker.id === id
		);

		if (!marker) {
			throw new Error(`Marker with id ${id} not found`);
		}

		this.#markers = this.#markers.filter(
			(marker) => marker.id !== id
		);
		this.#map.deleteMarker(marker);
		this.#map.renderPath(this.#markers.map((m) => m.lngLat));

		return marker;
	}
}
