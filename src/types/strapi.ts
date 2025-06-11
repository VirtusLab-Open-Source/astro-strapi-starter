export type StrapiMedia = {
    url: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl: string;
    provider: string;
    provider_metadata: any;
    formats: {
        small?: StrapiMedia;
        medium?: StrapiMedia;
        large?: StrapiMedia;
    },
};

export type StrapiBlockTextItem = {
    text: string;
    type: 'text';
    bold?: boolean;
    italic?: boolean;
};

export type StrapiBlockLinkItem = {
    url: string;
    type: 'link';
    children: Array<StrapiBlockTextItem>;
};

export type StrapiBlockListItem = {
    type: 'list-item';
    children: Array<StrapiBlockNode>;
};

export type StrapiBlockNode = StrapiBlockTextItem | StrapiBlockLinkItem;

export type StrapiBlockHeading = {
    type: 'heading';
    level: number;
};

export type StrapiBlockListType = 'ordered' | 'unordered'

export type StrapiBlockList = {
    type: 'list';
    format: StrapiBlockListType;
    children: Array<StrapiBlockListItem>
};

export type StrapiBlockParagraph = {
    type: 'paragraph';
};

export type StrapiBlockVariations = StrapiBlockParagraph | StrapiBlockHeading | StrapiBlockList;

export type StrapiBlock<T = StrapiBlockVariations> = {
    children: Array<StrapiBlockTextItem>;
} & T;

export type StrapiBlockField = Array<StrapiBlock>;

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
    | 'blocks.text' 
    | 'blocks.quote' 
    | 'blocks.media' 
    | 'blocks.cta'
    | 'blocks.hero';

export type StrapiContentComponent = {
    id: number;
    __component: StrapiContentComponentTypes;
};

export type StrapiContentTextComponent = StrapiContentComponent & {
    __component: 'blocks.text';
    title?: string;
    content: StrapiBlockField;
};

export type StrapiContentQuoteComponent = StrapiContentComponent & {
    __component: 'blocks.quote';
    quote: string;
    author?: string;
};

export type StrapiContentMediaComponent = StrapiContentComponent & {
    __component: 'blocks.media';
    media: StrapiMedia;
    caption?: string;
};

export type StrapiContentCTAComponent = StrapiContentComponent & {
    __component: 'blocks.cta';
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
    __component: 'blocks.hero';
} & StrapiComponentHero;

export type StrapiContentComponents = 
    | StrapiContentTextComponent 
    | StrapiContentQuoteComponent 
    | StrapiContentMediaComponent 
    | StrapiContentCTAComponent
    | StrapiContentHeroComponent;

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