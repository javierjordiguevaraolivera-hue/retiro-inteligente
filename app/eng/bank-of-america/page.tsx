"use client";

import { useState } from "react";
import styles from "./page.module.css";

const accounts = [
  {
    name: "IUL Indexed Account",
    product: "IUL Indexed Account",
    balance: "$260,000.00",
    detail: true,
  },
  {
    name: "Adv Plus Banking",
    product: "Adv Plus Banking - 8709",
    balance: "$50,000.37",
    detail: false,
  },
] as const;

const indexedIulBalance = accounts[0].balance;

const closureNotice = {
  title: "Your account is closed",
  eyebrow: "Better retirement benefits ahead",
  body: "You chose to move these funds to an Indexed Universal Life (IUL).",
  detail: "Visible for records while migration is finalized.",
  timestamp: "Today",
} as const;

const bottomTabs = [
  { label: "Accounts", active: true, icon: "accounts" },
  { label: "Pay & Transfer", active: false, icon: "pay" },
  { label: "Deposit Checks", active: false, icon: "deposit" },
  { label: "Invest", active: false, icon: "invest" },
] as const;

const wealthActions = [
  { label: "Link\naccount", icon: "link" },
  { label: "New\ngoal", icon: "goal" },
  { label: "Talk to\nadvisor", icon: "advisor" },
  { label: "Update\npriorities", icon: "update" },
] as const;

const wealthMenuItems = [
  {
    title: "Projected retirement income",
    description: "See how indexed growth can support future withdrawals.",
  },
  {
    title: "Tax-advantaged strategy",
    description: "See how policy value can be used efficiently.",
  },
  {
    title: "Protected cash value",
    description: "Track long-term planned accumulation.",
  },
] as const;

type Screen = "overview" | "wealth";

function SearchIcon({ className = styles.inlineIcon }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.2 4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.bellIcon}>
      <path
        d="M7.2 10.4c0-3 1.9-5.3 4.8-5.3s4.8 2.3 4.8 5.3v3.1l1.5 2.4H5.7l1.5-2.4v-3.1Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M10.1 18.2c.4.8 1.1 1.2 1.9 1.2s1.5-.4 1.9-1.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.headerIcon}>
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.headerIcon}>
      <rect x="3.5" y="6" width="17" height="12" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4.4 7.3 7.6 5.6 7.6-5.6" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.headerIcon}>
      <path d="M4 5h2l2 10.5h9.5l2-7.2H7.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <circle cx="9" cy="19" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="19" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.headerIcon}>
      <path d="M5 4h8v16H5zM13 12h7M17 8l4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.chevron}>
      <path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.chevron}>
      <path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.closeIcon}>
      <path d="M7.5 7.5 16.5 16.5M16.5 7.5l-9 9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  if (hidden) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.eyeIcon}>
        <path d="M3.8 4.8 19.2 20.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M10.2 6.1A10.3 10.3 0 0 1 12 6c4.7 0 8.1 3.2 9.4 6-.6 1.3-1.5 2.6-2.7 3.6M7.2 8C5.5 9.1 4.2 10.7 3.4 12c1.2 2.8 4.6 6 9.4 6 1.2 0 2.3-.2 3.3-.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.eyeIcon}>
      <path d="M2.9 12c1.4-2.9 4.8-6 9.1-6s7.7 3.1 9.1 6c-1.4 2.9-4.8 6-9.1 6s-7.7-3.1-9.1-6Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function StatusAlertIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.statusAlertIcon}>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.7 12.4 10.9 14.6 15.8 9.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function PremierTrustLogo({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={compact ? styles.boaLogoCompact : styles.boaLogo}
      viewBox="0 0 96 96"
    >
      <rect x="10" y="18" width="76" height="60" rx="10" fill="#ffffff" />
      <path d="M20 35 55 20h21L41 35Z" fill="#d1122e" />
      <path d="M20 49 55 34h21L41 49Z" fill="#f04b5d" />
      <path d="M20 63 55 48h21L41 63Z" fill="#0b4f8a" />
      <path d="M20 76 55 61h21L41 76Z" fill="#2d78b7" />
    </svg>
  );
}

