import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";

interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar({ activity: { attendees, host } }: Props) {

    if (!attendees) return null;

    return (
        <>
            <Segment
                textAlign="center"
                style={{ border: "none" }}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Item style={{ position: "relative" }} key={attendee.username}>
                            {attendee.username === host?.username && (
                                <Label
                                    style={{ position: "absolute" }}
                                    color="orange"
                                    ribbon="right"
                                >
                                    Host
                                </Label>
                            )}
                            <Image size="tiny" src={attendee.image || "/assets/vite.svg"} />
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                {attendee.following && <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>}
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>
    )
})