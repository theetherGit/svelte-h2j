import { describe, it, expect } from 'vitest';
import { toReactElement } from './lib/toReactElement.js';

const wrap = (...children: any[]) => ({
	type: 'div',
	props: {
		style: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			width: '100%'
		},
		children
	}
});

describe('toReactElement', () => {
	it('works as a simple string', async () => {
		const result = toReactElement(`<div>Hello world</div>`);
		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					children: 'Hello world'
				}
			})
		);
	});

	it('works as a complex tagged template', async () => {
		const result = toReactElement(`<div>Hello ${'world'}</div>`);
		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					children: 'Hello world'
				}
			})
		);
	});

	it('should handle basic styles', async () => {
		const result = toReactElement(`<div style="color: red; border-top: 1px solid green;">
      Hello world
    </div>`);
		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					style: {
						borderTop: '1px solid green',
						color: 'red'
					},
					children: 'Hello world'
				}
			})
		);
	});

	it('inlines css', async () => {
		const result = toReactElement(`<div class="cool test">Hello world</div>
      <style>
        .cool {
          color: red;
          background: white;
        }
        .test {
        background: green;
        }
      </style>`);

		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					style: {
						background: 'green',
						color: 'red'
					},
					class: 'cool test',
					children: 'Hello world'
				}
			})
		);
	});

	it('preserves url() in css', async () => {
		const result = toReactElement(`<div
      style="background-image: url(https://example.com/img.png);"
    />`);
		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					style: { backgroundImage: 'url(https://example.com/img.png)' },
					children: []
				}
			})
		);
	});

	it('supports linebreaks in style attribute', async () => {
		const result = toReactElement(`<div
      style="
    background-color: white;
    height: 100%;
    width: 100%;
  "
    >
      <div
        style="
      flex-grow: 1;
      margin: 80px;
    "
      >
        Hello World! 👋
      </div>
    </div>`);
		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					children: [
						undefined,
						{
							type: 'div',
							props: {
								children: 'Hello World! 👋',
								style: {
									flexGrow: '1',
									margin: '80px'
								}
							}
						}
					],
					style: {
						backgroundColor: 'white',
						height: '100%',
						width: '100%'
					}
				}
			})
		);
	});

	it('supports parens in style attribute', async () => {
		const result = toReactElement(`<div
      style="background-image: linear-gradient(135deg, #ef629f, #eecda3); display: flex;"
    ></div>`);
		expect(result).toEqual(
			wrap({
				type: 'div',
				props: {
					children: [],
					style: {
						backgroundImage: 'linear-gradient(135deg, #ef629f, #eecda3)',
						display: 'flex'
					}
				}
			})
		);
	});
});
