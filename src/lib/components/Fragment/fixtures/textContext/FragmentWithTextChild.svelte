<script lang="ts">
	import Fragment from '../../Fragment.svelte';
	import TextChild from './TextChild.svelte';

	const textKey = Symbol('text');
</script>

<Fragment context={{ textKey: 'Hello World!' }}>
	<TextChild></TextChild>
</Fragment>
