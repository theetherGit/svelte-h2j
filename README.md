[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<h1 align="center">
  <br>
  <a href="http://www.ethercorps.io">
    <img src="https://raw.githubusercontent.com/etherCorps/svelte-h2j/master/static/logo.svg" alt="Jsxify-html" width="200">
  </a>
  <br>
  Svelte H2J
  <br>
</h1>

<h4 align="center">Library to convert HTML + CSS to JSX with Svelte Compiler.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/@ethercorps%2Fsvelte-h2j.svg">
    <img src="https://badge.fury.io/js/@ethercorps%2Fsvelte-h2j.svg"
         alt="Gitter">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Convert html/css to jsx
    - Useful when you are going to use satori with Svelte & Kit.
- Compatible with new version of svelte
    - As new versions are coming for better performance in svelte we maintain that.
- Easy to use with all available syntax in html css.
    - Support for class based internal style (not valid for components).
    - inline css

## How To Use

- Install @ethercorps/svelte-h2j using your favourite node package manager.
```bash
# NPM
$ npm install @ethercorps/svelte-h2j@next
```

```bash
# PNPM
$ pnpm install @ethercorps/svelte-h2j@next
```

```bash
# Yarn
$ yarn add @ethercorps/svelte-h2j@next
```
```bash
# bun
$ bun install @ethercorps/svelte-h2j@next
```

- To convert html, css to JSX (Also supports Tailwind, inline css)
```javascript
import {toReactElement} from "@ethercorps/svelte-h2j"
const htmlString =`
 <div tw="bg-gray-50 flex w-full h-full items-center justify-center">
    <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
      <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
        <span>Ready to dive in?</span>
        <span tw="text-indigo-600">Start your free trial today.</span>
      </h2>
      <div tw="mt-8 flex md:mt-0">
        <div tw="flex rounded-md shadow">
          <a href="#" tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">Get started</a>
        </div>
        <div tw="ml-3 flex rounded-md shadow">
          <a href="#" tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">Learn more</a>
        </div>
      </div>
    </div>
  </div>
`;

const jsx = toReactElement(htmlTemplate) // Takes a string only
const svg = await satori(jsx, {
  width: options.width,
  height: options.height,
  debug: options.debug,
  fonts: options.fonts || [
    {
      name: 'sans serif',
      data: fontData,
      style: 'normal',
      weight: 700
    }
  ]
});

```
- We also provide a server side api for converting svelte components to JSX.
```javascript
import {svelteComponentToJsx} from "@ethercorps/svelte-h2j";
import SvelteComponent from "SvelteComponent.svelte"
const jsx = svelteComponentToJsx(SvelteComponent, {
	props: {
      a: 2 // if you have `export let a;` in component
    },
  style: `<style> .cool { color: blue; } </style>` // Should include if you have style tag in your component, pass you style tag here as it is.
}) // Takes two parameters 1. Component 2. Options: { props?: {}, style?: `` }

const svg = await satori(jsx, {
  width: options.width,
  height: options.height,
  debug: options.debug,
  fonts: options.fonts || [
    {
      name: 'sans serif',
      data: fontData,
      style: 'normal',
      weight: 700
    }
  ]
});

```

## Credits

This software uses the following open source packages:

- [Svelte](https://github.com/sveltejs/svelte)
- [estree-walker](https://github.com/Rich-Harris/estree-walker)

## Related

[satori-html](https://github.com/natemoo-re/satori-html) - Similar but uses other libraries as dependency when we
can approach with svelte compiler in sveltekit.

## You may also like...

- [Sveltekit OG](https://github.com/etherCorps/sveltekit-og) - An alternative to @vercel/og for sveltekit.

## License

MIT

---

> [ethercorps.io](https://www.ethercorps.io) &nbsp;&middot;&nbsp;
> GitHub [@theetherGit](https://github.com/theetherGit) &nbsp;&middot;&nbsp;
> Twitter [@theether0](https://twitter.com/theether0)

[contributors-shield]: https://img.shields.io/github/contributors/etherCorps/svelte-h2j.svg?style=for-the-badge
[contributors-url]: https://github.com/etherCorps/svelte-h2j/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/etherCorps/svelte-h2j.svg?style=for-the-badge
[forks-url]: https://github.com/etherCorps/svelte-h2j/network/members
[stars-shield]: https://img.shields.io/github/stars/etherCorps/svelte-h2j.svg?style=for-the-badge
[stars-url]: https://github.com/etherCorps/svelte-h2j/stargazers
[issues-shield]: https://img.shields.io/github/issues/etherCorps/svelte-h2j.svg?style=for-the-badge
[issues-url]: https://github.com/etherCorps/svelte-h2j/issues
[license-shield]: https://img.shields.io/github/license/etherCorps/svelte-h2j.svg?style=for-the-badge
[license-url]: https://github.com/etherCorps/svelte-h2j/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/theether0
