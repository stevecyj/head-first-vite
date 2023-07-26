import styles from "./index.module.scss";
import { ReactComponent as ReactLogo } from "@assets/icons/logo.svg";
import packageObj from "../../../package.json";
console.log("package", packageObj.version);

import Worker from "./example.js?worker";
const worker = new Worker();
worker.addEventListener("message", (event) => {
  console.log("event", event);
});

import logoSrc from "@assets/imgs/vite.png";
export function Header() {
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      This is Header
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      <ReactLogo />
    </div>
  );
}
