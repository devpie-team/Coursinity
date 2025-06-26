import { useMemo } from 'react'
import { SlideData } from '../../types'

interface SpiralParams {
    radius: number
    verticalSpacing: number
    spiralTurns: number
    circleCenter: [number, number, number]
    totalSlides: number
    startOffset: number
    endOffset: number
}

export function useSpiralParams(isMobile: boolean, slidesData: SlideData[]) {
    const spiralParams: SpiralParams = useMemo(
        () => ({
            radius: isMobile ? 0.6 : 1.2,
            verticalSpacing:isMobile ? 0.2 : 0.25,
            spiralTurns: isMobile ? 0.7 : 0.7,
            circleCenter: isMobile ? [0, 0, 0.1] : [0, -0.1, -0.2],
            totalSlides: slidesData.length,
            startOffset: isMobile ? 6 : 8,
            endOffset: isMobile ? 6 : 8
        }),
        [isMobile, slidesData.length]
    )

    const fixedPositions = useMemo(() => {
        const { radius, verticalSpacing, spiralTurns, circleCenter, totalSlides, startOffset, endOffset } = spiralParams
        const positions = []
        for (let pos = -startOffset; pos < totalSlides + endOffset; pos++) {
            const posProgress = pos / totalSlides
            const posAngle = posProgress * spiralTurns * 2 * Math.PI
            const x = circleCenter[0] + radius * Math.sin(posAngle)
            const z = circleCenter[2] + radius * Math.cos(posAngle)
            const y = circleCenter[1] - pos * verticalSpacing
            positions.push({ x, y, z })
        }
        return positions
    }, [spiralParams])

    return { spiralParams, fixedPositions }
} 