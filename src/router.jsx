import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import TrashUser from "./pages/TrashUser";
// import TrashInbound from "./pages/TrashInbound";
import Inbound from "./pages/Inbound";
import InboundStuff from "./pages/InboundStuff";
import User from "./pages/User";
import Lending from "./pages/Lending";
// import Restoration from "./pages/Restoration";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile />},
    { path: '/dashboard', element: <Dashboard/>},
    { path: '/stuffs', element: <Stuff/>},
    { path: '/stuffs/trash', element: <TrashStuff/>},
    { path: '/users/trash', element: <TrashUser/>},
    // { path: '/inbounds/trash', element: <TrashInbound/>},
    { path: '/inbound-stuffs', element: <Inbound/>},
    { path: '/inbound-stuffs/data', element: <InboundStuff/>},
    { path: '/user', element: <User />},
    { path: '/lending', element: <Lending />},
    // { path: '/restoration', element: <Restoration/>}

])