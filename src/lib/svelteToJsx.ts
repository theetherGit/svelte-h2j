import { toReactElement } from './toReactElement.js';
import { SvelteComponent } from 'svelte';
import {render} from "svelte/server"
import type { VNode, ComponentToJsxOptions } from '$lib/types.js';

export function svelteComponentToJsx(component: typeof SvelteComponent, { props = {} , style: componentStyle = '' }: ComponentToJsxOptions): VNode {
	const { body } = render(component, { props });
	return toReactElement(`${body}${componentStyle}`);
}
