import { Home } from "./components/Home";
import Feedback from "./components/Feedback";
import TwoPlayers from "./components/TwoPlayers";
import ChooseSide from "./components/ChooseSide";
import OnePlayer from "./components/OnePlayer";
import GetPath from "./components/GetPath";
import OnlineGame from "./components/OnlineGame";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
    {
        path: '/two-players',
        element: <TwoPlayers />
    },
    {
        path: '/feedback/:id',
        element: <Feedback />
    },
    {
        path: '/choose-side',
        element: <ChooseSide />
    },
    {
        path: '/one-player/:id',
        element: <OnePlayer />
    },
    {
        path: '/get-path', 
        element: <GetPath />
    },
    {
        path: '/online-game/:gameId/:playerId',
        element: <OnlineGame />
    }
];

export default AppRoutes;
