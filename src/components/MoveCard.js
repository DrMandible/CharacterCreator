import React from "react";
import { EditMove } from "./EditMove";
import * as SC from "../styled/index";

function replaceBulk(str, findArray, replaceArray) {
  var i,
    regex = [],
    map = {};
  for (i = 0; i < findArray.length; i++) {
    regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g, "\\$1"));
    map[findArray[i]] = replaceArray[i];
  }
  regex = regex.join("|");
  str = str.replace(new RegExp(regex, "g"), function (matched) {
    return map[matched];
  });
  return str;
}

const MultiLine = (props) => {
  if (props.txt.length === 0) {
    return <React.Fragment />;
  }
  return (
    <React.Fragment>
      <b>{props.children}</b>
      <p>
        {props.txt.split("\n").map((item, key) => {
          return (
            <React.Fragment key={key}>
              {replaceBulk(item, ["?*?"], [`• `])}
              <br />
            </React.Fragment>
          );
        })}
      </p>
    </React.Fragment>
  );
};

export const MoveCard = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isShowAll, setIsShowAll] = React.useState(false);
  const move = props.move;

  if (!move.modifier) {
    move.modifier = "No roll";
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleShowClick = () => {
    setIsShowAll(!isShowAll);
  };

  return (
    <div className="d-flex f-w w c">
      {isEditing ? (
        <EditMove
          move={move}
          state={props.state}
          moveList={props.moveList}
          setIsEditing={setIsEditing}
        />
      ) : (
        <SC.SmallCard className="bdr-b bdr-t bdr-rad" id={move.moveName}>
          <SC.CardHeader>
            <SC.CardName>{move.moveName}</SC.CardName>
            <SC.CardTrigger className="bdr-b bdr-t">
              {move.trigger}
              {move.roll && (
                <SC.RollButton className="m-1">{move.modifier}</SC.RollButton>
              )}
            </SC.CardTrigger>
          </SC.CardHeader>
          <div>
            {move.roll && (
              <div>
                <MultiLine txt={move.successDescription}>
                  <div className="d-flex">
                    <ul className="bdr-b w">10+</ul>
                  </div>
                </MultiLine>

                <MultiLine txt={move.swcDescription}>
                  <div className="d-flex">
                    <ul className="bdr-b w">7 to 9</ul>
                  </div>
                </MultiLine>

                <MultiLine txt={move.failDescription}>
                  <div className="d-flex">
                    <ul className="bdr-b w">6-</ul>
                  </div>
                </MultiLine>
              </div>
            )}
            {isShowAll && (
              <React.Fragment>
                <div className="d-flex">
                  <ul className="bdr-b w">Description</ul>
                </div>
                <MultiLine txt={move.description} />
              </React.Fragment>
            )}
          </div>
          <SC.CardFooter>
            <em>{move.type}</em>
            <em>{move.source}</em>
            <SC.Button onClick={handleEditClick}>Edit</SC.Button>
            <SC.Button onClick={handleShowClick}>
              {isShowAll ? "Less" : "More"}
            </SC.Button>
          </SC.CardFooter>
        </SC.SmallCard>
      )}
    </div>
  );
};
