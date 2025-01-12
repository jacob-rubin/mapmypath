<script lang="ts">
	import type { Suggestion } from '$lib/utils/searcher/types/types';

	interface Props {
		suggestion: Suggestion;
	}

	let { suggestion }: Props = $props();
	let isHovering: boolean = $state(false);

	const setHover = (hover: boolean) => () => {
		isHovering = hover;
	};
</script>

<li>
	<button
		onclick={() => console.log('retrieve')}
		onmouseenter={setHover(true)}
		onmouseleave={setHover(false)}
		class="flex w-full flex-col justify-start justify-items-start rounded-btn p-2"
		class:bg-gray-300={isHovering}
	>
		<p class="text-ellipsis text-base">
			{suggestion.name}
		</p>
		<p class="text-ellipsis text-xs">
			{suggestion.place_formatted}
		</p>
	</button>
</li>
