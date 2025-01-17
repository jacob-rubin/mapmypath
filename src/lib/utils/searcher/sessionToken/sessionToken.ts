import { v4 as uuidv4 } from 'uuid';

class SessionToken {
	#id: string;

	constructor() {
		this.#id = uuidv4();
	}

	get id(): string {
		return this.#id;
	}

	generate(): void {
		this.#id = uuidv4();
	}
}

export default SessionToken;
