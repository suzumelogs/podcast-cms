export type MenuType = {
  title: string
  icon: string
  href: string
  active_icon: string
  disabled?: boolean
  subHref?: string
}

export const menus: MenuType[] = [
  {
    href: '/',
    title: 'Dashboard',
    subHref: 'dashboard',
    icon: '/assets/svgs/property.svg',
    active_icon: '/assets/svgs/property_active.svg',
  },
  {
    href: '/users',
    title: 'User',
    icon: '/assets/svgs/user.svg',
    active_icon: '/assets/svgs/user_active.svg',
  },
  {
    href: '/movie-type',
    title: 'Movie type',
    icon: '/assets/svgs/transaction.svg',
    active_icon: '/assets/svgs/transaction_active.svg',
  },
  {
    href: '/movie-format',
    title: 'Movie format',
    icon: '/assets/svgs/transaction.svg',
    active_icon: '/assets/svgs/transaction_active.svg',
  },
  {
    href: '/movies',
    title: 'Movie',
    icon: '/assets/svgs/article.svg',
    active_icon: '/assets/svgs/article_active.svg',
  },
  {
    href: '/persons',
    title: 'Person',
    icon: '/assets/svgs/transaction.svg',
    active_icon: '/assets/svgs/transaction_active.svg',
  },
  {
    href: '/person-movie',
    title: 'Person movie',
    icon: '/assets/svgs/transaction.svg',
    active_icon: '/assets/svgs/transaction_active.svg',
  },
  {
    href: '/company',
    title: 'Cinema',
    icon: '/assets/svgs/company.svg',
    active_icon: '/assets/svgs/company_active.svg',
  },
  {
    href: '/articles',
    title: 'Screen',
    icon: '/assets/svgs/article.svg',
    active_icon: '/assets/svgs/article_active.svg',
  },
]
