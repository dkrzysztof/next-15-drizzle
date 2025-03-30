"use client";

import React, { JSX } from "react";
import { ConfigProvider, theme } from "antd";

const withTheme = <T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> => {
  return (props: T) => (
    <>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
        }}
      >
        <Component {...props} />
      </ConfigProvider>
    </>
  );
};

export default withTheme;