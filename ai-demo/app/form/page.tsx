'use client'

import { createShopInfo } from '@/app/form/form';
import styles from './page.module.css';
import { prefectures } from './prefectures';
import { useState, useEffect } from 'react';

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maxYear, setMaxYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setMaxYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await createShopInfo(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <a
            href="/data"
            style={{
              color: '#3b82f6',
              textDecoration: 'underline',
              fontSize: '0.95rem'
            }}
          >
            📊 保存されたデータを見る
          </a>
        </div>
        <h1 className={styles.title}>店舗情報登録</h1>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        <form action={handleSubmit} className={styles.form}>

        <div className={styles.formGroup}>
          <label htmlFor="shopName" className={styles.label}>店舗名</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="industry" className={styles.label}>業種</label>
          <select
            id="industry"
            name="industry"
            className={styles.select}
            required
          >
            <option value="">選択してください</option>
            <option value="restaurant">飲食店</option>
            <option value="retail">小売店</option>
            <option value="service">サービス業</option>
            <option value="beauty">美容・サロン</option>
            <option value="healthcare">医療・福祉</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>概要説明</label>
          <textarea
            id="description"
            name="description"
            className={styles.textarea}
            required
            rows={5}
            placeholder="お店の特徴や魅力を入力してください"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="established" className={styles.label}>設立年</label>
          <input
            type="number"
            id="established"
            name="established"
            className={styles.input}
            min="1900"
            max={maxYear}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="prefecture" className={styles.label}>都道府県</label>
          <select
            id="prefecture"
            name="prefecture"
            className={styles.select}
            required
          >
            <option value="">選択してください</option>
            {prefectures.map((pref) => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city" className={styles.label}>市区町村</label>
          <input
            type="text"
            id="city"
            name="city"
            className={styles.input}
            placeholder="例: 渋谷区"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="streetAddress" className={styles.label}>番地・建物名</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            className={styles.input}
            placeholder="例: 1-2-3 ABCビル4F"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>電話番号</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={styles.input}
            placeholder="03-1234-5678"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="openingTime" className={styles.label}>開店時刻</label>
          <input
            type="time"
            id="openingTime"
            name="openingTime"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="closingTime" className={styles.label}>閉店時刻</label>
          <input
            type="time"
            id="closingTime"
            name="closingTime"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="regularHoliday" className={styles.label}>定休日</label>
          <input
            type="text"
            id="regularHoliday"
            name="regularHoliday"
            className={styles.input}
            placeholder="例: 毎週月曜日、第3火曜日"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="parking" className={styles.label}>駐車場</label>
          <select
            id="parking"
            name="parking"
            className={styles.select}
          >
            <option value="">選択してください</option>
            <option value="available">あり</option>
            <option value="unavailable">なし</option>
            <option value="nearby">近隣にあり</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="websiteUrl" className={styles.label}>公式サイトURL</label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            className={styles.input}
            placeholder="https://example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="instagramUrl" className={styles.label}>Instagram URL</label>
          <input
            type="url"
            id="instagramUrl"
            name="instagramUrl"
            className={styles.input}
            placeholder="https://instagram.com/yourshop"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="xUrl" className={styles.label}>X (旧Twitter) URL</label>
          <input
            type="url"
            id="xUrl"
            name="xUrl"
            className={styles.input}
            placeholder="https://x.com/yourshop"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="announcement" className={styles.label}>店舗からのお知らせ</label>
          <textarea
            id="announcement"
            name="announcement"
            className={styles.textarea}
            rows={4}
            placeholder="新メニューやキャンペーン情報など"
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : '次へ（業種別情報入力）'}
        </button>
      </form>
      </div>
    </div>
  );
}