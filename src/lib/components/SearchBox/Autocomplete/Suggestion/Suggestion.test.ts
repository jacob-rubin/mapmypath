import { cleanup, render } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockSuggestions } from '$lib/utils/searcher/mocks/mockSuggestions';
import userEvent, {
	type UserEvent
} from '@testing-library/user-event';
import Mapbox from '$lib/utils/mapbox/mapbox';
import { MapState } from '$lib/state/mapState/mapState.svelte';
import Searcher from '$lib/utils/searcher/searcher.svelte';
import SuggestionFixture from '../../fixtures/SuggestionFixture.svelte';

function renderMap(): Mapbox {
	const mapElement: HTMLElement = document.createElement('div');
	mapElement.innerHTML = `<div id="map" class="h-80 w-80"></div`;
	document.body.appendChild(mapElement);

	const map: Mapbox = new Mapbox(mapElement);
	return map;
}

describe('Suggestion', async () => {
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
		map.remove();
		cleanup();
	});

	it('displays the name and location of the search result', async () => {
		const screen = render(SuggestionFixture, {
			props: {
				context: {
					mapState: mapState,
					searcher: searcher
				},
				suggestion: mockSuggestions.suggestions[0]
			}
		});

		expect(screen.getByText('Michigan Stadium')).toBeInTheDocument();
		expect(
			screen.getByText(
				'Ann Arbor, Michigan 48104, United States of America'
			)
		).toBeInTheDocument();
	});

	it('darkens the background when the suggestion is hovered', async () => {
		const user: UserEvent = userEvent.setup();

		const screen = render(SuggestionFixture, {
			props: {
				context: {
					mapState: mapState,
					searcher: searcher
				},
				suggestion: mockSuggestions.suggestions[0]
			}
		});

		const suggestion = screen.getByRole('button');

		console.log('suggestion: ', suggestion);
		expect(suggestion).not.toHaveClass('bg-gray-300');
		await user.hover(suggestion);
		expect(suggestion).toHaveClass('bg-gray-300');
	});
});
