'use client'

import { useMemo, memo } from 'react'
import { useSceneManager } from '../SceneManager/SceneManager'

interface SceneFallbackProps {
  sceneId: string
  children?: React.ReactNode
}

// Мемоізований компонент fallback
const LoadingSpinner = memo(() => (
  <div className="text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
    <p>Завантаження 3D сцени...</p>
  </div>
))
LoadingSpinner.displayName = 'LoadingSpinner'

export const SceneFallback = memo(({ sceneId, children }: SceneFallbackProps) => {
  const { isSceneLoaded } = useSceneManager()

  // Мемоізуємо стан завантаження
  const isLoading = useMemo(() => !isSceneLoaded(sceneId), [isSceneLoaded, sceneId])

  // Мемоізуємо fallback компонент
  const fallbackContent = useMemo(() => (
    <div className="absolute inset-0 flex items-center justify-center text-white bg-[#0D0D0D] z-30">
      <LoadingSpinner />
    </div>
  ), [])

  // Показуємо fallback тільки якщо сцена не завантажена
  if (isLoading) {
    return fallbackContent
  }

  return null
})

SceneFallback.displayName = 'SceneFallback' 