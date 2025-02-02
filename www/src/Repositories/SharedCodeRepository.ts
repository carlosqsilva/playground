import { CodeRepository } from "./interface";

/**
 * Shared code repository using the server side SQL storage.
 */
export class SharedCodeRepository implements CodeRepository {
    public static readonly QUERY_PARAM_NAME = "query"
    public static readonly CODE_NOT_FOUND = "Not found."

    private readonly hash: string

    constructor(hash: string) {
        this.hash = hash
    }

    saveCode(_: string) {
        // nothing to do
    }

    getCode(onReady: (code: string) => void) {
        return this.getSharedCode(onReady)
    }

    private getSharedCode(onReady: (code: string) => void) {
        const data = new FormData()
        data.append("hash", this.hash)

        fetch("/query", {
            method: "post",
            body: data,
        })
            .then(resp => resp.text())
            .then(data => {
                onReady(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
