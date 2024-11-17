<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import SearchBox from '$lib/components/SearchBox/SearchBox.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
</script>

<div>
	<Map />
	<div class="absolute left-0 top-0">
		<Sidebar />
	</div>
	<div class="absolute right-0 top-0 p-2">
		<SearchBox />
	</div>
</div>
