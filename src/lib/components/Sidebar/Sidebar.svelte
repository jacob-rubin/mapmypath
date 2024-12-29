<script lang="ts">
	import { fly } from 'svelte/transition';
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';
	import { linear } from 'svelte/easing';
	import SidebarButton from './SidebarButton/SidebarButton.svelte';
	import { SidebarTransitionState } from './SidebarTransition/sidebarTransitionState.svelte';

	let sidebar: HTMLDivElement | null = $state(null);
	let sidebarTransitionState: SidebarTransitionState =
		new SidebarTransitionState();
	let mapSize: number = $derived(mapState.getMarkers().length);

	$effect(() => {
		if (sidebar && mapSize > 0) {
			sidebar.scrollTo({
				top: sidebar.scrollHeight
			});
		}
	});

	$effect(() => {
		console.log(
			'sidebarTransitionState',
			sidebarTransitionState.state
		);
	});
</script>

{#if sidebarTransitionState.isVisible()}
	<div
		class="inline-flex h-screen items-center py-2"
		transition:fly={{
			x: '-20rem',
			opacity: 100,
			easing: linear,
			duration: 300
		}}
		onintrostart={() => sidebarTransitionState.onIntroStart()}
		onintroend={() => sidebarTransitionState.onIntroEnd()}
		onoutrostart={() => sidebarTransitionState.onOutroStart()}
		onoutroend={() => sidebarTransitionState.onOutroEnd()}
	>
		<div
			bind:this={sidebar}
			data-testid={'sidebar'}
			class="card card-normal h-full w-80 overflow-auto bg-neutral-content p-2"
		>
			{#each mapState.getMarkers() as marker (marker.id)}
				<SidebarItem {marker} />
			{/each}
		</div>
		<SidebarButton
			isOpen={true}
			onClick={() => sidebarTransitionState.onOutroStart()}
		/>
	</div>
{/if}

{#if sidebarTransitionState.isClosed()}
	<div class="flex h-screen items-center">
		<div class="invisible h-full"></div>
		<SidebarButton
			isOpen={false}
			onClick={() => sidebarTransitionState.onIntroStart()}
		/>
	</div>
{/if}
