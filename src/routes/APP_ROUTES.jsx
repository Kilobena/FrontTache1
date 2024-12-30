import GamesCategoryPage from "../pages/User/Games/GamesCategoryPage";

// ICONS GAME CATEGORY
import IconLobby from "../assets/icons/icon-lobby.svg";
import IconFeatured from "../assets/icons/icon-featured.svg";
import IconNew from "../assets/icons/icon-new.svg";
import IconSlots from "../assets/icons/icon-slots.svg";
import IconCrash from "../assets/icons/icon-crash.svg";
import IconProviders from "../assets/icons/icon-providers.svg";
import IconLiveCasino from "../assets/icons/icon-live-casino.svg";
import IconAmatic from "../assets/icons/icon-amatic.svg";
import IconPragmatic from "../assets/icons/icon-pragmatic.svg";
import IconOtherGames from "../assets/icons/icon-other-games.svg";

// ICONS USER MENU
import IconMyAccount from "../assets/icons/icon-my-account.svg";
import IconTransactionsHistory from "../assets/icons/icon-transactions-history.svg";
import IconVerifyAccount from "../assets/icons/icon-verify-account.svg";

// ICONS SIDEBAR
import IconTransfer from "../assets/icons/icon-transfer.svg";
import IconTransferHistory from "../assets/icons/icon-transfer-history.svg";
import IconTransferReport from "../assets/icons/icon-transfer-report.svg";
import IconGamingReport from "../assets/icons/icon-gaming-report.svg";
import IconSportbookBets from "../assets/icons/icon-sportsbook-bets.svg";
import IconCasinoBets from "../assets/icons/icon-casino-bets.svg";
import IconManageUsers from "../assets/icons/icon-manage-users.svg";
import TransferForm from "../pages/Admin/TransferAction";
import TransferHistory from "../pages/Admin/TransferHistory";
import TransferReport from "../pages/Admin/TransferReport";
import GamingReport from "../pages/Admin/GamingReport";
import CasinoBets from "../pages/Admin/CasinoBets";
import ManageUser from "../pages/Auth/ManageUser";

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
    icon: IconFeatured,
  },
  {
    label: "New",
    path: "/new",
    component: <GamesCategoryPage />,
    category: "playtech",
    icon: IconNew,
  },
  {
    label: "Slots",
    path: "/slots",
    component: <GamesCategoryPage />,
    category: "Novomatic",
    icon: IconSlots,
  },
  {
    label: "Crash",
    path: "/crash",
    component: <GamesCategoryPage />,
    category: "Gamzix",
    icon: IconCrash,
  },
  {
    label: "Providers",
    path: "/providers",
    component: <GamesCategoryPage />,
    category: "pragmatic play",
    icon: IconProviders,
  },
  {
    label: "Live Casino",
    path: "/livecasino",
    component: <GamesCategoryPage />,
    type: "livecasino",
    icon: IconLiveCasino,
  },
  {
    label: "Amatic",
    path: "/amatic",
    component: <GamesCategoryPage />,
    category: "Real Dealer Studios",
    icon: IconAmatic,
  },
  {
    label: "Pragmatic",
    path: "/pragmatic",
    component: <GamesCategoryPage />,
    category: "pragmatic play",
    icon: IconPragmatic,
  },
  {
    label: "Other Games",
    path: "/other-games",
    component: <GamesCategoryPage />,
    category: "playtech",
    icon: IconOtherGames,
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
    image: IconMyAccount,
  },
  {
    title: "Casino Bets",
    path: "casino-bets",
    image: IconCasinoBets,
  },
  {
    title: "Sports Bets",
    path: "sports-bets",
    image: IconSportbookBets,
  },
  {
    title: "Transactions History",
    path: "transaction-history",
    image: IconTransactionsHistory,
  },
  {
    title: "Verify Account",
    path: "verify-account",
    image: IconVerifyAccount,
  },
];

export const ADMIN_NAV = [
  {
    title: "Transfer",
    path: "/transfer",
    component: <TransferForm />,
    image: IconTransfer,
  },
  {
    title: "Transfer History",
    path: "/transfer-history",
    component: <TransferHistory />,
    image: IconTransferHistory,
  },
  {
    title: "Transfers Report",
    path: "/transfers-report",
    component: <TransferReport />,
    image: IconTransferReport,
  },
  {
    title: "Gaming Report",
    path: "/gaming-report",
    component: <GamingReport />,
    image: IconGamingReport,
  },
  {
    title: "Sportsbook Bets",
    path: "/sportsbook-bets",
    component: <></>,
    image: IconSportbookBets,
  },
  {
    title: "Casino Bets",
    path: "/casino-bets",
    component: <CasinoBets />,
    image: IconCasinoBets,
  },
  {
    title: "Manage Users",
    path: "/manage-users",
    component: <ManageUser />,
    image: IconManageUsers,
  },
  // {
  //   title: "Transaction History",
  //   path: "/register-user",
  //   component: <TransactionsHistory />,
  //   image: IconRegisterUser,
  // },
  // {
  //   title: "Logout",
  //   path: "/home",
  //   image: IconLogout,
  // },
];
