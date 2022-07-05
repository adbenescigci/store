import SellIcon from "@mui/icons-material/Sell";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import Case from "../../../pages/Case/Case";
import Items from "../../../pages/Items/Items";
import Summary from "../../../pages/Summary/Summary";
import Transactions from "../../../pages/Transactions/Transactions";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <SellIcon />,
    label: "Islemler",
    route: "/islemler",
    element: <Transactions />,
  },
  {
    id: 1,
    icon: <AccountBalanceWalletIcon />,
    label: "Kasa",
    route: "/kasa",
    element: <Case />,
  },
  {
    id: 2,
    icon: <ViewListRoundedIcon />,
    label: "Urunler",
    route: "/urunler",
    element: <Items />,
  },
  {
    id: 3,
    icon: <WorkHistoryIcon />,
    label: "Ozet",
    route: "/ozet",
    element: <Summary />,
  },
];
