import { toReactElement } from './toReactElement.js';
import { type SvelteComponent } from 'svelte';
import {render} from "svelte/server"

type ComponentToJsxOptions = {
	props?: Record<string, any>
	style?: string // Inline CSS: Svelte has removed css from component render output
}
export async function svelteComponentToJsx(component: SvelteComponent, { props = {} , style: componentStyle = '' }: ComponentToJsxOptions) {
	const { body } = render(component as any, { props });
	return toReactElement(`${body}${componentStyle}`);
}
