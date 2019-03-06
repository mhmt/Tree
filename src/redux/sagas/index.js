import { put, call ,select} from 'redux-saga/effects';
import * as actions from '../actions/type'
import { List } from 'immutable';

export function* addNode(action){
    var nodeRoot = yield select((state) => [...state.nodes.nodes]);
    let{ name,value,parentId} = action.payload
    let node = {name,value,parent:parentId}

    try {
        let result = yield call(addNodeOperation,nodeRoot,node)
        yield put({type:actions.ADD_NODE,payload:result})
    } catch (error) {
        console.log('====================================');
        console.log("addNode",error);
        console.log('====================================');
    }
}

export function*  deleteNode(action){
    var nodeRoot = yield select((state) => [...state.nodes.nodes]);
    try {
        let result = yield call(deleteNodeOperation,nodeRoot,action.payload) 
        yield put({type:actions.DELETE_NODE,payload:result})
    } catch (error) {
        console.log('====================================');
        console.log("deleteNode",error);
        console.log('====================================');
    }
   
}

export function* updateNode(action){
    let nodeRoot = yield select((state) => [...state.nodes.nodes]);
    let {value,id} = action.payload

    try {
        let nodes = yield call(updateNodeOperation,nodeRoot,id,value)
        yield put({type:actions.UPDATE_NODE,payload:nodes})
    } catch (error) {
        console.log('====================================');
        console.log("updateNode",error);
        console.log('====================================');
    }
}


const addNodeOperation = ( root , node ) => {
    let parent = root.find((item)=> item.id === node.parent)

    node["id"]=new Date().getTime();

    if(typeof parent !== 'undefined' ) parent.children = List(typeof parent.children === 'undefined' ? [] : parent.children).push(node.id).toArray();

    return List(root).push(node).toArray();
}

const deleteNodeOperation = ( root , node ) => {
    var result = [...root]

    if(node.parent !== null){
       
        let parent = result[result.findIndex(item=>item.id === node.parent)];
        parent.children = parent.children.filter(item=>item !== node.id);

        if(typeof node.children !== 'undefined')  result = result.filter(item=>!(item.id  in node.children))
    }

    let nodeIndex = result.findIndex(item=>item.id === node.id)
    result = List(result).remove(nodeIndex).toArray();
   
    return result;
}

const updateNodeOperation = ( root , id , value ) => {
    let nodeIndex = root.findIndex((item)=> item.id === id);
    if(nodeIndex === -1) throw new Error("İlgili node bulunamadı");
    let node = List(root).get(nodeIndex);
    node.value = value;

    return List(root).set(nodeIndex,node).toArray();
}

