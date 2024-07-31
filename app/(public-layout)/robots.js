import keys from "config/keys";

const clientURL = keys.app.clientURL;

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: clientURL,
    }
}