import { observer } from "mobx-react-lite"
import { Image, List, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile"
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {
    const styles = {
        borderColor: "orange",
        borderWidth: 3,
    };

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup key={attendee.username} hoverable trigger={
                    <List.Item as={Link} to={`/profiles/${attendee.username}`}>
                        <Image
                            size="mini" circular
                            src={attendee.image || "/assets/vite.svg"}
                            bordered
                            style={attendee.following ? styles : null} />
                    </List.Item>}
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})