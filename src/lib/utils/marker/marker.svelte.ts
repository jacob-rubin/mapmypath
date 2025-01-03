import Geocode from '$lib/utils/geocode/geocode.svelte';
import mapboxgl from 'mapbox-gl';

export interface MarkerData {
	id: number;
	lngLat: mapboxgl.LngLat;
	name?: string;
}

class Marker {
	#id: number;
	#name: string = $state('');
	#geocode: Geocode;

	#marker: mapboxgl.Marker = $state(new mapboxgl.Marker());

	constructor(markerData: MarkerData) {
		this.#id = markerData.id;
		this.#marker = new mapboxgl.Marker({ draggable: true }).setLngLat(
			markerData.lngLat
		);
		this.#name = markerData.name || 'Location';
		this.#geocode = new Geocode();
		this.#geocode.reverse(markerData.lngLat);
	}

	get id(): number {
		return this.#id;
	}

	get lngLat(): mapboxgl.LngLat {
		return this.#marker.getLngLat();
	}

	set lngLat(value: mapboxgl.LngLat) {
		console.log('setting marker');
		//TODO: Is this necessary? Since we only change lnglat on drag, so why do we also set it here?
		// Can test this when map is not erroring. Can check if setLngLat is being called multiple times per drag tick.
		this.#marker.setLngLat(value);
		this.#geocode.reverse(value);
	}

	get name(): string {
		return this.#name;
	}

	set name(value: string) {
		this.#name = value;
	}

	getGeocodeName(): Promise<string> {
		return this.#geocode.name;
	}

	addToMap(map: mapboxgl.Map): void {
		this.#marker.addTo(map);
	}

	removeFromMap(): void {
		this.#marker.remove();
	}

	addDragListener(callback: (markerData: MarkerData) => void): void {
		this.#marker.on('drag', () => {
			const markerData: MarkerData = {
				id: this.#id,
				lngLat: this.lngLat
			};

			callback(markerData);
		});
	}
}

export default Marker;
