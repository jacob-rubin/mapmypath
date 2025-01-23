<script lang="ts">
	import { fly } from 'svelte/transition';
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	import { linear } from 'svelte/easing';
	import SidebarButton from './SidebarButton/SidebarButton.svelte';
	import { SidebarTransitionState } from './SidebarTransition/sidebarTransitionState.svelte';
	import type { MapState } from '$lib/state/mapState/mapState.svelte';
	import { getMapStateContext } from '../Map/utils/mapStateContext';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import type Marker from '$lib/utils/marker/marker.svelte';
	import { flip } from 'svelte/animate';

	const FLIP_DURATION = 100;

	const mapState: MapState = getMapStateContext();

	let sidebar: HTMLElement | null = $state(null);
	let sidebarTransitionState: SidebarTransitionState =
		new SidebarTransitionState();
	let mapSize: number = $derived(mapState.markers.length);

	$effect(() => {
		if (sidebar && mapSize > 0) {
			sidebar.scrollTo({
				top: sidebar.scrollHeight
			});
		}
	});

	const onconsider = (event: CustomEvent<DndEvent<Marker>>) => {
		mapState.markers = event.detail.items;
	};
	const onfinalize = (event: CustomEvent<DndEvent<Marker>>) => {
		mapState.markers = event.detail.items;
		mapState.map.renderPath(mapState.markers.map((m) => m.lngLat));
	};
</script>

{#if sidebarTransitionState.isVisible()}
	<div
		class="flex h-screen items-center py-2"
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
		<section
			bind:this={sidebar}
			data-testid={'sidebar'}
			class="card card-normal h-full w-80 overflow-auto rounded-btn bg-neutral-content p-2"
			use:dndzone={{
				items: mapState.markers,
				flipDurationMs: FLIP_DURATION
			}}
			{onconsider}
			{onfinalize}
		>
			{#each mapState.markers as marker (marker.id)}
				<div animate:flip={{ duration: FLIP_DURATION }}>
					<SidebarItem {marker} />
				</div>
			{/each}
		</section>
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
