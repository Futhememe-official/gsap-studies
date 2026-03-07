import { useRef, useEffect, DependencyList } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook para criar animações GSAP com cleanup automático via context.
 * O callback recebe o ctx APÓS a inicialização, evitando temporal dead zone.
 */
export function useGsapAnimation(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, containerRef)
    callback(ctx)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

/**
 * Hook para animações com ScrollTrigger.
 * O callback recebe o ctx APÓS a inicialização, evitando temporal dead zone.
 */
export function useScrollAnimation(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, containerRef)
    callback(ctx)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

/**
 * Hook para timeline GSAP.
 * O callback recebe tl e ctx APÓS a inicialização, evitando temporal dead zone.
 */
export function useTimeline(
  callback: (tl: gsap.core.Timeline, ctx: gsap.Context) => void,
  deps: DependencyList = [],
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {}, containerRef)
    tlRef.current = gsap.timeline()
    callback(tlRef.current, ctx)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { containerRef, tlRef }
}
