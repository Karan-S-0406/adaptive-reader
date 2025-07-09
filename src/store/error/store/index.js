import { combineReducers } from '@reduxjs/toolkit'
import dataReducer from './error.slice'

const rootReducer = combineReducers({
    errorData: dataReducer,
})

export default rootReducer
