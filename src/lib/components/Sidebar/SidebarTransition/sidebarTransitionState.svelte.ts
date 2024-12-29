export enum TransitionState {
	Closing = 'Closing',
	Closed = 'Closed',
	Opening = 'Opening',
	Open = 'Open'
}

export class SidebarTransitionState {
	_state: TransitionState = $state(TransitionState.Open);

	get state() {
		return this._state;
	}

	isVisible(): boolean {
		return (
			this._state === TransitionState.Open ||
			this._state === TransitionState.Opening
		);
	}

	isClosed(): boolean {
		return this._state === TransitionState.Closed;
	}

	onOutroStart() {
		this._state = TransitionState.Closing;
	}

	onOutroEnd() {
		this._state = TransitionState.Closed;
	}

	onIntroStart() {
		this._state = TransitionState.Opening;
	}

	onIntroEnd() {
		this._state = TransitionState.Open;
	}
}
