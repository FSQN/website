"use client";

import { useMemo, useState } from "react";
import { useLocalization } from "@/context/LocalizationContext";
import styles from "./WaitlistSection.module.css";
import parse from "html-react-parser";

type SubmitState = "idle" | "loading" | "success" | "error";

function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function WaitlistSection() {
    const { t } = useLocalization();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subscribe, setSubscribe] = useState(true);

    const [touched, setTouched] = useState({ name: false, email: false });
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [errorText, setErrorText] = useState<string>("");

    const nameOk = useMemo(() => name.trim().length > 0, [name]);
    const emailOk = useMemo(() => isEmailValid(email), [email]);

    const showNameError = touched.name && !nameOk;
    const showEmailError = touched.email && !emailOk;

    async function onSubmit() {
        setTouched({ name: true, email: true });

        if (!nameOk || !emailOk) return;

        setSubmitState("loading");
        setErrorText("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    waitlist: true,
                    subscribe,
                }),
            });

            const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

            if (res.status === 409) {
                setSubmitState("error");
                setErrorText(t("waitlistPage.waitlistSection.errors.emailExists"));
                return;
            }

            if (!res.ok || !data?.ok) {
                setSubmitState("error");
                setErrorText(data?.error || t("waitlistPage.waitlistSection.errors.generic"));
                return;
            }

            setSubmitState("success");
        } catch {
            setSubmitState("error");
            setErrorText(t("waitlistPage.waitlistSection.errors.network"));
        }
    }

    return (
        <section className={styles.section}>
            <div className={styles.bgLeft} aria-hidden="true" />
            <div className={styles.bgRight} aria-hidden="true" />

            <div className={styles.inner}>
                <h2 className="title">
                    {parse(t("waitlistPage.waitlistSection.hero.title"))}
                </h2>

                <h3 className="subtitle">
                    {parse(t("waitlistPage.waitlistSection.hero.subtitle"))}
                </h3>

                <div className={styles.card}>
                    <div className={styles.cardHead}>
                        <div className={styles.cardHeadGreen}>
                            {t("waitlistPage.waitlistSection.card.headline1")}
                        </div>
                        <div className={styles.cardHeadGreen}>
                            {t("waitlistPage.waitlistSection.card.headline2")}
                        </div>
                        <div className={styles.cardHeadText}>
                            {t("waitlistPage.waitlistSection.card.helper")}
                        </div>
                    </div>

                    <div className={styles.form}>
                        <input
                            className={`${styles.input} ${showNameError ? styles.inputError : ""}`}
                            placeholder={t("waitlistPage.waitlistSection.form.namePlaceholder")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                            autoComplete="name"
                        />

                        <input
                            className={`${styles.input} ${showEmailError ? styles.inputError : ""}`}
                            placeholder={t("waitlistPage.waitlistSection.form.emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                            autoComplete="email"
                            inputMode="email"
                        />

                        <label className={styles.checkboxRow}>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                checked={subscribe}
                                onChange={(e) => setSubscribe(e.target.checked)}
                            />
                            <span className={styles.checkboxDot} aria-hidden="true" />
                            <span className={styles.checkboxText}>
                                {t("waitlistPage.waitlistSection.form.subscribeLabel")}
                            </span>
                        </label>
                    </div>
                </div>

                <button
                    className={styles.cta}
                    onClick={onSubmit}
                    disabled={submitState === "loading" || submitState === "success"}
                >
                    {submitState === "loading"
                        ? t("waitlistPage.waitlistSection.cta.loading")
                        : submitState === "success"
                            ? t("waitlistPage.waitlistSection.cta.success")
                            : t("waitlistPage.waitlistSection.cta.idle")}
                </button>

                {submitState === "error" && <div className={styles.errorText}>{errorText}</div>}
                {submitState === "success" && (
                    <div className={styles.successText}>{t("waitlistPage.waitlistSection.messages.success")}</div>
                )}

                <div className={styles.privacy}>
                    {t("waitlistPage.waitlistSection.footer.privacy")}
                </div>
            </div>
        </section>
    );
}
