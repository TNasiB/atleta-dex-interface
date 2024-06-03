import CreatePool from '@/components/CreatePool'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pools/create/')({
  component: () => <CreatePool />
})
