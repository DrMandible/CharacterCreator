import React from "react";

import * as SC from "../styled";

let styles = {
  toNodeIcon: { maxHeight: "3rem", maxWidth: "3rem!" },
  smallText: { fontSize: "0.8rem", color: "lightgray" },
  name: {
    color: "rgb(195, 195, 225)",
    fontSize: "1.1rem"
  }
};

const Name = ({ name }) => <b style={styles.name}>{name}</b>;

const Label = ({ label }) => (
  <div className="d-flex tr" style={styles.smallText}>
    {label}
  </div>
);

const Portrait = ({ name, image }) => (
  <SC.SmallIcon style={styles.toNodeIcon}>
    <img src={image} alt={name} />
  </SC.SmallIcon>
);

const FullText = ({ fullText }) => (
  <div className="t-sub p-1 e tr">{fullText}</div>
);

export const BubbleWPortrait = ({ name, image, label, fullText }) => (
  <div className="d-flex w">
    {image && <Portrait image={image} />}
    <div className={`d-flex w f-w`}>
      <div className={`d-flex w f-sb`}>
        <Name className={`d-flex w`} name={name} />
        <div>
          <Label label={label} />
        </div>
      </div>

      {fullText !== "" && <FullText fullText={fullText} />}
    </div>
  </div>
);
