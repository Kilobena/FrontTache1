import switchIcon from '../assets/images/slides/icon-switch.svg'


const transfersOptions = [
    { id: 1, label: "All Transfers", value: "all" },
    { id: 2, label: <span className="flex gap-2">Partner <img src={switchIcon} alt="switch" /> Operator</span>, value: "partner-operator" },
    { id: 3, label: <span className="flex gap-2">Super Agent <img src={switchIcon} alt="switch" /> Partner</span>, value: "super-agent-partner" },
    { id: 4, label: < span className="flex gap-2">Agent <img src={switchIcon} alt="switch" /> Super Agent</span>, value: "agent-super-agent" },
    { id: 5, label: < span className="flex gap-2">Player <img src={switchIcon} alt="switch" /> Super Agent</span>, value: "player-super-agent" },
    { id: 6, label: <span className="flex gap-2">Player <img src={switchIcon} alt="switch" /> Agent</span>, value: "player-agent" },
  ];
export  const transferOptionsForDropdown = transfersOptions.map((userOption) => ({
    value: userOption.value,
    label: userOption.label,
  }));
  export   const trasnferData = [
    { user: "asbettest", role: "Super Agent", balance: "0.00 TND", netBalanace: "0.00 TND" },
    { user: "asbettest", role: "Super Agent", balance: "0.00 TND", netBalanace: "0.00 TND" },
    { user: "asbettest", role: "Super Agent", balance: "0.00 TND", netBalanace: "0.00 TND" },
    { user: "asbettest", role: "Super Agent", balance: "0.00 TND", netBalanace: "0.00 TND" }
  ];