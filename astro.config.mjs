import { defineConfig } from 'astro/config'

export default defineConfig({
    site: 'https://solochdur.se',
    output: 'static',
    trailingSlash: 'always',
    redirects: {
        '/personal/': '/om-oss/#personal',
        '/verksamheten/': '/utbildningen/',
        '/sol-och-dur/': '/om-oss/',
    },
})
