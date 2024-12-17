'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchCollectionVideos } from '@/utils/bilibili'
import type { BilibiliVideo } from '@/types/bilibili'
import { siteConfig } from '@/config/site'

// 复用浏览器样式
const browserStyle = {
  background: 'linear-gradient(to right, #ffd1dc, #ffe3e8)',
  padding: '1px',
} as const

export default function WorksPage() {
  const [videos, setVideos] = useState<BilibiliVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true)
        const data = await fetchCollectionVideos(
          siteConfig.bilibili.collectionId,
          siteConfig.bilibili.mid
        )
        setVideos(data)
      } catch (err) {
        console.error('Error loading videos:', err)
        setError(err instanceof Error ? err.message : 'Failed to load videos')
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  return (
    <div className="w-[80%] max-w-5xl mx-auto mt-12 mb-24">
      <div className="rounded-xl" style={browserStyle}>
        <div className="rounded-lg overflow-hidden backdrop-blur-sm">
          {/* 浏览器标题栏 */}
          <div className="bg-gradient-to-r from-pink-100 to-pink-50 px-4 py-2 flex items-center justify-between border-b border-pink-200">
            <div className="flex space-x-2">
              <button className="w-3 h-3 rounded-full bg-pink-400 hover:bg-pink-500 transition-colors duration-200"></button>
              <button className="w-3 h-3 rounded-full bg-pink-300 hover:bg-pink-400 transition-colors duration-200"></button>
              <button className="w-3 h-3 rounded-full bg-pink-200 hover:bg-pink-300 transition-colors duration-200"></button>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-pink-400 font-medium">
              Works Gallery
            </div>
          </div>

          {/* 浏览器工具栏 */}
          <div className="bg-gradient-to-r from-pink-50 to-transparent px-4 py-2 flex items-center space-x-4 border-b border-pink-100">
            <div className="flex-1 flex items-center">
              <div className="flex items-center bg-white/80 backdrop-blur-sm w-full max-w-md px-3 py-1.5 rounded-full border border-pink-200 shadow-inner">
                <Image 
                  src="/bilibili.svg"
                  alt="bilibili"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="text-pink-400 text-sm">
                  collection/{siteConfig.bilibili.collectionId}
                </span>
              </div>
            </div>
          </div>

          {/* 内容区域 - 增加高度并添加滚动条 */}
          <div className="h-[calc(100vh-300px)] overflow-y-auto bg-white/60">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={video.pic}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          console.error('Image load error:', video.pic)
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-400 transition-colors duration-200">
                        {video.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{video.pubDate}</span>
                        <span className="mx-2">•</span>
                        <span>{video.views} 播放</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}