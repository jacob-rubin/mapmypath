import { beforeEach, describe, expect, it } from 'vitest';
import {
	SidebarTransitionState,
	TransitionState
} from './sidebarTransitionState.svelte';

describe('SidebarTransitionState', async () => {
	let sidebarTransitionState: SidebarTransitionState;

	beforeEach(() => {
		sidebarTransitionState = new SidebarTransitionState();
	});

	it('Starts as open', async () => {
		expect(sidebarTransitionState.state).toBe(TransitionState.Open);
	});

	it('Sets the state to closing when outro started', async () => {
		sidebarTransitionState.onOutroStart();

		expect(sidebarTransitionState.state).toBe(
			TransitionState.Closing
		);
	});

	it('Sets the state to closed when outro ends', async () => {
		sidebarTransitionState.onOutroEnd();

		expect(sidebarTransitionState.state).toBe(TransitionState.Closed);
	});

	it('Sets the state to opening when intro started', async () => {
		sidebarTransitionState.onIntroStart();

		expect(sidebarTransitionState.state).toBe(
			TransitionState.Opening
		);
	});

	it('Sets the state to open when intro ended', async () => {
		sidebarTransitionState.onIntroEnd();

		expect(sidebarTransitionState.state).toBe(TransitionState.Open);
	});

	it('isVisible returns true if open or opening state', async () => {
		sidebarTransitionState.onIntroStart();
		expect(sidebarTransitionState.isVisible()).toBe(true);
		sidebarTransitionState.onIntroEnd();
		expect(sidebarTransitionState.isVisible()).toBe(true);
	});

	it('isClosed returns true if closed state', async () => {
		sidebarTransitionState.onOutroEnd();
		expect(sidebarTransitionState.isClosed()).toBe(true);
	});
});
