import { TabBar } from '@/components/TabBar'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cookies Page',
  description: 'Page to manage cookies',
}

const CookiesPage = async () => {
  const cookie = (await cookies()).get('currentTab')?.value

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar defaultTab={Number(cookie)} />
      </div>
    </div>
  )
}

export default CookiesPage
