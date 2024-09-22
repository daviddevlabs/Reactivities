import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ displayName: "", username: "", email: "", password: "", error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />
                    <TextInput placeholder="Display Name" name="displayName" />
                    <TextInput placeholder="Username" name="username" />
                    <TextInput placeholder="Email" name="email" />
                    <TextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage
                        name="error" render={() =>
                            <ValidationErrors errors={errors.error as unknown as string[]} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        content="Register"
                        type="submit" fluid
                    />
                </Form>
            )}
        </Formik>
    )
})