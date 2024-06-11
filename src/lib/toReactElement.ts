import { parse } from 'svelte/compiler';
import { walk } from "estree-walker"
import type { Ast } from 'svelte/types/compiler/interfaces';
import { extractStyles } from './inlineCSS.js';
import type { VNode } from './types.js';

/* Start of code from satori-html for cssToObject converter*/
const camelize = (ident: string) => ident.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
const cssToObject = (str: string) => {
	const obj: Record<string, string> = {};
	let t = 0;
	let pair = ['', ''];
	const flags: Record<string, number> = { '(': 0, ')': 0 };
	for (const c of str) {
		if (!flags['('] && c === ':') {
			t = 1;
		} else if (c === ';') {
			const [decl = '', value = ''] = pair;
			obj[camelize(decl.trim())] = value.trim();
			t = 0;
			pair = ['', ''];
		} else {
			pair[t] += c;
			switch (c) {
				case '(': {
					flags[c]++;
					break;
				}
				case ')': {
					flags['(']--;
					break;
				}
			}
		}
	}
	const [decl = '', value = ''] = pair;
	if (decl.trim() && value.trim()) {
		obj[camelize(decl.trim())] = value.trim();
	}

	return obj;
};
const nodeMap = new WeakMap();

const root: VNode = {
	type: 'div',
	props: {
		style: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%'
		},
		children: []
	}
};
/* End of satori-html */

function toReactElement(htmlString: string): VNode {
	const svelteAST: Ast = parse(htmlString);
	let styles: Record<string, string> = {};
	if (svelteAST && svelteAST.css) {
		styles = extractStyles(svelteAST.css);
	}

	walk(svelteAST as any, {
		enter(node: any, parent: any, prop: any, index: any) {
			let newNode: any = {};
			if (node.type === 'Fragment') {
				nodeMap.set(node, root);
			} else if (node.type === 'Element') {
				newNode.type = node.name;
				let { ...props } = node.attributes;
				if (node.attributes.length > 0) {
					let classStyles: string | null = null;
					let styleExists = false;
					node.attributes.forEach((attribute: any) => {
						if (Object.keys(styles).length && attribute.name === 'class') {
							// Remove classes added by svelte
							const originalClasses = attribute.value[0].data.split(' ').filter((className: string) => !className.startsWith('svelte'))

							classStyles = originalClasses.reduce((joinedStyles: string, className: string) => {
								const classStyle = styles[className];
								if (classStyle) joinedStyles += classStyle;
								return joinedStyles;
							}, '');
						}

						if (attribute.name === 'style') {
							styleExists = true;
							const newRawStyle = classStyles
								? attribute.value[0].data + '; ' + classStyles
								: attribute.value[0].data;
							props['style'] = cssToObject(newRawStyle) as any;
						} else {
							props[attribute.name] = attribute.value[0].data as any;
						}
					});
					if (Object.keys(styles).length && !styleExists && classStyles) {
						props['style'] = cssToObject(classStyles);
					}
					delete props[0];
				}
				// numbered props failing on svgs
				props = Object.entries(props).reduce((newProps: any, [key, value]) => {
					if (Number.isNaN(Number(key))) {
						newProps[key] = value as any;
					}
					return newProps;
				}, {});
				props.children = [] as unknown as string;
				Object.assign(newNode, { props });
				nodeMap.set(node, newNode);
				if (parent) {
					const newParent = nodeMap.get(parent);
					newParent.props.children[index] = newNode;
				}
			} else if (node.type === 'Text') {
				newNode = node.data.trim();
				if (newNode) {
					if (parent && parent.type !== 'Attribute') {
						const newParent = nodeMap.get(parent);
						if (parent.children.length === 1) {
							newParent.props.children = newNode;
						} else {
							newParent.props.children[index] = newNode;
						}
					}
				}
			}
		}
	});

	return root;
}

export { toReactElement };