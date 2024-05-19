import Select from "react-select";

const options = [
  { value: "Low", label: "Low", color: "#1d4ed8" },
  { value: "Medium", label: "Medium", color: "#EA580C" },
  { value: "High", label: "High", color: "#b91c1c" },
];

const customStyles = {
  control: (provided, { data, isSelected }) => {
    console.log("del CONTROL", data, isSelected);
    //container of our react Select
    return {
      ...provided,

      backgroundColor: "#3F3F46",
      color: "#fff",
      placeholder: "Select Priority",
    };
  },

  option: (provided, { data, isDisabled, isFocused, isSelected }) => {
    console.log("option", data, isDisabled, isFocused, isSelected);
    return {
      ...provided,
      color: isFocused ? "#fff" : data.color,
      backgroundColor: isFocused ? data.color : "grey",
    };
  },

  singleValue: (provided, { data }) => {
    console.log("singleValue", provided);
    return {
      ...provided,
      backgroundColor: data.color,
      color: "#fff", // Cambia el color del texto del valor seleccionado
    };
  },
};

const TaskComponent = ({ register, field }) => {
  return (
    <Select
      {...field}
      defaultValue={options[0]}
      options={options}
      styles={customStyles}
      {...register("priority")}
    />
  );
};

export default TaskComponent;
