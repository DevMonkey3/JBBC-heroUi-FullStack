'use client'

import React, { useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import {
  PieChartOutlined,
  UserOutlined,
  TeamOutlined,
  ContainerOutlined,
  MailOutlined,
  BookOutlined,
  CalendarOutlined,
} from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

export default function AdminMenu({ collapsed = false }: { collapsed?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()

  const items: MenuItem[] = [
    { key: '/admin',           icon: <PieChartOutlined />,  label: 'Dashboard' },
    { key: '/admin/users',     icon: <TeamOutlined />,   label: 'Users' },
    { key: '/admin/profile',   icon: <UserOutlined />,   label: 'Profile' },
    { key: '/admin/newsletters', icon: <MailOutlined />, label: 'Newsletters' },
    { key: '/admin/blog',      icon: <BookOutlined />, label: 'Blog' },
    { key: '/admin/seminar',   icon: <CalendarOutlined />,      label: 'Seminars' },
  ]

  const selected = useMemo(() => {
    // Pick the first item whose key is a prefix of the pathname
    const match = items.find(i => typeof i?.key === 'string' && pathname.startsWith(i.key as string))
    return match ? [match.key as string] : ['/admin']
  }, [pathname])

  const onSelect: MenuProps['onSelect'] = (e) => {
    router.push(e.key) // e.key is our path
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={items}
      selectedKeys={selected}
      onSelect={onSelect}
    />
  )
}
