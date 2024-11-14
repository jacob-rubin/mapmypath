import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { fireEvent, screen } from '@testing-library/svelte';
import Map from './Map.svelte';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom/matchers';

test('it should render the map', async () => {
	const map = render(Map);
	expect(map.getByTestId('map')).toBeDefined();
});

test('it should fill the whole screen', async () => {
	render(Map);

	const map = screen.getByTestId('map');

	const { width, height } = map.getBoundingClientRect();
	expect(width).toBe(window.innerWidth);
	expect(height).toBe(window.innerHeight);
});

test('it should add a marker when the map is clicked', async () => {
	const { container } = render(Map);

	// Simulate a click event on the map
	const mapContainer = container.querySelector('.map-container');
	if (mapContainer) {
		const clickEvent = new MouseEvent('click', {
			clientX: 100,
			clientY: 100,
			bubbles: true,
			cancelable: false
		});
		await fireEvent(mapContainer, clickEvent);

		// Check if a marker element is added to the map
		const marker = container.querySelector('.mapboxgl-marker')!;
		expect(marker).toBeInTheDocument();

		// Check if the marker is at the correct position
		const markerPosition = marker.getBoundingClientRect();
		expect(markerPosition.left).toBeCloseTo(clickEvent.clientX, 1);
		expect(markerPosition.top).toBeCloseTo(clickEvent.clientY, 1);
	}
});

// TODO: Get snapshot testing work
