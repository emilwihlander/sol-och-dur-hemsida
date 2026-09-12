import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const pages = defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().optional(),
        body: z.string(),
        order: z.number().optional(),
    }),
})

export const collections = { pages }
