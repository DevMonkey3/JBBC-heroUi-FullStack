// components/headers/MainNav.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Popup, List } from 'antd-mobile';
import styles from '../../styles/components/main-nav.module.css';
import navItems from '../../data/nav';

export default function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.nav}>
      <div className={styles.row}>
        {/* Left: logo */}
        <div className={styles.left}>
          <Link href="/" className={styles.logo} aria-label="JBBC Home">
            <Image
              src="/images/brand/logo.svg"
              alt="JBBC"
              width={120}
              height={32}
              priority
            />
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className={`${styles.menu} ${styles.hiddenMobile}`}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.menuItem}>
              <Link href={item.href}>{item.label}</Link>
              {item.children && (
                <ul className={styles.submenu}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className={`${styles.mobileToggle} ${styles.hiddenDesktop}`}
          type="button"
          aria-label="メニュー"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu popup */}
      <Popup
        visible={open}
        onMaskClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        position="left"
        bodyStyle={{ width: '80%', maxWidth: 320 }}
      >
        <nav className={styles.mobileNav} aria-label="モバイルナビゲーション">
          <List>
            {navItems.map((item) => (
              <List.Item key={item.href} onClick={() => setOpen(false)}>
                <Link href={item.href}>{item.label}</Link>
                {item.children && (
                  <ul className={styles.mobileSubmenu}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </List.Item>
            ))}
          </List>
        </nav>
      </Popup>
    </div>
  );
}
