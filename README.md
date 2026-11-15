# Schemo Docs

User documentation for the Schemo desktop client. The current English guide covers Schemo 0.5.0.

## Preview

Install [Hugo Extended 0.170.0](https://github.com/gohugoio/hugo/releases/tag/v0.170.0) and Go 1.26.7 or later. The Hextra theme is pinned in `go.mod`.

The site layout lives in `layouts/` and `assets/css/custom.css`. Hextra provides search, theme controls, and Markdown components.

```sh
hugo server
```

Build the site into `public/` with `hugo --minify --panicOnWarning`.

## Contribute

- Write product documentation in `content/docs`, end-to-end walkthroughs in `content/guides`, and troubleshooting in `content/support`.
- Match the button and menu labels in the documented version of Schemo.
- Put screenshots beside their page's `index.md`. The `screenshot` shortcode takes a `name` and descriptive `alt` text. It loads `<name>-light.png` and `<name>-dark.png`; clicking the image opens the original PNG.
- To reuse a screenshot in a guide, set `page` to the path of the page that holds the PNGs. Give guides a `track` of `build`, `debug`, or `automate` to place them on the Guides index.
- Capture from the desktop app in a demo profile. Keep credentials, personal account data, and unrelated tabs out of the frame.
