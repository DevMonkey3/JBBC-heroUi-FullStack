'use client'
import { useState } from 'react';
import { Card, Input, Button, message, Typography, Result } from 'antd';
import { MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

export default function UnsubscribePage() {
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  const handleUnsubscribe = async (email: string) => {
    if (!email || !email.includes('@')) {
      message.error('有効なメールアドレスを入力してください');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setUnsubscribed(true);
        message.success('ニュースレターの配信を停止しました');
      } else if (res.status === 404) {
        message.warning('このメールアドレスは登録されていません');
      } else {
        message.error(data.error || '配信停止に失敗しました');
      }
    } catch (error) {
      message.error('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  if (unsubscribed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          <Result
            status="success"
            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            title="配信停止が完了しました"
            subTitle="ニュースレターの配信を停止しました。ご利用ありがとうございました。"
            extra={[
              <Link href="/" key="home">
                <Button type="primary" size="large">
                  ホームに戻る
                </Button>
              </Link>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <MailOutlined className="text-3xl text-orange-600" />
            </div>
            <Title level={2} className="!mb-2">
              ニュースレター配信停止
            </Title>
            <Paragraph type="secondary" className="text-base">
              ニュースレターの配信を停止する場合は、登録されているメールアドレスを入力してください。
            </Paragraph>
          </div>

          <div className="max-w-md mx-auto">
            <Search
              placeholder="メールアドレスを入力してください"
              allowClear
              enterButton="配信停止"
              size="large"
              onSearch={handleUnsubscribe}
              loading={loading}
              disabled={loading}
              className="mb-6"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Text className="text-sm text-gray-700">
                <strong>ご注意:</strong> 配信を停止すると、JBBCからのすべてのニュースレター、お知らせ、セミナー情報が届かなくなります。
              </Text>
            </div>

            <div className="text-center mt-6">
              <Link href="/" className="text-blue-600 hover:underline">
                ホームに戻る
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
