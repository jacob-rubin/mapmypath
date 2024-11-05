import { expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { screen } from '@testing-library/svelte';
import Map from './Map.svelte';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom/matchers';

test('it should render the map', async () => {
	const map = render(Map);
	expect(map.getByTestId('map')).toBeDefined();
});

// Test: it should fill the whole screen
test('it should fill the whole screen', async () => {
	render(Map);
	// set screen width/height
	window.innerWidth = 1920;
	window.innerHeight = 1080;

	// trigger resize event
	window.dispatchEvent(new Event('resize'));

	// check if map is full screen
	const map = screen.getByTestId('map');
	const screenWidth = window.visualViewport?.width;
	const screenHeight = window.visualViewport?.height;

	expect(map).toHaveStyle({
		width: screenWidth,
		height: screenHeight
	});
});

test('it matches the snapshot', async () => {
	const { container } = render(Map);
	expect(container).toMatchSnapshot();
});
