/* eslint-disable react/prop-types */
import React from "react";

import Select, { Option } from "metabase/core/components/Select";

const FormSelectWidget = ({ placeholder, options = [], field }) => (
  <Select
    placeholder={placeholder}
    {...field}
    // react-redux expects to be raw value
    onChange={e => field.onChange(e.target.value)}
    buttonProps={{ style: { minWidth: 200 } }}
  >
    {options.map(({ name, value, icon }) => (
      <Option key={value} value={value} icon={icon}>
        {name}
      </Option>
    ))}
  </Select>
);

export default FormSelectWidget;
