import { observer } from "mobx-react-lite"
import { Profile } from "../../app/models/profile"
import { Card, Icon, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import FollowButton from "./FollowButton"

interface Props {
    profile: Profile
}

export default observer(function ProfileCard({ profile }: Props) {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || "/assets/vite.png"} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>
                    {profile.bio != null &&
                        profile.bio.length > 35 ? profile.bio.substring(0, 35) + "..." : profile.bio
                    }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user" />
                {profile.followersCount} followers
            </Card.Content>
            <FollowButton profile={profile} />
        </Card>
    )
})