import {FC} from "react";

import {ChildrenProps} from "@custom-types/props";

type Props = { isTrue: boolean }
const RenderIf: FC<ChildrenProps<Props>> = ({isTrue, children}) => {
    return (
        isTrue ? <>{children}</> : <></>
    )
}

export default RenderIf
