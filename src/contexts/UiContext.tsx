import {createContext, FC, useContext, useMemo, useReducer} from "react";

import {ChildrenProps} from "@custom-types/props";

export const actions = {
    OPEN_SEARCH: "OPEN_SEARCH",
    CLOSE_SEARCH: "CLOSE_SEARCH"
}

interface StateModifiers {
    openSearch: () => void,
    closeSearch: () => void
}

interface InitialValues {
    isOpenSearch: boolean
}

const stateModifiers: StateModifiers = {
    openSearch: () => {},
    closeSearch: () => {}
}

const initialValues: InitialValues = {
    isOpenSearch: false
}

interface Action {
    type:  string
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

    const providerValue = useMemo(() => ({
        ...state,
        openSearch,
        closeSearch
    }), [state.isOpenSearch]);

    return (
        <UiContext.Provider value={providerValue}>
            {children}
        </UiContext.Provider>
    )
}

export const useUiContext = () => {
    const context = useContext(UiContext);
    return context
}