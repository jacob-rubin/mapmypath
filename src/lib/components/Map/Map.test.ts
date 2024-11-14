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

test('it should fill the whole screen', async () => {
	render(Map);

	const map = screen.getByTestId('map');

	const { width, height } = map.getBoundingClientRect();
	expect(width).toBe(window.innerWidth);
	expect(height).toBe(window.innerHeight);
});

// TODO: Get snapshot testing work
