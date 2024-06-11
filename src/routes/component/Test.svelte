<script>
	const text = 'Ready to dive in?';
	const spanText = 'Start your free trial today.';
</script>

<div tw="flex flex-col w-full h-full items-center justify-center bg-white">
	<div tw="bg-gray-50 flex w-full">
		<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
			<h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
				<span>{text}</span>
				<span tw="text-indigo-600">{spanText}</span>
			</h2>
			<div tw="mt-8 flex md:mt-0">
				<div tw="flex rounded-md shadow">
					<button
						tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
					>Get started</button
					>
				</div>
				<div tw="ml-3 flex rounded-md shadow">
					<button class="cool test"
						tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600"
					>Learn more</button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.cool {
			color: red;
			background: white;
	}
</style>