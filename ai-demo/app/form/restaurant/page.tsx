'use client'

import { useState } from 'react';
import { createRestaurantMenu } from './action';
import styles from '../page.module.css';

type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
};

export default function RestaurantMenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: '', price: '', description: '', imageUrl: '' }
  ]);

  const addMenuItem = () => {
    const newId = (menuItems.length + 1).toString();
    setMenuItems([...menuItems, { id: newId, name: '', price: '', description: '', imageUrl: '' }]);
  };

  const removeMenuItem = (id: string) => {
    if (menuItems.length > 1) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const updateMenuItem = (id: string, field: keyof MenuItem, value: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>メニュー情報登録</h1>
        <p style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--foreground)', opacity: 0.7 }}>
          お店のメニューを登録してください
        </p>

        <form action={createRestaurantMenu} className={styles.form}>
          {menuItems.map((item, index) => (
            <div key={item.id} style={{
              padding: '24px',
              border: '1px solid rgba(var(--gray-rgb, 0, 0, 0), 0.1)',
              borderRadius: '12px',
              position: 'relative',
              background: 'var(--background)'
            }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
                メニュー {index + 1}
              </h3>

              {menuItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMenuItem(item.id)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  削除
                </button>
              )}

              <div className={styles.formGroup}>
                <label htmlFor={`menuName-${item.id}`} className={styles.label}>
                  メニュー名
                </label>
                <input
                  type="text"
                  id={`menuName-${item.id}`}
                  name={`menuName-${item.id}`}
                  className={styles.input}
                  value={item.name}
                  onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                  required
                  placeholder="例: マルゲリータピザ"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`menuPrice-${item.id}`} className={styles.label}>
                  価格（円）
                </label>
                <input
                  type="number"
                  id={`menuPrice-${item.id}`}
                  name={`menuPrice-${item.id}`}
                  className={styles.input}
                  value={item.price}
                  onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                  required
                  placeholder="例: 1200"
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`menuDescription-${item.id}`} className={styles.label}>
                  メニューの説明
                </label>
                <textarea
                  id={`menuDescription-${item.id}`}
                  name={`menuDescription-${item.id}`}
                  className={styles.textarea}
                  value={item.description}
                  onChange={(e) => updateMenuItem(item.id, 'description', e.target.value)}
                  rows={3}
                  placeholder="メニューの特徴や使用している食材など"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`menuImage-${item.id}`} className={styles.label}>
                  画像URL
                </label>
                <input
                  type="url"
                  id={`menuImage-${item.id}`}
                  name={`menuImage-${item.id}`}
                  className={styles.input}
                  value={item.imageUrl}
                  onChange={(e) => updateMenuItem(item.id, 'imageUrl', e.target.value)}
                  placeholder="https://example.com/menu-image.jpg"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMenuItem}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: '2px dashed rgba(var(--gray-rgb, 0, 0, 0), 0.3)',
              borderRadius: '8px',
              color: 'var(--foreground)',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            + メニューを追加
          </button>

          <input type="hidden" name="menuData" value={JSON.stringify(menuItems)} />

          <button type="submit" className={styles.submitButton}>
            Webサイトを作成する
          </button>
        </form>
      </div>
    </div>
  );
}
