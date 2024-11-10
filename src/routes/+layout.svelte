<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '../app.css';
	let {children} = $props();
</script>

<div class="main-container max-w-screen flex h-screen max-h-screen flex-col gap-4 overflow-y-hidden p-4">
	<Header />

	<main class="h-full border-4 border-white p-6">
		{@render children()}
	</main>
</div>
