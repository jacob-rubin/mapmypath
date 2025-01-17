import { MapState } from '$lib/state/mapState/mapState.svelte';
import Mapbox from '$lib/utils/mapbox/mapbox';
import { mockFeature } from '$lib/utils/searcher/mocks/mockFeature';
import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';
import Searcher from '$lib/utils/searcher/searcher.svelte';
import { cleanup, getByRole, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
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
	let map: Mapbox;
	let mapState: MapState;
	let searcher: Searcher;

	beforeEach(async () => {
		map = renderMap();
		mapState = new MapState(map);
		searcher = new Searcher();
		await map.awaitLoad();
		await map.initializeStyles();
	});

	afterEach(() => {
		cleanup();
		map.remove();
	});

	it('sends a retrieve request when the suggestion is clicked', async () => {
		const mockFetch = vi.fn().mockResolvedValue(
			new Response(JSON.stringify(mockFeature), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		vi.stubGlobal('fetch', mockFetch);

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

		const listitem = getByRole(screen.baseElement, 'listitem');
		const button = getByRole(listitem, 'button');

		await user.click(button);
		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch.mock.calls[0][0]).toContain(
			'https://api.mapbox.com/search/searchbox/v1/retrieve'
		);

		vi.unstubAllGlobals();
	});

	it('flys to the location when suggestion is clicked', async () => {
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

		const listitem = getByRole(screen.baseElement, 'listitem');
		const button = getByRole(listitem, 'button');

		await user.click(button);
		await new Promise((resolve) => setTimeout(resolve, 10000));

		const featureCoordinates: mapboxgl.LngLat =
			mapboxgl.LngLat.convert(
				mockFeature.features[0].geometry.coordinates
			);
		expect(featureCoordinates.lng).toBeCloseTo(
			mapState.map.getCenter().lng,
			4
		);
		expect(featureCoordinates.lat).toBeCloseTo(
			mapState.map.getCenter().lat,
			4
		);
	});

	it('adds marker when suggestion is clicked', async () => {
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

		const listitem = getByRole(screen.baseElement, 'listitem');
		const button = getByRole(listitem, 'button');

		await user.click(button);
		await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for retrieve request to be sent

		expect(mapState.markers).toHaveLength(1);
	});
});
