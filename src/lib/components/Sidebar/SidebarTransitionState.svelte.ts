export enum TransitionState {
	Open = 'Open',
	Closed = 'Closed',
	Opening = 'Opening',
	Closing = 'Closing'
}

export class SidebarTransitionState {
	_state: TransitionState = $state(TransitionState.Open);

	get state() {
		return this._state;
	}

	isOpen(): boolean {
		return (
			this._state === TransitionState.Open ||
			this._state === TransitionState.Opening
		);
	}

	isClosed(): boolean {
		return this._state === TransitionState.Closed;
	}

	set state(value: TransitionState) {
		this._state = value;
	}
}
