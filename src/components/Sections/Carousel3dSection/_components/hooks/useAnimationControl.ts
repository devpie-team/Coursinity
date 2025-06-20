import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSceneManager } from '../SceneManager/SceneManager'

interface UseAnimationControlOptions {
    sceneId: string
    enabled?: boolean
    throttleMs?: number
}

// Кеш для throttle функцій
const throttleCache = new Map<string, number>()

export const useAnimationControl = ({
    sceneId,
    enabled = true,
    throttleMs = 16 // ~60fps
}: UseAnimationControlOptions) => {
    const { isSceneVisible, isSceneAnimating, setSceneAnimating } = useSceneManager()
    const isAnimatingRef = useRef(false)
    const lastVisibleRef = useRef(false)
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const lastFrameTimeRef = useRef(0)

    // Мемоізуємо поточну видимість з кешуванням
    const currentVisible = useMemo(() => {
        const cached = throttleCache.get(`visible_${sceneId}`)
        const now = Date.now()
        if (cached && now - cached < 100) { // Кешуємо на 100ms
            return lastVisibleRef.current
        }
        const result = isSceneVisible(sceneId)
        throttleCache.set(`visible_${sceneId}`, now)
        return result
    }, [isSceneVisible, sceneId])

    const shouldAnimate = useMemo(() => currentVisible && enabled, [currentVisible, enabled])

    // Оптимізоване відстеження змін видимості
    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (shouldAnimate !== lastVisibleRef.current) {
                if (shouldAnimate && !isAnimatingRef.current) {
                    setSceneAnimating(sceneId, true)
                    isAnimatingRef.current = true
                } else if (!shouldAnimate && isAnimatingRef.current) {
                    setSceneAnimating(sceneId, false)
                    isAnimatingRef.current = false
                }
                lastVisibleRef.current = shouldAnimate
            }
        }, 30) // Зменшено з 50ms до 30ms

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [shouldAnimate, sceneId, setSceneAnimating])

    // Оптимізований хук для умовного виконання useFrame з throttle
    const useConditionalFrame = useCallback((callback: (state: any, delta: number) => void) => {
        const memoizedCallback = useMemo(() => callback, [callback])

        useFrame((state, delta) => {
            if (!shouldAnimate || !isAnimatingRef.current) return

            // Throttle для контролю частоти кадрів
            const now = performance.now()
            if (now - lastFrameTimeRef.current < throttleMs) return
            lastFrameTimeRef.current = now

            memoizedCallback(state, delta)
        })
    }, [shouldAnimate, throttleMs])

    // Мемоізуємо результат для уникнення зайвих ре-рендерів
    const result = useMemo(() => ({
        useConditionalFrame,
        isAnimating: isAnimatingRef.current,
        isVisible: currentVisible
    }), [useConditionalFrame, currentVisible])

    return result
} 