import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ProfileFormValues } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import { Form } from "react-router-dom";
import TextInput from "../../app/common/form/TextInput";
import TextArea from "../../app/common/form/TextArea";
import { Button } from "semantic-ui-react";

interface Props {
    profileEdit: (profile: ProfileFormValues) => void;
}

export default function ProfileEdit({ profileEdit }: Props) {
    const { profileStore } = useStore();

    const [profile, setProfile] = useState<ProfileFormValues>(new ProfileFormValues())

    useEffect(() => {
        if (profileStore.profile) setProfile(new ProfileFormValues(profileStore.profile))
    }, []);

    const validationSchema = Yup.object({
        displayName: Yup.string().required("Display Name is required")
    });

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={profile}
            onSubmit={values => profileEdit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <TextInput name="displayName" placeholder="Display Name" />
                    <TextArea rows={3} name="bio" placeholder="Add your bio" />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting}
                        floated="right"
                        positive
                        type="submit"
                        content="Update Profile" />
                </Form>
            )}
        </Formik>
    )
}
