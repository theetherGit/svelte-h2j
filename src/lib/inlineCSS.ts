import type { Style } from 'svelte/types/compiler/interfaces';

// Future plans
// 1. Add support for "TypeSelector"
// 2. Add support for "NestedCss"
// 3. Make it better if possible
export function extractStyles(cssAst: Style) {
	const styles: Record<string, string> = {};
	if (Object.hasOwn(cssAst, 'children') && cssAst.children.length) {
		for (const { prelude, block } of cssAst.children) {
			if (prelude && prelude.children && prelude.children.length > 0) {
				for (const selector of prelude.children) {
					const classNames = selector.children
						.filter((node: any) => node.type === 'ClassSelector')
						.map((node: any) => node.name);
					for (const className of classNames) {
						styles[className] = block.children
							.map((declaration: Record<string, any>) => {
								return `${declaration.property}: ${declaration.value}`;
							})
							.join('; ') + ';';
					}
				}
			}
		}
	}
	return styles;
}
