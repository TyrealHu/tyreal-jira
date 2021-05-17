import { StrOrNum } from "../types";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: StrOrNum | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = ({
  value,
  onChange,
  defaultOptionName,
  options,
  ...otherOptions
}: IdSelectProps) => {
  const numberValue = toNumber(value);
  return (
    <Select
      value={options?.length ? numberValue : 0}
      onChange={() => onChange(numberValue || undefined)}
      {...otherOptions}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option key={option.id} value={option.id}>
            {option.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
