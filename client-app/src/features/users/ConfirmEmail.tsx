import {useStore} from "../../app/stores/store.ts";
import useQuery from "../../app/util/hooks.tsx";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";
import {toast} from "react-toastify";
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import LoginForm from "./LoginForm.tsx";

export default function ConfirmEmail(){
    const {modalStore} = useStore();
    const email = useQuery().get("email") as string;
    const token = useQuery().get("token") as string;
    
    const Status = {
        Verifying : "Verifying",
        Failed : "Failed",
        Success : "Success"
    }
    
    const [status, setStatus] = useState(Status.Verifying);

    function handleConfirmEmailResend(){
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success("Verification email resend")
        }).catch(error => console.log(error))
    }
    
    useEffect(() => {
        agent.Account.verifyEmail(token, email).then(() => {
            setStatus(Status.Success);
        }).catch(() => {
            setStatus(Status.Failed);
        });
    }, [Status.Success, Status.Failed, token, email])
    
    function getBody(){
        switch (status){
            case Status.Verifying:
                return <p>Verifying...</p>
            case Status.Failed:
                return (
                    <div>
                        <p>Verification failed. You can try resending the verify link to your email</p>
                        <Button primary onClick={handleConfirmEmailResend} size="huge" content="Resend email"/>
                    </div>
                );
            case Status.Success:
                return (
                    <div>
                        <p>Email has been verified</p>
                        <Button primary onClick={() => modalStore.openModel(<LoginForm/>)} size="huge" content="Login" />
                    </div>
                );
        }
    }
    
    return (
        <Segment placeholder textAlign="center">
            <Header icon>
                <Icon name="envelope" />
                Email verification
            </Header>
            <Segment.Inline>
                {getBody()}
            </Segment.Inline>
        </Segment>
    )
}