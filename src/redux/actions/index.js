import * as types from './type'

export const addNode = (payload) => ({
	type: types.ADD_NODE_REQUEST,
	payload
})

export const deleteNode = (payload) => ({
    type: types.DELETE_NODE_REQUEST,
    payload
})

export const updateNode = (payload) => ({
	type: types.UPDATE_NODE_REQUEST,
	payload
})