import GamesCategoryPage from "../pages/User/Games/GamesCategoryPage";
import IconLobby from "../assets/icons/icon-lobby.svg";

export const GAMES_CATEGORY_NAV = [
  {
    label: "Lobby",
    path: "/casino",
    component: <GamesCategoryPage />,
    icon: IconLobby,
  },
  {
    label: "Featured",
    path: "/featured",
    component: <GamesCategoryPage />,
    category: "evolution",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_featured.svg&w=160&q=75",
  },
  {
    label: "New",
    path: "/new",
    component: <GamesCategoryPage />,
    category: "playtech",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_new%20(1).svg&w=160&q=75",
  },
  {
    label: "Slots",
    path: "/slots",
    component: <GamesCategoryPage />,
    category: "Novomatic",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_slots.svg&w=160&q=75",
  },
  {
    label: "Crash",
    path: "/crash",
    component: <GamesCategoryPage />,
    category: "Gamzix",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Crash.svg&w=160&q=75",
  },
  {
    label: "Providers",
    path: "/providers",
    component: <GamesCategoryPage />,
    category: "pragmatic play",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_providers.svg&w=160&q=75",
  },
  {
    label: "Live Casino",
    path: "/livecasino",
    component: <GamesCategoryPage />,
    type: "livecasino",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Fcasino_Live%20Casino.svg&w=160&q=75",
  },
  {
    label: "Amatic",
    path: "/amatic",
    component: <GamesCategoryPage />,
    category: "Real Dealer Studios",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_amatic.svg&w=160&q=75",
  },
  {
    label: "Pragmatic",
    path: "/pragmatic",
    component: <GamesCategoryPage />,
    category: "pragmatic play",
    icon: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Fcasino_pragmatic.svg&w=160&q=75",
  },
  {
    label: "Other Games",
    path: "/other-games",
    component: <GamesCategoryPage />,
    category: "othergames",
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

export const USER_ACTIONS = [
  {
    title: "My Account",
    path: "my-account",
    image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_My%20account.svg&w=640&q=75",
  },
  {
    title: "Casino Bets",
    path: "casino-bets",
    image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_Casino%20bets.svg&w=1920&q=75",
  },
  {
    title: "Sports Bets",
    path: "sports-bets",
    image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fwinlira%2Fmenus%2Faccount_Sports%20bet.svg&w=1920&q=75",
  },
  {
    title: "Transaction History",
    path: "transaction-history",
    image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Faccount_Payment%20History.svg&w=1920&q=75",
  },
  {
    title: "Verify Account",
    path: "verify-account",
    image: "https://www.bet24.gg/_next/image?url=https%3A%2F%2Fassets.bet24.gg%2Fsites%2Fbet24%2Fmenus%2Faccount_Verify%20Account.svg&w=160&q=75",
  },
];
