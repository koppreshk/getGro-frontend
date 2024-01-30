import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { Controller, useFormContext } from "react-hook-form"

interface IAutocompleteFieldProps {
    name: string;
    label: string;
    placeholder: string;
    options: {
        key: string;
        value: string;
    }[];
}
export const AutocompleteField = (props: IAutocompleteFieldProps) => {
    const { name, options, label, placeholder } = props;
    const { control } = useFormContext();
    return (
        <Controller
            render={({ field: { onChange } }) => (
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={options}
                    disableCloseOnSelect
                    limitTags={3}
                    getOptionLabel={(option) => option.value}
                    onChange={(ev, newValue) => onChange(newValue)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlank fontSize="small" />}
                                checkedIcon={<CheckBox fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.value}
                        </li>
                    )}
                    style={{ width: '100%' }}
                    renderInput={(params) => (
                        <TextField {...params} label={label} placeholder={placeholder} name={name} fullWidth />
                    )}
                />
            )}
            control={control}
            name={name}
        />
    )
}