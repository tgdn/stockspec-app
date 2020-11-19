import React from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { default as ReactSelect } from "react-select";
import tailwindConfig from "tailwind.config";
import { ErrorMessage, Label } from "components/ui/form-control";

const tw = resolveConfig(tailwindConfig);
const { spacing, borderRadius, colors, fontSize } = tw.theme;

export const customStyles = {
  control: (provided, { isFocused }) => ({
    ...provided,
    // height is a fixed value for now
    // until we find something better.
    minHeight: 55,
    boxShadow: "none",
    paddingLeft: spacing["3"],
    paddingRight: spacing["3"],
    paddingTop: spacing["1.5"],
    paddingBottom: spacing["1.5"],
    ":hover": {
      borderColor: isFocused ? colors.blue["600"] : colors["accent-darkgray"],
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: borderRadius.lg,
    boxShadow: tw.theme.boxShadow["lg"],
    // border: "none",
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: borderRadius.lg,
    padding: spacing["1.5"],
    boxShadow: tw.theme.boxShadow["xs"],
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    borderRadius: borderRadius["md"],
    color: "white",
    backgroundColor: isSelected
      ? colors.gray["500"]
      : isFocused
      ? colors["accent-gray"]
      : null,
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: fontSize["lg"],
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: fontSize["lg"],
    color: colors["accent-lightgray"],
    paddingLeft: spacing["2"],
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: colors["accent-gray"],
    borderRadius: borderRadius.md,
    paddingLeft: spacing["0.5"],
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: fontSize["base"],
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    borderTopRightRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
    ":hover": {
      backgroundColor: colors["accent-lightgray"],
      color: "#000",
    },
  }),
  valueContainer: (provided, { hasValue }) => ({
    ...provided,
    paddingLeft: hasValue ? 0 : spacing["2"],
  }),
};

const selectTheme = (theme) => {
  return {
    ...theme,
    borderRadius: borderRadius.lg,
    colors: {
      ...theme.colors,
      primary: colors.blue["600"],
      neutral20: colors["accent-darkgray"],
      neutral50: colors.gray["300"],
      neutral0: colors["accent-darkgray"],
    },
  };
};

function Select(props, ref: React.Ref<any>) {
  const { hasError, message } = props;
  const { label, name } = props;
  const { id = `${name}-id` } = props;

  return (
    <div className="w-full space-y-2">
      {label && <Label id={id}>{label}</Label>}
      <ReactSelect
        // menuIsOpen
        id={id}
        closeMenuOnSelect={!props.isMulti}
        styles={customStyles}
        theme={selectTheme}
        {...props}
        ref={ref}
      />
      {hasError && message && (
        <ErrorMessage key={`${name}-error`} message={message} />
      )}
    </div>
  );
}

export default React.forwardRef(Select);
