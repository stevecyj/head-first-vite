// import { css } from "@emotion/react";

const color = "darkgreen";
const base = {
  backgroundColor: "hotpink",
  "&:hover": {
    color: `${color}`,
  },
};

const danger = {
  color: "red",
};

const base2 = {
  "background-color": "darkgreen",
  color: "turquoise",
};
const TextBox = () => {
  return (
    <>
      <div css={base}>This has a hotpink background.</div>
      <div css={base2}>This will be turquoise</div>
      <div css={[danger, base2]}>
        This will be also be turquoise since the base styles overwrite the
        danger styles.
      </div>
      <div css={[base2, danger]}>This will be red</div>
    </>
  );
};

export default TextBox;
