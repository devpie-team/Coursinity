'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo, useRef } from 'react'

interface SceneLoadingContextType {
  scenesLoaded: boolean
  setScenesLoaded: (loaded: boolean) => void
  preloadScenes: () => Promise<void>
}

const SceneLoadingContext = createContext<SceneLoadingContextType | null>(null)

export const useSceneLoading = () => {
  const context = useContext(SceneLoadingContext)
  if (!context) {
    throw new Error('useSceneLoading must be used within SceneLoadingProvider')
  }
  return context
}

interface SceneLoadingProviderProps {
  children: ReactNode
}

// Кеш для завантажених ресурсів
const resourceCache = new Map<string, ArrayBuffer>()

export const SceneLoadingProvider = ({ children }: SceneLoadingProviderProps) => {
  const [scenesLoaded, setScenesLoaded] = useState(false)
  const isLoadingRef = useRef(false)

  // Мемоізована функція завантаження
  const preloadScenes = useCallback(async () => {
    if (isLoadingRef.current) return // Уникнення повторного завантаження
    
    isLoadingRef.current = true
    
    try {
      // Оптимізоване завантаження з кешуванням
      const loadPromises = [
        // Завантажуємо 3D моделі з кешуванням
        (async () => {
          const cacheKey = 'spiral.glb'
          if (resourceCache.has(cacheKey)) {
            return resourceCache.get(cacheKey)
          }
          const response = await fetch('/assets/3d/models/spiral.glb')
          const buffer = await response.arrayBuffer()
          resourceCache.set(cacheKey, buffer)
          return buffer
        })(),
        
        (async () => {
          const cacheKey = 'arab.glb'
          if (resourceCache.has(cacheKey)) {
            return resourceCache.get(cacheKey)
          }
          const response = await fetch('/assets/3d/models/arab.glb')
          const buffer = await response.arrayBuffer()
          resourceCache.set(cacheKey, buffer)
          return buffer
        })(),
        
        // Оптимізовані таймаути
        new Promise(resolve => setTimeout(resolve, 300)),
        new Promise(resolve => setTimeout(resolve, 200)),
      ]

      await Promise.allSettled(loadPromises) // Використовуємо allSettled замість all
      setScenesLoaded(true)
    } catch (error) {
      console.warn('Failed to preload some 3D resources:', error)
      setScenesLoaded(true)
    } finally {
      isLoadingRef.current = false
    }
  }, [])

  // Мемоізуємо контекст
  const contextValue = useMemo(() => ({
    scenesLoaded,
    setScenesLoaded,
    preloadScenes
  }), [scenesLoaded, setScenesLoaded, preloadScenes])

  return (
    <SceneLoadingContext.Provider value={contextValue}>
      {children}
    </SceneLoadingContext.Provider>
  )
} 