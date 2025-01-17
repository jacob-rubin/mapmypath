import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import type Marker from '../marker/marker.svelte';

const SOURCE_ID = 'source';
const LAYER_ID = 'layer';

class Mapbox {
	#map: mapboxgl.Map;

	constructor(
		container: string | HTMLElement,
		center: mapboxgl.LngLat = new mapboxgl.LngLat(0, 0),
		zoom: number = 0
	) {
		this.#map = new mapboxgl.Map({
			container,
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			zoom,
			center,
			style: 'mapbox://styles/mapbox/streets-v11'
		});
	}

	remove(): void {
		this.#map.remove();
	}

	isLoaded(): boolean {
		return this.#map.loaded();
	}

	awaitLoad(): Promise<void> {
		if (this.isLoaded()) {
			return Promise.resolve();
		} else {
			return new Promise((resolve) => {
				// TODO: style.load fixes one of the rendering issues. Why?
				this.#map.on('style.load', () => {
					resolve();
				});
			});
		}
	}

	async initializeStyles(): Promise<void> {
		this.#map.addSource(SOURCE_ID, {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: []
				}
			}
		});

		this.#map.addLayer({
			id: LAYER_ID,
			source: SOURCE_ID,
			type: 'line',
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': '#888',
				'line-width': 8
			}
		});
	}

	addClickListener(
		callback: (event: mapboxgl.MapMouseEvent) => void
	): void {
		this.#map.on('click', callback);
	}

	addMarker(marker: Marker) {
		marker.addToMap(this.#map);
	}

	deleteMarker(marker: Marker) {
		marker.removeFromMap();
	}

	getLayer(id: string): mapboxgl.LayerSpecification {
		if (!this.#map.getLayer(id)) {
			throw new Error(`Layer not found: ${id}`);
		}

		return this.#map.getLayer(id)!;
	}

	getSource(id: string): mapboxgl.GeoJSONSourceSpecification {
		if (!this.#map.getSource(id)) {
			throw new Error(`Source not found: ${id}`);
		}

		return this.#map.getSource(id)!.serialize();
	}

	renderPath(lngLats: mapboxgl.LngLat[]) {
		const geoJsonSource: mapboxgl.GeoJSONSource =
			this.#map.getSource(SOURCE_ID)!;
		geoJsonSource.setData({
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: lngLats.map((lngLat) => lngLat.toArray())
			}
		});
	}

	flyTo(lngLat: mapboxgl.LngLat) {
		this.#map.flyTo({
			center: lngLat.toArray(),
			zoom: 16
		});
	}

	getCenter(): mapboxgl.LngLat {
		return this.#map.getCenter();
	}
}

export default Mapbox;
