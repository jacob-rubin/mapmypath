import mapboxgl from 'mapbox-gl';

export interface MarkerData {
	id: number;
	lngLat: mapboxgl.LngLat;
	name?: string;
}
class Marker {
	#id: number;
	#marker: mapboxgl.Marker = $state(new mapboxgl.Marker());
	#name: string = $state('');

	constructor(markerData: MarkerData) {
		this.#id = markerData.id;
		this.#marker = new mapboxgl.Marker({ draggable: true }).setLngLat(
			markerData.lngLat
		);
		this.#name = markerData.name || 'Location';
	}

	get id(): number {
		return this.#id;
	}

	get lngLat(): mapboxgl.LngLat {
		return this.#marker.getLngLat();
	}

	set lngLat(value: mapboxgl.LngLat) {
		this.#marker.setLngLat(value);
	}

	get name(): string {
		return this.#name;
	}

	set name(value: string) {
		this.#name = value;
	}

	addToMap(map: mapboxgl.Map): void {
		this.#marker.addTo(map);
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
