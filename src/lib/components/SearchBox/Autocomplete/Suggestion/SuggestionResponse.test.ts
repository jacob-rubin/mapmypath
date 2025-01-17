import { MapState } from '$lib/state/mapState/mapState.svelte';
import { mockGeocodeSuccessJSON } from '$lib/utils/geocode/mocks/mockJSON';
import Mapbox from '$lib/utils/mapbox/mapbox';
import { mockFeature } from '$lib/utils/searcher/mocks/mockFeature';
import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';
import Searcher from '$lib/utils/searcher/searcher.svelte';
import { cleanup, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import SuggestionFixture from '../../fixtures/SuggestionFixture.svelte';
import mapboxgl from 'mapbox-gl';

function renderMap(): Mapbox {
	const mapElement: HTMLElement = document.createElement('div');
	mapElement.innerHTML = `<div id="map" class="h-80 w-80"></div`;
	document.body.appendChild(mapElement);

	const map: Mapbox = new Mapbox(mapElement);
	return map;
}

describe('Suggestion Response', () => {
	const fetchMocker = createFetchMock(vi);
	let map: Mapbox;
	let mapState: MapState;
	let searcher: Searcher;

	beforeEach(async () => {
		fetchMocker.doMockIf(
			/^https?:\/\/api.mapbox.com\/search\/searchbox\/v1\/retrieve.*$/,
			(req) => {
				console.log(`req: ${req}`);
				return {
					status: 200,
					json: mockFeature,
					body: JSON.stringify(mockFeature),
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				};
			}
		);

		fetchMocker.doMockIf(
			/^https?:\/\/api.mapbox.com\/search\/geocode\/v6\/reverse.*$/,
			(req) => {
				console.log(`req: ${req}`);
				return {
					status: 200,
					json: mockGeocodeSuccessJSON,
					body: JSON.stringify(mockGeocodeSuccessJSON),
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				};
			}
		);

		fetchMocker.enableMocks();

		map = renderMap();
		mapState = new MapState(map);
		searcher = new Searcher();
		await map.awaitLoad();
		await map.initializeStyles();
	});

	afterEach(() => {
		fetchMocker.disableMocks();
		map.remove();
		cleanup();
	});

	it.todo(
		'sends a retrieve request when the suggestion is clicked',
		async () => {
			const user = userEvent.setup();

			const screen = render(SuggestionFixture, {
				props: {
					suggestion: mockSuggestions.suggestions[0],
					context: {
						mapState: mapState,
						searcher: searcher
					}
				}
			});

			await user.click(screen.getByRole('button'));

			const requests: Request[] = fetchMocker.requests();

			expect(requests[0].url).toMatch(
				/^https?:\/\/api.mapbox.com\/search\/searchbox\/v1\/retrieve.*$/
			);
		}
	);

	it.todo(
		'flys to the location when suggestion is clicked',
		async () => {
			const user = userEvent.setup();

			const screen = render(SuggestionFixture, {
				props: {
					suggestion: mockSuggestions.suggestions[0],
					context: {
						mapState: mapState,
						searcher: searcher
					}
				}
			});

			await user.click(screen.getByRole('button'));
			await new Promise((resolve) => setTimeout(resolve, 10000));

			const featureCoordinates: mapboxgl.LngLat =
				mapboxgl.LngLat.convert(
					mockFeature.features[0].geometry.coordinates
				);
			expect(featureCoordinates).toEqual(mapState.map.getCenter());
		}
	);

	it.todo('adds marker when suggestion is clicked', async () => {
		const user = userEvent.setup();

		const screen = render(SuggestionFixture, {
			props: {
				suggestion: mockSuggestions.suggestions[0],
				context: {
					mapState: mapState,
					searcher: searcher
				}
			}
		});

		await user.click(screen.getByRole('button'));

		expect(mapState.markers).toHaveLength(1);
	});
});