function FdicMark() {
  return (
    <div className={styles.fdicRow}>
      <strong>IUL</strong>
      <span>Indexed Universal Life - Retirement benefits with indexed growth and long-term protection</span>
    </div>
  );
}

function TabAccountsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v10M15.2 9.1c-.7-.8-1.7-1.1-3-1-1.4.1-2.4.8-2.4 1.9 0 1.2 1 1.7 2.7 2 1.8.3 2.7.9 2.7 2s-1 1.9-2.7 2c-1.4.1-2.6-.3-3.5-1.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

function TabPayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12h8M13.5 8.5 17 12l-3.5 3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

function TabDepositIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <rect x="5" y="6" width="14" height="10" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11h8M7 18h10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function TabInvestIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <path d="M12 12V4a8 8 0 1 1-7.4 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M12 12h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function LinkActionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.wealthActionIcon}>
      <path d="M8 8.5h7.5v7.5H8z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 12h3.5M12 4.5V8M15.5 15.5l4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function GoalActionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.wealthActionIcon}>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8.2v4.1M12 15.9h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function AdvisorActionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.wealthActionIcon}>
      <circle cx="9" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15.5" cy="11.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 18.2c1.2-2.2 3-3.3 5.4-3.3 2.5 0 4.4 1 5.6 3.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function UpdateActionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.wealthActionIcon}>
      <rect x="6" y="5.5" width="12" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9.2h6M9 12.2h6M9 15.2h4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function WealthActionIcon({ icon }: { icon: (typeof wealthActions)[number]["icon"] }) {
  switch (icon) {
    case "link":
      return <LinkActionIcon />;
    case "goal":
      return <GoalActionIcon />;
    case "advisor":
      return <AdvisorActionIcon />;
    default:
      return <UpdateActionIcon />;
  }
}

function BottomTabIcon({ icon }: { icon: (typeof bottomTabs)[number]["icon"] }) {
  switch (icon) {
    case "accounts":
      return <TabAccountsIcon />;
    case "pay":
      return <TabPayIcon />;
    case "deposit":
      return <TabDepositIcon />;
    default:
      return <TabInvestIcon />;
  }
}

function maskBalance(balance: string) {
  const digits = balance.replace(/\D/g, "").length;
  return `$${"*".repeat(Math.max(digits, 6))}`;
}

function NetWorthChart() {
  return (
    <div className={styles.chartFrame}>
      <svg aria-hidden="true" viewBox="0 0 340 220" className={styles.chartSvg}>
        <line x1="30" y1="48" x2="286" y2="48" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="71" x2="286" y2="71" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="95" x2="286" y2="95" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="118" x2="286" y2="118" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="141" x2="286" y2="141" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="165" x2="286" y2="165" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="188" x2="286" y2="188" stroke="#d8dce2" strokeDasharray="4 5" strokeWidth="1.2" />
        <line x1="30" y1="24" x2="30" y2="188" stroke="#222" strokeWidth="1.2" />
        <line x1="30" y1="188" x2="286" y2="188" stroke="#222" strokeWidth="1.2" />
        <path d="M30 188 L52 187 L74 185 L96 181 L118 174 L140 163 L162 149 L184 131 L206 109 L228 84 L248 63 L266 52 L286 48" fill="none" stroke="#003b70" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <circle cx="286" cy="48" r="4.5" fill="#d0021b" />
        <text x="298" y="48" dominantBaseline="middle" className={styles.chartAxisLabel}>$260K</text>
        <text x="298" y="95" dominantBaseline="middle" className={styles.chartAxisLabel}>$173.3K</text>
        <text x="298" y="141" dominantBaseline="middle" className={styles.chartAxisLabel}>$86.7K</text>
        <text x="298" y="188" dominantBaseline="middle" className={styles.chartAxisLabel}>$0</text>
        <text x="30" y="212" className={styles.chartDateLabel}>Year 1</text>
        <text x="158" y="212" textAnchor="middle" className={styles.chartDateLabel}>Year 3</text>
        <text x="286" y="212" textAnchor="end" className={styles.chartDateLabel}>Year 5</text>
      </svg>
    </div>
  );
}

function AccountClosedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.noticeBackdrop} role="presentation">
      <section className={styles.noticeSheet} role="dialog" aria-modal="true" aria-labelledby="account-closed-title">
        <button type="button" className={styles.noticeCloseButton} aria-label="Close account status update" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className={styles.noticeHeader}>
          <div className={styles.noticeIconWrap}>
            <StatusAlertIcon />
          </div>
          <span className={styles.noticeCongrats}>Congratulations</span>
        </div>

        <p className={styles.noticeEyebrow}>{closureNotice.eyebrow}</p>
        <h2 id="account-closed-title" className={styles.noticeTitle}>{closureNotice.title}</h2>
        <p className={styles.noticeBody}>{closureNotice.body}</p>

        <div className={styles.noticeDetailRow}>
          <span>{closureNotice.timestamp}</span>
          <span>{closureNotice.detail}</span>
        </div>

        <button type="button" className={styles.noticePrimaryButton} onClick={onClose}>Got it</button>
      </section>
    </div>
  );
}

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerActions}>
        <button type="button" className={styles.headerAction}>
          <MenuIcon />
          <span>Menu</span>
        </button>
        <div className={styles.headerSpacer} />
        <button type="button" className={styles.headerAction}>
          <MailIcon />
          <span>Mail</span>
        </button>
        <button type="button" className={styles.headerAction}>
          <CartIcon />
          <span>Products</span>
        </button>
        <button type="button" className={styles.headerAction}>
          <ExitIcon />
          <span>Exit</span>
        </button>
      </div>
      <div className={styles.topTabs}>
        <button type="button" className={styles.topTabActive}>Accounts</button>
        <button type="button" className={styles.topTab}>Dashboard</button>
      </div>
    </header>
  );
}

function OverviewScreen({
  visibleBalances,
  setScreen,
  toggleBalance,
}: {
  visibleBalances: Record<string, boolean>;
  setScreen: (screen: Screen) => void;
  toggleBalance: (accountName: string) => void;
}) {
  return (
    <>
      <AppHeader />

      <section className={styles.content} data-boa-content-start>
        <div className={styles.searchRow}>
          <div className={styles.searchBar}>
            <SearchIcon />
            <span>How can we help?</span>
          </div>
          <button type="button" className={styles.messageButton} aria-label="Messages">
            <BellIcon />
            <span className={styles.messageBadge}>4</span>
          </button>
        </div>

        <article className={styles.profileCard}>
          <button type="button" className={styles.profileRow}>
            <div>
              <h1>Hello, Maria</h1>
              <p>Preferred Rewards Platinum Member</p>
            </div>
            <ChevronRight />
          </button>
          <button type="button" className={styles.profileRow} onClick={() => setScreen("wealth")}>
            <div>
              <h2>IUL Indexed Account</h2>
              <p>Next steps and new features, one tap away.</p>
            </div>
            <ChevronRight />
          </button>
        </article>

        <article className={styles.accountsCard}>
          <div className={styles.cardStripe} />
          <div className={styles.cardHeader}>
            <h2>Banking services</h2>
            <ChevronUp />
          </div>

          <div className={styles.bankBrand}>
            <strong>Bank of Benefits</strong>
            <PremierTrustLogo compact />
          </div>
          <FdicMark />

          <div className={styles.accountsList}>
            {accounts.map((account) => (
              <div
                key={account.name}
                className={styles.accountRow}
                role={account.detail ? "button" : undefined}
                tabIndex={account.detail ? 0 : undefined}
                onClick={account.detail ? () => setScreen("wealth") : undefined}
                onKeyDown={
                  account.detail
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setScreen("wealth");
                        }
                      }
                    : undefined
                }
              >
                <div className={styles.accountMeta}>
                  <span className={styles.accountName}>{account.product}</span>
                </div>
                <div className={styles.accountBalanceWrap}>
                  <span className={styles.accountBalance}>
                    {visibleBalances[account.name] ? account.balance : maskBalance(account.balance)}
                  </span>
                  <button
                    type="button"
                    className={styles.eyeButton}
                    aria-label={visibleBalances[account.name] ? "Hide account amount" : "Show account amount"}
                    aria-pressed={Boolean(visibleBalances[account.name])}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleBalance(account.name);
                    }}
                  >
                    <EyeIcon hidden={!visibleBalances[account.name]} />
                  </button>
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.exploreCard}>
          <div className={styles.exploreIcon}>
            <span />
            <span />
            <span />
          </div>
          <div>
            <h2>More to explore</h2>
            <p>Explore credit cards, loans, checking, savings and investing.</p>
          </div>
          <div className={styles.exploreActions}>
            <button type="button">OFFERS</button>
            <button type="button">PRODUCTS</button>
          </div>
        </article>

        <section className={styles.loanBanner}>
          <div className={styles.carGraphic}>
            <span className={styles.carWindow} />
            <span className={styles.carLight} />
            <span className={styles.carStripe} />
          </div>
          <div>
            <p>Need an auto loan?</p>
            <strong>Start here.</strong>
          </div>
          <button type="button">Check rates</button>
        </section>

        <section className={styles.dealsCard}>
          <h2>BANKAMERIDEALS</h2>
          <p>Selected deals for everyday shopping and rewards.</p>
          <div className={styles.dealsGrid}>
            <span>5%</span>
            <span>$10</span>
            <span>2x</span>
          </div>
        </section>
      </section>

      <BottomNav />
    </>
  );
}

function WealthScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [todayLabel] = useState(() =>
    new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(new Date()),
  );

  return (
    <>
      <AppHeader />

      <section className={styles.wealthContent} data-boa-content-start>
        <button type="button" className={styles.backLink} onClick={() => setScreen("overview")}>
          <span aria-hidden="true">{"<"}</span>
          Accounts
        </button>

        <article className={styles.wealthCard}>
          <div className={styles.cardStripe} />
          <div className={styles.wealthHeader}>
            <div>
              <span className={styles.wealthKicker}>Bank of Benefits Life Plan</span>
              <h1>IUL Indexed Account</h1>
              <p>Account 9885</p>
            </div>
            <PremierTrustLogo />
          </div>

          <div className={styles.wealthTabs}>
            <button type="button">Monthly earning</button>
            <button type="button" className={styles.wealthTabActive}>Net worth history</button>
          </div>

          <div className={styles.wealthBalance}>{indexedIulBalance}</div>
          <p className={styles.wealthSubline}>Your net worth as of {todayLabel}</p>

          <NetWorthChart />
        </article>

        <div className={styles.wealthActions}>
          {wealthActions.map((action) => (
            <button key={action.label} type="button" className={styles.wealthActionButton}>
              <span className={styles.wealthActionCircle}>
                <WealthActionIcon icon={action.icon} />
              </span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.wealthInfoList}>
          {wealthMenuItems.map((item) => (
            <article key={item.title} className={styles.infoCard}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <ChevronRight />
            </article>
          ))}
        </div>
      </section>

      <BottomNav onAccounts={() => setScreen("overview")} />
    </>
  );
}

function BottomNav({ onAccounts }: { onAccounts?: () => void }) {
  return (
    <nav className={styles.bottomNav} aria-label="Bottom Navigation">
      {bottomTabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          className={tab.active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={tab.icon === "accounts" ? onAccounts : undefined}
        >
          <BottomTabIcon icon={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function BankOfAmericaPage() {
  const [screen, setScreen] = useState<Screen>("overview");
  const [visibleBalances, setVisibleBalances] = useState<Record<string, boolean>>({});
  const [showClosureNotice, setShowClosureNotice] = useState(true);

  const toggleBalance = (accountName: string) => {
    setVisibleBalances((current) => ({
      ...current,
      [accountName]: !current[accountName],
    }));
  };

  return (
    <main className={styles.page}>
      <div className={styles.screen} data-boa-top-color="#ffffff">
        {screen === "wealth" ? (
          <WealthScreen setScreen={setScreen} />
        ) : (
          <OverviewScreen visibleBalances={visibleBalances} setScreen={setScreen} toggleBalance={toggleBalance} />
        )}
        {showClosureNotice ? <AccountClosedModal onClose={() => setShowClosureNotice(false)} /> : null}
      </div>
    </main>
  );
}
