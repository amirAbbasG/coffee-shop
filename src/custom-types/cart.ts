export interface CartItem {
    id: string,
    title: string,
    price: number,
    discountedPrice: number,
    pic: string,
    quantity: number,
    discountPercentage: number,
}

export interface Cart {
    id: string,
    totalPrice: number,
    totalDiscountedPrice: number,
    totalCount: number,
    items: CartItem[],
    userDeliveryTime?: string
}


export interface TimeRange {
    id: string,
    title: string,
    isFull: boolean
}

export interface SendTimes {
    id: string,
    title: string,
    date?: string,
    timeRanges: TimeRange[]
}