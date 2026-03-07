import { createFileRoute } from '@tanstack/react-router'
import { Study03View } from '@/features/study-03-timeline/view/Study03View'

export const Route = createFileRoute('/study-03')({
  component: Study03View,
})
