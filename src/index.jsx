// esbuild
// import Server from "react-dom/server";
// const Greet = () => {
//   return <h1>hello, JOJO!</h1>;
// };
// console.log("Server", Server.renderToString(<Greet />));

import { render } from "https://cdn.skypack.dev/react-dom";
import React from "https://cdn.skypack.dev/react";
// import { zip } from "https://unpkg.com/lodash-es@4.17.15/lodash.js";
// console.log(zip([1, 2], ["a", "b"]));

let Greet = () => <h1>Hello, juejin!</h1>;

render(<Greet />, document.getElementById("root"));
