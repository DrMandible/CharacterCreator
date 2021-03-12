import React from "react";
import { useFormik } from "formik";
import * as SC from "../styled/index";

// module scope VARIABLES begin
const DW_MODS = [
  "No roll",
  "STR",
  "DEX",
  "CON",
  "INT",
  "WIS",
  "CHA",
  "ANY",
  "Bond"
];

const MOVE_TYPES = ["Basic", "Special", "Playbook", "Campaign"];
const MOVE_SOURCES = ["Core", "3rd Party", "Player"];

const ROLL_FIELDS = ["modifier", "swcDescription", "successDescription"];

const INITIAL_VALUES = {
  moveName: "Enter a move name",
  roll: false,
  trigger: `Enter a short move trigger (ie. "When you...")`,
  modifier: DW_MODS[0],
  failDescription: "Describe a failed roll (optional)",
  swcDescription: `Describe a success with complications`,
  successDescription: "Describe a success",
  description: "Describe your move",
  type: "Core",
  source: "Basic"
};
// module scope VARIABLES end

// module scope FUNCTIONS begin
const _validate = (formik, setValidationErrors) => {
  let newValidationErrors = [];

  if (formik.values.moveName === INITIAL_VALUES.moveName) {
    newValidationErrors.push("moveName");
  }

  if (formik.values.modifier !== INITIAL_VALUES.modifier) {
    for (let rollField of ROLL_FIELDS) {
      if (formik.values[rollField] === INITIAL_VALUES[rollField]) {
        newValidationErrors.push(rollField);
      }
    }
  }

  let newMove = formik.values;
  if (formik.values.modifier === INITIAL_VALUES.modifier) {
    if (formik.values.description === INITIAL_VALUES.description) {
      newValidationErrors.push("description");
    }
    for (let rollField in ROLL_FIELDS) {
      newMove[rollField] = false;
    }
  }
  setValidationErrors(newValidationErrors);
  // console.log(newValidationErrors);
  return newValidationErrors.length;
};
// module scope FUNCTIONS end

