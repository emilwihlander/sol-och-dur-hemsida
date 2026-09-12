# Sol och Dur

This is an Astro rebuild of [solochdur.se](https://solochdur.se/). It keeps the existing page structure while the site is tested with Pages CMS. Astro builds the static site into `dist/`.

## Run locally

```sh
pnpm install
pnpm dev
```

Use these commands to verify a production build and preview it locally:

```sh
pnpm build
pnpm preview
```

Editable copy lives in the text JSON files under `src/content/`. Keep the existing keys and JSON shape when changing copy so the Astro content loaders continue to work. A build reads those files again, so no generated output needs editing by hand.

## Pages CMS trial

Use the hosted Pages CMS GitHub App and select `emilwihlander/sol-och-dur-hemsida` when connecting the repository. Invite collaborators by email from Pages CMS. Saving an edit commits the changed JSON file to GitHub, which starts the Actions build in `.github/workflows/build.yml`.

The workflow uploads the generated `dist/` directory as a build artifact. Publishing that artifact to Simply.com is not configured yet.

## Source content and media

The page copy and URL hierarchy were migrated from [solochdur.se](https://solochdur.se/). The original image URLs remain in the migrated page content because Simply.com's security filter returned HTTP 455 when the assets were fetched directly during the migration. Pages CMS can upload local replacements into `public/media` using the media configuration in `.pages.yml`.
