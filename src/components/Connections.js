import React from "react";
import Masonry from "react-masonry-css";

import { store } from "../data/store";

import * as SC from "../styled";

const COLUMN_BREAKPOINTS = {
  default: 1,
  2100: 3,
  1400: 2,
  700: 1
};

const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const ConnectionTiles = (props) => {
  const { state, dispatch } = React.useContext(store);

  const selectedNode = props.selectedNode;
  const selectedNodeName = selectedNode.name;
  const setSelectedNode = props.setSelectedNode;

  const createdAt = Date.now();

  const handleButtonClick = (e, connection) => {
    if (Date.now() < createdAt + 85) return;
    if (props.activeNode?.connections.has(connection.name)) {
      setSelectedNode(state.character.connections.get(connection.name));
    } else {
      setSelectedNode(connection);
    }
  };
  return (
    <div>
      <div className="d-flex c">
        <div>{selectedNodeName}'s Connections</div>
      </div>
      <Masonry
        breakpointCols={COLUMN_BREAKPOINTS}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
        style={{ overflowY: "scroll" }}
      >
        {Array.from(selectedNode.connections).map((connection) => {
          return (
            <SC.SmallButton
              key={`btn-${selectedNodeName}-${connection[0]}`}
              onClick={(e) => handleButtonClick(e, connection[1])}
            >
              <Connection toNode={connection[1]} fromNode={props.activeNode} />
            </SC.SmallButton>
          );
        })}
      </Masonry>
    </div>
  );
};

const MemoizedConnectionTiles = React.memo(ConnectionTiles);

const Connection = ({ toNode, fromNode, main = false }) => {
  const { state, dispatch } = React.useContext(store);
  // console.log(state.character.connections);

  if (!toNode || !fromNode) return <React.Fragment />;

  let styles = main
    ? {
        toNodeIcon: { height: "5rem", width: "5rem" },
        smallText: { fontSize: "0.9rem", color: "lightgray" },
        name: {
          color: `${
            toNode.connectionType === "Party" ? "gold" : "rgb(195, 195, 225)"
          }`,
          fontSize: "1.3rem"
        }
      }
    : {
        toNodeIcon: { height: "2rem", width: "2rem" },
        smallText: { fontSize: "0.7rem", color: "lightgray" },
        name: {
          color: `${
            toNode.connectionType === "Party" ? "gold" : "rgb(195, 195, 225)"
          }`,
          fontSize: "0.9rem"
        }
      };

  const Name = ({ name }) => <b style={styles.name}>{name}</b>;

  const ConnectionType = ({ connectionType }) => (
    <div style={styles.smallText}>{connectionType}</div>
  );

  const Portrait = ({ name, image }) => (
    <SC.SmallIcon style={styles.toNodeIcon}>
      <img src={image} alt={name} />
    </SC.SmallIcon>
  );

  const ConnectionText = ({ connectionText }) => (
    <div className="t-sub p-1 e tr">{connectionText}</div>
  );

  const BubbleWPortrait = ({ name, image, connectionType, connectionText }) => (
    <div className="d-flex w flex-c">
      <Portrait image={image} />
      <div>
        <div className={`d-flex w`}>
          <Name name={name} />
          <div className="m-1 p-1 w tr" />
          <ConnectionType connectionType={connectionType} />
        </div>

        {connectionText !== "" && (
          <ConnectionText connectionText={connectionText} />
        )}
      </div>
    </div>
  );

  const propsA = {
    name: toNode.name,
    image: toNode.image,
    connectionType: toNode.connectionType,
    connectionText: state.character.connections
      .get(toNode.name)
      ?.connections.get(toNode.sourceName)?.connectionText
  };

  const propsB = {
    name: toNode.sourceName,
    image: state.character.connections.get(toNode.sourceName)?.image,
    connectionType: state.character.connections
      .get(toNode.name)
      ?.connections.get(toNode.sourceName)?.connectionType,
    connectionText: state.character.connections
      .get(toNode.sourceName)
      ?.connections.get(toNode.name)?.connectionText
  };

  let toProps = main ? propsA : propsB;
  let fromProps = main ? propsB : propsA;

  return (
    <SC.ConnectionsHeader>
      <div className="d-flex w flex-r f-w">
        {!main && (
          <BubbleWPortrait
            name={fromProps.name}
            image={fromProps.image}
            connectionType={fromProps.connectionType}
            connectionText={fromProps.connectionText}
          />
        )}

        <BubbleWPortrait
          style={toProps.style}
          name={toProps.name}
          image={toProps.image}
          connectionType={toProps.connectionType}
          connectionText={toProps.connectionText}
        />
      </div>
    </SC.ConnectionsHeader>
  );
};

export const Connections = (props) => {
  const connectionsFrameRef = React.useRef(null);

  const [width, height] = useWindowSize();

  if (!props.selectedNode || !props.activeNode) return <React.Fragment />;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0
      }}
    >
      <SC.DeckContainer>
        <SC.CardBorders className="bdr-b bdr-t bdr-rad m-1">
          <div
            className="bdr-b"
            style={{ position: "sticky", top: 0, zIndex: 11 }}
            id="ConnectionsHeaderContainer"
            ref={connectionsFrameRef}
          >
            <Connection
              toNode={props.selectedNode}
              fromNode={props.activeNode}
              main={true}
            />
          </div>

          {props.selectedNode?.connections?.size > 0 && (
            <div className="p-1">
              <ConnectionTiles
                selectedNode={props.selectedNode}
                fromNode={props.activeNode}
                setSelectedNode={props.setSelectedNode}
                activeNode={props.activeNode}
              />
              <div style={{ paddingBottom: `0.75rem` }} />
            </div>
          )}
        </SC.CardBorders>
      </SC.DeckContainer>
    </div>
  );
};
