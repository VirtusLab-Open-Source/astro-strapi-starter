# Agent instructions: Astro × Strapi starter

This project is a production-oriented **Astro 6** frontend with **Strapi 5** content loaded via [**@sensinum/astro-strapi-loader**](https://github.com/VirtusLab-Open-Source/astro-strapi-loader) and **Strapi 5 rich-text Blocks** rendered with [**@sensinum/astro-strapi-blocks**](https://github.com/VirtusLab-Open-Source/astro-strapi-blocks). Styling uses **Tailwind CSS 4** (Vite plugin) and **shadcn/ui**-style components.

The `.ai/` directory holds **portable, tool-agnostic** context. A thin [`AGENTS.md`](../AGENTS.md) at the repository root points here so tools that only scan the project root can find these instructions.

## Where to look first

| Topic | In this repo | Canonical upstream (not vendored) |
|--------|--------------|-----------------------------------|
| **This template** (collections, pages, `BlockRenderer` vs `StrapiBlocks`) | [`astro-strapi-starter/SKILL.md`](./astro-strapi-starter/SKILL.md) | — |
| **Loader** (`generateCollections`, `populate`, `qs`, locales) | [stub + links](./astro-strapi-loader/SKILL.md) | [`.ai` in astro-strapi-loader](https://github.com/VirtusLab-Open-Source/astro-strapi-loader/tree/main/.ai) |
| **StrapiBlocks** (rich text Blocks, `theme`, overrides) | [stub + links](./astro-strapi-blocks/SKILL.md) | [`.ai` in astro-strapi-blocks](https://github.com/VirtusLab-Open-Source/astro-strapi-blocks/tree/main/.ai) |
| **Cursor** scoped rules | [`.cursor/rules/`](../.cursor/rules/) — loader/blocks `.mdc` are **stubs** linking upstream; starter + Tailwind/shadcn are local | — |

**Why stubs?** The full **SKILL.md** bodies for the loader and blocks packages are maintained in their **own** repositories. This starter keeps **only** a short file per package (YAML frontmatter for skill discovery + links to the official raw Markdown) so we **do not fork** or drift from upstream prose.

**Agents:** If your workflow allows fetching a URL, use the **raw** links inside [`astro-strapi-loader/SKILL.md`](./astro-strapi-loader/SKILL.md) and [`astro-strapi-blocks/SKILL.md`](./astro-strapi-blocks/SKILL.md). To match a **specific npm version**, replace `main` in those URLs with a **git tag** (if published) or commit SHA that matches the release you depend on.

## Non-negotiables (Strapi + Astro)

1. **Query shape:** Build Strapi **REST** parameters as **plain JavaScript objects** (`populate`, `filters`, `sort`, etc.). The loader and ecosystem use **`qs.stringify`** for URLs—**never** hand-craft query strings, `URLSearchParams` for deep trees, or `JSON.stringify` the full query. See the [loader skill upstream](https://raw.githubusercontent.com/VirtusLab-Open-Source/astro-strapi-loader/main/.ai/astro-strapi-loader/SKILL.md).
2. **Dynamic zones:** Use `populate` with `on: { 'component.api.id': { populate: ... } }` for each component UID.
3. **Blocks field:** Pass **raw** API JSON into `<StrapiBlocks data={...} />`. Do not reshape the blocks array unless the CMS is not the source of truth.
4. **Env:** `STRAPI_URL`, `STRAPI_TOKEN` in `.env` (see `env.example`). Token must allow Content API reads and schema introspection used at build time (see loader documentation).

## This repository (conventions)

- **Content layer:** `src/content.config.ts` — `generateCollections` merges into `export const collections`. Handle Strapi being offline: `try/catch` and export static fallbacks or empty collections as the starter does.
- **Strapi types:** `src/types/strapi/` — one concern per file (e.g. `media.ts`, `components.ts`); **re-export** everything from `src/types/strapi/index.ts` so imports stay `from '../types/strapi'`. Keep shapes aligned with the Strapi Content API and Content Builder schema (see starter skill: Content Builder GET endpoints + loader Zod).
- **Dynamic zone components:** `src/components/blocks/BlockRenderer.astro` dispatches `__component` to Astro block components. **Rich-text block fields** inside components use `StrapiBlocks` (e.g. `TextBlock.astro`, `HeroBlock.astro`).
- **Styles:** `src/styles/global.css` — Tailwind v4 `@import 'tailwindcss'`, `@theme`, shadcn theme imports. Prefer utilities and design tokens already defined there.
- **shadcn:** `components.json` + `src/components/ui/` — new primitives via the shadcn CLI; use `@/lib/utils` `cn()` for class merging.

## Tailwind CSS and shadcn/ui

- **Tailwind v4** in this repo: Vite plugin in `astro.config.mjs`, no separate `tailwind.config.js` required for the default setup. Follow [Tailwind v4](https://tailwindcss.com/docs) and keep layers in `global.css`.
- **Official “agent rules”** for Tailwind from Tailwind Labs are distributed via **Tailwind Insiders** and are **not** redistributed here. Rely on public docs and the patterns in this repo.
- **shadcn/ui** (registry-driven copy-paste components): see [shadcn documentation](https://ui.shadcn.com/). The [shadcn-ui/ui](https://github.com/shadcn-ui/ui) monorepo contains maintainer `.cursor` rules for **that** project; treat them as inspiration, not a drop-in, because this starter is **Astro + React islands**, not Next.js.

## Using skills in your editor

- **Agent Skills (SKILL.md):** [`.ai/astro-strapi-starter/`](./astro-strapi-starter/SKILL.md) is the only **full** starter-specific guide here. For loader and blocks, follow the **raw** URLs in the stub files or add your tool’s “fetch from URL” if supported.
- **Onboarding (recommended):** When you **start** work in this project, **copy or fetch** the upstream **raw** `SKILL.md` for **loader** and **blocks** (pin the git ref to the **same version** as in `package.json`) into a place your tool reads, or at least open those URLs. See the starter skill section **“Onboarding: upstream SKILL for loader and blocks”** — relying only on the short stubs in-repo is enough for a pointer, not for day-to-day loader/blocks work.
- **`.cursor/skills/`:** You can symlink or copy **`astro-strapi-starter/`** only. For `astro-strapi-loader` / `astro-strapi-blocks`, either paste the **raw** upstream `SKILL.md` there when a tool needs a local file, or use upstream links—**do not** commit long-lived duplicate prose in this repository unless you intend to track a vendor snapshot (prefer gitignored local copies for personal use).
- **Cursor:** Project rules live in [`.cursor/rules/`](../.cursor/rules/). A root [`AGENTS.md`](../AGENTS.md) points to this file for discoverability.

## Security

- Do not commit secrets. Never paste real `STRAPI_TOKEN` values into skills, rules, or issues.
- Treat Strapi public permissions and preview tokens with the same care as any production API credential.
