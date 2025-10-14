import { getAllShopInfo, getAllMenus } from '@/app/form/repository'
import Link from 'next/link'

export default async function DataListPage() {
  // SQLiteからデータを取得
  const stores = await getAllShopInfo()
  const menus = await getAllMenus()

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">保存されたデータ一覧</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
            トップページに戻る
          </Link>
        </div>

        {/* 店舗情報セクション */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              店舗情報 ({stores.length}件)
            </h2>
          </div>

          {stores.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              登録されている店舗情報がありません
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stores.map((store) => (
                <div key={store.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{store.shopName}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {store.industry}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{store.description}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <span className="font-semibold min-w-20">📍 住所:</span>
                      <span>{store.prefecture}{store.city}{store.streetAddress}</span>
                    </div>

                    {store.phone && (
                      <div className="flex items-start">
                        <span className="font-semibold min-w-20">📞 電話:</span>
                        <span>{store.phone}</span>
                      </div>
                    )}

                    {store.email && (
                      <div className="flex items-start">
                        <span className="font-semibold min-w-20">✉️ メール:</span>
                        <span className="break-all">{store.email}</span>
                      </div>
                    )}

                    <div className="flex items-start">
                      <span className="font-semibold min-w-20">🕐 営業時間:</span>
                      <span>{store.openingTime} - {store.closingTime}</span>
                    </div>

                    {store.regularHoliday && (
                      <div className="flex items-start">
                        <span className="font-semibold min-w-20">🗓️ 定休日:</span>
                        <span>{store.regularHoliday}</span>
                      </div>
                    )}

                    {store.announcement && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">お知らせ</p>
                        <p className="text-sm text-yellow-700">{store.announcement}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    登録日: {new Date(store.createdAt).toLocaleDateString('ja-JP')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* メニュー情報セクション */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              メニュー情報 ({menus.length}件)
            </h2>
          </div>

          {menus.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              登録されているメニューがありません
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {menus.map((menu) => (
                <div key={menu.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {menu.imageUrl && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={menu.imageUrl}
                        alt={menu.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{menu.name}</h3>

                    <div className="mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        ¥{menu.price.toLocaleString()}
                      </span>
                    </div>

                    {menu.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {menu.description}
                      </p>
                    )}

                    {menu.category && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
                        {menu.category}
                      </span>
                    )}

                    {menu.allergyInfo && (
                      <div className="mt-2 text-xs text-red-600">
                        ⚠️ {menu.allergyInfo}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                      登録日: {new Date(menu.createdAt).toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
