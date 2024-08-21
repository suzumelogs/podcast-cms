import CategoryIcon from '@mui/icons-material/Category'
import UserIcon from '@mui/icons-material/Person'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'

export type MenuType = {
  title: string
  icon: React.ElementType | React.ReactNode
  href: string
  active_icon: React.ElementType | React.ReactNode
  disabled?: boolean
  subHref?: string
}

export const menus: MenuType[] = [
  {
    href: '/',
    title: 'Thống kê',
    subHref: 'dashboard',
    icon: StackedLineChartIcon,
    active_icon: StackedLineChartIcon,
  },
  {
    href: '/users',
    title: 'Người dùng',
    icon: UserIcon,
    active_icon: UserIcon,
  },
  {
    href: '/movie-type',
    title: 'Danh mục',
    icon: CategoryIcon,
    active_icon: CategoryIcon,
  },
]
