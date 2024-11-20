import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Map from './Map.svelte';
import { mapState } from '$lib/shared/mapState.svelte';
import type { Locator } from '@vitest/browser/context';

describe('Map', async () => {
	beforeEach(() => {
		mapState.clear();
	});

	it('renders the map', async () => {
		const screen = render(Map);

		expect(screen.getByTestId('map')).toBeDefined();
	});

	it('fills the whole height of the screen', async () => {
		const screen = render(Map);

		const map: Locator = screen.getByTestId('map');
		const height: number = map.element().getBoundingClientRect().height;

		expect(height).toBe(window.innerHeight);
	});

	it('fills the whole width of the screen', async () => {
		const screen = render(Map);

		const map: Locator = screen.getByTestId('map');
		const width: number = map.element().getBoundingClientRect().width;

		expect(width).toBe(window.innerWidth);
	});

	it('adds a marker when the map is clicked', async () => {
		const screen = render(Map);
		const map: Locator = screen.getByTestId('map');
		await map.click();
		const marker: Locator = screen.getByLabelText('Map marker', { exact: true });

		expect(marker).toBeDefined();
	});

	// When map clicked, it should add element to the markers mapState
	it('adds a marker to the mapState when the map is clicked', async () => {
		const screen = render(Map);
		const map: Locator = screen.getByTestId('map');

		expect(mapState.getMarkers()).toHaveLength(0);
		await map.click();
		expect(mapState.getMarkers()).toHaveLength(1);
	});

	it('connects two markers with a line', async () => {
		const screen = render(Map);

		const map: Locator = screen.getByTestId('map');
		await map.click({ position: { x: 400, y: 4300 } });
		await map.click({ position: { x: 500, y: 500 } });

		const line: Locator | null = screen.getByLabelText('line');
		expect(line.query()).not.toBeNull();
	});
});

// TODO: Get snapshot testing work
