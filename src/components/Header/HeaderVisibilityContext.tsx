'use client'
import { createContext, useContext, useRef, useSyncExternalStore } from 'react'

const subscribers = new Set<() => void>()
let hiddenSections = new Set<string>() // Сохраняем ID секций

function getSnapshot() {
  return hiddenSections.size === 0 // true если показывать хедер
}

function subscribe(cb: () => void) {
  subscribers.add(cb)
  return () => subscribers.delete(cb)
}

function hideHeaderForSection(id: string) {
  hiddenSections.add(id)
  subscribers.forEach((fn) => fn())
}
function showHeaderForSection(id: string) {
  hiddenSections.delete(id)
  subscribers.forEach((fn) => fn())
}

const HeaderVisibilityContext = createContext({
  isVisible: true,
  hideHeaderForSection: (id: string) => {},
  showHeaderForSection: (id: string) => {}
})

export const HeaderVisibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const isVisible = useSyncExternalStore(subscribe, getSnapshot)
  return (
    <HeaderVisibilityContext.Provider value={{ isVisible, hideHeaderForSection, showHeaderForSection }}>
      {children}
    </HeaderVisibilityContext.Provider>
  )
}

export const useHeaderVisibility = () => useContext(HeaderVisibilityContext)
