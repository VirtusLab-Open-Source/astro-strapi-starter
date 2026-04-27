import type { StrapiBlockField } from "./rich-text";
import type { StrapiMedia } from "./media";

// CTA Component
export type StrapiComponentCTA = {
	label: string;
	color?: string;
	url: string;
};

// Hero Component
export type StrapiComponentHero = {
	title: string;
	subtitle?: string;
	content?: StrapiBlockField;
	background?: StrapiMedia;
	cta?: StrapiComponentCTA;
};

// SEO Component
export type StrapiComponentSEO = {
	metaTitle: string;
	metaDescription: string;
	ogImage?: StrapiMedia;
	keywords?: string;
};

// Content Components for Strapi Blocks
export type StrapiContentComponentTypes =
	| "blocks.text"
	| "blocks.quote"
	| "blocks.media"
	| "blocks.cta"
	| "blocks.hero";

export type StrapiContentComponent = {
	id: number;
	__component: StrapiContentComponentTypes;
};

export type StrapiContentTextComponent = StrapiContentComponent & {
	__component: "blocks.text";
	title?: string;
	content: StrapiBlockField;
};

export type StrapiContentQuoteComponent = StrapiContentComponent & {
	__component: "blocks.quote";
	quote: string;
	author?: string;
};

export type StrapiContentMediaComponent = StrapiContentComponent & {
	__component: "blocks.media";
	media: StrapiMedia;
	caption?: string;
};

export type StrapiContentCTAComponent = StrapiContentComponent & {
	__component: "blocks.cta";
	title?: string;
	classes?: string;
	description?: string;
	cta: StrapiComponentCTA;
	shields?: Array<{
		label: string;
		url: string;
	}>;
};

export type StrapiContentHeroComponent = StrapiContentComponent & {
	__component: "blocks.hero";
} & StrapiComponentHero;

export type StrapiContentComponents =
	| StrapiContentTextComponent
	| StrapiContentQuoteComponent
	| StrapiContentMediaComponent
	| StrapiContentCTAComponent
	| StrapiContentHeroComponent;
