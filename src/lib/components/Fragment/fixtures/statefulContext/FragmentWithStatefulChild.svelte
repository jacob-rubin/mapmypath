<script lang="ts">
	import { onMount } from 'svelte';
	import Fragment from '../../Fragment.svelte';
	import StatefulChild from './StatefulChild.svelte';

	let count: number = $state(0);

	onMount(() => {
		count++; // Should increment in the child component
		count++; // Should increment in the child component
		count++; // Should increment in the child component
		console.log('Onmount called');
		console.log('Count: ', count);
	});
	// Verifies that changes to stateful context in onmount in the parent component are reflected in the child component
</script>

<Fragment context={{ count: count }}>
	<StatefulChild></StatefulChild>
</Fragment>
