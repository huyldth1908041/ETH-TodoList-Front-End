import { Web3ReactProvider} from '@web3-react/core'
import {getLibrary} from "./connectors";
import TodoList from "./components/TodoList";
import "./App.css"
import Header from "./components/Header";
import Form from "./components/Form";
import {Toaster} from "react-hot-toast";
function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Header/>
            <Form/>
            <TodoList/>
            <Toaster/>
        </Web3ReactProvider>
    )
}

export default App;
