"use client";

import React from "react";
import { App, ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const AntDesignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <App className="w-full">
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </App>
  );
};
