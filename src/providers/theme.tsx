"use client";

import React from "react";
import { App, ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const AntDesignProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm],
      }}
    >
      <App className="w-full">
        <AntdRegistry>{children}</AntdRegistry>
      </App>
    </ConfigProvider>
  );
};
