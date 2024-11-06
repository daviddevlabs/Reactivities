import { Link } from "react-router-dom";
import {Button, Container, Divider, Header, Image, Segment} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import FacebookLogin, {FailResponse, SuccessResponse} from "@greatsumini/react-facebook-login";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" src="/assets/vite.svg" alt="logo" style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to="activities" size="huge" inverted>
                            Go to Activities!
                        </Button>
                        <Header as="h2" inverted content="Welcome to Reactivities" />
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModel(<LoginForm />)} size="huge" inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModel(<RegisterForm />)} size="huge" inverted>
                            Register
                        </Button>
                        <Divider horizontal inverted>Or</Divider>
                        <FacebookLogin
                            appId={""}
                            onSuccess={(response: SuccessResponse) => {
                                userStore.facebookLogin(response.accessToken)
                                console.log("Login success", response);
                            }}
                            onFail={(response: FailResponse) => {
                                console.log("Login failed", response)
                            }}
                            className={`ui button facebook huge inverted ${userStore.fbLoading && 'loading'}`}
                        />
                    </>
                )}
            </Container>
        </Segment>
    )
})