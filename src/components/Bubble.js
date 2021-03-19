import React from "react";

import * as SC from "../styled";

let styles = {
  toNodeIcon: { maxHeight: "3rem", maxWidth: "3rem!" },
  smallText: { fontSize: "0.8rem" },
  name: {
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

export const BubbleWPortrait = (props) => {
  // name, image, label, fullText
  const name = props.name;
  const image = props.image;
  const label = props.label;
  const fullText = props.fullText;
  return (
    <div className="d-flex w" style={{ zIndex: 999 }}>
      {image && <Portrait image={image} />}
      <div className={`d-flex w f-w`}>
        <div className={`d-flex w f-sb c`}>
          <Name className={`d-flex w`} name={name} />
          <div>
            <Label label={label} />
            {props.children}
          </div>
        </div>

        {fullText !== "" && <FullText fullText={fullText} />}
      </div>
    </div>
  );
};
