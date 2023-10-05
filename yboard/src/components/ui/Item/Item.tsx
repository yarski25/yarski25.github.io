import React, { PropsWithChildren } from "react";
import { Stack, Typography } from "@mui/material";

type ItemProps = {
  src?: string; // icon source
  alt?: string; // icon alt text
  iconSize?: string; // icon size
  fontSize?: string; // font size
  style?: React.CSSProperties;
};

const Item = (props: PropsWithChildren<ItemProps>) => {
  return (
    <Stack
      spacing={0.25}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={props.src}
        width={props.iconSize || 16}
        height={props.iconSize || 16}
        alt={props.alt || "no icon"}
        style={{ marginRight: "0.5em" }}
      />
      <Typography
        sx={{
          mb: 0,
          fontSize: props.fontSize || "1em",
          textAlign: "center",
          alignItems: "center",
        }}
        color="text.secondary"
      >
        {props.children}
      </Typography>
    </Stack>
  );
};

export default Item;
