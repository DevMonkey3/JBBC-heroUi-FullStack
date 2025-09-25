// components/headers/Header.jsx
'use client'
import React, { useState,useEffect } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd'; 
import { useRouter } from 'next/navigation';

export default function AdminMenu(props:any) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    { key: '1', icon: <PieChartOutlined />, label: 'adminProfile' },
    { key: '2', icon: <DesktopOutlined />, label: 'newsletters' },
    { key: '3', icon: <ContainerOutlined />, label: 'blog' },
    { key: '4', icon: <MailOutlined />, label: 'seminar' },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuSelect: MenuProps['onSelect'] = (e) => {
    // 根据选中的菜单项跳转到相应的页面
    switch (e.key) {
      case '1':
        router.push('/admin/profile');
        break;
      case '2':
        router.push('/admin/newsletters');
        break;
      case '3':
        router.push('/admin/blog');
        break;
      case '4':
        router.push('/admin/seminar');
        break;
      default:
        break;
    }
    
    // 调用父组件传递的onSelect方法
    props.onSelect(e);
  };

  useEffect(() => {
  console.log(props,"AdminMenu");
  
  }, []);

  return (
    <>
      <Menu
        // defaultSelectedKeys={props.defaultSelectedKeys}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={handleMenuSelect}
        // onSelect={props.onSelect}
      />
    </>
  );
}