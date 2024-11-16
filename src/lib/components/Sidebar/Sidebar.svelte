<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';
	import { slide, fly } from 'svelte/transition';

	let isOpen: boolean = true;

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

{#snippet card(width: string)}
	<div data-testid="sidebar" class="card h-full {width} bg-neutral-content">
		<button data-testid="sidebar-button" class="btn btn-ghost" onclick={toggleSidebar}>
			<MdiMenu class="text-neutral" />
		</button>
	</div>
{/snippet}

<div data-testid="sidebar-div" class="h-screen p-2">
	{#if isOpen}
		{@render card('w-72')}
	{:else}
		{@render card('w-min')}
	{/if}
</div>
