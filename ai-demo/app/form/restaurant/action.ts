'use server'

import { redirect } from 'next/navigation'
import { saveMenuItems } from '../repository'

type MenuItemData = {
    id: string
    name: string
    price: string
    description: string
    imageUrl: string
}

export async function createRestaurantMenu(formData: FormData) {
    const menuData = formData.get('menuData') as string
    const menus: MenuItemData[] = JSON.parse(menuData)

    console.log('Restaurant Menu Data:', menus)

    try {
        // 空のメニューを除外してデータベース用に変換
        const validMenus = menus
            .filter(menu => menu.name && menu.price)
            .map(menu => ({
                name: menu.name,
                price: parseInt(menu.price, 10),
                description: menu.description || null,
                imageUrl: menu.imageUrl || null,
            }))

        if (validMenus.length === 0) {
            throw new Error('有効なメニューが入力されていません')
        }

        // データベースに保存
        const savedMenus = await saveMenuItems(validMenus)

        console.log(`${savedMenus.length}件のメニューを保存しました`)

    } catch (error) {
        console.error('メニュー保存エラー:', error)
        throw new Error('メニューの保存に失敗しました')
    }

    // 完了ページまたはプレビューページにリダイレクト
    redirect('/form/complete')
}
