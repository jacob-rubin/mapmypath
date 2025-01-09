<script lang="ts">
	import { getMapStateContext } from '../Map/utils/mapStateContext';
	import type { MapState } from '$lib/state/mapState/mapState.svelte';

	const mapState: MapState = getMapStateContext();
</script>

<div class="flex w-full max-w-xs flex-col gap-2">
	<input
		data-testid="search-box"
		type="text"
		placeholder="Search"
		class="input input-bordered"
		id="search"
	/>
	<div
		class="card h-72 rounded-btn bg-base-100 shadow-xl"
		data-testid="search-results"
	></div>
</div>
