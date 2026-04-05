import styles from "./page.module.css";

const quickActions = [
  { title: "Set up", subtitle: "Apple Pay", icon: "wallet" },
  { title: "Deposit", subtitle: "Checks", icon: "deposit" },
  { title: "Account", subtitle: "Transfer", icon: "transfer" },
  { title: "Pay a", subtitle: "Bill", icon: "bill" },
] as const;

const accounts = [
  {
    name: "PERFBUS SAVINGS",
    suffix: "** 9885",
    balance: "$120,985.97",
  },
  {
    name: "PERFBUS CHECKING",
    suffix: "** 9889",
    balance: "$50,000.37",
  },
] as const;

const offerCards = [
  { title: "Office\nDepot", accent: "red" },
  { title: "Spotify", accent: "dark" },
  { title: "Dell", accent: "light" },
] as const;

const menuItems = [
  {
    title: "Invest with J.P. Morgan",
    description: "Work with an advisor, invest online and access market insights.",
  },
  {
    title: "Schedule a visit",
    description: "",
  },
  {
    title: "ATM & Branch locations",
    description: "",
  },
] as const;

const bottomTabs = [
  { label: "Accounts", active: true, icon: "accounts" },
  { label: "Pay & Collect", active: false, icon: "pay" },
  { label: "Transactions", active: false, icon: "transactions" },
] as const;

function ChaseLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.chaseLogo}>
      <path
        d="M8.2 2h7.6l2.2 2.2v7.6L15.8 14H8.2L6 11.8V4.2L8.2 2Zm1.3 2.8v4.9h4.9V4.8H9.5Zm6 1.3v4.9h4.9V6.1h-4.9ZM9.5 14.3v4.9h4.9v-4.9H9.5Zm-6-8.2v4.9h4.9V6.1H3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.inlineIcon}>
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.2 4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.topIcon}>
      <path
        d="M12 4.8a4.1 4.1 0 0 0-4.1 4.1v2.3c0 .9-.3 1.8-.9 2.5l-.8 1h11.6l-.8-1a4.1 4.1 0 0 1-.9-2.5V8.9A4.1 4.1 0 0 0 12 4.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10.4 17.4a1.8 1.8 0 0 0 3.2 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.plusIcon}>
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.chevron}>
      <path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <rect x="3.5" y="6.5" width="17" height="11" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 10.2h10.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="16.6" cy="12.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function DepositIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <path d="M5 16.5h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="m8 13 5.9-6.1 2.1 2.1L10.1 15H8v-2Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <rect x="4.5" y="5.5" width="15" height="13" rx="2.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <path d="M5 8h12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="m13.5 4.8 3.7 3.2-3.7 3.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M19 16H7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="m10.5 19.2-3.7-3.2 3.7-3.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function BillIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <path d="M7 4.5h10v15l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V4.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function TabAccountsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <path d="M6.5 7.2 12 3l5.5 4.2v10.4H6.5V7.2Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M9.2 11h5.6M9.2 14.2h5.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function TabPayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.8v4.5l3 2.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function TabTransactionsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <rect x="5.5" y="5.5" width="13" height="13" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.2h7M8.5 13.2h7M8.5 16.2h4.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function QuickActionIcon({ icon }: { icon: (typeof quickActions)[number]["icon"] }) {
  switch (icon) {
    case "wallet":
      return <WalletIcon />;
    case "deposit":
      return <DepositIcon />;
    case "transfer":
      return <TransferIcon />;
    default:
      return <BillIcon />;
  }
}

function BottomTabIcon({ icon }: { icon: (typeof bottomTabs)[number]["icon"] }) {
  switch (icon) {
    case "accounts":
      return <TabAccountsIcon />;
    case "pay":
      return <TabPayIcon />;
    default:
      return <TabTransactionsIcon />;
  }
}

export default function ChasePage() {
  return (
    <main className={styles.page}>
      <div className={styles.screen}>
          <section className={styles.hero}>
            <div className={styles.topTools}>
              <div className={styles.searchBar}>
                <span>Search in the app</span>
                <SearchIcon />
              </div>

              <div className={styles.topActions}>
                <button type="button" className={styles.iconButton} aria-label="Notifications">
                  <BellIcon />
                  <span className={styles.badge}>1</span>
                </button>

                <div className={styles.avatar} aria-label="Alex">
                  A
                </div>
              </div>
            </div>

            <div className={styles.greetingRow}>
              <div className={styles.greeting}>
                <ChaseLogo />
                <span>Hi, Alex</span>
              </div>

              <button type="button" className={styles.plusButton} aria-label="Add">
                <PlusIcon />
              </button>
            </div>

            <div className={styles.quickActions}>
              {quickActions.map((item) => (
                <article key={`${item.title}-${item.subtitle}`} className={styles.quickActionCard}>
                  <button type="button" className={styles.dismissButton} aria-label="Dismiss">
                    ×
                  </button>
                  <QuickActionIcon icon={item.icon} />
                  <p className={styles.quickActionText}>
                    <span>{item.title}</span>
                    <span>{item.subtitle}</span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.content}>
            <article className={styles.accountsCard}>
              <h2 className={styles.sectionTitle}>Accounts (2)</h2>

              <div className={styles.accountsList}>
                {accounts.map((account, index) => (
                  <div key={account.name} className={index === 0 ? styles.accountRow : `${styles.accountRow} ${styles.accountRowBorder}`}>
                    <div className={styles.accountMeta}>
                      <div className={styles.accountNameWrap}>
                        <span className={styles.accountName}>{account.name}</span>
                        <ChevronRight />
                      </div>
                      <span className={styles.accountSuffix}>{account.suffix}</span>
                    </div>

                    <div className={styles.accountBalanceWrap}>
                      <span className={styles.accountBalance}>{account.balance}</span>
                      <span className={styles.accountPause}>II</span>
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" className={styles.openAccountButton}>
                <span className={styles.openPlus}>+</span>
                <span>Open an Account</span>
              </button>
            </article>

            <section className={styles.offerSection}>
              <div className={styles.offerHeader}>
                <div>
                  <h3 className={styles.offerTitle}>Chase Offers</h3>
                  <p className={styles.offerSubtitle}>Add deals, shop and get money back.</p>
                </div>

                <button type="button" className={styles.offerLink}>
                  <span>All offers</span>
                  <ChevronRight />
                </button>
              </div>

              <div className={styles.offerCards}>
                {offerCards.map((card) => (
                  <article
                    key={card.title}
                    className={`${styles.offerCard} ${
                      card.accent === "red"
                        ? styles.offerRed
                        : card.accent === "dark"
                          ? styles.offerDark
                          : styles.offerLight
                    }`}
                  >
                    <span className={styles.offerBadge}>%</span>
                    <span className={styles.offerText}>{card.title}</span>
                  </article>
                ))}
              </div>
            </section>

            <div className={styles.infoList}>
              {menuItems.map((item) => (
                <article key={item.title} className={styles.infoCard}>
                  <div className={styles.infoCopy}>
                    <h3 className={styles.infoTitle}>{item.title}</h3>
                    {item.description ? <p className={styles.infoDescription}>{item.description}</p> : null}
                  </div>
                  <ChevronRight />
                </article>
              ))}
            </div>
          </section>

          <nav className={styles.bottomNav} aria-label="Bottom Navigation">
            {bottomTabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={tab.active ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              >
                <span className={styles.tabIconWrap}>
                  <BottomTabIcon icon={tab.icon} />
                  {tab.active ? <span className={styles.tabDot} /> : null}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.homeIndicator} />
      </div>
    </main>
  );
}
