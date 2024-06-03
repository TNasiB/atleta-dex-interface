import Swap from '@/components/Swap'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/swap/')({
  component: () => <Swap />
})
