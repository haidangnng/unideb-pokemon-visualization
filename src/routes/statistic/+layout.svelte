<script lang="ts">
	import Sidebar from '@/components/statistic/sidebar.svelte';

	let {children} = $props();
</script>

<div class="flex h-full gap-4 p-4">
	<Sidebar />

	<div class="h-full w-full bg-white p-4">
		{@render children()}
	</div>
</div>
