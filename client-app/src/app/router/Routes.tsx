import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../Layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import RegisterSuccess from "../../features/users/RegisterSuccess.tsx";
import ConfirmEmail from "../../features/users/ConfirmEmail.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: "activities", element: <ActivityDashboard /> },
                    { path: "activities/:id", element: <ActivityDetails /> },
                    { path: "createActivity", element: <ActivityForm key="create" /> },
                    { path: "manage/:id", element: <ActivityForm key="manage" /> },
                    { path: "profiles/:username", element: <ProfilePage /> },
                    { path: "errors", element: <TestErrors /> },
                ]
            },
            { path: "not-found", element: <NotFound /> },
            { path: "server-error", element: <ServerError /> },
            { path: "/account/registerSuccess", element: <RegisterSuccess /> },
            { path: "/account/verifyEmail", element: <ConfirmEmail /> },
            { path: "*", element: <Navigate replace to="/not-found" /> },
        ]
    }
]

export const router = createBrowserRouter(routes)