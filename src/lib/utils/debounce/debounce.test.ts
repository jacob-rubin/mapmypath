import { describe, expect, it, vi } from 'vitest';
import debounce from './debounce';
import { waitFor } from '@testing-library/svelte';

describe('debounce', async () => {
	it('calls the function', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();

		await waitFor(() => {
			expect(fn).toHaveBeenCalledOnce();
		});
	});

	it('only calls the function once after multiple calls wihtin the buffer', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		debouncedFn();
		debouncedFn();

		await new Promise((resolve) => setTimeout(resolve, 500));

		expect(fn).toHaveBeenCalledOnce();
		expect(fn).not.toHaveBeenCalledTimes(3);
	});
});
