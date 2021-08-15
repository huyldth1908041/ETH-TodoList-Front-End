import {useReadOnlyTodoListContract, useWritableTodoListContract} from "./useTodoListContract";
import {useWeb3React} from "@web3-react/core";
import {useCallback} from "react";

const useTodoListHandler = () => {
    const writableTodoListContract = useWritableTodoListContract()
    const readOnlyTodoListContract = useReadOnlyTodoListContract()
    const {active} = useWeb3React()

    const createTask = useCallback(async (content) => {
        if(!active) throw new Error("Please connect to wallet")
        const txResponse = await writableTodoListContract.createNewTask(content)
        return await txResponse.wait()
    }, [active, writableTodoListContract])


    const getListTasks = useCallback(async () => {
        const listTasks = []
        const taskCountBigNumber = await readOnlyTodoListContract.getTaskCount()
        const taskCount = parseInt(taskCountBigNumber.toString())
        let key = 0;
        while(true) {
            if(taskCount === 0) {
                break;
            }
            key++;
            const currentTask = await readOnlyTodoListContract.getTaskById(key)
            if(parseInt(currentTask.id.toString()) === 0 && currentTask.content === '' && currentTask.completed === false) {
                //empty task maybe deleted or not be assigned yet
                console.log("skip")
                continue;
            }
            const newTask = {
                id: currentTask.id.toString(),
                content: currentTask.content,
                completed: currentTask.completed
            }
            //push until list task length is equal to task count return from contract
            listTasks.push(newTask)
            if(listTasks.length === taskCount) {
                break;
            }
        }
        console.log(`fetch ${taskCount} tasks after ${key} steps`)
        return listTasks
    }, [readOnlyTodoListContract])

    const toggleComplete = useCallback(async (id) => {
        if (!active) throw new Error("Please connect to wallet")
        const txResponse = await writableTodoListContract.toggleComplete(id)
        return await txResponse.wait()
    }, [active, writableTodoListContract])

    const deleteTask = useCallback(async (id) => {
        if (!active) throw new Error("Please connect to wallet")
        const txResponse = await writableTodoListContract.deleteTask(id)
        return await txResponse.wait()
    }, [active, writableTodoListContract])


    const addEventListener = useCallback((eventName, callback) => {
        if (!active) throw new Error("Please connect to wallet")
        readOnlyTodoListContract.subscribeEvent(eventName, callback)
    }, [active, readOnlyTodoListContract])

    const removeAllEventListeners = useCallback((eventName, callback) => {
        if (!active) throw new Error("Please connect to wallet")
        readOnlyTodoListContract.unSubscribeAllEvents()
    }, [active, readOnlyTodoListContract])

    return {
        createTask,
        getListTasks,
        toggleComplete,
        deleteTask,
        addEventListener,
        removeAllEventListeners
    }
}

export default useTodoListHandler