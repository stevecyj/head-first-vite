import { Header } from "./components/Header";
import Button from "./components/Button";
import TextBox from "./components/TextBox";
import HelloMessage from "./components/HelloMessage";
import "./App.css";

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
