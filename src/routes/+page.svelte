<script>
	import {toReactElement} from "$lib";
	import JSONTree from 'svelte-json-tree';

	const text = 'Ready to dive in?';
	const spanText = 'Start your free trial today.';
	const htmlString = `<div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
                <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                    <span>${text}</span>
                    <span tw="text-indigo-600">${spanText}</span>
                </h2>
                <div tw="mt-8 flex md:mt-0">
                    <div tw="flex rounded-md shadow">
                        <a
                        tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                        >Get started</a
                        >
                    </div>
                    <div tw="ml-3 flex rounded-md shadow">
                        <a
                        tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
                        >Learn more</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>`
</script>

<div class="flex flex-col h-screen w-full my-10 space-y-4">
	<h1 class="text-3xl lg:text-6xl font-bold mx-auto">HTML to React Element</h1>
	<p class="mx-auto">This page shows a demo with `tw` (supported by satori). Which is mainly used for an alternative to class but for tailwindcss</p>
	<div class="flex flex-col mx-auto gap-y-24">
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
