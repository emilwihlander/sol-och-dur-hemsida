import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const documents = defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/documents' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        body: z.string(),
    }),
})

const news = defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/news' }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        body: z.string(),
    }),
})

const staff = defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/staff' }),
    schema: z.object({
        name: z.string(),
        role: z.string(),
        extent: z.string().optional(),
        since: z.string().optional(),
        photo: z.string().optional(),
        order: z.number().default(100),
        text: z.string().optional(),
    }),
})

export const collections = { documents, news, staff }
