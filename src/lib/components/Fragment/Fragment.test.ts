import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import FragmentWithTextChild from './fixtures/textContext/FragmentWithTextChild.svelte';
import FragmentWithObjectChild from './fixtures/objectContext/FragmentWithObjectChild.svelte';
import FragmentWithContextProp from './fixtures/contextProp/FragmentWithContextProp.svelte';

describe('Fragment', async () => {
	afterEach(() => {
		cleanup();
	});

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

	it('renders a child when context passed as a prop', async () => {
		const context: Record<string, string> = {
			text: 'Hello World!'
		};

		const screen = render(FragmentWithContextProp, {
			props: {
				context: context
			}
		});

		expect(screen.baseElement.innerHTML).toContain('Hello World!');
	});

	it('renders a child when context passed as a prop', async () => {
		const context: Record<string, string> = {
			text: 'Hello World!'
		};

		const screen = render(FragmentWithContextProp, {
			props: {
				context: context
			}
		});

		expect(screen.baseElement.innerHTML).toContain('Hello World!');
	});
});
