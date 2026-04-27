---
name: astro-strapi-starter
description: >-
  Develop and extend the Astro + Strapi starter: content.config with @sensinum/astro-strapi-loader,
  Strapi 5 data in Astro pages, StrapiBlocks, BlockRenderer, Tailwind 4, shadcn. Covers onboarding
  (copy upstream skills), slug/CMS routes, Astro i18n, package upgrades, optional Vitest. Types in
  src/types/strapi/ with a barrel index.
---

# Astro × Strapi starter (VirtusLab template)

## Scope

- **Stack:** Astro 6+, Strapi 5, `@sensinum/astro-strapi-loader`, `@sensinum/astro-strapi-blocks`, Tailwind CSS 4, shadcn-style UI in `src/components/ui/`.
- **Goal:** Add or change CMS-driven content, query shapes, and UI while keeping one source of truth for Strapi REST objects and a clear split between **dynamic zone components** and **rich-text Blocks**.

## Read next

- **Loader (queries, collections, locales):** stub with upstream links in [../astro-strapi-loader/SKILL.md](../astro-strapi-loader/SKILL.md) — canonical: [raw SKILL on GitHub](https://raw.githubusercontent.com/VirtusLab-Open-Source/astro-strapi-loader/main/.ai/astro-strapi-loader/SKILL.md)
- **StrapiBlocks (rich text):** stub with upstream links in [../astro-strapi-blocks/SKILL.md](../astro-strapi-blocks/SKILL.md) — canonical: [raw SKILL on GitHub](https://raw.githubusercontent.com/VirtusLab-Open-Source/astro-strapi-blocks/main/.ai/astro-strapi-blocks/SKILL.md)
- **Project overview:** [../AGENTS.md](../AGENTS.md)

## Onboarding: upstream `SKILL` for loader and blocks (do this when you start)

Stubs in [../astro-strapi-loader/SKILL.md](../astro-strapi-loader/SKILL.md) and [../astro-strapi-blocks/SKILL.md](../astro-strapi-blocks/SKILL.md) only **link** to GitHub. Tools that do **not** follow URLs will miss most loader/blocks behavior.

**Recommended when you (or a teammate) begin work in this repo:**

1. **Copy or download** the canonical upstream files into a place your tool reads — e.g. a local `SKILL` folder, `.cursor/skills/`, or a short-lived **`.ai/_upstream/`** (add to `.gitignore` if you do not want copies committed). Use the **raw** URLs from the stubs; **pin the branch or tag to the version in `package.json`** (e.g. replace `main` with the git tag that matches `@sensinum/astro-strapi-loader` / `astro-strapi-blocks`).
2. **Or** use your editor’s **“fetch from URL / import skill”** for those raw links before deep work on `populate`, locales, or `StrapiBlocks` `theme` overrides.
3. **Minimum:** at least **open the raw** loader and blocks `SKILL.md` once per upgrade cycle and skim for breaking changes.

The full starter context lives in **this** file; loader and blocks are **not** vendored here on purpose, so a local or fetched copy is how you get parity with a model that only sees files.

## Configuration flow

1. **Environment:** `STRAPI_URL`, `STRAPI_TOKEN` in `.env` (see `env.example`). Required for a live build against Strapi; the starter can fall back if the CMS is down (see `content.config.ts` and pages).
2. **Collections:** In `src/content.config.ts`, define **named query objects** (e.g. `homepageQuery`, `pagesQuery`) and pass them to `generateCollections({ url, token }, [{ name, query }, ...])`. Export merged `collections`.
3. **Queries:** Reuse **fragments** (hero, SEO, shared components) with object spread. For dynamic zones, use `on` with **exact component UIDs** from the Strapi schema.
4. **Pages:** Use `getCollection` / `getEntry` from `astro:content`. Single types often appear as a one-item collection—normalize with a small helper if you use `[0]`.

## TypeScript types (`src/types/strapi/`)

- **Layout:** Add types in **small modules** under `src/types/strapi/` (e.g. `media.ts`, `rich-text.ts`, `components.ts`, `single-types.ts`). **Re-export** everything intended for app code from `src/types/strapi/index.ts` so imports stay `from '../types/strapi'` or `from '@/types/strapi'`. When generating or editing types (agents, skills, hand edits), **update the right file** and the barrel — do not leave new types unexported.
- **Schema source for mapping:** To align field names, component UIDs, and relations when writing TypeScript by hand, use Strapi **Content-Type Builder** **GET** endpoints that return JSON for definitions — the operations are typically exposed as **`getContentTypes`**, **`getContentType`**, **`getComponents`**, and **`getComponent`** (exact URLs vary by Strapi version; authenticate as for other admin API calls). Use those payloads as the ground truth alongside sample Content API responses.
- **Loader Zod vs TS types:** `@sensinum/astro-strapi-loader` uses schema introspection at build time to emit **dynamic Zod** for collection entries. The hand-written types in `src/types/strapi/` should match the **same shapes** (including dynamic-zone discriminated unions on `__component`) so components and `astro check` stay consistent with what the loader validates.

## Two rendering paths (do not confuse them)

| Source in Strapi | In Astro | Package / pattern |
|------------------|----------|-------------------|
| **Dynamic zone** (components with `__component`) | Map `__component` in a parent (e.g. `BlockRenderer.astro`) | Project components under `src/components/blocks/` |
| **Rich text → “Blocks”** (editor blocks JSON) | `<StrapiBlocks data={...} />` | `@sensinum/astro-strapi-blocks` |

Use **StrapiBlocks** for the Strapi 5 **Blocks** rich-text field. Use **custom Astro components** for **dynamic zone** entries your schema defines (hero, CTA, etc.).

## StrapiBlocks in this project

- Import: `import { StrapiBlocks } from '@sensinum/astro-strapi-blocks'`.
- Pass **unmodified** field data, e.g. from a text component’s `content` or hero copy.
- Optional: `theme`, `class`, or `blocks={{ ... }}` overrides per package docs.
- Centralize large `theme` objects in a module to avoid drift between pages.

## New dynamic zone block (example workflow)

1. Add the component in Strapi and note its `__component` string.
2. Extend `Strapi*Component` types in `src/types/strapi/` (e.g. `components.ts`) and re-export from `index.ts` if you use TypeScript strongly.
3. Add a new Astro file under `src/components/blocks/` and a branch in `BlockRenderer.astro`.
4. Update **populate** for the dynamic zone so the new component’s media and relations are included (see loader skill, `on` / nested `populate`).

## New collection or content type

1. Add a **query** object and a new entry in the `generateCollections` definition list.
2. Add types under `src/types/strapi/` (and the barrel `index.ts`); keep field names aligned with the API and with Content Builder / loader introspection.
3. Add pages under `src/pages/` that call `getCollection` with the new key.

## CMS-driven routes: `slug`, `documentId`, or other unique key

For **collection** types (e.g. “pages” in Strapi) you usually expose a **string** in the URL — often `slug` — or another unique field. The loader materializes Strapi as `astro:content` entries; your route must map **one field per segment** to `params` that match the file name (e.g. `src/pages/[slug].astro` → `params.slug`).

**Pattern (SSG, conceptual):** In the dynamic page, use `getStaticPaths` and `getCollection('yourCollection')` (see Astro [ Routing](https://docs.astro.build/en/guides/routing/) and [Content collections: generating pages](https://docs.astro.build/en/guides/content-collections/#generating-pages-from-content-collections)):

```ts
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const items = await getCollection("pages"); // name from content.config
  return items.map((entry) => ({
    params: { slug: entry.data.slug },
    props: { entry },
  }));
}
```

Replace `pages` / `slug` with your collection name and the **field you agree is the path key**.

**Agent workflow (do not guess the URL key):**

1. Read `src/types/strapi/` (or generated entry types) for the collection and list **candidates** for a route segment: e.g. `slug`, `uid`, `documentId`, or locale-prefixed shapes.
2. **Ask the user** which field to use for URL generation, whether it is **unique** per site or per-locale, and if **fallbacks** are allowed (e.g. missing `slug` → skip path or 404).
3. Once chosen, use that field in `getStaticPaths` and in links inside components. `documentId` is stable but usually worse for public URLs than a dedicated `slug`.

## Internationalization (i18n)

- **Astro (canonical):** Configure routing, `[lang]` segments, and `i18n` in `astro.config` per the official guide: **[Internationalization (i18n) routing](https://docs.astro.build/en/guides/internationalization/)** (routing strategies, `getRelativeLocaleUrl`, `astro:i18n`, etc.). This repo does not ship a second, competing convention — add folders and config as the docs show.
- **Strapi + loader:** Use **locales** in your Strapi REST `filters` / `locale` and in loader/collection options (see **upstream** loader `SKILL`). The **Astro** locale in the path (e.g. `en/`, `pl/`) and the **Strapi** `locale` parameter for fetches must **line up** in your page logic and `content.config` queries.
- **Single source of truth:** URL structure = Astro i18n; per-locale data = Strapi queries.

## Bumping `@sensinum/astro-strapi-loader` or `@sensinum/astro-strapi-blocks`

1. After changing versions in `package.json` and `npm install` / `yarn`, **re-fetch** the matching upstream **raw** `SKILL.md` (and related `AGENTS` / reference) using a **git tag** or **commit** that matches the release you installed, not only `main`.
2. If API or docs moved, **update the stub link targets** in [../astro-strapi-loader/SKILL.md](../astro-strapi-loader/SKILL.md) and [../astro-strapi-blocks/SKILL.md](../astro-strapi-blocks/SKILL.md) (and any Cursor rule stubs) so the next run points at the right revision.
3. Run `npm run build` and fix any schema or import breaks.

## Tests (optional, project policy)

- The starter **does not** include a test runner. For **non-trivial** helpers (URL builders, locale mapping, block transformers), consider **Vitest** (Vite-native) and add it explicitly — the agent may **suggest** unit tests for those **high-value** code paths. E2E and coverage level remain **up to the team**.

## UI (Tailwind + shadcn)

- Global design tokens and Tailwind: `src/styles/global.css`.
- React shadcn primitives: `src/components/ui/`, `cn()` from `@/lib/utils`, aliases from `components.json`.
- Pure Astro + Tailwind lives alongside React islands—keep one visual language (spacing, color tokens) across both.

## Verification

- `npm run build` runs `astro check` and a production build—use after changing schemas, `content.config.ts`, or block components.
- After **loader/blocks** upgrades, re-run the same; add or run **Vitest** (if you adopt it) after changing test-covered helpers.
