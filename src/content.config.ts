import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        image: image(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
    })
});

export const collections = { blog };
