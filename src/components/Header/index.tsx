import styles from "./index.module.scss";

import logoSrc from "@assets/imgs/vite.png";
export function Header() {
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      This is Header
      <img className="m-auto mb-4" src={logoSrc} alt="" />
    </div>
  );
}
