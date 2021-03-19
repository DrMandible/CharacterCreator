import React from "react";

import { getRandomPortrait } from "../data/charNetworkConnections";

import { store } from "../data/store";

import * as SC from "../styled";

export function Account() {
  const { state, dispatch } = React.useContext(store);

  const initialValues = {
    userName: state.user.userName,
    email: state.user.email,
    imageUrl:
      state.user.image && state.user.image !== "none"
        ? state.user.image
        : getRandomPortrait(state.user.userName)
  };

  // const handleProfilePic = (e) => {
  //   console.log(e.target.files);
  // };

  return (
    <form>
      <SC.SmallCard className="f-a-s w l">
        <SC.SmallIcon style={{ height: "5rem", width: "5rem" }}>
          <img src={initialValues.imageUrl} alt={initialValues.userName} />
        </SC.SmallIcon>
        {/* <div>
          <label>Select File</label>
          <input
            type="file"
            name="profilepic"
            onChange={(e) => handleProfilePic(e)}
          />
        </div> */}
        <b>
          <div>Name: {initialValues.userName}</div>
        </b>
        <div>Email: {initialValues.email}</div>
      </SC.SmallCard>
    </form>
  );
}
