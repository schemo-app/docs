# Schemo Documentation

Documentation for the Schemo desktop client.

## Local Development

> [!IMPORTANT]
> Install [Hugo Extended 0.170.0](https://github.com/gohugoio/hugo/releases/tag/v0.170.0) and Go 1.26.7 or later.

Start the development server:

```bash
hugo server
```

A local preview will be available at `http://localhost:1313`.

Build the documentation:

```bash
hugo --minify --panicOnWarning
```

The generated site will be available in `public/`.
