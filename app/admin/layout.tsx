'use client'

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import { Providers } from "../providers";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import AdminMenu from '@/components/admin/AdminMenu/adminMenu'
import { use, useState } from 'react';

export default function RootLayout({ children, }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    // 判断是否是/admin下的页面
    const isAdminRoute = pathname.startsWith('/admin');
    console.log(isAdminRoute, "isAdminRoute");
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    "min-h-screen text-foreground bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="demo-logo-vertical" />
                        <AdminMenu
                            onSelect={(e: any) => {
                                // 可以在这里处理其他逻辑
                                console.log('Selected menu item:', e);
                            }}
                        />
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0, background: colorBgContainer }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Header>
                        <Providers >
                            <div className="relative flex flex-col h-screen">

                                {children}

                            </div>
                        </Providers>
                    </Layout>
                </Layout>
            </body>
        </html>
    );
}
