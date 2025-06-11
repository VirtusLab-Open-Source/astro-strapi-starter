export const buildMediaUrl = (url: string) => {
    if (url.startsWith("http")) {
        return url;
    }
    const strapiUrl = import.meta.env.STRAPI_URL || "http://localhost:1337";
    return `${strapiUrl}${url}`;
};