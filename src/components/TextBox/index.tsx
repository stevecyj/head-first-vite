// import { css } from "@emotion/react";

const color = "darkgreen";
const base = {
  backgroundColor: "hotpink",
  "&:hover": {
    color: `${color}`,
  },
};

const TextBox = () => {
  return <div css={base}>This has a hotpink background.</div>;
};

export default TextBox;
