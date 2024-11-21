import 'mapbox-gl/dist/mapbox-gl.css';
import {
	LngLat,
	MapMouseEvent,
	Map,
	Marker,
	type CustomLayerInterface,
	type LayerSpecification,
	type GeoJSONSourceSpecification
} from 'mapbox-gl';

class Mapbox {
	#map: Map;

	constructor(
		container: string | HTMLElement,
		center: LngLat = new LngLat(0, 0),
		zoom: number = 0
	) {
		this.#map = new Map({
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
		if (this.#map.isStyleLoaded()) {
			return Promise.resolve();
		} else {
			return new Promise((resolve) => {
				this.#map.on('load', () => {
					resolve();
				});
			});
		}
	}

	addClickListener(callback: (event: MapMouseEvent) => void): void {
		this.#map.on('click', callback);
	}

	addMarker(lngLat: LngLat): void {
		new Marker().setLngLat(lngLat).addTo(this.#map);
	}

	getLayer(
		id: string
	): LayerSpecification | CustomLayerInterface | undefined {
		return this.#map.getLayer(id);
	}

	getSource(id: string): GeoJSONSourceSpecification | undefined {
		return this.#map.getSource(id)?.serialize();
	}

	addLine(start: LngLat, end: LngLat) {
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

	addMultiLine(lngLats: LngLat[]) {
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
}

export default Mapbox;
