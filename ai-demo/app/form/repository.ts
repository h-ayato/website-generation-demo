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
