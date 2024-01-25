interface IError {
    message: string,
    stack: string
}

export interface IQueryError {
    error: IError
}
