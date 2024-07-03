import CreatePoolV2 from '@/components/CreatePoolV2'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pools/createv2/')({
  component: () => <CreatePoolV2 />
})
