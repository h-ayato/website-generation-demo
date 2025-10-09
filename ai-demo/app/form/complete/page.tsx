import Link from 'next/link';
import styles from '../page.module.css';

export default function CompletePage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div style={{ textAlign: 'center' }}>
          <h1 className={styles.title}>登録完了</h1>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            color: 'var(--foreground)',
            lineHeight: '1.6'
          }}>
            店舗情報の登録が完了しました。<br />
            Webサイトの生成を開始します。
          </p>

          <div style={{
            padding: '24px',
            background: 'rgba(var(--gray-rgb, 0, 0, 0), 0.05)',
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <p style={{ fontSize: '14px', color: 'var(--foreground)', opacity: 0.7 }}>
              ✓ 基本情報の登録<br />
              ✓ 業種別情報の登録<br />
              ✓ Webサイト生成準備完了
            </p>
          </div>

          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'var(--foreground)',
              color: 'var(--background)',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
