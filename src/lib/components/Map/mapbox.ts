import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

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
		return this.#map.isStyleLoaded();
	}

	awaitLoad(): Promise<void> {
		if (this.isLoaded()) {
			return Promise.resolve();
		} else {
			return new Promise((resolve) => {
				this.#map.on('load', () => {
					resolve();
				});
			});
		}
	}

	initializeStyles(): void {
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

	addMarker(lngLat: mapboxgl.LngLat): void {
		new mapboxgl.Marker().setLngLat(lngLat).addTo(this.#map);
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

	pointToLngLat(point: mapboxgl.Point): mapboxgl.LngLat {
		return this.#map.unproject(point);
	}

	addLineByLngLat(start: mapboxgl.LngLat, end: mapboxgl.LngLat) {
		this.#map.addSource('lineSource', {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: [start.toArray(), end.toArray()]
				}
			}
		});

		this.#map.addLayer({
			id: 'line',
			type: 'line',
			source: 'lineSource',
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

	addLineByPoint(start: mapboxgl.Point, end: mapboxgl.Point) {
		this.addLineByLngLat(
			this.pointToLngLat(start),
			this.pointToLngLat(end)
		);
	}

	addMultiLineByLngLat(lngLats: mapboxgl.LngLat[]) {
		this.#map.addSource('multiLineSource', {
			type: 'geojson',
			data: {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: lngLats.map((lngLat) => lngLat.toArray())
				}
			}
		});

		this.#map.addLayer({
			id: 'multiLine',
			type: 'line',
			source: 'multiLineSource',
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

	addMultiLineByPoint(points: mapboxgl.Point[]) {
		this.addMultiLineByLngLat(
			points.map((point) => this.pointToLngLat(point))
		);
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
}

export default Mapbox;
