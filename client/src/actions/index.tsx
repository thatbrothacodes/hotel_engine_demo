import axios from 'axios';
import { Dispatch } from 'redux';

import {
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
    GET_NEW_SEARCH_REPOSITORIES_FAILURE,
    RepositoryActionTypes
} from './types';

const repoSearchApiUrl :string = 'repositories';

let currentQuery :string = '';
let currentOrderBy :string = '';
let currentSortDir :string = '';

const requestSearchRepositories = (query :string, orderBy :string, sortDir :string) :RepositoryActionTypes => ({
    type: GET_SEARCH_REPOSITORIES_REQUEST,
    query,
    orderBy,
    sortDir
});

const handleSearchRepositoriesSuccess = (data: any) :RepositoryActionTypes => ({
    type: GET_SEARCH_REPOSITORIES_SUCCESS,
    data
});

const handleSearchRepositoriesFailure = (err: string) :RepositoryActionTypes => ({
    type: GET_SEARCH_REPOSITORIES_FAILURE,
    error: err
});

const requestNewSearchRepositories = (query :string, orderBy :string, sortDir :string) :RepositoryActionTypes => ({
    type: GET_NEW_SEARCH_REPOSITORIES_REQUEST,
    query,
    orderBy,
    sortDir
});

const handleNewSearchRepositoriesSuccess = (data: any) :RepositoryActionTypes => ({
    type: GET_NEW_SEARCH_REPOSITORIES_SUCCESS,
    data
});

const handleNewSearchRepositoriesFailure = (err: string) :RepositoryActionTypes => ({
    type: GET_NEW_SEARCH_REPOSITORIES_FAILURE,
    error: err
});

const requestSearchNextRepositories = (query :string, orderBy :string, sortDir :string, page :number) :RepositoryActionTypes => ({
    type: GET_SEARCH_NEXT_REPOSITORIES_REQUEST,
    query,
    orderBy,
    sortDir,
    page
});

const handleSearchNextRepositoriesSuccess = (data: any) :RepositoryActionTypes => ({
    type: GET_SEARCH_NEXT_REPOSITORIES_SUCCESS,
    data
});

const handleSearchNextRepositoriesFailure = (err: string) :RepositoryActionTypes => ({
    type: GET_SEARCH_NEXT_REPOSITORIES_FAILURE,
    error: err
});

export const searchNextRepositories = (query :string, sortDir :string, orderBy :string, page :number) => {
    return (dispatch: Dispatch<any>) => {
        const apiUrl = `${repoSearchApiUrl}?q=${query}&sort=${sortDir}&order=${orderBy}&page=${page}`;

        dispatch(requestSearchNextRepositories(query, orderBy, sortDir, page));

        axios.get(apiUrl)
                .then(res => dispatch(handleSearchNextRepositoriesSuccess(res.data)))
                .catch(err => dispatch(handleSearchNextRepositoriesFailure(err)));
    }
}

const requestSearchPrevRepositories = (query :string, orderBy :string, sortDir :string, page :number) :RepositoryActionTypes => ({
    type: GET_SEARCH_PREV_REPOSITORIES_REQUEST,
    query,
    orderBy,
    sortDir,
    page
});

const handleSearchPrevRepositoriesSuccess = (data: any) :RepositoryActionTypes => ({
    type: GET_SEARCH_PREV_REPOSITORIES_SUCCESS,
    data
});

const handleSearchPrevRepositoriesFailure = (err: string) :RepositoryActionTypes => ({
    type: GET_SEARCH_PREV_REPOSITORIES_FAILURE,
    error: err
});

export const searchPrevRepositories = (query :string, sortDir :string, orderBy :string, page :number) => {
    return (dispatch: Dispatch<any>) => {
        const apiUrl = `${repoSearchApiUrl}?q=${query}&sort=${sortDir}&order=${orderBy}&page=${page}`;

        dispatch(requestSearchPrevRepositories(query, orderBy, sortDir, page));

        axios.get(apiUrl)
                .then(res => dispatch(handleSearchPrevRepositoriesSuccess(res.data)))
                .catch(err => dispatch(handleSearchPrevRepositoriesFailure(err)));
    }
}

export const searchRepositories = (query :string, sortDir :string, orderBy :string) => {
    return (dispatch: Dispatch<any>) => {
        const apiUrl = `${repoSearchApiUrl}?q=${query}&sort=${sortDir}&order=${orderBy}&page=1`;

        if(currentQuery === query && currentOrderBy === orderBy && currentSortDir === sortDir) {
            dispatch(requestSearchRepositories(query, orderBy, sortDir));

            axios.get(apiUrl)
                .then(res => dispatch(handleSearchRepositoriesSuccess(res.data)))
                .catch(err => dispatch(handleSearchRepositoriesFailure(err)));
        } else {
            currentQuery = query;
            currentSortDir = sortDir;
            currentOrderBy = orderBy;

            dispatch(requestNewSearchRepositories(query, orderBy, sortDir));

            axios.get(apiUrl)
                .then(res => dispatch(handleNewSearchRepositoriesSuccess(res.data)))
                .catch(err => dispatch(handleNewSearchRepositoriesFailure(err)));
        }
    };
};
