import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";

interface Props {
    name: string;
    placeholderText: string;
    showTimeSelect: boolean;
    timeCaption: string;
    dateFormat: string;
}

export default function DateInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label className="ui pointing red basic label" content={meta.error} />
            ) : null}
        </Form.Field>
    )
}