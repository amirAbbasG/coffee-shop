import {GetStaticProps, InferGetStaticPropsType} from "next";
import {NextSeo} from "next-seo";

import {Category, MenuShowCase, UserComment} from "@custom-types/menu";
import categoriesData from "@dev-data/categories.json"
import menuItemsData from "@dev-data/menu-items.json"
import {getMultipleRandom} from "@utils/helpers";
import {CategoriesSection, MenuShowCasesSection} from "@components";
import comments from "@dev-data/user-comments.json"
import UserComments from "@components/sections/UserComments";


interface StaticReturnProps {
    categories: Category[],
    menuShowCases: MenuShowCase[],
    userComments: UserComment[]
}

// get static props with revalidate
export const getStaticProps: GetStaticProps<StaticReturnProps> = async () => {
    const categories: Category[] = categoriesData.filter(c => !c.parentId)

    const section1: MenuShowCase = {
        id: "1",
        title: "پر طرفدار های کافه",
        url: "/",
        items: getMultipleRandom(menuItemsData, 7),
    }
    const section2: MenuShowCase = {
        id: "2",
        title: "پیشنهاد های کافه",
        url: "/",
        items: getMultipleRandom(menuItemsData, 7),
        isOffer: true
    }


    const menuShowCases: MenuShowCase[] = [section1, section2]

    return {
        props: {
            categories,
            menuShowCases,
            userComments: comments
        },
        revalidate: 4 * 60 * 60
    }
}

export default function Home({categories, menuShowCases, userComments}: InferGetStaticPropsType<typeof getStaticProps>) {

    const sortedShowCases = menuShowCases.sort(function (x, y) {
        return x.isOffer ? -1 : y.isOffer ? 1 : 0;
    });

    return (
        <>
            <NextSeo
                title="صفحه اصلی"
                description=""
                openGraph={{
                    url: "https://www.coffee-shop.ie/",
                    title: 'Open Graph Title',
                    description: 'Open Graph Description',
                }}
            />
            <div className="col min-h-screen">
                <CategoriesSection categories={categories}/>
                {
                    sortedShowCases.map(showCase => (
                        <MenuShowCasesSection menuShowCase={showCase} className={"showCase" + showCase.id}
                                              key={showCase.id}/>
                    ))
                }
            </div>

            <UserComments comments={userComments}/>
        </>
    )
}
