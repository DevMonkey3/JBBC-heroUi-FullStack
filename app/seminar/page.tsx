'use client';
import { Form, Input, Select, Button, Divider, Typography, Row, Col, Flex, Checkbox ,message} from 'antd';
import { LeftOutlined, RightOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
export default function Seminar() {
  const { Text, Title } = Typography;
const [form] = Form.useForm();
 const [submitting, setSubmitting] = useState(false);
  const RequiredLabel = ({ children }: any) => (
    <span className="flex items-center">
      {children}
      <span className="bg-red-600 text-white px-2 py-0.5 ml-2 rounded text-xs">必須</span>
    </span>
  );

  const content = (
    <div className="relative">
      <img
        src="/seminar/seminarCarousel.png"
        alt="セミナー画像"
        className="w-full h-auto rounded-lg"
      />
      <div className="absolute top-4 right-4 text-right space-y-1">
        <Title level={5} className="text-sm md:text-base lg:text-lg font-medium m-0 max-w-[190px]">
          バングラデシュIT人材採用支援セミナー
        </Title>
        <img
          src="/seminar/seminarIcon.png"
          alt="アイコン"
          className="w-12 md:w-16 lg:w-24 mx-auto"
        />
        <Title level={5} className="text-sm md:text-base lg:text-lg m-0">
          令和7年4月17日(木)
        </Title>
      </div>

      <Title level={4} className="mt-4 text-base md:text-lg lg:text-xl max-w-[320px]">
        バングラデシュIT人材 × 日本企業：DX時代のグローバル戦略セミナー
      </Title>
      <Text className="block mt-2 text-xs md:text-sm lg:text-base text-left max-w-[410px]">
        本セミナーは、外国人ITエンジニアの活用やオフショア開発の推進、そしてDX・AI・クラウド技術の導入を検討している企業様を対象に、バングラデシュ人材の活用可能性について具体的な情報と成功事例をご紹介する場です。
      </Text>
    </div>
  );

  return (
    <div className="mb-20">
      <style>{`
         .orangeButton {
        background-color: #FF6F00;
        color: white;
        border: none;
        margin: 0 auto;
        display: block;
        font-size: 18px;
    }
      `}</style>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Title
            level={1}
            className="text-left text-xl md:text-2xl lg:text-3xl font-bold mb-10 leading-tight"
          >
            バングラデシュ人材セミナー（東京開催）– ノーベル平和賞受賞者 ムハマド・ユヌス教授を特別講演者に迎えて
          </Title>
        </Col>

        {/* 左侧内容 */}
        <Col xs={24} lg={14} className="mb-8 lg:mb-0">
          <div className="space-y-8">
            {/* 教授图片和简介 */}
            <div className="relative">
              <img
                src="/seminar/preson.png"
                alt="Professor Yunus"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-6 right-0 text-right p-3 border-r-[14px] border-[#1AA4DD]">
                <Title level={4} className="text-sm md:text-base lg:text-lg xl:text-xl m-0">
                  ムハマド・ユヌス教授閣下
                </Title>
                <Text className="block mt-1 text-xs md:text-sm lg:text-base xl:text-lg">
                  バングラデシュ人民共和国政府 チーフアドバイザー
                </Text>
                <Text className="block mt-1 text-xs md:text-sm lg:text-base xl:text-lg">
                  2006年 ノーベル平和賞受賞者
                </Text>
              </div>
            </div>

            <Button size="large" shape="round" className="orangeButton bg-orange-500 text-white hover:bg-orange-600 w-full md:w-auto">
              サービス一覧をみる →
            </Button>

            <div>
              <Title level={3} className="text-xl">概要</Title>
              <Divider className="border-black my-4" />
              <Text className="block mt-6 text-sm md:text-base leading-relaxed">
                2025年5月29日（金）、バングラデシュ人民共和国大使館主催による「バングラデシュ人材セミナー」が、**全国都市会館（東京都千代田区平河町）**にて開催されます。
                本セミナーでは、2006年ノーベル平和賞受賞者 ムハマド・ユヌス教授を特別講演者としてお迎えし、日本とバングラデシュの間における人材分野での協力強化について講演をいただきます。
                セミナーでは、バングラデシュの若くて優秀な労働力の可能性、日本における人材不足への対応、三国間労働協力の展望など、戦略的な視点から議論が行われます。政府関係者、企業担当者、人材関連の専門家の皆様のご参加をお待ちしております。
              </Text>
            </div>

            <div>
              <Title level={3} className="text-xl">登壇者</Title>
              <Divider className="border-black my-4" />
              <Row gutter={[16, 16]} align="middle">
                <Col xs={8} md={4}>
                  <img
                    src="/seminar/professor-yunus.png"
                    alt="ムハマド・ユヌス教授"
                    className="w-full h-auto rounded"
                  />
                </Col>
                <Col xs={16} md={12}>
                  <Text strong className="block text-sm md:text-base">ムハマド・ユヌス教授閣下</Text>
                  <Text className="block text-sm md:text-base">バングラデシュ 暫定政権首席顧問</Text>
                  <Text className="block text-sm md:text-base">2006年 ノーベル平和賞受賞者</Text>
                </Col>
              </Row>
              <Text className="block mt-6 text-sm md:text-base leading-relaxed mb-4">
                1940年バングラデシュ・チッタゴン生まれ。ダッカ大学で経済学修士号を取得後、フルブライト奨学金で渡米し、1969年にヴァンダービルト大学にて経済学博士号を取得。帰国後はチッタゴン大学経済学部長を務め、1974年の大飢饉を機に貧困撲滅に取り組む。
                1983年にグラミン銀行を創設し、マイクロクレジットによる経済的自立支援を実践。
                この取り組みは国際的評価を受け、2006年にノーベル平和賞を受賞。2024年8月より暫定政権の首席顧問として国家再建に尽力している。
              </Text>
              <Button size="large" shape="round" className="orangeButton bg-orange-500 text-white hover:bg-orange-600 mt-6 w-full md:w-auto">
                サービス一覧をみる →
              </Button>
            </div>
          </div>
        </Col>

        {/* 右侧表单 */}
        <Col xs={24} lg={10}>
          <div className="bg-blue-50 p-6 rounded-2xl">
            <h1 className="text-xl font-bold mb-6 text-center">お申し込みフォーム</h1>
            <Form
    form={form}
    name="seminarForm"
    layout="vertical"
    onFinish={async (values) => {
      try {
        setSubmitting(true);
        const res = await fetch('/api/inquiry-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            company: values.company,
            phone: values.phone,
            address: values.address,
          }),
        });

        if (!res.ok) throw new Error('Failed to send');
        message.success('送信が完了しました。ありがとうございました。');
        form.resetFields();
      } catch (e) {
        console.error(e);
        message.error('送信に失敗しました。時間をおいて再度お試しください。');
      } finally {
        setSubmitting(false);
      }
    }}
  >
    <Form.Item
      label={<RequiredLabel>お名前（漢字）</RequiredLabel>}
      name="name"
      rules={[{ required: true, message: 'お名前を入力してください' }]}
    >
      <Input placeholder="山田 太郎" />
    </Form.Item>

    <Form.Item
      label={<RequiredLabel>会社名</RequiredLabel>}
      name="company"
      rules={[{ required: true, message: '会社名を入力してください' }]}
    >
      <Input placeholder="キャリアリンクファクトリー株式会社" />
    </Form.Item>

    <Form.Item
      label={<RequiredLabel>電話番号</RequiredLabel>}
      name="phone"
      rules={[{ required: true, message: '電話番号を入力してください' }]}
    >
      <Input placeholder="09012345678" />
    </Form.Item>

    <Form.Item
      label={<RequiredLabel>住所（都道府県）</RequiredLabel>}
      name="address"
      rules={[{ required: true, message: '住所（都道府県）を選択してください' }]}
    >
      <Select placeholder="—以下から選択してください-">
        <Select.Option value="東京都">東京都</Select.Option>
        <Select.Option value="大阪府">大阪府</Select.Option>
        {/* 他の都道府県も必要に応じて追加 */}
      </Select>
    </Form.Item>

    <Form.Item
      label={<RequiredLabel>メールアドレス</RequiredLabel>}
      name="email"
      rules={[
        { required: true, message: 'メールアドレスを入力してください' },
        { type: 'email' as const, message: '有効なメールアドレスを入力してください' },
      ]}
    >
      <Input placeholder="info@jbbc.co.jp" />
    </Form.Item>

    <Form.Item
      name="agreement"
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject(new Error('個人情報の取り扱いに同意してください')),
        },
      ]}
    >
      <div className="text-left text-sm">
        個人情報の取り扱いについては
        <a href="#" className="text-blue-600 underline">こちら</a>
        をご覧ください<br />
        <Checkbox>個人情報の取り扱いについて同意する</Checkbox>
      </div>
    </Form.Item>

    <Form.Item>
      <Button
        size="large"
        shape="round"
        className="orangeButton bg-orange-500 text-white hover:bg-orange-600 w-full"
        htmlType="submit"
        loading={submitting}  // ⬅ shows spinner while sending
      >
        送信する →
      </Button>
    </Form.Item>
  </Form>
          </div>
        </Col>

        {/* アーカイブ */}
        <Col span={24} className="mt-16 ">
          <Title level={2} style={{ color: '#FF6F00',fontWeight: 'bold' }} className="text-center text-[#FF6F00] font-bold text-2xl">
            アーカイブ
          </Title>
          <Text className="block text-center mb-6 text-lg">
            過去のオンラインセミナーの様子を配信しています。
          </Text>

          <Row gutter={[16, 24]} justify="center" className="relative bg-[#eef7fb] p-6 rounded-2xl">
            <Col span={24} >
              <Button
                shape="circle"
                icon={<LeftOutlined />}
                className="bg-white text-black border-none text-xl font-bold mr-2"
              />
              <Button
                shape="circle"
                icon={<RightOutlined />}
                className="bg-white text-black border-none text-xl font-bold"
              />
            </Col>

            {[1, 2, 3].map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <div className="bg-white p-4 rounded-lg shadow">{content}</div>
              </Col>
            ))}

            <Col span={24} className="mt-8 text-center">
              <Button
                size="large"
                shape="round"
                className="orangeButton font-bold text-white hover:bg-orange-600 px-8"
              >
                サービス一覧をみる →
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}