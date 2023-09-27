/** @jsxImportSource @emotion/react */
//eslint-disable-next-line
import { jsx } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Settings from "./Settings/Settings";

export default function Portfolio() {
  const theme = useTheme();
  return (
    <header
      css={{
        backgroundColor: theme.palette.primary.main,
        padding: "6px",
        width: "100%",
        borderBottomLeftRadius: "12px",
      }}
    >
      <span
        css={{
          fontSize: "30px",
          color: theme.palette.primary.contrastText,
          verticalAlign: "bottom",
        }}
      >
        Invest Helper
      </span>
      <Settings />
    </header>
  );
}
