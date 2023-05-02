import localFont from "next/font/local";

export const IranSans = localFont({
    src: [
        {
            path: './IRANSansXFaNum-Regular.ttf',
            style: 'normal',
            weight: '400',
        },
        {
            path: './IRANSansXFaNum-Bold.ttf',
            style: 'normal',
            weight: '700',
        }
    ],
    variable: '--font-iran-sans',
})