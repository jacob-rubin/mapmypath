<script lang="ts">
	import { fly } from 'svelte/transition';
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	import { mapState } from '$lib/shared/mapState/mapState.svelte';
	import { linear } from 'svelte/easing';
	import SidebarButton from './SidebarButton.svelte';
	import {
		SidebarTransitionState,
		TransitionState
	} from './SidebarTransitionState.svelte';

	let sidebar: HTMLDivElement | null = $state(null);
	let sidebarState: SidebarTransitionState = $state(
		new SidebarTransitionState()
	);
	let mapSize: number = $derived(mapState.getMarkers().length);

	$effect(() => {
		if (sidebar && mapSize > 0) {
			sidebar.scrollTo({
				top: sidebar.scrollHeight
			});
		}
	});

	$effect(() => {
		console.log('Transition State:', sidebarState.state);
	});

	function toggleSidebar() {
		if (sidebarState.isOpen()) {
			sidebarState.state = TransitionState.Closing;
		} else {
			sidebarState.state = TransitionState.Opening;
		}
	}
</script>

{#if sidebarState.isOpen()}
	<div
		class="flex h-screen items-center py-2"
		transition:fly={{
			x: '-20rem',
			opacity: 100,
			easing: linear,
			duration: 300
		}}
		onintrostart={() =>
			(sidebarState.state = TransitionState.Opening)}
		onintroend={() => (sidebarState.state = TransitionState.Open)}
		onoutrostart={() =>
			(sidebarState.state = TransitionState.Closing)}
		onoutroend={() => (sidebarState.state = TransitionState.Closed)}
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
		<SidebarButton isOpen={true} onClick={toggleSidebar} />
	</div>
{/if}

{#if sidebarState.isClosed()}
	<div class="flex h-screen items-center">
		<div class="invisible h-full"></div>
		<SidebarButton isOpen={false} onClick={toggleSidebar} />
	</div>
{/if}
