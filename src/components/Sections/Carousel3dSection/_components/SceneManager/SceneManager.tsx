'use client'

import { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback, useMemo } from 'react'

interface SceneState {
  isVisible: boolean
  isLoaded: boolean
  isAnimating: boolean
}

interface SceneManagerContextType {
  sceneStates: Record<string, SceneState>
  setSceneVisible: (sceneId: string, visible: boolean) => void
  setSceneLoaded: (sceneId: string, loaded: boolean) => void
  setSceneAnimating: (sceneId: string, animating: boolean) => void
  isSceneVisible: (sceneId: string) => boolean
  isSceneLoaded: (sceneId: string) => boolean
  isSceneAnimating: (sceneId: string) => boolean
}

const SceneManagerContext = createContext<SceneManagerContextType | null>(null)

export const useSceneManager = () => {
  const context = useContext(SceneManagerContext)
  if (!context) {
    throw new Error('useSceneManager must be used within SceneManagerProvider')
  }
  return context
}

interface SceneManagerProviderProps {
  children: ReactNode
  sceneIds: string[]
}

export const SceneManagerProvider = ({ children, sceneIds }: SceneManagerProviderProps) => {
  const [sceneStates, setSceneStates] = useState<Record<string, SceneState>>({})
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const initializedRef = useRef(false)
  const sceneIdsRef = useRef(sceneIds)

  // Мемоізуємо початкові стани
  const initialStates = useMemo(() => {
    const states: Record<string, SceneState> = {}
    sceneIds.forEach(sceneId => {
      states[sceneId] = {
        isVisible: true,
        isLoaded: false,
        isAnimating: false
      }
    })
    return states
  }, [sceneIds])

  // Ініціалізуємо стани для всіх сцен тільки один раз
  useEffect(() => {
    if (initializedRef.current) return
    setSceneStates(initialStates)
    initializedRef.current = true
  }, [initialStates])

  // Завантажуємо всі сцени під час лоадера
  useEffect(() => {
    if (!initializedRef.current) return
    
    const loadAllScenes = () => {
      setSceneStates(prev => {
        // Оптимізоване оновлення - оновлюємо тільки якщо потрібно
        let hasChanges = false
        const updated = { ...prev }
        
        sceneIds.forEach(sceneId => {
          if (!updated[sceneId]?.isLoaded) {
            updated[sceneId] = {
              ...updated[sceneId],
              isLoaded: true
            }
            hasChanges = true
          }
        })
        
        return hasChanges ? updated : prev
      })
    }

    loadingTimeoutRef.current = setTimeout(loadAllScenes, 1000)

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [sceneIds])

  // Оптимізовані функції оновлення стану
  const setSceneVisible = useCallback((sceneId: string, visible: boolean) => {
    setSceneStates(prev => {
      const currentState = prev[sceneId]
      if (!currentState || currentState.isVisible === visible) return prev
      
      return {
        ...prev,
        [sceneId]: {
          ...currentState,
          isVisible: visible,
          isAnimating: visible ? currentState.isAnimating : false
        }
      }
    })
  }, [])

  const setSceneLoaded = useCallback((sceneId: string, loaded: boolean) => {
    setSceneStates(prev => {
      const currentState = prev[sceneId]
      if (!currentState || currentState.isLoaded === loaded) return prev
      
      return {
        ...prev,
        [sceneId]: {
          ...currentState,
          isLoaded: loaded
        }
      }
    })
  }, [])

  const setSceneAnimating = useCallback((sceneId: string, animating: boolean) => {
    setSceneStates(prev => {
      const currentState = prev[sceneId]
      if (!currentState || currentState.isAnimating === animating) return prev
      
      return {
        ...prev,
        [sceneId]: {
          ...currentState,
          isAnimating: animating
        }
      }
    })
  }, [])

  // Мемоізовані геттери
  const isSceneVisible = useCallback((sceneId: string) => sceneStates[sceneId]?.isVisible ?? false, [sceneStates])
  const isSceneLoaded = useCallback((sceneId: string) => sceneStates[sceneId]?.isLoaded ?? false, [sceneStates])
  const isSceneAnimating = useCallback((sceneId: string) => sceneStates[sceneId]?.isAnimating ?? false, [sceneStates])

  // Мемоізуємо контекст для уникнення зайвих ре-рендерів
  const contextValue = useMemo(() => ({
    sceneStates,
    setSceneVisible,
    setSceneLoaded,
    setSceneAnimating,
    isSceneVisible,
    isSceneLoaded,
    isSceneAnimating
  }), [
    sceneStates,
    setSceneVisible,
    setSceneLoaded,
    setSceneAnimating,
    isSceneVisible,
    isSceneLoaded,
    isSceneAnimating
  ])

  return (
    <SceneManagerContext.Provider value={contextValue}>
      {children}
    </SceneManagerContext.Provider>
  )
} 