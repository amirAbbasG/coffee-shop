export const isEmpty = (value:  any) => {
    if (Array.isArray(value)) {
        return value.length === 0
    } else if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }
    return true
};

export const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({length}, (_, i) => start + i);
};

export function separatePrice(PriceNumber: number) {
    let price = String(PriceNumber)
    if (price != null) {
        price += '';
        price = price.replace(',', '');
        let x = price.split('.');
        let y = x[0];
        let z = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(y)) y = y.replace(rgx, '$1' + ',' + '$2');
        return y + z;
    } else {
        return 0;
    }
}

export function getMultipleRandom(arr: any[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
}