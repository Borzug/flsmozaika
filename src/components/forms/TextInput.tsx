import * as React from "react";

interface IProps {
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    label?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    inputSizeClassName?: string;
    validationClassName?: string;
    labelClassName?: string;
    helper?: React.ReactNode;
    onChange: (name: string, value: string) => void;
}

export class TextInput extends React.Component<IProps> {
    public render() {
        const {
            inputSizeClassName,
            labelClassName,
            validationClassName,
            name,
            value,
            type,
            placeholder,
            required,
            disabled,
            label,
            helper
        } = this.props;

        return (
            <>
                {label &&
                    <label htmlFor={name} className={labelClassName}>
                        {label}
                    </label>
                }

                <div className={inputSizeClassName}>
                    <input
                        className={`form-control ${validationClassName}`}
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        required={required}
                        disabled={disabled}
                    />
                    {helper}
                </div>
            </>
        );
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(this.props.name, e.target.value);
    }
}
