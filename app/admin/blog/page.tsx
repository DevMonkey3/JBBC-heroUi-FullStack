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
import TableRender from 'table-render';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function Blog() {
    const { Header, Sider, Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const dataSource: any = [];
    for (let i = 0; i < 6; i++) {
        dataSource.push({
            id: i.toString(),
            title: `标题${i + 1}`,
            created_at: new Date().getTime(),
        });
    }

    const schema = {
        type: 'object',
        labelWidth: 70,
        properties: {
            title: {
                title: '标题',
                type: 'string'
            },
            created_at: {
                title: '创建时间',
                type: 'string',
                format: 'date'
            }
        }
    };
    const columns:any = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '创建时间',
            key: 'since',
            dataIndex: 'created_at',
            valueType: 'date',
        },
        {
            title: '操作',
            render: (row:any, record:any) => <a onClick={() => alert(row.title)}>编辑</a>,
        }
    ];
    const api:any = () => {
        return {
            data: dataSource,
            total: dataSource.length
        };
    };


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
                <TableRender
                    search={{ schema }}
                    request={api}
                    columns={columns}
                    title='最简表格'
                    toolbarRender={
                        <>
                            <Button>查看日志</Button>
                            <Button>导出数据</Button>
                            <Button type='primary'>
                                <PlusOutlined />
                                新增
                            </Button>
                        </>
                    }
                />
            </div>
        </Content>
    );
}