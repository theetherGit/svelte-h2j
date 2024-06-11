import Test from "./Test.svelte"
import { svelteComponentToJsx } from "$lib"

const componentStyles = `
<style>
 .cool {
   color: red;
   background: white;
 }
 .test {
 	background: green;
 }
</style>
`
export const load = async () => {
	return {
		reactElement: await svelteComponentToJsx(Test, {
			style: componentStyles
		})
	}
}