// components/footer/Footer.jsx
'use client';

import Link from 'next/link';
import styles from '../../styles/components/footer.module.css';
import company from '../../data/company';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Company info */}
        <div className={styles.companyBlock}>
          <h2 className={styles.companyName}>{company.name}</h2>
          <p className={styles.address}>{company.address.jp}</p>
          <p className={styles.contact}>
            TEL: <a href={`tel:${company.phone.jp}`}>{company.phone.jp}</a><br />
            Email: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>

        {/* Footer nav */}
        <div className={styles.links}>
          <Link href="/(site)/about">会社概要</Link>
          <Link href="/(site)/services">サービス</Link>
          <Link href="/(site)/cases">導入事例</Link>
          <Link href="/(site)/news">ニュース</Link>
          <Link href="/(site)/contact">お問い合わせ</Link>
        </div>

        {/* Legal links */}
        <div className={styles.legal}>
          <Link href="/(legal)/privacy">プライバシーポリシー</Link>
          <Link href="/(legal)/terms">利用規約</Link>
        </div>
      </div>

      <div className={styles.copy}>
        <small>© {new Date().getFullYear()} {company.name}. All rights reserved.</small>
      </div>
    </footer>
  );
}
