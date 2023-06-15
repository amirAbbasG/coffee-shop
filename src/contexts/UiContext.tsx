import {createContext, FC, useContext, useMemo, useReducer} from "react";

import {ChildrenProps} from "@custom-types/props";

export const actions = {
    OPEN_SEARCH: "OPEN_SEARCH",
    CLOSE_SEARCH: "CLOSE_SEARCH",
    OPEN_ADD_COMMENT: "OPEN_ADD_COMMENT",
    CLOSE_ADD_COMMENT: "CLOSE_ADD_COMMENT",
}

// interface StateModifiers {
//     openSearch: () => void,
//     closeSearch: () => void
//     openAddComment: (addId: string | null) => void,
//     closeAddComment: () => void
// }

interface InitialValues {
    isOpenSearch: boolean,
    addComment: {
        isOpen: boolean,
        addId: string | null
    }
}

const stateModifiers = {
    openSearch: () => {},
    closeSearch: () => {},
    openAddComment: (addId: string | null) => {},
    closeAddComment: () => {}

}

type StateModifiers = typeof stateModifiers


const initialValues: InitialValues = {
    isOpenSearch: false,
    addComment: {
        isOpen: false,
        addId: null
    }
}

interface Action {
    type:  string,
    payload?: any
}


const uiReducer = (state: InitialValues, action: Action) => {
    switch (action.type) {
        case actions.OPEN_SEARCH : {
            return {
                ...state,
                isOpenSearch: true
            }
        }
        case actions.CLOSE_SEARCH : {
            return {
                ...state,
                isOpenSearch: false
            }
        }
        case actions.OPEN_ADD_COMMENT : {
            return {
                ...state,
                addComment: {
                    isOpen: true,
                    addId: action.payload
                }
            }
        }
        case actions.CLOSE_ADD_COMMENT : {
            return {
                ...state,
                addComment: {
                    isOpen: false,
                    addId: null
                }
            }
        }
        default:
            return state
    }
}

type ContextState = StateModifiers & InitialValues
export const UiContext = createContext<ContextState>({
    ...stateModifiers,
    ...initialValues
})

export const UiContextProvider: FC<ChildrenProps> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, initialValues)

    const openSearch = () =>  dispatch({type: actions.OPEN_SEARCH})
    const closeSearch = () =>  dispatch({type: actions.CLOSE_SEARCH})
    const openAddComment = (addId: string | null) =>  dispatch({type: actions.OPEN_ADD_COMMENT, payload: addId})
    const closeAddComment = () =>  dispatch({type: actions.CLOSE_ADD_COMMENT})

    const providerValue = useMemo(() => ({
        ...state,
        openSearch,
        closeSearch,
        openAddComment,
        closeAddComment
    }), [state.isOpenSearch, state.addComment]);

    return (
        <UiContext.Provider value={providerValue}>
            {children}
        </UiContext.Provider>
    )
}

export const useUiContext = () => {
    return useContext(UiContext);
}