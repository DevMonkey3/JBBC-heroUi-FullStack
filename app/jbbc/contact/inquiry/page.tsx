'use client';
import { Form, Input, Select, Button, Typography, Row, Col, Checkbox, Segmented } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Image from "next/image";
// import './globals.css'; // 确保引入了 Noto Sans JP
import { useState } from 'react';
import Breadcrumbs from "@/components/breadcrumb/page";
import BgFont from "@/components/bgFont/BgFont";

export default function Inquiry() {
  const { Text, Title } = Typography;
  const [form] = Form.useForm();
  const [SegmentedValue, setSegmentedValue] = useState('法人');
  const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center font-noto font-semibold text-base md:text-[22.1px] leading-relaxed tracking-[0%]">
      {children}
      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">必須</span>
    </div>
  );

  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    {
      key: "top",
      title: <span style={{ color: "#019cd4" }}>top</span>,
      path: '/jbbc/contact/inquiry',
    },
    {
      key: "cases",
      title: "お問い合わせ",
      path: '/jbbc/contact/inquiry',
    },
  ]);

  return (
    <div>
      <Row >
        <Col span={24} className="bg-white">
          <div className="mb-10 px-4 md:px-6 lg:px-8">
            <Breadcrumbs
              breadcrumb={breadcrumbData}
              pageTitle={'inquiry'}
              breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
            />
            <BgFont textBg={'inquiry'} title={'お問い合わせ'} />

            {/* <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-sm">inquiry</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">お問い合わせ</h1>

          <p className="text-xs md:text-sm text-gray-600 mb-6 md:mb-8">
            <a href="#" className="text-blue-500 hover:underline">top</a> / お問い合わせ
          </p>

          <div className="relative w-full from-blue-50 to-blue-100 flex items-center justify-center  ">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">お問い合わせ</h2>
          </div> */}

            {/* Contact Information Card */}
            <div className="mt-8 md:mt-12 bg-[#eaf7fc] p-4 md:p-6 rounded-xl max-w-4xl mx-auto">
              <Title level={5} className="mb-2 text-center font-bold text-base md:text-lg">
                お電話でのお問い合わせ
              </Title>
              <p className="text-center text-[#000000] text-sm md:text-base mb-3">
                法人受付窓口 Not for job search purposes
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src="/icon/iphone.png"
                  alt="Phone Icon"
                />
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                  03-6279-1289
                </p>
                <p className="text-lg md:text-xl font-medium text-gray-700">
                  受付時間: 平日9:00~17:00
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-center mt-6 md:mt-8 text-[#000000] text-sm md:text-base font-medium px-4">
              お問い合わせありがとうございます。下記の項目をご入力ください。
            </p>
          </div>
        </Col>

        <Col span={24} >
          <div className="w-full bg-[#eaf7fc] p-8 ">
            <div className="text-center align-middle bg-white rounded-tl-[40px] md:rounded-tl-[110px] rounded-br-[40px] md:rounded-br-[110px] shadow-lg">
              <div className="max-w-screen-lg mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12">

                {/* 法人・個人区分 */}
                <Title level={4} className="text-center mb-4 font-noto font-semibold text-lg md:text-xl">法人・個人区分</Title>
                <div className="flex justify-center mb-6 px-4">
                  <Segmented
                    size="large"
                    shape="round"
                    value={SegmentedValue}
                    onChange={(e) => {
                      setSegmentedValue(e)
                    }}
                    //   className="w-full md:w-auto"
                    options={[
                      { label: '法人', value: '法人' },
                      { label: '個人', value: '個人' },
                    ]}
                  />
                </div>

                {/* 表单内容 */}
                {SegmentedValue == '法人' ? <Form form={form} layout="vertical" className="space-y-6">

                  {/* お問い合わせ内容種別 */}
                  <Form.Item label={<RequiredLabel>お問い合わせ内容種別</RequiredLabel>} required>
                    <Checkbox.Group >
                      <Checkbox value="1" style={{ fontSize: '20px', fontWeight: 'bold' }}>人材のご相談</Checkbox>
                      <Checkbox value="2" style={{ fontSize: '20px', fontWeight: 'bold' }}>資料請求</Checkbox>
                      <Checkbox value="3" style={{ fontSize: '20px', fontWeight: 'bold' }}>その他</Checkbox>
                    </Checkbox.Group>
                  </Form.Item>

                  {/* 会社名 */}
                  <Form.Item label={<RequiredLabel>会社名</RequiredLabel>} rules={[{ required: true }]}>
                    <Input placeholder="ジャパンバングラデシュブリッジ株式会社" size="large" />
                  </Form.Item>

                  {/* お名前（漢字） */}
                  <Form.Item label={<RequiredLabel>お名前（漢字）</RequiredLabel>} rules={[{ required: true }]}>
                    <Input placeholder="山田 太郎" size="large" />
                  </Form.Item>

                  {/* メールアドレス */}
                  <Form.Item label={<RequiredLabel>メールアドレス</RequiredLabel>} rules={[{ required: true }]}>
                    <Input placeholder="info@bbc.co.jp" size="large" />
                  </Form.Item>

                  {/* 電話番号 */}
                  <Form.Item label={<RequiredLabel>電話番号</RequiredLabel>} rules={[{ required: true }]}>
                    <Input placeholder="0362791289" size="large" />
                  </Form.Item>

                  {/* 住所 — 响应式网格 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label={<RequiredLabel>郵便番号</RequiredLabel>} rules={[{ required: true }]}>
                      <Input placeholder="1234567" size="large" />
                    </Form.Item>
                    <Form.Item label={<RequiredLabel>都道府県</RequiredLabel>} rules={[{ required: true }]}>
                      <Select placeholder="選択してください" size="large">
                        <Select.Option value="tokyo">東京都</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <Form.Item label={<RequiredLabel>市区町村/番地</RequiredLabel>} rules={[{ required: true }]}>
                    <Input placeholder="〒 160-0023 東京都新宿区西新宿7丁目22-39 興亜第二ビル703" size="large" />
                  </Form.Item>

                  {/* 事業内容 */}
                  <Form.Item label={<RequiredLabel>事業内容</RequiredLabel>} rules={[{ required: true }]}>
                    <Input placeholder="例：ITコンサルティング" size="large" />
                  </Form.Item>

                  {/* お問い合わせ内容 */}
                  <Form.Item label={<RequiredLabel>お問い合わせ内容</RequiredLabel>} rules={[{ required: true }]}>
                    <Input.TextArea rows={6} className="text-sm md:text-base" />
                  </Form.Item>

                  {/* 個人情報の取り扱いについて */}
                  <Form.Item>
                    <Input.TextArea
                      rows={8}
                      readOnly
                      className="text-sm md:text-base"
                      value={`【個人情報の取り扱いについて】
情報をご送信いただく前に、下記の内容を必ずお読みいただき、ご同意いただける場合は「同意する」にチェックを入れて「確認する」ボタンをクリックしてください。
当社はお預かりした皆様の個人情報について、以下の通り適切に管理・保護に努めます。
1. 個人情報保護管理者の氏名または職名、所属および連絡先
当社は、以下の者を個人情報保護管理者として任命し、個人情報を適切かつ安全に管理するとともに、漏えい・滅失・き損の防止に必要な保護策を講じています。
ジャパンバングラブリッジ株式会社
個人情報保護管理者：管理部　管理部長（個人情報保護マネジメントシステム管理者）
所在地：〒 160-0023 東京都新宿区西新宿7丁目22-39興亜第二ビル703
電話：03-6279-1289
FAX：03-6279-1287
E-Mail：info@jbbc.co.jp
URL: jbbc.co.jp`}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Checkbox className="text-base">個人情報の取り扱いについて同意する</Checkbox>
                  </Form.Item>

                  {/* 提交按钮 */}
                  <Form.Item className="mt-6 md:mt-8">
                    <Button
                      style={{ background: '#1b9bd8', color: 'white' }}
                      size="large"
                      htmlType="submit"
                      shape="round"
                      icon={<RightOutlined />}
                      className="w-full md:w-auto px-8 py-2 md:px-12 md:py-3 text-base md:text-lg font-noto font-semibold"
                    >
                      送信する
                    </Button>
                  </Form.Item>
                </Form> :
                  <Form form={form} layout="vertical" className="space-y-6">

                    {/* お問い合わせ内容種別 */}
                    <Form.Item label={<RequiredLabel>お問い合わせ内容種別</RequiredLabel>} required>
                      <Checkbox.Group >
                        <Checkbox value="1" style={{ fontSize: '20px', fontWeight: 'bold' }}>お仕事探しについて</Checkbox>
                        <Checkbox value="2" style={{ fontSize: '20px', fontWeight: 'bold' }}>その他</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>

                    {/* お名前（漢字） */}
                    <Form.Item label={<RequiredLabel>お名前（漢字）</RequiredLabel>} rules={[{ required: true }]}>
                      <Input placeholder="山田 太郎" size="large" />
                    </Form.Item>

                    {/* メールアドレス */}
                    <Form.Item label={<RequiredLabel>メールアドレス</RequiredLabel>} rules={[{ required: true }]}>
                      <Input placeholder="info@bbc.co.jp" size="large" />
                    </Form.Item>

                    {/* 電話番号 */}
                    <Form.Item label={<RequiredLabel>電話番号</RequiredLabel>} rules={[{ required: true }]}>
                      <Input placeholder="0362791289" size="large" />
                    </Form.Item>

                    {/* 住所 — 响应式网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                      <Form.Item style={{ display: 'block' }} label={<div><RequiredLabel>住所/郵便番号</RequiredLabel></div>} rules={[{ required: true }]}>
                        <Input placeholder="1234567" size="large" />
                      </Form.Item>
                      <Form.Item label={<RequiredLabel>都道府県</RequiredLabel>} rules={[{ required: true }]}>
                        <Select placeholder="選択してください" size="large">
                          <Select.Option value="tokyo">東京都</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <Form.Item label={<RequiredLabel>市区町村/番地</RequiredLabel>} rules={[{ required: true }]}>
                      <Input placeholder="〒 160-0023 東京都新宿区西新宿7丁目22-39 興亜第二ビル703" size="large" />
                    </Form.Item>

                    {/* お問い合わせ内容 */}
                    <Form.Item label={<RequiredLabel>お問い合わせ内容</RequiredLabel>} rules={[{ required: true }]}>
                      <Input.TextArea rows={6} className="text-sm md:text-base" />
                    </Form.Item>

                    {/* 個人情報の取り扱いについて */}
                    <Form.Item>
                      <Input.TextArea
                        rows={8}
                        readOnly
                        className="text-sm md:text-base"
                        value={`【個人情報の取り扱いについて】
情報をご送信いただく前に、下記の内容を必ずお読みいただき、ご同意いただける場合は「同意する」にチェックを入れて「確認する」ボタンをクリックしてください。
当社はお預かりした皆様の個人情報について、以下の通り適切に管理・保護に努めます。
1. 個人情報保護管理者の氏名または職名、所属および連絡先
当社は、以下の者を個人情報保護管理者として任命し、個人情報を適切かつ安全に管理するとともに、漏えい・滅失・き損の防止に必要な保護策を講じています。
ジャパンバングラブリッジ株式会社
個人情報保護管理者：管理部　管理部長（個人情報保護マネジメントシステム管理者）
所在地：〒 160-0023 東京都新宿区西新宿7丁目22-39興亜第二ビル703
電話：03-6279-1289
FAX：03-6279-1287
E-Mail：info@jbbc.co.jp
URL: jbbc.co.jp`}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Checkbox className="text-base">個人情報の取り扱いについて同意する</Checkbox>
                    </Form.Item>

                    {/* 提交按钮 */}
                    <Form.Item className="mt-6 md:mt-8">
                      <Button
                        style={{ background: '#1b9bd8', color: 'white' }}
                        size="large"
                        htmlType="submit"
                        shape="round"
                        icon={<RightOutlined />}
                        className="w-full md:w-auto px-8 py-2 md:px-12 md:py-3 text-base md:text-lg font-noto font-semibold"
                      >
                        送信する
                      </Button>
                    </Form.Item>
                  </Form>}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}