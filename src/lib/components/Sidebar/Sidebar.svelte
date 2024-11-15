<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';
	import { slide } from 'svelte/transition';

	let isOpen: boolean = true;

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

{#snippet cardBody(width: string)}
	<div class="w-{width}" transition:slide={{ axis: 'x' }}></div>
{/snippet}

<div class="card h-full bg-slate-200">
	<button class="btn btn-square" on:click={toggleSidebar}>
		<MdiMenu class="text-white" />
	</button>

	{#if isOpen}
		{@render cardBody('72')}
	{:else}
		{@render cardBody('min')}
	{/if}
</div>
