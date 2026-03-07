import { createFileRoute } from '@tanstack/react-router'
import { Study02View } from '@/features/study-02-scroll/view/Study02View'

export const Route = createFileRoute('/study-02')({
  component: Study02View,
})
