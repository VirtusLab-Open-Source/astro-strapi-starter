import { generateCollections } from '@sensinum/astro-strapi-loader';

// Strapi queries
export const homepageQuery = {
    populate: {
        hero: {
            populate: ["background", "cta"]
        },
        sections: {
            populate: "*"
        },
        seo: {
            populate: ["ogImage"],
        },
    },
};

export const globalQuery = {
    populate: {
        logo: true,
        navigation: true,
        footer: true,
    },
};

export const pagesQuery = {
    populate: {
        content: {
            populate: "*",
        },
        seo: {
            populate: ["ogImage"],
        },
    },
};

let strapiCollections: any = {};

try {
    strapiCollections = await generateCollections({
        url: import.meta.env.STRAPI_URL || 'http://localhost:1337',
        token: import.meta.env.STRAPI_TOKEN || '',
    }, [{
        name: "homepage",
        query: homepageQuery,
    }, {
        name: "global",
        query: globalQuery,
    }, {
        name: "pages",
        query: pagesQuery,
    }]);
} catch (error) {
    console.error('Strapi connection error:', error);
}

export const collections = {
    ...strapiCollections,
}; 