import {
    RepositoryActionTypes,
    GET_SEARCH_REPOSITORIES_REQUEST,
    GET_SEARCH_REPOSITORIES_SUCCESS,
    GET_SEARCH_REPOSITORIES_FAILURE,
    GET_SEARCH_NEXT_REPOSITORIES_REQUEST,
    GET_SEARCH_NEXT_REPOSITORIES_SUCCESS,
    GET_SEARCH_NEXT_REPOSITORIES_FAILURE,
    GET_SEARCH_PREV_REPOSITORIES_REQUEST,
    GET_SEARCH_PREV_REPOSITORIES_SUCCESS,
    GET_SEARCH_PREV_REPOSITORIES_FAILURE,
    GET_NEW_SEARCH_REPOSITORIES_REQUEST,
    GET_NEW_SEARCH_REPOSITORIES_SUCCESS,
    GET_NEW_SEARCH_REPOSITORIES_FAILURE
}  from "../actions/types";

interface IRepositoriesState {
    readonly items: Record<number, any>;
    readonly loading: boolean;
    readonly count: number;
}

const initialState: IRepositoriesState = {
    items: {},
    loading: false,
    count: 0
};

export default (state: IRepositoriesState = initialState, action: RepositoryActionTypes): IRepositoriesState => {
    switch (action.type) {
        case GET_SEARCH_REPOSITORIES_REQUEST:
                return {
                    ...state,
                    loading: true,
                }
        case GET_SEARCH_REPOSITORIES_SUCCESS:
            const searchRepositories: Record<number, any> = {};
            
            action.data.items.forEach((i: any) => {
                searchRepositories[i.id] = i;
            });

            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    ...searchRepositories
                },
                count: action.data.total_count
            };
        case GET_SEARCH_REPOSITORIES_FAILURE:
            return {
                ...state,
                loading: false
            }
        case GET_NEW_SEARCH_REPOSITORIES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_NEW_SEARCH_REPOSITORIES_SUCCESS:
            const newSearchRepositories: Record<number, any> = {};
            
            action.data.items.forEach((i: any) => {
                newSearchRepositories[i.id] = i;
            });

            return {
                ...state,
                loading: false,
                items: {
                    ...newSearchRepositories
                },
                count: action.data.total_count
            };
        case GET_NEW_SEARCH_REPOSITORIES_FAILURE:
            return {
                ...state,
                loading: false
            }
        case GET_SEARCH_NEXT_REPOSITORIES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_SEARCH_NEXT_REPOSITORIES_SUCCESS:
            const newSearchNextRepositories: Record<number, any> = {};
            
            action.data.items.forEach((i: any) => {
                newSearchNextRepositories[i.id] = i;
            });

            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    ...newSearchNextRepositories
                },
                count: action.data.total_count
            };
        case GET_SEARCH_NEXT_REPOSITORIES_FAILURE:
            return {
                ...state,
                loading: false
            }
        case GET_SEARCH_PREV_REPOSITORIES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_SEARCH_PREV_REPOSITORIES_SUCCESS:
            const newSearchPrevRepositories: Record<number, any> = {};
            
            action.data.items.forEach((i: any) => {
                newSearchPrevRepositories[i.id] = i;
            });

            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    ...newSearchPrevRepositories
                },
                count: action.data.total_count
            };
        case GET_SEARCH_PREV_REPOSITORIES_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
