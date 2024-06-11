<script>
	import {toReactElement} from "$lib";
	import JSONTree from 'svelte-json-tree';

	const htmlString = `<div class="cool">Hello world</div>
      <style>
        .cool {
          color: red;
        }
      </style>`
</script>


<div class="flex flex-col h-screen w-full my-10">
	<h1 class="text-3xl lg:text-6xl font-bold mx-auto">HTML to React Element with Inline CSS</h1>
	<div class="flex flex-col mx-auto gap-y-24 mt-5">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">HTML</h2>
			<pre class="text-lg">{htmlString}</pre>
		</div>
		<div class="space-y-4 mb-5">
			<h2 class="text-3xl font-bold">JSX</h2>
			<JSONTree value={toReactElement(htmlString)} defaultExpandedLevel="20"/>
		</div>
	</div>
</div>