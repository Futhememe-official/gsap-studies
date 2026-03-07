import { useState } from 'react'
import { demoBoxes, availableEasings } from '../model/study01.model'

export function useStudy01ViewModel() {
  const [selectedEasing, setSelectedEasing] = useState('power3.out')

  return {
    boxes: demoBoxes,
    easings: availableEasings,
    selectedEasing,
    setSelectedEasing,
  }
}
