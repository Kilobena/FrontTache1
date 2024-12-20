import Amatic from "./Games/Amatic";
import Crash from "./Games/Crash";
import Featured from "./Games/Featured";
import LiveCasino from "./Games/LiveCasino";
import New from "./Games/New";
import Pragmatic from "../pages/User/Pragmatic";
import Providers from "../pages/User/Providers";
import Slots from "../pages/User/Slots";

export const GAME_NAV = [
  {
    path: "/game",
    label: "Lobby",
    icon: "",
  },
  {
    path: "/featured",
    label: "Featured",
    component: <Featured />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75",
  },
  {
    path: "/new",
    label: "New",
    component: <New />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_new%20(1).svg&w=160&q=75",
  },
  {
    path: "/slots",
    label: "Slots",
    component: <Slots />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75",
  },
  {
    path: "/crash",
    label: "Crash",
    component: <Crash />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75",
  },
  {
    path: "/providers",
    label: "Providers",
    component: <Providers />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_providers.svg&w=160&q=75",
  },
  {
    path: "/livecasino",
    label: "Live Casino",
    component: <LiveCasino />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75",
  },
  {
    path: "/amatic",
    label: "Amatic",
    component: <Amatic />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_amatic.svg&w=160&q=75",
  },
  {
    path: "/pragmatic",
    label: "Pragmatic",
    component: <Pragmatic />,
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_pragmatic.svg&w=160&q=75",
  },
  {
    path: "/othergames",
    label: "Other Games",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Keno.svg&w=160&q=75",
  },
];

export const SPORTS_NAV = [
  {
    path: "/",
    label: "Prelive Events",
  },
  {
    path: "/",
    label: "Live Events",
  },
  {
    path: "/",
    label: "Soccer",
  },
  {
    path: "/",
    label: "Basketball",
  },
  {
    path: "/",
    label: "Tennis",
  },
];
