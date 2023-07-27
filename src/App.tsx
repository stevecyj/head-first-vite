import { Header } from "./components/Header";
import Button from "./components/Button";
import TextBox from "./components/TextBox";
import HelloMessage from "./components/HelloMessage";
import "./App.css";

// esbuild
import Server from "react-dom/server";
const Greet = () => {
  return <h1>hello, JOJO!</h1>;
};
console.log("Server", Server.renderToString(<Greet />));

function App() {
  return (
    <div>
      <Header />
      <Button>Click me</Button>
      <TextBox />
      <HelloMessage />
    </div>
  );
}

export default App;
