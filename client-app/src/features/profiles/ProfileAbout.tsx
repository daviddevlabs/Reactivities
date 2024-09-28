import { Button, Grid, Header, TabPane } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Profile, ProfileFormValues } from "../../app/models/profile";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";

interface Props {
    profile: Profile;
}

export default function ProfileAbout({ profile }: Props) {
    const { profileStore: { isCurrentUser, editProfile } } = useStore();
    const [editProfileMode, setEditProfileMode] = useState(false);

    function handleProfileEdit(profile: ProfileFormValues) {
        editProfile(profile).then(() => setEditProfileMode(false));
    }

    return (
        <TabPane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={"About " + profile.displayName} />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={editProfileMode ? "Cancel" : "Edit Profile"}
                            onClick={() => setEditProfileMode(!editProfileMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editProfileMode ? (
                        <ProfileEdit profileEdit={handleProfileEdit} />
                    ) :
                        <strong>{profile.bio}</strong>
                    }
                </Grid.Column>
            </Grid>
        </TabPane>
    )
}
