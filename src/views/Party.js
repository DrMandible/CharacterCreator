import React from "react";
import Graph from "react-graph-vis";

import { store } from "../data/store";

import { Connections } from "../components/Connections";
import { getRandomPortrait } from "../data/charNetworkConnections";

const addConnections = (nodes, edges, connections, distance) => {
  // console.log("addConnections: ", nodes, edges, connections, distance);
  for (let [name, conn] of connections) {
    addNode(nodes, conn, distance, connections, name);
    addEdge(conn, name, distance, edges);

    addSecondDegreeConnections(nodes, edges, conn);
  }
  // console.log(edges);
  return { nodes, edges };
};

const getNodesEdges = (connections) => {
  // console.log(connections);
  let nodes = [];
  let edges = [];

  let networkConnections = addConnections(nodes, edges, connections, 1);
  return networkConnections;
};

function addSecondDegreeConnections(nodes, edges, conn) {
  const { secondDegreeNodes, secondDegreeEdges } = addConnections(
    nodes,
    edges,
    conn.connections,
    2
  );
  if (secondDegreeNodes) {
    nodes.push(secondDegreeNodes);
  }
  if (secondDegreeEdges) {
    edges.push(secondDegreeEdges);
  }
}

function addEdge(conn, name, distance, edges) {
  let drawNewEdge = true;
  let newEdge = {
    from: conn.sourceName,
    to: name
  };

  if (distance === 1) {
    newEdge["width"] = 3;
    newEdge["color"] = "rgb(195, 195, 225)";
  } else {
    newEdge["width"] = 1;
    newEdge["color"] = "gray";
  }

  if (conn.connectionType === "Party") {
    if (conn.sourceName === name) {
      drawNewEdge = false;
    }
    if (distance === 2) {
      newEdge["color"] = "rgba(225, 225, 225, 0.1)";
      drawNewEdge = false;
    }

    if (distance === 1) {
      newEdge["color"] = "rgba(225, 225, 225, 1)";
    }
  }

  if (conn.connectionType === "Enemy") {
    if (distance === 1) {
      newEdge["color"] = "rgba(225, 25, 25, 1)";
    } else {
      newEdge["color"] = "rgba(225, 25, 25, 0.8)";
    }
  }

  if (conn.connectionType === "Ally") {
    if (distance === 1) {
      newEdge["color"] = "rgba(25, 225, 25, 1)";
    } else {
      newEdge["color"] = "rgba(25, 225, 25, 0.8)";
    }
  }

  if (drawNewEdge) {
    edges.push(newEdge);
    conn.addEdge(newEdge);
  }
}

function addNode(nodes, conn, distance, connections, name) {
  let sourceNodeExists = false;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].id === conn.sourceName) {
      sourceNodeExists = true;
    }
  }

  let font = "14px arial rgb(195, 195, 225)";
  if (conn.connectionType === "Party") {
    font = "18px arial gold";
  }
  let newNode;
  if (!sourceNodeExists) {
    console.log("find ?'s connections", conn.sourceName);
    console.log(connections);
    let newSourceNode = connections.get(conn.sourceName);
    if (newSourceNode) {
      newNode = {
        id: newSourceNode.name,
        label: newSourceNode.name,
        group: newSourceNode.sourceName,
        shape: "circularImage",
        image: newSourceNode.image,
        font: font
      };
    } else {
      newNode = {
        id: `unknown-${i}`,
        label: `unknown-${i}`,
        group: `unknown-${i}`,
        shape: "circularImage",
        image: getRandomPortrait(`unknown-${i}`),
        font: font
      };
    }
    nodes.push(newNode);
    conn.setNode(newNode);
    // console.log(conn);
  }

  let nodeExists = false;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].id === name) {
      nodeExists = true;
    }
  }

  if (!nodeExists) {
    nodes.push({
      id: name,
      label: name,
      group: conn.sourceName,
      shape: "circularImage",
      image: conn.image,
      font: font,
      borderWidth: conn.connectionType === "Party" ? 5 : 4,
      color: {
        border:
          conn.connectionType === "Party" ? "gold" : "rgba(25, 25, 125, 1)"
      }
    });
  }
}

let initGraphOptions = {
  autoResize: true,
  layout: {
    hierarchical: {
      direction: "UD",
      sortMethod: "directed",
      enabled: false
    }
  }
};

export const Party = (props) => {
  const { state, dispatch } = React.useContext(store);
  const [activeNode, setActiveNode] = React.useState(
    state.user.character?.connections?.get(state.user.character?.name)
  );
  const [selectedNode, setSelectedNode] = React.useState();
  const [graph, setGraph] = React.useState(
    getNodesEdges(activeNode?.connections)
  );
  const [graphOptions, setGraphOptions] = React.useState(initGraphOptions);

  const events = {
    select: function (e) {
      var { nodes, edges } = e;
      if (nodes.length === 0) {
        setSelectedNode();
        return;
      }
      let selectedNodeName = nodes[0];
      if (state.user.character.connections.has(selectedNodeName)) {
        // 1st degree connection
        let newSelectedNode = state.user.character.connections.get(
          selectedNodeName
        );
        setSelectedNode(newSelectedNode, 1);
      } else {
        for (let [sourceName, conn] of state.user.character.connections) {
          if (conn.connections.has(selectedNodeName)) {
            // 2nd degree connection
            setSelectedNode(conn.connections.get(selectedNodeName), 2);
          }
        }
      }
    }
  };

  React.useEffect(() => {
    console.log(state.user.character.connections);
  }, [state.user.character.connections]);

  return (
    <div className="t w c">
      <Graph
        style={{
          height: "98vh",
          width: "100vw",
          background: "rgb(15,15,25)",
          background:
            "radial-gradient(circle, rgba(15,15,45,1) 0%, rgba(15,15,25,0.9640231092436975) 65%, rgba(15,15,25,0.7707457983193278) 70%, rgba(15,15,25,0) 100%)"
        }}
        graph={graph}
        events={events}
        options={graphOptions}
      ></Graph>

      {selectedNode && (
        <Connections
          activeNode={activeNode}
          setActiveNode={setActiveNode}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      )}
    </div>
  );
};
