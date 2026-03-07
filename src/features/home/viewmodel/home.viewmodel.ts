import { useMemo, useState } from 'react'
import { studies } from '../model/home.model'
import type { StudyRoute, StudyTag } from '@/shared/models/StudyRoute.model'

export function useHomeViewModel() {
  const [activeFilter, setActiveFilter] = useState<StudyTag | 'all'>('all')

  const filteredStudies = useMemo<StudyRoute[]>(() => {
    if (activeFilter === 'all') return studies
    return studies.filter((s) => s.tag === activeFilter)
  }, [activeFilter])

  const availableTags = useMemo<Array<StudyTag | 'all'>>(() => {
    const tags = Array.from(new Set(studies.map((s) => s.tag)))
    return ['all', ...tags]
  }, [])

  const totalCount = studies.length

  return {
    filteredStudies,
    availableTags,
    activeFilter,
    setActiveFilter,
    totalCount,
  }
}
