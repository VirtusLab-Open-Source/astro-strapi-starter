import type {
	StrapiComponentSEO,
	StrapiContentComponents,
	StrapiContentHeroComponent,
} from "./components";
import type { StrapiMedia } from "./media";

// Page Types
export type StrapiPage = {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	content?: Array<StrapiContentComponents>;
	seo?: StrapiComponentSEO;
	publishedAt: string;
	updatedAt: string;
};

export type StrapiHomepage = {
	id: number;
	documentId: string;
	title: string;
	hero?: StrapiContentHeroComponent;
	sections?: Array<StrapiContentComponents>;
	examples?: Array<StrapiContentComponents>;
	seo?: StrapiComponentSEO;
	publishedAt: string;
	updatedAt: string;
};

export type StrapiGlobal = {
	id: number;
	documentId: string;
	siteName: string;
	logo?: StrapiMedia;
	navigation?: any;
	footer?: any;
	publishedAt: string;
	updatedAt: string;
};
