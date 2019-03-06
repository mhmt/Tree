import {
	combineReducers
} from 'redux'
import * as actions from '../actions/type'

const initialState = {
	nodes:[]
}

const nodeReducer = (state = initialState, {type,payload}) => {
	switch (type) {
		case actions.ADD_NODE:
			return Object.assign({},state,{nodes:payload})

		case actions.DELETE_NODE:
			return Object.assign({},state,{nodes:payload})

		case actions.UPDATE_NODE:
			return Object.assign({},state,{nodes:payload})
			
		default:
			return state
	}
}


const rootReducer = combineReducers({
	nodes: nodeReducer
})

export default rootReducer