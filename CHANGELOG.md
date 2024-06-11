# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased - v5]

### Added
- Support for svelte v5

### Changes
- `svelteComponentToJsx`:
  - `props` should be provided by `options`. `props` is optional, If you have props then provide like:
    ```js
      svelteComponentToJsx( component, { props: {} } )
    ```
  - `svelte v5` doesn't provide `css` in `RenderOutput`, so if you have a `style` tag in component then you have to provide `style` inside `options`.
    ```js
      svelteComponentToJsx( component, { style: `<style> .cool { color: blue; } </style>` } )
    ```