import { prisma } from '@/lib/prisma'
import { ShopInfoData } from './types'
import { Store, Menu } from '@prisma/client'

/**
 * 店舗情報をデータベースに保存する
 * @param data 店舗情報データ
 * @returns 保存された店舗情報
 * @throws データベースエラー
 */
export async function saveShopInfo(data: ShopInfoData): Promise<Store> {
  try {
    const store = await prisma.store.create({
      data: {
        shopName: data.shopName,
        industry: data.industry,
        description: data.description,
        established: data.established,
        prefecture: data.prefecture,
        city: data.city,
        streetAddress: data.streetAddress,
        phone: data.phone,
        email: data.email,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        regularHoliday: data.regularHoliday,
        parking: data.parking,
        websiteUrl: data.websiteUrl,
        instagramUrl: data.instagramUrl,
        xUrl: data.xUrl,
        announcement: data.announcement,
      }
    })

    return store
  } catch (error) {
    console.error('データベース保存エラー:', error)
    throw new Error('店舗情報の保存に失敗しました')
  }
}

/**
 * IDで店舗情報を取得する
 * @param id 店舗ID
 * @returns 店舗情報、見つからない場合はnull
 */
export async function getShopInfoById(id: number): Promise<Store | null> {
  try {
    return await prisma.store.findUnique({
      where: { id }
    })
  } catch (error) {
    console.error('店舗情報取得エラー:', error)
    return null
  }
}

/**
 * すべての店舗情報を取得する
 * @returns 店舗情報の配列
 */
export async function getAllShopInfo(): Promise<Store[]> {
  try {
    return await prisma.store.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('店舗情報一覧取得エラー:', error)
    return []
  }
}

/**
 * メニューアイテムをデータベースに保存する
 * @param data メニューデータ
 * @returns 保存されたメニュー情報
 * @throws データベースエラー
 */
export async function saveMenuItem(data: {
  name: string
  price: number
  description?: string | null
  imageUrl?: string | null
  category?: string | null
  allergyInfo?: string | null
}): Promise<Menu> {
  try {
    const menu = await prisma.menu.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        isAvailable: true,
        allergyInfo: data.allergyInfo,
      }
    })

    return menu
  } catch (error) {
    console.error('メニュー保存エラー:', error)
    throw new Error('メニューの保存に失敗しました')
  }
}

/**
 * 複数のメニューアイテムを一括保存する
 * @param menuItems メニューデータの配列
 * @returns 保存されたメニュー情報の配列
 * @throws データベースエラー
 */
export async function saveMenuItems(menuItems: Array<{
  name: string
  price: number
  description?: string | null
  imageUrl?: string | null
  category?: string | null
  allergyInfo?: string | null
}>): Promise<Menu[]> {
  try {
    const savedMenus = await Promise.all(
      menuItems.map(item => saveMenuItem(item))
    )

    return savedMenus
  } catch (error) {
    console.error('メニュー一括保存エラー:', error)
    throw new Error('メニューの一括保存に失敗しました')
  }
}

/**
 * IDでメニュー情報を取得する
 * @param id メニューID
 * @returns メニュー情報、見つからない場合はnull
 */
export async function getMenuById(id: number): Promise<Menu | null> {
  try {
    return await prisma.menu.findUnique({
      where: { id }
    })
  } catch (error) {
    console.error('メニュー情報取得エラー:', error)
    return null
  }
}

/**
 * すべてのメニュー情報を取得する
 * @returns メニュー情報の配列
 */
export async function getAllMenus(): Promise<Menu[]> {
  try {
    return await prisma.menu.findMany({
      where: {
        isAvailable: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('メニュー情報一覧取得エラー:', error)
    return []
  }
}
// ========================================
// 小売店商品（RetailIndustryMenu）関連の関数
// ========================================

/**
 * 小売店商品をデータベースに保存する
 * @param data 商品データ
 * @returns 保存された商品情報
 * @throws データベースエラー
 */
export async function saveRetailProduct(data: {
  name: string
  price: number
  description?: string | null
  imageUrl?: string | null
  category?: string | null
  allergyInfo?: string | null
}): Promise<any> {
  try {
    const product = await prisma.retailIndustryMenu.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        isAvailable: true,
        allergyInfo: data.allergyInfo,
      }
    })

    return product
  } catch (error) {
    console.error('小売店商品保存エラー:', error)
    throw new Error('小売店商品の保存に失敗しました')
  }
}

/**
 * 複数の小売店商品を一括保存する
 * @param products 商品データの配列
 * @returns 保存された商品情報の配列
 * @throws データベースエラー
 */
export async function saveRetailProducts(
  products: Array<{
    name: string
    price: number
    description?: string | null
    imageUrl?: string | null
    category?: string | null
    allergyInfo?: string | null
  }>
): Promise<any[]> {
  try {
    console.log('[saveRetailProducts] 開始 - 商品数:', products.length)

    const savedProducts: any[] = []
    for (const item of products) {
      console.log(`[saveRetailProducts] 商品保存中 - name: ${item.name}`)

      const product = await prisma.retailIndustryMenu.create({
        data: {
          name: item.name,
          price: item.price,
          description: item.description,
          imageUrl: item.imageUrl,
          category: item.category,
          isAvailable: true,
          allergyInfo: item.allergyInfo,
        }
      })

      savedProducts.push(product)
      console.log(`[saveRetailProducts] 商品保存完了 - id: ${product.id}`)
    }

    console.log('[saveRetailProducts] 全商品保存完了 - 保存数:', savedProducts.length)
    return savedProducts
  } catch (error) {
    console.error('小売店商品一括保存エラー:', error)
    console.error('エラー詳細:', error instanceof Error ? error.message : String(error))
    console.error('スタックトレース:', error instanceof Error ? error.stack : 'なし')
    throw error
  }
}

/**
 * IDで小売店商品情報を取得する
 * @param id 商品ID
 * @returns 商品情報、見つからない場合はnull
 */
export async function getRetailProductById(id: number): Promise<any | null> {
  try {
    return await prisma.retailIndustryMenu.findUnique({
      where: { id }
    })
  } catch (error) {
    console.error('小売店商品情報取得エラー:', error)
    return null
  }
}

/**
 * すべての小売店商品情報を取得する
 * @returns 商品情報の配列
 */
export async function getAllRetailProducts(): Promise<any[]> {
  try {
    return await prisma.retailIndustryMenu.findMany({
      where: {
        isAvailable: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('小売店商品情報一覧取得エラー:', error)
    return []
  }
}

/**
 * 小売店商品情報を更新する
 * @param id 商品ID
 * @param data 更新する商品情報データ
 * @returns 更新された商品情報
 * @throws データベースエラー
 */
export async function updateRetailProduct(id: number, data: {
  name?: string
  price?: number
  description?: string | null
  imageUrl?: string | null
  category?: string | null
  isAvailable?: boolean
  allergyInfo?: string | null
}): Promise<any> {
  try {
    const product = await prisma.retailIndustryMenu.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        isAvailable: data.isAvailable,
        allergyInfo: data.allergyInfo,
      }
    })

    return product
  } catch (error) {
    console.error('小売店商品更新エラー:', error)
    throw new Error('小売店商品の更新に失敗しました')
  }
}

/**
 * 小売店商品情報を削除する
 * @param id 商品ID
 * @throws データベースエラー
 */
export async function deleteRetailProduct(id: number): Promise<void> {
  try {
    await prisma.retailIndustryMenu.delete({
      where: { id }
    })
  } catch (error) {
    console.error('小売店商品削除エラー:', error)
    throw new Error('小売店商品の削除に失敗しました')
  }
}
