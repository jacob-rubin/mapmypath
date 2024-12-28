import { describe, expect, it } from 'vitest';
import {
	SidebarTransitionState,
	TransitionState
} from './SidebarTransitionState.svelte';

describe('SidebarTransitionState', async () => {
	it('Starts as open', async () => {
		const sidebarTransitionState: SidebarTransitionState =
			new SidebarTransitionState();

		expect(sidebarTransitionState.state).toBe(TransitionState.Open);
	});

	it('Sets the state to closed', async () => {
		const sidebarTransitionState: SidebarTransitionState =
			new SidebarTransitionState();

		sidebarTransitionState.state = TransitionState.Closed;

		expect(sidebarTransitionState.state).toBe(TransitionState.Closed);
	});

	it('isOpen returns true if open or opening state', async () => {
		const sidebarTransitionState: SidebarTransitionState =
			new SidebarTransitionState();

		sidebarTransitionState.state = TransitionState.Opening;
		expect(sidebarTransitionState.isOpen()).toBe(true);
		sidebarTransitionState.state = TransitionState.Open;
		expect(sidebarTransitionState.isOpen()).toBe(true);
	});

	it('isClosed returns true if closed or closing state', async () => {
		const sidebarTransitionState: SidebarTransitionState =
			new SidebarTransitionState();

		sidebarTransitionState.state = TransitionState.Closing;
		expect(sidebarTransitionState.isClosed()).toBe(true);
		sidebarTransitionState.state = TransitionState.Closed;
		expect(sidebarTransitionState.isClosed()).toBe(true);
	});
});
