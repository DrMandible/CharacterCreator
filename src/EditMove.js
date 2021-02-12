import { useFormik } from "formik";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// MODULE SCOPE VARIABLES begin
const DW_MODS = ["STR", "DEX", "CON", "INT", "WIS", "CHA", "ANY", "Bond"];

let moveInitialValues = {
  moveName: "Name",
  roll: false,
  trigger: "When...",
  modifier: "Choose a roll modifier",
  description: "Add a description",
  type: "Move type (basic, playbook, homebrew, etc)",
  source: "Rule source (core, 3rd party playbook, username)"
};
// MODULE SCOPE VARIABLES end

// REACT COMPONENTS begin
export const EditMove = (props) => {
  const [isFocused, setIsFocused] = React.useState("NONE");
  const [isRolled, setIsRolled] = React.useState(moveInitialValues.roll);
  const [showAddMove, setShowAddMove] = props.state;
  const [moves, setMoves] = props.moveList;

  const formik = useFormik({
    initialValues: moveInitialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  console.log("isFocused: ", isFocused);
  React.useEffect(() => {
    console.log("roll: ", formik.values.roll);
    setIsRolled(formik.values.roll);
  }, [formik.values.roll]);

  console.log(formik.values);

  const handleSubmit = (values) => {
    console.log("values: ", values);
    let newMoveList = moves;
    newMoveList[formik.values.moveName] = values;
    setMoves(newMoveList);
    setShowAddMove(false);
  };

  const handleFocus = (id) => {
    setIsFocused(id);
  };

  return (
    <div className="card-deck">
      <form onSubmit={formik.handleSubmit} className="card">
        <div className="card-header">
          <div className="p-2">
            {isFocused === "moveName" ? (
              <div>
                <label hidden={true} htmlFor="moveName" />
                <input
                  type="text"
                  id="moveName"
                  name="moveName"
                  onChange={formik.handleChange}
                  value={formik.values.moveName}
                />
              </div>
            ) : (
              <button onMouseUp={handleFocus("moveName")}>test</button>
            )}
          </div>
          <div className="container">
            <div className="row">
              <div>
                <label
                  className={`btn ${
                    isRolled ? "btn-success" : "btn-outline-secondary"
                  }`}
                  htmlFor="roll"
                >
                  <input
                    hidden={true}
                    type="checkbox"
                    className="btn-check"
                    id="roll"
                    name="roll"
                    onChange={formik.handleChange}
                    value={formik.values.roll}
                  ></input>
                  Roll
                </label>
              </div>
              {isRolled && (
                // MODIFIER radio buttons
                <div id="modifier" role="group" className="d-flex">
                  {DW_MODS.map((mod) => {
                    console.log(mod);
                    return (
                      <div key={mod} className="px-1">
                        <label
                          className={`btn ${
                            formik.values.modifier === mod
                              ? "btn-warning"
                              : "btn-outline-secondary"
                          }`}
                          htmlFor={mod}
                        >
                          <input
                            hidden={true}
                            type="radio"
                            className="btn-check"
                            id={mod}
                            name="modifier"
                            onChange={formik.handleChange}
                            value={mod}
                          />
                          {mod}
                        </label>
                      </div>
                    );
                  })}
                  <input
                    type="text"
                    id="moveName"
                    name="moveName"
                    onChange={formik.handleChange}
                    value={formik.values.trigger}
                  />
                </div>
              )}
              {}
            </div>
          </div>
        </div>
        <div className="card-body">
          <input
            type="textarea"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="card-footer">
          {/* <div>Type: {move.type}</div>
        <div>Source: {move.source}</div> */}
          <button className="padded" type="submit">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

// REACT COMPONENTS end
