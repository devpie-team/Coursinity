import { useEffect, useState } from 'react'

let globalBreakpoints = {
    isMobile: false,
    isTablet: false,
    isDesktop: true
}

let listeners: Set<() => void> = new Set()
let resizeTimer: NodeJS.Timeout | null = null

const updateBreakpoints = () => {
    const width = window.innerWidth
    const newBreakpoints = {
        isMobile: width < 768,
        isTablet: width >= 768 && width <= 1024,
        isDesktop: width > 1024
    }

    const hasChanged =
        newBreakpoints.isMobile !== globalBreakpoints.isMobile ||
        newBreakpoints.isTablet !== globalBreakpoints.isTablet ||
        newBreakpoints.isDesktop !== globalBreakpoints.isDesktop

    if (hasChanged) {
        globalBreakpoints = newBreakpoints
        listeners.forEach(listener => listener())
    }
}

const handleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(updateBreakpoints, 100) // Debounce
}

export const useResponsiveBreakpoints = () => {
    const [breakpoints, setBreakpoints] = useState(globalBreakpoints)

    useEffect(() => {
        const listener = () => setBreakpoints({ ...globalBreakpoints })
        listeners.add(listener)

        if (listeners.size === 1) {
            updateBreakpoints() // Initialize
            window.addEventListener('resize', handleResize)
        }

        return () => {
            listeners.delete(listener)
            if (listeners.size === 0) {
                window.removeEventListener('resize', handleResize)
                if (resizeTimer) clearTimeout(resizeTimer)
            }
        }
    }, [])

    return breakpoints
} 