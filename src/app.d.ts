// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import 'vite/client';
import 'unplugin-icons/types/svelte';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// svelte-dnd-action types
declare type Item = import('svelte-dnd-action').Item;
declare type DndEvent<ItemType = Item> =
	import('svelte-dnd-action').DndEvent<ItemType>;
declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:consider'?: (
			event: CustomEvent<DndEvent<ItemType>> & {
				target: EventTarget & T;
			}
		) => void;
		'on:finalize'?: (
			event: CustomEvent<DndEvent<ItemType>> & {
				target: EventTarget & T;
			}
		) => void;
	}
}

export {};