// REACT COMPONENTS begin
export const EditMove = (props) => {
  // console.log(props);
  const [showAddMove, setShowAddMove] = props.state;
  const [moves, setMoves] = props.moveList;

  const [validationErrors, setValidationErrors] = React.useState([]);
  const [isRolled, setIsRolled] = React.useState(false);

  const formik = useFormik({
    initialValues: props.move || INITIAL_VALUES,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleCancel = () => {
    if (props.setIsEditing) {
      // console.log("props.setIsEditing: ", props.setIsEditing);
      props.setIsEditing(false);
    } else {
      setShowAddMove(false);
    }
  };

  const handleSubmit = (values) => {
    if (_validate(formik, setValidationErrors) > 0) {
      return;
    }

    if (values.modifier !== INITIAL_VALUES.modifier) {
      formik.values.roll = true;
    }

    if (values.failDescription === INITIAL_VALUES.failDescription) {
      formik.values.failDescription = "";
    }

    if (props.setIsEditing) {
      // console.log("props.setIsEditing: ", props.setIsEditing);
      props.setIsEditing(false);
    } else {
      let newMoveList = moves;
      newMoveList[formik.values.moveName] = values;
      setMoves(newMoveList);
      setShowAddMove(false);
    }
  };

  React.useEffect(() => {
    setIsRolled(formik.values.modifier === INITIAL_VALUES.modifier);
    console.log(formik.initialValues);
  }, [formik.values]);

  return (
    <div className="d-flex c" style={{ width: "100%" }}>
      <SC.SmallCard className="p-1 bdr-b bdr-t bdr-rad">
        <form onSubmit={formik.handleSubmit}>
          <SC.CardHeader className="p-1 w c">
            <div className="p-1 w c">
              <div className="w c">
                {/* moveName */}
                <div className="d-flex">
                  <ul className="bdr-b hw">Name</ul>
                </div>
                <div className="w c">
                  <SC.CardInput
                    className="w c bdr-b"
                    type="text"
                    id="moveName"
                    name="moveName"
                    onChange={formik.handleChange}
                    placeholder={formik.values.moveName}
                    defaultValue={props.move?.moveName || ""}
                    autoComplete="off"
                  />
                </div>

                {/* modifier */}
                <SC.CardTrigger className="bdr-b w c">
                  {formik.values.modifier !== INITIAL_VALUES.modifier ? (
                    <React.Fragment>
                      {/* trigger */}
                      <div className="w c">
                        <div className="d-flex">
                          <ul className="bdr-b hw">Trigger</ul>
                        </div>
                        <SC.CardTextArea
                          className="w bdr-b"
                          type="text"
                          id="trigger"
                          name="trigger"
                          onChange={formik.handleChange}
                          placeholder={
                            formik.values.trigger || INITIAL_VALUES.trigger
                          }
                          defaultValue={props.move?.trigger || ""}
                          autoComplete="off"
                        />
                      </div>
                      <b className="m-1 p-1">{`Roll + `}</b>
                    </React.Fragment>
                  ) : (
                    <div className="w c" />
                  )}
                  <SC.CardSelect
                    onChange={formik.handleChange}
                    id="modifier"
                    role="group"
                    className="p-1 m-1"
                    defaultValue={props.move?.modifier || ""}
                  >
                    {DW_MODS.map((mod) => {
                      return (
                        <SC.CardOption
                          key={mod}
                          id={mod}
                          name="modifier"
                          value={mod}
                          placeholder={mod}
                          className="p-1 m-1"
                        >
                          {mod}
                        </SC.CardOption>
                      );
                    })}
                  </SC.CardSelect>
                </SC.CardTrigger>
              </div>
            </div>
          </SC.CardHeader>

          <div className="card-body">
            {formik.values.modifier !== INITIAL_VALUES.modifier && (
              <div>
                {/* successDescription */}
                <div>
                  <div className="d-flex">
                    <ul className="bdr-b hw">10 or above </ul>
                  </div>
                  <SC.CardTextArea
                    className="w"
                    type="textarea"
                    id="successDescription"
                    name="successDescription"
                    onChange={formik.handleChange}
                    placeholder={
                      formik.values.successDescription ||
                      INITIAL_VALUES.successDescription
                    }
                    defaultValue={props.move?.successDescription || ""}
                  />
                </div>

                {/* swcDescription */}
                <div>
                  <div className="d-flex">
                    <ul className="bdr-b hw">7 to 9 </ul>
                  </div>
                  <SC.CardTextArea
                    className="w"
                    type="textarea"
                    id="swcDescription"
                    name="swcDescription"
                    onChange={formik.handleChange}
                    placeholder={
                      formik.values.swcDescription ||
                      INITIAL_VALUES.swcDescription
                    }
                    defaultValue={props.move?.swcDescription || ""}
                  />
                </div>

                {/* failDescription */}
                <div>
                  <div className="d-flex">
                    <ul className="bdr-b hw">6 or less </ul>
                  </div>
                  <SC.CardTextArea
                    className="w"
                    type="textarea"
                    id="failDescription"
                    name="failDescription"
                    onChange={formik.handleChange}
                    placeholder={
                      formik.values.failDescription ||
                      INITIAL_VALUES.failDescription
                    }
                    defaultValue={props.move?.failDescription || ""}
                  ></SC.CardTextArea>
                </div>
              </div>
            )}
            <div className="d-flex">
              <ul className="bdr-b hw">Description </ul>
            </div>
            <SC.CardTextArea
              className="w"
              type="text"
              id="description"
              name="description"
              onChange={formik.handleChange}
              placeholder={formik.values.description}
              defaultValue={props.move?.description || ""}
            />
          </div>

          <SC.CardFooter className="d-flex">
            <SC.CardSelect
              onChange={formik.handleChange}
              placeholder={formik.values.source}
              id="source"
              name="source"
              className="m-1 p-1"
              defaultValue={props.move?.source || ""}
              aria-label="source"
            >
              {MOVE_SOURCES.map((moveSource) => (
                <SC.CardOption
                  key={moveSource}
                  value={moveSource}
                  id={moveSource}
                  name={moveSource}
                >
                  {moveSource}
                </SC.CardOption>
              ))}
            </SC.CardSelect>

            <SC.CardSelect
              onChange={formik.handleChange}
              placeholder={formik.values.type}
              defaultValue={props.move?.type || ""}
              id="type"
              name="type"
              className="m-1 p-1"
              aria-label="type"
            >
              {MOVE_TYPES.map((moveType) => (
                <SC.CardOption
                  key={moveType}
                  value={moveType}
                  id={moveType}
                  name={moveType}
                >
                  {moveType}
                </SC.CardOption>
              ))}
            </SC.CardSelect>
            <div>
              <SC.Button className="m-1 p-1" onMouseUp={handleCancel}>
                Cancel
              </SC.Button>
              <SC.Button className="m-1 p-1" type="submit">
                Done
              </SC.Button>
            </div>
          </SC.CardFooter>
          {/* validationErrors */}
          {validationErrors.length > 0 && (
            <div>
              ERROR:
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </div>
          )}
        </form>
      </SC.SmallCard>
    </div>
  );
};
// REACT COMPONENTS end
