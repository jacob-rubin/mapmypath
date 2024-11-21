import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { MapMouseEvent, type LngLat } from 'mapbox-gl';

class Mapbox {
	#map: mapboxgl.Map;

	constructor(
		container: string | HTMLElement,
		center: LngLat,
		zoom: number,
		onClick: (event: MapMouseEvent) => void
	) {
		this.#map = new mapboxgl.Map({
			container,
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			zoom,
			center,
			style: 'mapbox://styles/mapbox/streets-v11'
		});

		this.#map.on('click', (e) => {
			onClick(e);
		});
	}

	remove(): void {
		this.#map.remove();
	}

	addMarker(lngLat: LngLat): void {
		new mapboxgl.Marker().setLngLat(lngLat).addTo(this.#map);
	}

	getLines(): mapboxgl.Layer[] {
		return [];
	}
}

export default Mapbox;
