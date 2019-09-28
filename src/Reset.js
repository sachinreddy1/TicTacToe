import React from "react";

function Reset(props) {
  const divStyle = {
    display: props.show
  };

  return (
    <div style={divStyle}>
      <button className="button" onClick={props.onClick}>
        Reset
      </button>
    </div>
  );
}

export default Reset;
