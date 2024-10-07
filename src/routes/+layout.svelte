<script lang="ts">
	import '../app.css';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';

	import {Button} from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
</script>

<div class="flex min-h-screen w-full flex-col">
	<header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 justify-center">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
			<a href="/pokemon" class="text-foreground hover:text-foreground transition-colors">Pokemons</a>

			<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<img src="/logo.png" width="100px" alt="Pokemon logo" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<a href="/item" class="text-muted-foreground hover:text-foreground transition-colors">
				Items
			</a>
		</nav>

		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="##" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="h-6 w-6" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="##" class="hover:text-foreground"> Dashboard </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Orders </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Products </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Customers </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Analytics </a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</header>

	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-screen">
		<!-- <Breadcrumb.Root class="hidden md:flex"> -->
		<!-- 	<Breadcrumb.List> -->
		<!-- 		<Breadcrumb.Item> -->
		<!-- 			<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link> -->
		<!-- 		</Breadcrumb.Item> -->
		<!-- 		<Breadcrumb.Separator /> -->
		<!-- 		<Breadcrumb.Item> -->
		<!-- 			<Breadcrumb.Link href="/pokemon">Pokemon</Breadcrumb.Link> -->
		<!-- 		</Breadcrumb.Item> -->
		<!-- 		<Breadcrumb.Separator /> -->
		<!-- 		<Breadcrumb.Item> -->
		<!-- 			<Breadcrumb.Page>All Products</Breadcrumb.Page> -->
		<!-- 		</Breadcrumb.Item> -->
		<!-- 	</Breadcrumb.List> -->
		<!-- </Breadcrumb.Root> -->

		<slot />
	</main>
</div>
