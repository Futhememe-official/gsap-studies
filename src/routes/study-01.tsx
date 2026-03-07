import { createFileRoute } from '@tanstack/react-router'
import { Study01View } from '@/features/study-01-basic/view/Study01View'

export const Route = createFileRoute('/study-01')({
  component: Study01View,
})
