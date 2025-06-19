import { useMemo } from 'react'

interface SlideData {
    text: string
    colors: string[]
}

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
            radius: isMobile ? 0.8 : 1.2,
            verticalSpacing: 0.25,
            spiralTurns: isMobile ? 1.8 : 0.7,
            circleCenter: [0, -0.1, -0.2],
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