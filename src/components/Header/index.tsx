import styles from "./index.module.scss";
import { ReactComponent as ReactLogo } from "@assets/icons/logo.svg";
import SvgIcon from "../SvgIcon";
import packageObj from "../../../package.json";
console.log("package", packageObj.version);

import Worker from "./example.js?worker";
const worker = new Worker();
worker.addEventListener("message", (event) => {
  console.log("event", event);
});

const icons = import.meta.globEager("../../assets/icons/logo-*.svg");
const iconUrls = Object.values(icons).map((mod) => {
  // 如 ../../assets/icons/logo-1.svg -> logo-1
  const fileName = mod.default.split("/").pop();
  const [svgName] = fileName.split(".");
  return svgName;
});

import logoSrc from "@assets/imgs/vite.png";
export function Header() {
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      This is Header
      <img className="m-auto mb-4" src={logoSrc} alt="" />
      <ReactLogo />
      {iconUrls.map((item) => (
        <SvgIcon name={item} key={item} width="50" height="50" />
      ))}
    </div>
  );
}
