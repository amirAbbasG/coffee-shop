import {DefaultSeoProps} from "next-seo";


const config: DefaultSeoProps = {
    titleTemplate: `کافی شاپ | %s`,
    title: "صفحه اصلی",
    themeColor: "rgb(0, 78, 52 )",
    canonical: "https://www.coffee-shop.ie/",
    openGraph: {
        type: 'website',
        locale: 'fa_IR',
        url: 'https://www.confee-shop.ie/',
        siteName: 'coffee shop',
        images: []
    },
    twitter: {
        handle: '@handle', //@username for the content creator / author
        site: '@site', //@username for the website used in the card footer
        cardType: 'summary_large_image', //The card type, which will be one of summary, summary_large_image, app, or player
    },
    facebook: {
        appId: '1234567890', //Used for Facebook Insights, you must add a facebook app ID to your page
    },
}

export default config