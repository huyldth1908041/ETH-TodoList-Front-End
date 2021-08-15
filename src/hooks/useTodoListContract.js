import {useWeb3React} from "@web3-react/core";
import {ReadOnlyTodoListContract, WritableTodoListContract} from "../contractPort/TodoListContract";
import {useMemo} from "react";

export const useReadOnlyTodoListContract = () => {
    const {library} = useWeb3React()
    return useMemo(() => {
        if(!library) return undefined
        return new ReadOnlyTodoListContract(library)
    }, [library])

}

export const useWritableTodoListContract = () => {
    const {library, account} = useWeb3React()
    return useMemo(() => {
        if(!library || !account) return undefined
        return new WritableTodoListContract(library, account)
    }, [library, account])

}