import { defineCollection, z } from 'astro:content';

const sermons = defineCollection({
  type: 'data',
  schema: z.object({
    title:    z.string(),
    speaker:  z.string(),
    date:     z.string(),
    category: z.string(),
    duration: z.string(),
    verse:    z.string(),
    excerpt:  z.string(),
    youtubeUrl: z.string().optional(),
  }),
});

const books = defineCollection({
  type: 'data',
  schema: z.object({
    title:  z.string(),
    author: z.string(),
    cat:    z.string(),
    sub:    z.string(),
    desc:   z.string(),
    price:  z.string(),
    format: z.string(),
    order:  z.number().default(0),
  }),
});

const resources = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tag:   z.string(),
    desc:  z.string(),
    pages: z.string(),
    size:  z.string(),
    url:   z.string(),
    order: z.number().default(0),
  }),
});

const siteConfig = defineCollection({
  type: 'data',
  schema: z.object({
    heroTitle:     z.string(),
    heroSubtitle:  z.string(),
    heroVerse:     z.string(),
    heroRef:       z.string(),
    ministryIntro: z.string(),
    ministryBody:  z.string(),
    statYears:     z.string(),
    statFamilies:  z.string(),
    statPillars:   z.string(),
    email:         z.string(),
    facebookUrl:   z.string(),
    youtubeMainUrl: z.string(),
    paybillNumber: z.string(),
    accountNumber: z.string(),
    accountName:   z.string(),
    bookPrice:     z.string(),
    paypalEmail:   z.string(),
  }),
});

export const collections = { sermons, books, resources, siteConfig };
