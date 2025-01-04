<script lang="ts">
	import Fragment from '../../Fragment.svelte';
	import TextChild from './TextChild.svelte';
</script>

<Fragment context={{ text: 'Hello World!' }}>
	<TextChild></TextChild>
</Fragment>
