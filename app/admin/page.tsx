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

export default function Home() {
    const router = useRouter();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(['1']);
    
    return (
        // <Layout>
        //     <Sider trigger={null} collapsible collapsed={collapsed}>
        //         <div className="demo-logo-vertical" />
        //         <AdminMenu 
        //           defaultSelectedKeys={defaultSelectedKeys} 
        //           onSelect={(e: any) => {
        //             // 可以在这里处理其他逻辑
        //             console.log('Selected menu item:', e);
        //           }} 
        //         />
        //     </Sider>
        //     <Layout>
        //         <Header style={{ padding: 0, background: colorBgContainer }}>
        //             <Button
        //                 type="text"
        //                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        //                 onClick={() => setCollapsed(!collapsed)}
        //                 style={{
        //                     fontSize: '16px',
        //                     width: 64,
        //                     height: 64,
        //                 }}
        //             />
        //         </Header>
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
                        <h1>Admin Dashboard</h1>
                        <p>Welcome to the management system</p>
                    </div>
                </Content>
        //     </Layout>
        // </Layout>
    );
}