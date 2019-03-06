import * as actions from '../actions/type'
import {all ,takeLatest} from 'redux-saga/effects';
import * as sagas from '../sagas'


/*
function* nodeWatcher(){
    yield takeEvery(actions.ADD_NODE_REQUEST,addNode)
    yield takeEvery(actions.DELETE_NODE_REQUEST,deleteNode)
    yield takeEvery(actions.UPDATE_NODE_REQUEST,updateNode)
}
*/


export default function* rootSaga() {
    yield all([
        takeLatest(actions.ADD_NODE_REQUEST,sagas.addNode),
        takeLatest(actions.DELETE_NODE_REQUEST,sagas.deleteNode),
        takeLatest(actions.UPDATE_NODE_REQUEST,sagas.updateNode)
    ]);
}

