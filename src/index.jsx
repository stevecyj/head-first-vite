// esbuild
import Server from "react-dom/server";
const Greet = () => {
  return <h1>hello, JOJO!</h1>;
};
console.log("Server", Server.renderToString(<Greet />));
