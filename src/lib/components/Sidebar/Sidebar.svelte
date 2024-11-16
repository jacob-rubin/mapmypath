<script lang="ts">
	import MdiMenu from '~icons/mdi/menu';
	import { slide, fly } from 'svelte/transition';

	let isOpen: boolean = true;

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

<div class="h-screen p-2">
	{#if isOpen}
		<div class="card h-full w-72 bg-neutral text-neutral-content">
			<button class="btn btn-ghost" on:click={toggleSidebar}>
				<MdiMenu class="text-white" />
			</button>
		</div>
	{:else}
		<div class="card h-full w-min bg-neutral text-neutral-content">
			<button class="btn btn-ghost" on:click={toggleSidebar}>
				<MdiMenu class="text-white" />
			</button>
		</div>
	{/if}
</div>

<!-- {#snippet cardBody(width: string)}
	<div class="w-{width}" transition:slide={{ axis: 'x' }}></div>
{/snippet}

<div class="card h-full bg-neutral text-neutral-content">
	<button class="btn btn-ghost" on:click={toggleSidebar}>
		<MdiMenu class="text-white" />
	</button>

	<div class="card-body">
		{#if isOpen}
			{@render cardBody('72')}
		{:else}
			{@render cardBody('min')}
		{/if}
	</div>
</div> -->
