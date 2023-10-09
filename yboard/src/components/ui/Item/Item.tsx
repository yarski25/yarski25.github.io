import React, { PropsWithChildren } from "react";
import { Stack, Typography } from "@mui/material";

type ItemProps = {
  src?: string; // icon source
  alt?: string; // icon alt text
  iconSize?: string; // icon size
  fontSize?: string; // font size
  style?: React.CSSProperties;
  justifyContentItem?: string; // justify content Item
  paddingItem?: string; // padding Item
};

const Item = (props: PropsWithChildren<ItemProps>) => {
  return (
    <Stack
      spacing={0.25}
      direction="row"
      justifyContent={props.justifyContentItem || "space-between"}
      //justifyContent="space-evenly"
      alignItems="center"
      padding={props.paddingItem}
      //width={200}
    >
      <Stack justifyContent="flex-start">
        <img
          src={props.src}
          width={props.iconSize || 16}
          height={props.iconSize || 16}
          alt={props.alt || "no icon"}
          style={{ marginRight: "0.5em" }}
        />
      </Stack>
      <Stack>
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
    </Stack>
  );
};

export default Item;
