import { siteConfig } from '@/config/site'

export const getAuthorConfig = () => {
  return {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME || siteConfig.author.name,
    title: process.env.NEXT_PUBLIC_AUTHOR_TITLE || siteConfig.author.title,
    avatar: process.env.NEXT_PUBLIC_AUTHOR_AVATAR || siteConfig.author.avatar,
    description: process.env.NEXT_PUBLIC_AUTHOR_DESCRIPTION || siteConfig.author.description
  }
}

export const getSiteConfig = () => {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME || siteConfig.name,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || siteConfig.description,
    author: getAuthorConfig(),
    bilibili: {
      mid: process.env.NEXT_PUBLIC_BILIBILI_MID || siteConfig.bilibili.mid,
      collectionId: process.env.NEXT_PUBLIC_BILIBILI_COLLECTION_ID || siteConfig.bilibili.collectionId,
      url: process.env.NEXT_PUBLIC_BILIBILI_URL || siteConfig.bilibili.url
    },
    social: siteConfig.social,
    tags: process.env.NEXT_PUBLIC_TAGS ? 
      JSON.parse(process.env.NEXT_PUBLIC_TAGS) : 
      siteConfig.tags,
    music: siteConfig.music
  }
} 