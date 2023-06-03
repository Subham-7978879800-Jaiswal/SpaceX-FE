import React from "react";
import { Button } from "arwes";

const Authentication = () => {
  return (
    <div
      style={{
        width: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form>
        <div>
          <label for="email">EMAIL ID </label>
          <input id="email" type="input" />
        </div>

        <div>
          <label for="password">PASSWORD</label>
          <input id="password" type="input" />
        </div>
      </form>
    </div>
  );
};

export default Authentication;
