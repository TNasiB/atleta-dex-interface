import Pools from '@/components/Pools'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pools/')({
  component: () => <Pools />
})
