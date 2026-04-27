---
name: astro-strapi-starter
description: >-
  Develop and extend the Astro + Strapi starter: content.config with @sensinum/astro-strapi-loader,
  Strapi 5 data in Astro pages, StrapiBlocks for rich text Blocks fields, dynamic zone BlockRenderer,
  Tailwind 4 and shadcn/ui. Use when wiring Strapi collections, new block components, or
  CMS-driven pages using this template. Types live under src/types/strapi/ with a barrel index.
---

# Astro × Strapi starter (VirtusLab template)

## Scope

- **Stack:** Astro 6+, Strapi 5, `@sensinum/astro-strapi-loader`, `@sensinum/astro-strapi-blocks`, Tailwind CSS 4, shadcn-style UI in `src/components/ui/`.
- **Goal:** Add or change CMS-driven content, query shapes, and UI while keeping one source of truth for Strapi REST objects and a clear split between **dynamic zone components** and **rich-text Blocks**.

## Read next

- **Loader (queries, collections, locales):** stub with upstream links in [../astro-strapi-loader/SKILL.md](../astro-strapi-loader/SKILL.md) — canonical: [raw SKILL on GitHub](https://raw.githubusercontent.com/VirtusLab-Open-Source/astro-strapi-loader/main/.ai/astro-strapi-loader/SKILL.md)
- **StrapiBlocks (rich text):** stub with upstream links in [../astro-strapi-blocks/SKILL.md](../astro-strapi-blocks/SKILL.md) — canonical: [raw SKILL on GitHub](https://raw.githubusercontent.com/VirtusLab-Open-Source/astro-strapi-blocks/main/.ai/astro-strapi-blocks/SKILL.md)
- **Project overview:** [../AGENTS.md](../AGENTS.md)

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

## UI (Tailwind + shadcn)

- Global design tokens and Tailwind: `src/styles/global.css`.
- React shadcn primitives: `src/components/ui/`, `cn()` from `@/lib/utils`, aliases from `components.json`.
- Pure Astro + Tailwind lives alongside React islands—keep one visual language (spacing, color tokens) across both.

## Verification

- `npm run build` runs `astro check` and a production build—use after changing schemas, `content.config.ts`, or block components.
