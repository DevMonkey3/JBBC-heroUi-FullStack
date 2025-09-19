'use client';
import { Form, Input, Select, Button, Divider, Typography, Row, Col, Flex, Checkbox ,message} from 'antd';
import { LeftOutlined, RightOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
export default function Services() {
  const { Text, Title } = Typography;
const [form] = Form.useForm();
 const [submitting, setSubmitting] = useState(false);
  // const RequiredLabel = ({ children }: any) => (
  //   <span className="flex items-center">
  //     {children}
  //     <span className="bg-red-600 text-white px-2 py-0.5 ml-2 rounded text-xs">必須</span>
  //   </span>
  // );

  // const content = (
  //   <div className="relative">
  //     <img
  //       src="/seminar/seminarCarousel.png"
  //       alt="セミナー画像"
  //       className="w-full h-auto rounded-lg"
  //     />
  //     <div className="absolute top-4 right-4 text-right space-y-1">
  //       <Title level={5} className="text-sm md:text-base lg:text-lg font-medium m-0 max-w-[190px]">
  //         バングラデシュIT人材採用支援セミナー
  //       </Title>
  //       <img
  //         src="/seminar/seminarIcon.png"
  //         alt="アイコン"
  //         className="w-12 md:w-16 lg:w-24 mx-auto"
  //       />
  //       <Title level={5} className="text-sm md:text-base lg:text-lg m-0">
  //         令和7年4月17日(木)
  //       </Title>
  //     </div>

  //     <Title level={4} className="mt-4 text-base md:text-lg lg:text-xl max-w-[320px]">
  //       バングラデシュIT人材 × 日本企業：DX時代のグローバル戦略セミナー
  //     </Title>
  //     <Text className="block mt-2 text-xs md:text-sm lg:text-base text-left max-w-[410px]">
  //       本セミナーは、外国人ITエンジニアの活用やオフショア開発の推進、そしてDX・AI・クラウド技術の導入を検討している企業様を対象に、バングラデシュ人材の活用可能性について具体的な情報と成功事例をご紹介する場です。
  //     </Text>
  //   </div>
  // );

  return (
    <div>

    </div>
  );
}