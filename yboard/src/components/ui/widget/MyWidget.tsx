import React, { PropsWithChildren } from "react";
import styles from "./MyWidget.module.scss";

type MyWidgetProps = {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
  // disabled?: boolean;
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
};

const MyWidget = (props: PropsWithChildren<MyWidgetProps>) => {
  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        {props.id} {props.title}
      </div>
      <img src={props.thumbnailUrl} className={styles.icon} alt={props.url} />
    </div>
  );
};

export default MyWidget;
