'use server'

import { redirect } from 'next/navigation'

export async function createRestaurantMenu(formData: FormData) {
    const menuData = formData.get('menuData') as string
    const menus = JSON.parse(menuData)

    console.log('Restaurant Menu Data:', menus)

    // TODO: データベースに保存する処理を追加

    // 完了ページまたはプレビューページにリダイレクト
    redirect('/form/complete')
}
