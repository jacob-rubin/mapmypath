<script lang="ts">
	import Fragment from '../../Fragment.svelte';
	import ContextPropChild from './ContextPropChild.svelte';

	interface Props {
		context?: Record<string, unknown>;
	}

	let { context }: Props = $props();

	console.log(
		'Context pass as prop to FragmentWithContextProp: ',
		context
	);
</script>

<Fragment {context}>
	<ContextPropChild></ContextPropChild>
</Fragment>
