'use client'

import { ReactNode, useEffect, useRef, useMemo, memo, useCallback } from 'react'
import { useSceneManager } from '../SceneManager/SceneManager'

interface ConditionalSceneProps {
  sceneId: string
  children: ReactNode
}

export const ConditionalScene = memo(({ sceneId, children }: ConditionalSceneProps) => {
  const { isSceneVisible, setSceneVisible, setSceneAnimating } = useSceneManager()
  const hasSetVisible = useRef(false)
  const sceneIdRef = useRef(sceneId)

  // Мемоізуємо поточну видимість
  const isVisible = useMemo(() => isSceneVisible(sceneId), [isSceneVisible, sceneId])

  // Мемоізовані функції для очищення
  const cleanup = useCallback(() => {
    setSceneVisible(sceneIdRef.current, false)
    setSceneAnimating(sceneIdRef.current, false)
    hasSetVisible.current = false
  }, [setSceneVisible, setSceneAnimating])

  // Встановлюємо видимість сцени тільки один раз
  useEffect(() => {
    sceneIdRef.current = sceneId
    
    if (!hasSetVisible.current) {
      setSceneVisible(sceneId, true)
      hasSetVisible.current = true
    }
    
    return cleanup
  }, [sceneId, setSceneVisible, cleanup])

  // Мемоізуємо результат рендерингу
  const renderResult = useMemo(() => {
    if (!isVisible) {
      return null
    }
    return <>{children}</>
  }, [isVisible, children])

  return renderResult
})

ConditionalScene.displayName = 'ConditionalScene' 