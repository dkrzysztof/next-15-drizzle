"use client";
import { SelectUser, UserAddressAddressType } from "@/db/schema";
import { Button, DatePicker, Form, FormInstance, Input, Row, Select } from "antd";
import React, { startTransition } from "react";
import { LiveFormattedAddress } from "../user-addresses/LiveFormattedAddress";
import { AddressTypeTag } from "./AddressTypeTag";
import dayjs, { Dayjs } from "dayjs";
import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type UserAddressFormValues = {
  userId?: SelectUser["id"];
  addressType?: UserAddressAddressType;
  validFrom?: dayjs.Dayjs;
  street?: string;
  buildingNumber?: string;
  postCode?: string;
  countryCode?: string;
  city?: string;
};

export type UserAddressExportedFormValues = Omit<
  UserAddressFormValues,
  "validFrom"
> & {
  validFrom?: string;
};

const userAddressFormValuesToUserAddressExportedFormValues = (
  value: Required<UserAddressFormValues>
): Required<UserAddressExportedFormValues> => ({
  ...value,
  validFrom: value.validFrom?.toISOString(),
});

type Props = {
  userId: SelectUser["id"];
  // TODO: is it needed ?
  form: FormInstance;
  action: (value: Required<UserAddressExportedFormValues> | null) => void;
  loading?: boolean;
  initialValues?: UserAddressExportedFormValues;
  onCancel: () => void;
};

export const UserAddressForm: React.FC<Props> = ({
  userId,
  initialValues,
  form,
  action,
  loading,
  onCancel,
}) => {
  return (
    <Form
      form={form}
      onFinish={(values: Required<UserAddressFormValues>) => {
        console.log(values.validFrom)
        const serializedValues =
          userAddressFormValuesToUserAddressExportedFormValues(values);
        startTransition(() => action(serializedValues));
      }}
      layout="vertical"
      disabled={loading}
      initialValues={{
        ...initialValues,
        userId,
        // TODO: remove - only for faster development,
        addressType: "HOME",
        validFrom: dayjs(),
        street: "Buforowa",
        buildingNumber: "20",
        postCode: "52-131",
        countryCode: "PL",
        city: "Wrocław",
      }}
    >
      <div className="flex gap-4">
        <Form.Item hidden name="userId">
          <Input />
        </Form.Item>
        <Form.Item
          label="Street"
          name="street"
          rules={[{ max: 100 }, { required: true }]}
          className="flex-1"
          initialValue="blabla"
        >
          <Input placeholder="Enter street name" />
        </Form.Item>
        <Form.Item
          label="Building Number"
          name="buildingNumber"
          rules={[{ max: 60 }, { required: true }]}
          className="w-1/3"
        >
          <Input placeholder="Enter building number" />
        </Form.Item>
      </div>
      <div className="flex gap-4">
        <Form.Item
          label="Post Code"
          name="postCode"
          rules={[{ max: 6 }, { required: true }]}
          className="w-1/3"
        >
          <Input placeholder="Enter post code" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ max: 60 }, { required: true }]}
          className="flex-1"
        >
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          label="Country Code"
          name="countryCode"
          rules={[
            { max: 3 },
            { required: true },
            {
              validator: (_: any, value: string) => {
                if (!value || countries.isValid(value.toUpperCase())) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Invalid ISO 3166-1 alpha-3 country code")
                );
              },
            },
          ]}
          className="w-1/3"
        >
          <Input placeholder="Enter country code" />
        </Form.Item>
      </div>
      <div className="flex gap-4">
        <Form.Item
          label="Address Type"
          name="addressType"
          rules={[{ max: 7 }, { required: true }]}
          className="w-1/2"
        >
          <Select placeholder="Select address type">
            <Select.Option value="HOME">
              <AddressTypeTag type="HOME" />
            </Select.Option>
            <Select.Option value="INVOICE">
              <AddressTypeTag type="INVOICE" />
            </Select.Option>
            <Select.Option value="POST">
              <AddressTypeTag type="POST" />
            </Select.Option>
            <Select.Option value="WORK">
              <AddressTypeTag type="WORK" />
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Valid From" name="validFrom" className="w-1/2">
          <DatePicker showTime className="w-full" />
        </Form.Item>
      </div>

      <LiveFormattedAddress form={form} />
      <Row className="w-full justify-end gap-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          loading={loading}
          className="py-2 px-6 rounded-lg border-4 border-white hover:bg-blue-400 active:border-blue-200 bg-blue-600 text-white transition-all"
          htmlType="submit"
          type="primary"
        >
          Save
        </Button>
      </Row>
    </Form>
  );
};
