import {
  IconChartHistogram,
  IconLayoutDashboard,
  IconSettings,
  IconCalendar,
  IconEdit,
  IconCircleFilled,
  IconCurrencyDollar,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: '1° Pergunta',
    label: '',
    href: '',
    icon: <IconEdit size={18} />,
    sub: [
      {
        title: 'Parte 1 e 2',
        label: '',
        href: '/primeiraPergunta',
        icon: <IconCircleFilled size={6} />,
      },
    ],
  },
  {
    title: '2° Pergunta',
    label: '',
    href: '',
    icon: <IconEdit size={18} />,
    sub: [
      {
        title: 'Parte 1 e 2',
        label: '',
        href: '/segundaPergunta',
        icon: <IconCircleFilled size={6} />,
      },
    ],
  },
  
]
