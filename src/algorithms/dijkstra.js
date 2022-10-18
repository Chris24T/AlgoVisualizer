export default function Dijkstra(grid) {
console.log("runningDijkstra")

    let nodesVisitedInOrder = [],
        startNode, targetNode,
        unvisistedNodes = getUnvisitedNodes(grid)
        
        

    // Dijkstra.getPathToNode = shortestPathToNode

        // while(unvisistedNodes.length) {

        //     let currentNode = sortNodesByDistance(unvisistedNodes).shift()        
            
        //     currentNode.isVisited = true;

        //     if(currentNode.distance === Infinity) return nodesVisitedInOrder

        //     if(currentNode.isWall) continue

        //     nodesVisitedInOrder.push(currentNode)

        //     updateNeighbours(currentNode, grid)   
        // }
        //     //for rendering purposes -- perhaps return the shortestpath function with this        
        
        // return [shortestPathToNode(targetNode), nodesVisitedInOrder]

        function step() {

            if(!unvisistedNodes.length) return // completed search

            let currentNode = sortNodesByDistance(unvisistedNodes).shift()

            console.log(currentNode.weight)
                        
            currentNode.isVisited = true;

            if(currentNode.distance === Infinity) return nodesVisitedInOrder // error/trapped

            if(currentNode.isWall) return   // wall

            nodesVisitedInOrder.push(currentNode)

            updateNeighbours(currentNode, grid)
            
            return currentNode // progress

        }

        Dijkstra.step = step





        //actual result of dijkstra i.e. the shortest path
    function shortestPathToNode(toNode) {
        let curNode = toNode,
            path = []

        while(curNode) {
            //curNode.node_type="path" //dont actually want to apply path class until intentionally drawing path
            if(curNode.node_type === "node-start") break
            
            curNode = curNode.previousNode    
            path.push(curNode)
        
        }
        return path
    }

    Dijkstra.shortestPathToNode = shortestPathToNode

    function sortNodesByDistance(nodeArr) {
        return nodeArr.sort((a, b) =>  {
            return a.distance - b.distance
        })
    }
    
    function getUnvisitedNodes(grid) {
    let unvisitedNodes = []
            //just using map as a loop, not actually using return
        // grid.map(row => {
        //     unvisitedNodes = [...unvisitedNodes, ...row]
        // }) - shallow copy only due to ...row
        
        for (let row of grid) {
            for (let node of row) {
                
                //node.node_type === "node-start"? node.distance = 0 : node.distance = Infinity            
                
                if(node.node_type === "node-start") {
    
                    node.distance = 0
    
                } else {
                    if(node.node_type === "node-end") targetNode = node
                    node.distance = Infinity
                }
                
                unvisitedNodes.push(node);
            }
          }
        
        return unvisitedNodes
    }
    
    function getNodeNeighbours(node, grid) {
        let {row, col} = node,
            neighbours = []
            
        if(grid[row -1]) neighbours.push(grid[row-1][col])
        if(grid[row][col+1]) neighbours.push(grid[row][col+1])
        if(grid[row + 1]) neighbours.push(grid[row+1][col])
        if(grid[row][col-1]) neighbours.push(grid[row][col-1])
    
        let unvisitedNeighbours = neighbours.filter(node => node.isVisited === false)
        
        return unvisitedNeighbours
    }
    
    function updateNeighbours(node, grid) {
        let neighbours = getNodeNeighbours(node, grid)
        
        for(let neighbour of neighbours) {

            let newWeight = node.distance+neighbour.weight
            

                //take best weight for a given node
            if(neighbour.distance === void(0) || newWeight < neighbour.distance) {
                neighbour.distance = newWeight
                
    
            // switch (neighbour.node_type === "node-weight") {
            //     case true: neighbour.distance = node.distance+2
            //         break;
            //     case false: neighbour.distance = node.distance+1
            //         break;
            //     default:
            //         break;                
            // }
    
                neighbour.previousNode = node
            }
        }

        
    }


    
}

 

