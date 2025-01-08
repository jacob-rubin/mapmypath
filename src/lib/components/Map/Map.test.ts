import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { cleanup, getByRole, render } from '@testing-library/svelte';
import Map from './Map.svelte';

describe('Map', async () => {
	afterEach(() => {
		cleanup();
	});

	it('matches the snapshot', async () => {
		const screen = render(Map);

		expect(screen).toMatchSnapshot();
	});

	it('renders the map', async () => {
		const screen = render(Map);

		expect(screen.getByTestId('map')).toBeDefined();
	});

	it('fills the whole height of the screen', async () => {
		const screen = render(Map);

		const map: HTMLElement = screen.getByTestId('map');
		const height: number = map.getBoundingClientRect().height;

		expect(height).toBe(window.innerHeight);
	});

	it('fills the whole width of the screen', async () => {
		const screen = render(Map);

		const map: HTMLElement = screen.getByTestId('map');
		const width: number = map.getBoundingClientRect().width;

		expect(width).toBe(window.innerWidth);
	});

	it('adds a marker when the map is clicked', async () => {
		const screen = render(Map);

		// TODO: Fix waiting for map to load
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const mapRegion: HTMLElement = getByRole(
			screen.baseElement,
			'region'
		);

		mapRegion.click();

		const marker: HTMLElement = screen.getByLabelText('Map marker', {
			exact: true
		});

		expect(marker).toBeDefined();
	});

	it('drags a marker', async () => {
		const user = userEvent.setup();
		const screen = render(Map);

		// TODO: Fix waiting for map to load
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const mapRegion: HTMLElement = getByRole(
			screen.baseElement,
			'region'
		);
		mapRegion.click();

		const marker: HTMLElement = screen.getByLabelText('Map marker', {
			exact: true
		});
		const oldPosition = marker.getBoundingClientRect();

		await user.pointer([
			{
				keys: '[MouseLeft>]',
				target: marker
			},
			{
				coords: { x: 100, y: 100 }
			},
			{ keys: '[/MouseLeft]' }
		]);

		const newPosition = marker.getBoundingClientRect();

		expect(oldPosition.x).not.toEqual(newPosition.x);
		expect(oldPosition.y).not.toEqual(newPosition.y);
	});
});

// TODO: Get snapshot testing work
