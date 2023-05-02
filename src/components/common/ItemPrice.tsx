import {FC, memo} from "react"

import {separatePrice} from "@utils/helpers";
import {MenuItem} from "@custom-types/menu";

type Props = Pick<MenuItem, "price" | "discountedPrice" | "discountPercentage"> & {
    isNotExist?: boolean,
    size: "sm" | "lg"
}

const ProductPriceBox: FC<Props> = ({price, discountedPrice, discountPercentage, isNotExist = false, size}) => {

    if (isNotExist) {
        return <h3 className="font-bold text-red-600 mt-5 text-center">ناموجود</h3>
    }

    const fontClass =  size === "sm" ? "text-xs" : "text-base"
    const discountPadding = size === "sm"? "p-1" : "p-2"

    return (
        <>
            {discountPercentage === 0 ? (
                <p className={`font-bold ${fontClass}`}>{separatePrice(price)} ریال</p>
            ) : (
                <div className={`flex gap-x-2 ${fontClass}`}>
                    <div  className={`flex items-center justify-center text-white border border-white bg-secondary rounded-md !h-full my-auto ${discountPadding}`}>
                        <p className="font-bold">
                            {discountPercentage} %
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 line-through">
                            {separatePrice(price)}
                        </p>
                        <p className="font-bold">
                            {separatePrice(discountedPrice)}
                            {" "}
                            ریال
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(ProductPriceBox);

