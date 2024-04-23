import { z, defineCollection } from "astro:content";

const notesCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      author: z.string(),
      color: z.array(z.string()),
      textColor: z.string(),
    })
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      status: z.string().optional(),
      image: z.array(z.object({
        path: z.string(),
        alt: z.string()
      })),
      links: z.object({
        code: z.string().optional(),
        site: z.string().optional(),
      }).optional()
    })
})

export const collections = {
  notes: notesCollection,
  projects: projectsCollection,
};