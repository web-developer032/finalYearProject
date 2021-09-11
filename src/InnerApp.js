import React from "react";
import { Consumer } from "./Context";

function InnerApp() {
  return (
    <Consumer>
      {({ store }) => (
        <div>
          <h1>{store.ip.country}</h1>
          {/* <h1>H1</h1> */}
        </div>
      )}
    </Consumer>
  );
}

export default InnerApp;
