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
		<div class="card h-full w-72 bg-neutral-content">
			<button class="btn btn-ghost" on:click={toggleSidebar}>
				<MdiMenu class="text-neutral" />
			</button>
		</div>
	{:else}
		<div class="card h-full w-min bg-neutral-content">
			<button class="btn btn-ghost" on:click={toggleSidebar}>
				<MdiMenu class="text-neutral" />
			</button>
		</div>
	{/if}
</div>
