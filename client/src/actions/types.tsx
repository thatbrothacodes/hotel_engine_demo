export const GET_SEARCH_REPOSITORIES_REQUEST = "GET_SEARCH_REPOSITORIES_REQUEST";
export const GET_SEARCH_REPOSITORIES_SUCCESS = "GET_SEARCH_REPOSITORIES_SUCCESS";
export const GET_SEARCH_REPOSITORIES_FAILURE = "GET_SEARCH_REPOSITORIES_FAILURE";

export const GET_SEARCH_NEXT_REPOSITORIES_REQUEST = "GET_SEARCH_NEXT_REPOSITORIES_REQUEST";
export const GET_SEARCH_NEXT_REPOSITORIES_SUCCESS = "GET_SEARCH_NEXT_REPOSITORIES_SUCCESS";
export const GET_SEARCH_NEXT_REPOSITORIES_FAILURE = "GET_SEARCH_NEXT_REPOSITORIES_FAILURE";

export const GET_SEARCH_PREV_REPOSITORIES_REQUEST = "GET_SEARCH_PREV_REPOSITORIES_REQUEST";
export const GET_SEARCH_PREV_REPOSITORIES_SUCCESS = "GET_SEARCH_PREV_REPOSITORIES_SUCCESS";
export const GET_SEARCH_PREV_REPOSITORIES_FAILURE = "GET_SEARCH_PREV_REPOSITORIES_FAILURE";

export const GET_NEW_SEARCH_REPOSITORIES_REQUEST = "GET_NEW_SEARCH_REPOSITORIES_REQUEST";
export const GET_NEW_SEARCH_REPOSITORIES_SUCCESS = "GET_NEW_SEARCH_REPOSITORIES_SUCCESS";
export const GET_NEW_SEARCH_REPOSITORIES_FAILURE = "GET_NEW_SEARCH_REPOSITORIES_FAILURE";

interface IGetSearchRepositoriesRequestAction {
    type: typeof GET_SEARCH_REPOSITORIES_REQUEST,
    query :string,
    orderBy :string,
    sortDir :string
}

interface IGetSearchRepositoriesSuccessAction {
    type: typeof GET_SEARCH_REPOSITORIES_SUCCESS,
    data: any
}

interface IGetSearchRepositoriesFailureAction {
    type: typeof GET_SEARCH_REPOSITORIES_FAILURE,
    error: string
}

interface IGetSearchNextRepositoriesRequestAction {
    type: typeof GET_SEARCH_NEXT_REPOSITORIES_REQUEST,
    query :string,
    orderBy :string,
    sortDir :string, 
    page :number
}

interface IGetSearchNextRepositoriesSuccessAction {
    type: typeof GET_SEARCH_NEXT_REPOSITORIES_SUCCESS,
    data: any
}

interface IGetSearchNextRepositoriesFailureAction {
    type: typeof GET_SEARCH_NEXT_REPOSITORIES_FAILURE,
    error: string
}

interface IGetSearchPrevRepositoriesRequestAction {
    type: typeof GET_SEARCH_PREV_REPOSITORIES_REQUEST,
    query :string,
    orderBy :string,
    sortDir :string, 
    page :number
}

interface IGetSearchPrevRepositoriesSuccessAction {
    type: typeof GET_SEARCH_PREV_REPOSITORIES_SUCCESS,
    data: any
}

interface IGetSearchPrevRepositoriesFailureAction {
    type: typeof GET_SEARCH_PREV_REPOSITORIES_FAILURE,
    error: string
}

interface IGetNewSearchRepositoriesRequestAction {
    type: typeof GET_NEW_SEARCH_REPOSITORIES_REQUEST,
    query :string,
    orderBy :string,
    sortDir :string
}

interface IGetNewSearchRepositoriesSuccessAction {
    type: typeof GET_NEW_SEARCH_REPOSITORIES_SUCCESS,
    data: any
}

interface IGetNewSearchRepositoriesFailureAction {
    type: typeof GET_NEW_SEARCH_REPOSITORIES_FAILURE,
    error: string
}

export type RepositoryActionTypes = 
    IGetSearchRepositoriesRequestAction |
    IGetSearchRepositoriesSuccessAction |
    IGetSearchRepositoriesFailureAction |
    IGetSearchNextRepositoriesRequestAction |
    IGetSearchNextRepositoriesSuccessAction |
    IGetSearchNextRepositoriesFailureAction |
    IGetSearchPrevRepositoriesRequestAction |
    IGetSearchPrevRepositoriesSuccessAction |
    IGetSearchPrevRepositoriesFailureAction |
    IGetNewSearchRepositoriesRequestAction |
    IGetNewSearchRepositoriesSuccessAction |
    IGetNewSearchRepositoriesFailureAction;
