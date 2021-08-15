import {TODOLIST_CONTRACT_ADDR} from "./constants";
import TODOLIST_CONTRACT_ABI from "./abis/TodoList.json"
import {getContract} from "./utils";

export class ReadOnlyTodoListContract {
    _contract

    constructor(provider) {
        this._contract = getContract(TODOLIST_CONTRACT_ADDR, TODOLIST_CONTRACT_ABI, provider)
    }

    getTaskCount() {
        return this._contract.taskCount() //return a bignumber object
    }

    getTaskById(id) {
        return this._contract.tasks(id)
    }


    subscribeEvent(eventName, callback) {
        this._contract.on(eventName, callback)
    }

    unSubscribeAllEvents() {
        this._contract.removeAllListeners()
    }

}

export class WritableTodoListContract {
    _contract

    constructor(provider, account) {
        this._contract = getContract(TODOLIST_CONTRACT_ADDR, TODOLIST_CONTRACT_ABI, provider, account)
    }

    async createNewTask(content) {
        return this._contract.createTask(content)
    }

    async toggleComplete(taskId) {
        return this._contract.toggleComplete(taskId)
    }

    async deleteTask(taskId) {
        return this._contract.deleteTask(taskId)
    }

    async updateTask(id, content) {
        return this._contract.updateTask(id, content)
    }
}