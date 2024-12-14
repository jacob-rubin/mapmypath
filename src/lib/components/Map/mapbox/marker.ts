import mapboxgl from 'mapbox-gl';

export interface MarkerData {
	id: number;
	lngLat: mapboxgl.LngLat;
}
class Marker {
	#id: number;
	#marker: mapboxgl.Marker;
	#name: string;

	constructor(markerData: MarkerData) {
		this.#id = markerData.id;
		this.#marker = new mapboxgl.Marker({ draggable: true }).setLngLat(
			markerData.lngLat
		);
		this.#name = 'Location';
	}

	addDragListener(callback: (markerData: MarkerData) => void): void {
		this.#marker.on('drag', () => {
			const markerData: MarkerData = {
				id: this.#id,
				lngLat: this.getLngLat()
			};

			callback(markerData);
		});
	}

	getId(): string | number {
		return this.#id;
	}

	getLngLat(): mapboxgl.LngLat {
		return this.#marker.getLngLat();
	}

	setLngLat(lngLat: mapboxgl.LngLat): void {
		this.#marker.setLngLat(lngLat);
	}

	addToMap(map: mapboxgl.Map): void {
		this.#marker.addTo(map);
	}

	get name(): string {
		//TODO: Replace all with getters and setters!!
		return this.#name;
	}

	set name(value: string) {
		this.#name = value;
	}
}

export default Marker;
