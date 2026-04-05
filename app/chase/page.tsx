"use client";

import { useState } from "react";
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

function ChaseLogo({ inverted = false }: { inverted?: boolean }) {
  return (
    <img
      aria-hidden="true"
      alt=""
      width="96"
      height="96"
      className={inverted ? `${styles.chaseLogo} ${styles.chaseLogoInverted}` : styles.chaseLogo}
      src="data:image/png;base64,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"
    />
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.inlineIcon}>
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m16 16 4.2 4.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
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
      <path
        d="M10.4 17.4a1.8 1.8 0 0 0 3.2 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.plusIcon}>
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.chevron}>
      <path
        d="m9 6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  if (hidden) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.eyeIcon}>
        <path
          d="M3.8 4.8 19.2 20.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M10.2 6.1A10.3 10.3 0 0 1 12 6c4.7 0 8.1 3.2 9.4 6-0.6 1.3-1.5 2.6-2.7 3.6M7.2 8C5.5 9.1 4.2 10.7 3.4 12c1.2 2.8 4.6 6 9.4 6 1.2 0 2.3-0.2 3.3-0.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M9.8 9.7A3.3 3.3 0 0 1 15 12.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.eyeIcon}>
      <path
        d="M2.9 12c1.4-2.9 4.8-6 9.1-6s7.7 3.1 9.1 6c-1.4 2.9-4.8 6-9.1 6s-7.7-3.1-9.1-6Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <rect
        x="3.5"
        y="6.5"
        width="17"
        height="11"
        rx="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M7 10.2h10.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="16.6" cy="12.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function DepositIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <path d="M5 16.5h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path
        d="m8 13 5.9-6.1 2.1 2.1L10.1 15H8v-2Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <rect
        x="4.5"
        y="5.5"
        width="15"
        height="13"
        rx="2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <path d="M5 8h12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path
        d="m13.5 4.8 3.7 3.2-3.7 3.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M19 16H7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path
        d="m10.5 19.2-3.7-3.2 3.7-3.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BillIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.actionIcon}>
      <path
        d="M7 4.5h10v15l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2V4.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M9 9h6M9 12h6M9 15h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function TabAccountsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.tabIcon}>
      <path
        d="M6.5 7.2 12 3l5.5 4.2v10.4H6.5V7.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
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
      <rect
        x="5.5"
        y="5.5"
        width="13"
        height="13"
        rx="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
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

function maskBalance(balance: string) {
  const digits = balance.replace(/\D/g, "").length;
  return `$${"•".repeat(Math.max(digits, 6))}`;
}

export default function ChasePage() {
  const [visibleBalances, setVisibleBalances] = useState<Record<string, boolean>>({});

  const toggleBalance = (accountName: string) => {
    setVisibleBalances((current) => ({
      ...current,
      [accountName]: !current[accountName],
    }));
  };

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
              <ChaseLogo inverted />
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

        <section className={styles.content} data-chase-content-start>
          <article className={styles.accountsCard}>
            <h2 className={styles.sectionTitle}>Accounts (2)</h2>

            <div className={styles.accountsList}>
              {accounts.map((account, index) => (
                <div
                  key={account.name}
                  className={index === 0 ? styles.accountRow : `${styles.accountRow} ${styles.accountRowBorder}`}
                >
                  <div className={styles.accountMeta}>
                    <div className={styles.accountNameWrap}>
                      <span className={styles.accountName}>{account.name}</span>
                      <ChevronRight />
                    </div>
                    <span className={styles.accountSuffix}>{account.suffix}</span>
                  </div>

                  <div className={styles.accountBalanceWrap}>
                    <button
                      type="button"
                      className={styles.eyeButton}
                      aria-label={
                        visibleBalances[account.name]
                          ? "Ocultar monto de la cuenta"
                          : "Mostrar monto de la cuenta"
                      }
                      aria-pressed={Boolean(visibleBalances[account.name])}
                      onClick={() => toggleBalance(account.name)}
                    >
                      <EyeIcon hidden={!visibleBalances[account.name]} />
                    </button>
                    <span className={styles.accountBalance}>
                      {visibleBalances[account.name]
                        ? account.balance
                        : maskBalance(account.balance)}
                    </span>
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
      </div>
    </main>
  );
}
