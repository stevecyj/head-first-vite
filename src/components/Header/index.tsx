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

interface Icon {
  default: string;
}
const icons = import.meta.glob("../../assets/icons/logo-*.svg", {
  eager: true
});
const iconUrls = Object.values<Icon>(icons as { [s: string]: Icon }).map(
  (mod) => {
    // 如 ../../assets/icons/logo-1.svg -> logo-1
    console.log("mod", mod);
    // 確保 mod.default 的值存在並且符合預期的格式
    if (mod.default && typeof mod.default === "string") {
      const fileName = mod.default.split("/").pop();
      if (fileName) {
        const [svgName] = fileName.split(".");
        console.log("svgName", svgName);
        return svgName;
      } else {
        console.warn("Invalid fileName format:", mod.default);
        // return someDefaultValue; // 可選：如果有預設值的話，可以返回一個預設值
      }
    } else {
      console.warn("Invalid mod.default value:", mod.default);
      // return someDefaultValue; // 可選：如果有預設值的話，可以返回一個預設值
    }
  }
);

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
