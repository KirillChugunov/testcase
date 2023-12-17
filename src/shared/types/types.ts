export interface IErrorState {
    isError: boolean,
    errorCode: number | string
}
export interface IUserList {
    id: number
    name: string
    username: string
}
export interface IToDosList {
    completed: boolean
    id: number
    title: string
    userId: number
}
export interface IToDosListState {
    list: Array<IToDosList>,
    isLoading: boolean;
}
export interface IUserListState {
    list: Array<IUserList>,
    isLoading: boolean;
}

export type THeaders = {
    "Content-Type": string;
    authorization?: string;
};

export type TConfig = {
    method?: string;
    headers?: THeaders;
    body?: string;
};


