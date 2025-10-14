'use server'

import { redirect } from 'next/navigation'
import { saveShopInfo } from './repository'
import { ShopInfoData } from './types'

/**
 * フォームデータから店舗情報を作成し、データベースに保存する
 * @param formData フォームから送信されたデータ
 */
export async function createShopInfo(formData: FormData) {
    // フォームデータの取得
    const shopName = formData.get('shopName') as string
    const industry = formData.get('industry') as string
    const description = formData.get('description') as string
    const establishedStr = formData.get('established') as string
    const prefecture = formData.get('prefecture') as string
    const city = formData.get('city') as string
    const streetAddress = formData.get('streetAddress') as string
    const phone = formData.get('phone') as string | null
    const email = formData.get('email') as string | null
    const openingTime = formData.get('openingTime') as string
    const closingTime = formData.get('closingTime') as string
    const regularHoliday = formData.get('regularHoliday') as string | null
    const parking = formData.get('parking') as string | null
    const websiteUrl = formData.get('websiteUrl') as string | null
    const instagramUrl = formData.get('instagramUrl') as string | null
    const xUrl = formData.get('xUrl') as string | null
    const announcement = formData.get('announcement') as string | null

    // 設立年の変換（空文字の場合はnull）
    const established = establishedStr && establishedStr !== ''
        ? parseInt(establishedStr, 10)
        : null

    // 店舗情報データオブジェクトの作成
    const shopInfoData: ShopInfoData = {
        shopName,
        industry,
        description,
        established,
        prefecture,
        city,
        streetAddress,
        phone: phone || null,
        email: email || null,
        openingTime,
        closingTime,
        regularHoliday: regularHoliday || null,
        parking: parking || null,
        websiteUrl: websiteUrl || null,
        instagramUrl: instagramUrl || null,
        xUrl: xUrl || null,
        announcement: announcement || null,
    }

    // データベースに保存
    const store = await saveShopInfo(shopInfoData)
    console.log('店舗情報を保存しました:', store.id)

    // 業種に応じて適切なページにリダイレクト
    switch(industry) {
        case 'restaurant':
            redirect('/form/restaurant')
        case 'retail':
            redirect('/form/retail')
        case 'service':
            redirect('/form/service')
        case 'beauty':
            redirect('/form/beauty')
        case 'healthcare':
            redirect('/form/healthcare')
        default:
            redirect('/form/other')
    }
}