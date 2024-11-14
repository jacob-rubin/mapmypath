<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import SearchBox from '$lib/components/SearchBox/SearchBox.svelte';
</script>

<div>
	<Map />
	<div class="absolute left-0 top-0 p-2">
		<SearchBox />
	</div>
</div>
