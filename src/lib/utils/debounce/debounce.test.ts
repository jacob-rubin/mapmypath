import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi
} from 'vitest';
import debounce from './debounce';

describe('debounce', async () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.restoreAllMocks();
	});

	it('calls the function', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledOnce();
	});

	it('only calls the function once after multiple calls wihtin the buffer', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		debouncedFn();
		debouncedFn();
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledOnce();
	});
});
