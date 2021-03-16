import React from "react";
import { useFormik } from "formik";
import { BubbleWPortrait } from "./Bubble";
import { getRandomPortrait } from "../data/charNetworkConnections";

import { store } from "../data/store";

export function Account() {
  const { state, dispatch } = React.useContext(store);
  const formik = useFormik({
    initialValues: {
      userName: state.user.userName,
      email: state.user.email
    },
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (values) => {
    console.log(values);
  };
  console.log(state.user);
  console.log(formik);
  return (
    <div className="w">
      <form onSubmit={formik.handleSubmit}>
        <BubbleWPortrait
          name={formik.values.userName}
          image={
            formik.values.image && formik.values.image !== "none"
              ? formik.values.image
              : getRandomPortrait(formik.values.userName)
          }
          label={""}
          fullText={formik.values.email}
        />
      </form>
    </div>
  );
}
