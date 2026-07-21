import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Delete Your Fasqon Account",
  description:
    "Request the deletion of your Fasqon account and associated data. Learn how account deletion works and which records we are legally required to retain.",
  alternates: {
    canonical: "https://fasqon.com/delete-account",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Delete Your Fasqon Account",
    description:
      "Request the deletion of your Fasqon account and associated data.",
    url: "https://fasqon.com/delete-account",
    siteName: "Fasqon",
    locale: "en_US",
    type: "website",
  },
};

const SUPPORT_EMAIL = "support@fasqon.com";

export default function DeleteAccountPage() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Delete Your <span>Fasqon</span> Account
          </h1>

          <p className={styles.lead}>
            At Fasqon, we respect your right to control your personal data. You
            can request the deletion of your account and associated data at any
            time.
          </p>

          <section className={styles.section}>
            <h2>How to delete your account</h2>
            <ol className={`${styles.list} ${styles.ordered}`}>
              <li>Log in to your Fasqon account in the mobile app.</li>
              <li>Open your Profile.</li>
              <li>
                Select <strong>Delete Account</strong> and follow the on-screen
                instructions.
              </li>
            </ol>
            <p>
              A step-by-step guide is available{" "}
              <span className={styles.placeholder}>here</span>{" "}
              <span className={styles.note}>(link to instructions)</span>.
            </p>
            <p>
              We will process your request within 30 days. For security reasons,
              we may ask you to verify your identity before processing the
              request.
            </p>
          </section>

          <section className={styles.section}>
            <h2>What happens when you delete your account</h2>
            <p>Upon deletion, we will permanently delete or anonymize:</p>
            <ul className={styles.list}>
              <li>
                Your profile information not required to be retained by law
                (profile photo, nickname, device identifiers, push tokens)
              </li>
              <li>Marketing preferences and analytics data</li>
              <li>
                Communication history with support not related to transactions
              </li>
            </ul>
          </section>

          <section className={`${styles.section} ${styles.callout}`}>
            <h2>Data we are required to retain</h2>
            <p>
              As a regulated financial service, we are legally required to retain
              certain data for a limited period after account deletion, in
              accordance with EU anti-money laundering, tax, and accounting laws:
            </p>
            <ul className={styles.list}>
              <li>
                KYC/AML verification records and transaction history — typically
                5 years after account closure
              </li>
              <li>
                Financial and accounting records — up to 10 years, depending on
                jurisdiction
              </li>
            </ul>
            <p>
              This data is moved to a restricted archive, accessible only for
              legal and compliance purposes, and is automatically deleted once
              the retention period expires. It is never used for marketing or
              analytics.
            </p>
            <p>
              Please note: transactions recorded on public blockchains are
              immutable by design and cannot be deleted by Fasqon or anyone else.
            </p>
          </section>

          <section className={`${styles.section} ${styles.callout}`}>
            <h2>Important</h2>
            <ul className={styles.list}>
              <li>
                Deleting your account is irreversible. You will lose access to
                all services and your account history.
              </li>
              <li>
                If you have a remaining balance or pending transactions, please
                withdraw funds and complete or cancel transactions before
                requesting deletion — accounts with unresolved balances cannot be
                deleted.
              </li>
              <li>
                If you have a business profile, deleting your account will close
                both your personal and business profiles. To close only your
                business profile, contact{" "}
                <a className={styles.link} href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>
                .
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Partial data deletion</h2>
            <p>
              If you want to request the deletion of specific data without
              closing your account, contact us at{" "}
              <a className={styles.link} href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>{" "}
              with a detailed request.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact us</h2>
            <p>
              If you have any questions about this process, write to:{" "}
              <a className={styles.link} href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
