# MapMyPath

A travel planner built with [Svelte](https://svelte.dev) and [Test Driven Development](https://www.oreilly.com/library/view/test-driven-development/0321146530/) practices

## Mapbox Access Token

This project uses [Mapbox](https://www.mapbox.com) for the interactive map. An access token is required to run the map locally.

Follow the instructions [here](https://docs.mapbox.com/help/getting-started/access-tokens/) to generate an access token.

Afterwards, create a `.env` file using the included `.env.example` as a template. Then in `.env`, replace `your_mapbox_access_token_here` with the access token.

## Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Testing

The component tests are written using [Vitest](https://vitest.dev) and [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/)

```bash
#Run the component tests
pnpm test:unit
```
