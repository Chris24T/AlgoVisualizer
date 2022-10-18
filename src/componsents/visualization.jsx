//gitignore is bad

import React, { useState, useEffect, useRef } from "react";
import Node from "./node";
import "./visualization.css";
import Dijkstra from "../algorithms/dijkstra";

function Visualization(props) {
  let [field, setField] = useState([]);
  let mouseDrawType = useRef("");

  useEffect(() => {
    //on render -> on mount if [] passed

    setField(props.field || generateNodeField());

    if (props.animate) animateVisualization();
  }, [props.animate]);

  //functional componenet did mount here:
  //then apply it to state
  function generateNodeField() {
    //should set based on user input, not passed via prop (the maze/map)
    let field = [];
    let width = 50,
      height = 30;

    for (let row = 0; row < height; row++) {
      field[row] = [];
      for (let col = 0; col < width; col++) {
        field[row][col] = {
          row,
          col,
          weight: 1,
          isVisited: false,
          node_type:
            (row === 15 && col === 10 && "node-start") ||
            (row === 24 && col === 33 && "node-end") ||
            "",
        };
      }
    }

    return field;
  }

  function animateVisualization() {
    let start_node = field[15][10],
      end_node = field[24][33],
      time_interval = 20,
      fieldcpy = deepCopy(field),
      //[shortestNodePath, visitedNodesOrdered] = Dijkstra(fieldcpy, start_node, end_node),
      current_node;

    //switch(props.algorithmFlag)
    /* case 1: Dijkstra(fieldcpy, start_node, end_node)
    /  case 2: Kruskal(fieldcpy, ...)
    /
    /
    */
    //

    Dijkstra(fieldcpy, start_node, end_node);

    let intvl = setInterval(() => {
      current_node = Dijkstra.step(); //step method allows more dynamic environment (no restarting dijkstra on e.g. wall added)

      if (current_node.node_type === "node-end") {
        clearInterval(intvl);
        let path = Dijkstra.shortestPathToNode(current_node);
        drawPath(path);
      }

      let newGrid = [...field];

      newGrid[current_node.row][current_node.col] = current_node; //dont want to deep copy, so am editing state directly = v.bad practise

      setField(newGrid); //requires deep copy
    }, time_interval);

    function drawPath(nodeArr) {
      let node_ctr = 0,
        intvl = setInterval(() => {
          let newGrid = [...field],
            node = nodeArr[node_ctr];

          if (node.node_type === "node-start" || !node) {
            clearInterval(intvl);
            return;
          }

          newGrid[node.row][node.col].node_type = "path";

          setField(newGrid);

          node_ctr++;
        }, 50);
    }
  }

  function handleMouseDown(row, col) {
    let node = field[row][col],
      newGrid = [...field],
      newNode = { ...node };

    if (node.node_type === "node-start") {
      mouseDrawType.current = "node-start";
    } else if (node.node_type === "node-end") {
      mouseDrawType.current = "node-end";
    } else {
      mouseDrawType.current = "wall";
      newNode.weight = 1000;
    }

    newNode.node_type = mouseDrawType.current;

    newGrid[row][col] = newNode;

    setField(newGrid);

    // let newGrid = [...field],
    // row = node.row,
    // col = node.col,
    // curNode = field[row][col]

    // if(curNode.weight === 4) newGrid[row][col].weight = 1
    // else newGrid[row][col].weight += 1

    // setField(newGrid)
  }

  function handleMouseEnter(row, col) {
    if (mouseDrawType.current !== "") {
      let node = field[row][col];

      let newGrid = [...field],
        newNode = { ...node };

      newNode.node_type = mouseDrawType.current;

      if (mouseDrawType.current === "wall") newNode.weight = 1000;

      newGrid[row][col] = newNode;

      setField(newGrid);
    }
  }

  function handleMouseUp() {
    mouseDrawType.current = "";
    console.log(field);
  }

  // Render
  return (
    <div className="vis-container">
      {field.map((row, rowIndex) => {
        return row.map((node, nodeIndex) => {
          return (
            <Node
              row={rowIndex}
              col={nodeIndex}
              weight={node.weight}
              isVisited={node.isVisited}
              node_type={node.node_type}
              mouseDown={(row, col) => handleMouseDown(row, col)}
              mouseEnter={(row, col) => handleMouseEnter(row, col)}
              mouseUp={() => handleMouseUp()}
            />
          );
        });
      })}
    </div>
  );
}

function deepCopy(obj) {
  //depth2 deep copy
  //Allows mutating state without forcing re-render
  //(as dijkstra is not done live)

  return JSON.parse(JSON.stringify(obj));
}

export default Visualization;
