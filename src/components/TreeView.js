import React, { Component } from 'react'
import * as Actions from '../redux/actions'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import TreeNodeContainer from './Node';
import { Button } from 'antd';

class TreeView extends Component {
    
    addNewTree = () => {
        this.props.addNode({name:'Top Level',value:100,parentId:null});
       
    }

   
    prepareTree = (nodes) =>{
        let tree = nodes.map((item,index)=>{
            if(item.parent === null ){
               return(<ul key={Math.floor(Math.random() * 10001)  } style={{margin:'1rem'}} className="ant-card ant-card-bordered ant-card-hoverable "><TreeNodeContainer key={item.id} nodeData={item} nodes={nodes} parentId={item.id}/>  </ul> )
            }
           
        })
        return (tree);
    }


    render() {

        //console.log("DATA", this.props.nodes);
        
        return (
            <div style={{width: '100%', height: '99vh'}} className="tree">
                <div style={{padding:'1rem',backgroundColor:'#2d2d2d'}}>
                <Button onClick={this.addNewTree}>
                 Yeni Ağaç Ekle
                </Button>
              
                </div>

                { this.prepareTree(this.props.nodes) }

                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    nodes:state.nodes.nodes
})

const mapDispatchToProps =  dispatch => {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeView)

