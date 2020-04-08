import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import NopsaGame from './components/NopsaGame'
import rootReducer from './reducers/rootReducer'


const store = createStore(rootReducer)

const App = () => {
    return (
        <Provider store={store}>
            <NopsaGame/>
        </Provider>
    )
}

export default App

