
export interface Category {
    id: string,
    title: string,
    pic: string,
    urlFriendlyTitle?: string,
    parentId?: string
}

export type ItemCategory = Pick<Category, "id" | "title" | "parentId">


export interface MenuItem {
    id: string,
    title: string,
    description: string,
    pic: string,
    price: number,
    discountPercentage: number,
    discountedPrice: number,
    category: ItemCategory
}


export interface MenuShowCase {
    id: string,
    title: string,
    url: string,
    urlFriendlyTitle?: string,
    bgColor?: string,
    titleColor?: string,
    isOffer?: boolean,
    items: MenuItem[]
}