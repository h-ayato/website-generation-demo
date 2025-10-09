'use server'

import { redirect } from 'next/navigation'

export async function createShopInfo(formData: FormData){
    const rawFormData = {
        shopName: formData.get('shopName'),
        industry: formData.get('industry'),
        description: formData.get('description'),
        established: formData.get('established'),
        prefecture: formData.get('prefecture'),
        city: formData.get('city'),
        streetAddress: formData.get('streetAddress'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        openingTime: formData.get('openingTime'),
        closingTime: formData.get('closingTime'),
        regularHoliday: formData.get('regularHoliday'),
        parking: formData.get('parking'),
        websiteUrl: formData.get('websiteUrl'),
        instagramUrl: formData.get('instagramUrl'),
        xUrl: formData.get('xUrl'),
        announcement: formData.get('announcement')
    }

    console.log(rawFormData)

    // TODO: データベースに保存する処理を追加

    // 業種に応じて適切なページにリダイレクト
    const industry = formData.get('industry') as string

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