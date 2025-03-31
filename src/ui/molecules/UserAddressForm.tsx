"use client";
import { SelectUser } from "@/db/schema";
import {
  userAddressFormValuesToUserAddressExportedFormValues,
  validateIsCountryCodeIso3166_1Alpha3,
} from "@/utils";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
} from "antd";
import countries from "i18n-iso-countries";
import React, { startTransition } from "react";
import { LiveFormUsersAddressPreview } from "../organisms/LiveFormUsersAddressPreview";
import { UserAddressExportedFormValues, UserAddressFormValues } from "../types";
import { AddressTypeTagSelectOptions } from "./SelectOptionsFromArray";
import { AddressTypeTag } from "../atoms/AddressTypeTag";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type Props = {
  formType: "edit" | "create";
  loading?: boolean;
  userId: SelectUser["id"];
  form: FormInstance;
  initialValues?: UserAddressFormValues;
  action: (value: Required<UserAddressExportedFormValues>) => void;
  onCancel: () => void;
};

export const UserAddressForm: React.FC<Props> = ({
  formType,
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
        const serializedValues =
          userAddressFormValuesToUserAddressExportedFormValues(values);
        startTransition(() => action(serializedValues));
      }}
      layout="vertical"
      disabled={loading}
      initialValues={{
        ...initialValues,
        userId,
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
              validator: validateIsCountryCodeIso3166_1Alpha3,
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
          <Select
            placeholder="Select address type"
            disabled={formType === "edit"}
          >
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
        <Form.Item hidden name="validFrom">
          <Input hidden />
        </Form.Item>
        <Form.Item
          label="Valid From"
          name="validFromPreview"
          className="w-1/2"
          rules={[{ required: true }]}
        >
          <DatePicker
            showTime
            className="w-full"
            disabled={formType === "edit"}
          />
        </Form.Item>
      </div>

      <LiveFormUsersAddressPreview form={form} />
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
