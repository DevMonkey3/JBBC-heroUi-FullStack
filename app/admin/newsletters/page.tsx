'use client'
import { Button, Layout, Menu, theme } from 'antd';
import AdminMenu from '@/components/admin/AdminMenu/adminMenu'
import { use, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function Newsletters() {
    const { Header, Sider, Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            <div>
                Newsletters
            </div>
        </Content>
    );
}