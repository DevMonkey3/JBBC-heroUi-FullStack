'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Select, Button, Checkbox, Typography, Row, Col, Divider, Spin, Modal, message } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, UserOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Seminar {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  excerpt?: string;
  heroImage?: string;
  speakerName?: string;
  speakerTitle?: string;
  speakerOrg?: string;
}

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

export default function SeminarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (slug) {
      fetchSeminar();
    }
  }, [slug]);

  const fetchSeminar = async () => {
    try {
      const res = await fetch(`/api/seminars/${slug}`);
      if (!res.ok) throw new Error('Seminar not found');
      const data = await res.json();
      setSeminar(data.seminar);
    } catch (error) {
      console.error('Error fetching seminar:', error);
      message.error('セミナー情報の取得に失敗しました');
      router.push('/seminar');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async (values: any) => {
    if (!seminar) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/seminar/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seminarId: seminar.id,
          seminarTitle: seminar.title,
          name: values.name,
          companyName: values.companyName,
          phone: values.phone,
          prefecture: values.prefecture,
          email: values.email,
          consentPI: values.consentPI,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || '送信に失敗しました');
      }

      setSuccessModalVisible(true);
      form.resetFields();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      message.error(error.message || '送信に失敗しました。もう一度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="flex items-center">
      {children}
      <span className="bg-red-600 text-white px-2 py-0.5 ml-2 rounded text-xs">必須</span>
    </span>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!seminar) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Row gutter={[32, 32]}>
        {/* Left Column - Seminar Details */}
        <Col xs={24} lg={14}>
          {/* Hero Image */}
          {seminar.heroImage && (
            <div className="mb-6 rounded-lg overflow-hidden relative w-full h-[400px]">
              <Image
                src={seminar.heroImage}
                alt={seminar.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          )}

          {/* Title */}
          <Title level={1} className="!text-2xl md:!text-3xl !mb-4">
            {seminar.title}
          </Title>

          {/* Meta Info */}
          <div className="bg-[#eef7fb] p-4 rounded-lg mb-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <CalendarOutlined className="text-[#1AA4DD] text-xl mr-3 mt-1" />
                <div>
                  <Text strong className="block">開催日時</Text>
                  <Text>{formatDate(seminar.startsAt)}</Text>
                  <br />
                  <Text>
                    {formatTime(seminar.startsAt)} - {formatTime(seminar.endsAt)}
                  </Text>
                </div>
              </div>
              <Divider className="!my-2" />
              <div className="flex items-start">
                <EnvironmentOutlined className="text-[#1AA4DD] text-xl mr-3 mt-1" />
                <div>
                  <Text strong className="block">開催場所</Text>
                  <Text>{seminar.location}</Text>
                </div>
              </div>
              {(seminar.speakerName || seminar.speakerTitle) && (
                <>
                  <Divider className="!my-2" />
                  <div className="flex items-start">
                    <UserOutlined className="text-[#1AA4DD] text-xl mr-3 mt-1" />
                    <div>
                      <Text strong className="block">登壇者</Text>
                      <Text className="block">{seminar.speakerName}</Text>
                      {seminar.speakerTitle && (
                        <Text className="text-sm text-gray-600">{seminar.speakerTitle}</Text>
                      )}
                      {seminar.speakerOrg && (
                        <Text className="block text-sm text-gray-600">{seminar.speakerOrg}</Text>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <Title level={3} className="!text-xl !mb-4">セミナー概要</Title>
            <Divider className="border-black !mb-4" />
            <div className="whitespace-pre-wrap">
              <Text className="text-base leading-relaxed">{seminar.description}</Text>
            </div>
          </div>
        </Col>

        {/* Right Column - Registration Form */}
        <Col xs={24} lg={10}>
          <div className="bg-blue-50 p-6 rounded-2xl sticky top-4">
            <Title level={2} className="!text-xl !mb-6 text-center">
              お申し込みフォーム
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              scrollToFirstError
            >
              <Form.Item
                label={<RequiredLabel>お名前</RequiredLabel>}
                name="name"
                rules={[
                  { required: true, message: 'お名前を入力してください' },
                  { min: 2, message: 'お名前は2文字以上で入力してください' },
                ]}
              >
                <Input placeholder="山田 太郎" size="large" />
              </Form.Item>

              <Form.Item
                label={<span>会社名</span>}
                name="companyName"
              >
                <Input placeholder="株式会社〇〇" size="large" />
              </Form.Item>

              <Form.Item
                label={<RequiredLabel>電話番号</RequiredLabel>}
                name="phone"
                rules={[
                  { required: true, message: '電話番号を入力してください' },
                  { pattern: /^[\d-]+$/, message: '有効な電話番号を入力してください' },
                ]}
              >
                <Input placeholder="090-1234-5678" size="large" />
              </Form.Item>

              <Form.Item
                label={<RequiredLabel>都道府県</RequiredLabel>}
                name="prefecture"
                rules={[{ required: true, message: '都道府県を選択してください' }]}
              >
                <Select placeholder="選択してください" size="large">
                  {PREFECTURES.map((pref) => (
                    <Select.Option key={pref} value={pref}>
                      {pref}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={<RequiredLabel>メールアドレス</RequiredLabel>}
                name="email"
                rules={[
                  { required: true, message: 'メールアドレスを入力してください' },
                  { type: 'email', message: '有効なメールアドレスを入力してください' },
                ]}
              >
                <Input placeholder="example@email.com" size="large" />
              </Form.Item>

              <Form.Item>
                <div className="text-xs text-gray-600 mb-2">
                  個人情報の取り扱いについては
                  <a href="/legal/privacy" className="text-blue-600 underline ml-1">
                    こちら
                  </a>
                  をご覧ください
                </div>
              </Form.Item>

              <Form.Item
                name="consentPI"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('個人情報の取り扱いに同意してください')),
                  },
                ]}
              >
                <Checkbox>個人情報の取り扱いについて同意する</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={submitting}
                  className="!bg-[#FF6F00] hover:!bg-[#e56300] !border-none !font-semibold"
                  icon={<RightOutlined />}
                  iconPosition="end"
                >
                  {submitting ? '送信中...' : '申し込む'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal
        open={successModalVisible}
        onOk={() => {
          setSuccessModalVisible(false);
          router.push('/seminar');
        }}
        onCancel={() => {
          setSuccessModalVisible(false);
          router.push('/seminar');
        }}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setSuccessModalVisible(false);
              router.push('/seminar');
            }}
            className="!bg-[#1AA4DD]"
          >
            セミナー一覧に戻る
          </Button>,
        ]}
        centered
      >
        <div className="text-center py-6">
          <div className="text-6xl mb-4 text-green-500">✓</div>
          <Title level={3} className="!text-green-600 !mb-4">
            お申し込みありがとうございます
          </Title>
          <Text className="text-base">
            セミナーへのお申し込みを受け付けました。
            <br />
            ご登録いただいたメールアドレスに確認メールをお送りします。
            <br />
            <br />
            当日お会いできることを楽しみにしております。
          </Text>
        </div>
      </Modal>
    </div>
  );
}
