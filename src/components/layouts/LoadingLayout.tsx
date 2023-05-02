import {ChildrenProps} from "@custom-types/props";
import {FC} from "react";

type Props = { loaded: boolean }

const LoadingLayout: FC<ChildrenProps<Props>> = ({loaded, children}) => {
    return (
        <>
            {
                loaded
                    ? (
                        <>
                            {children}
                        </>
                    )
                    : (
                        <div className="w-full h-5/6 relative">
                            <p>loading...</p>
                        </div>
                    )
            }
        </>
    );
};

export default LoadingLayout;
