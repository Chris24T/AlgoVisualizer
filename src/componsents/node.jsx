import React, {useState} from "react"
import './node.css';

function Node(props) {

    let {
        col,
        row,
        weight,
        isVisited,
        node_type,
        mouseDown,
        mouseEnter,
        mouseUp
    } = props

    let extra_className = node_type+(isVisited? " visited":"") +" weight"+weight    

    return (

        <div className={"node "+extra_className} 
        onMouseDown={() => mouseDown(row, col)} 
        onMouseEnter={() => mouseEnter(row, col)}
        onMouseUp={mouseUp}
        >

        </div>
    )
}

export default Node;

