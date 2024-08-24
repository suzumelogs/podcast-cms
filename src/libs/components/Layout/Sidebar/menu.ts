import BookmarksIcon from '@mui/icons-material/Bookmarks'
import CategoryIcon from '@mui/icons-material/Category'
import PaymentsIcon from '@mui/icons-material/Payments'
import UserIcon from '@mui/icons-material/Person'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'
import ViewStreamIcon from '@mui/icons-material/ViewStream'

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
    title: 'Tổng quan',
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
    href: '/books',
    title: 'Sách',
    icon: CategoryIcon,
    active_icon: CategoryIcon,
  },
  {
    href: '/chapters',
    title: 'Chương',
    icon: BookmarksIcon,
    active_icon: BookmarksIcon,
  },
  {
    href: '/episodes',
    title: 'Tập',
    icon: ViewStreamIcon,
    active_icon: ViewStreamIcon,
  },
  {
    href: '/pays',
    title: 'Lịch sử thanh toán',
    icon: PaymentsIcon,
    active_icon: PaymentsIcon,
  },
]
