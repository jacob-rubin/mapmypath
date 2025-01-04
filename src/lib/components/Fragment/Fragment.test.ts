import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import FragmentWithTextChild from './fixtures/textContext/FragmentWithTextChild.svelte';
import FragmentWithObjectChild from './fixtures/objectContext/FragmentWithObjectChild.svelte';

describe('Fragment', async () => {
	it('Renders a child with text from getContext', async () => {
		const screen = render(FragmentWithTextChild);

		expect(screen.baseElement.innerHTML).toContain('Hello World!');
	});

	it('renders a child with an object from getContext', async () => {
		const screen = render(FragmentWithObjectChild);

		expect(screen.baseElement.innerHTML).toContain('Ranking: 1');
		expect(screen.baseElement.innerHTML).toContain(
			'Text: Hello World!'
		);
	});
});
