export interface IErrorState {
    isError: boolean,
    errorCode: number | string
}

export interface  IUserToDosArray {
    name: string,
    ID: number,
    userToDosUncomplete: Array<IToDosList>
    usersToDosComplete: Array<IToDosList>
}
export interface IUserList {
    id: number
    name: string
    username: string
}
export interface IToDosList {
    completed: boolean
    id: number
    userId: number
    title: string
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


