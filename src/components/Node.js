import React, { Component } from 'react'
import { Card, Row,InputNumber, Icon  } from 'antd';
import Text from 'antd/lib/typography/Text';
import * as Actions from '../redux/actions'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'

class TreeNode extends Component {
    state = {
        value:typeof this.props.nodeData !== 'undefined' ? this.props.nodeData.value:0,
        diff:0
    }

    handleOnValueChange = (value) => {
        this.setState({value,diff:((value-this.state.value))})
        this.props.nodeData.value = value;    
        console.log("diff",this.state.diff);
        this.props.updateNode({value,id:this.props.nodeData.id});
    }


    handleAdd = () => {
        console.log("add");
        this.props.addNode({name:this.props.nodeData.name+" Child",value:100,parentId:this.props.nodeData.id});
        //this.props.onAdd(this.props.nodeData.name+" Child",100,this.props.nodeData.pos)
    }

    handleRemove = () => {
        console.log("remove");
        this.props.deleteNode(this.props.nodeData)
    }

    calculateTotal = (node) =>{
       
        if(typeof node === 'undefined') return;
        let total = node.value;

        if(typeof node.children !== 'undefined' && node.children.length > 0){
            node.children.forEach(childId => {
                let childIndex = this.props.nodes.findIndex((item)=> item.id === childId)
                total += this.calculateTotal(this.props.nodes[childIndex])
            });
        } 
        
        return total;
 
     }
    
    render() {
        const {className, nodeData,nodes} = this.props

        nodeData["total"] = this.calculateTotal(nodeData);
        
        return (
            <li key={nodeData.id}>
            <a href="#root">
                <Card  className={className} title={nodeData.name} style={{width: '200px', margin: '0 auto'}}>
                
                <Row ><Text style={{width:'3rem'}}>Self : </Text><InputNumber defaultValue={this.state.value} onChange={this.handleOnValueChange} style={{width:'3rem'}} /> </Row>

                <Row style={{padding:'0.5rem'}}><Text style={{width:'6rem',fontWeight:'bold',fontSize:'1rem'}}>Total: {nodeData.total}</Text> </Row>

                    <Row ><Icon type="plus-square" style={{width:'3rem',color:'green',fontSize:'2rem'}} onClick={this.handleAdd}/> <Icon type="minus-square" style={{width:'3rem',fontSize:'2rem'}} onClick={this.handleRemove}/></Row>
            
                </Card>
            </a>
            {nodeData.children && 
                <ul  key={Math.floor(Math.random() * 10001)}>
                    { 
                    nodeData.children.map((item)=>{
                        return <TreeNodeContainer nodeData={nodes.filter((i)=> i.id === item)[0]}  nodes= {nodes} parentId={nodeData.id}/>
                    })
                    }
                </ul>
            }

            </li>
        )
    }
}



const mapStateToProps = (state) => ({
    nodes:state.nodes.nodes,
    getParentNodes: (state)=> state.nodes.nodes.filter(item => item.parent === null)
})

const mapDispatchToProps =  dispatch => {
    return bindActionCreators(Actions, dispatch);
}

const TreeNodeContainer = connect(mapStateToProps, mapDispatchToProps)(TreeNode);

export default TreeNodeContainer


