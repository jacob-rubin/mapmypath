import debounce from '../debounce/debounce';
import { reverseGeocode } from './utils';

class Geocode {
	#name: Promise<string> = $state(Promise.resolve(''));
	#debounce: (lngLat: mapboxgl.LngLat) => void;

	constructor(name?: string) {
		this.#name = Promise.resolve(name || '');
		this.#debounce = debounce(
			this.#reverseWithDebounce.bind(this),
			200
		);
	}

	async #reverseWithDebounce(lngLat: mapboxgl.LngLat): Promise<void> {
		this.#name = reverseGeocode(lngLat);
	}

	async reverse(lngLat: mapboxgl.LngLat): Promise<void> {
		this.#debounce(lngLat);
	}

	get name(): Promise<string> {
		return this.#name;
	}

	set name(value: Promise<string>) {
		this.#name = value;
	}
}

export default Geocode;
