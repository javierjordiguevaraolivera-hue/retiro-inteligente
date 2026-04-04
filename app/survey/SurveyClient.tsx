"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type SurveyData = {
  ageGroup: string;
  goal: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  countryCode: string;
};

const AGE_OPTIONS = ["25 a 34", "35 a 44", "45 a 54", "55 a 65", "65+"];
const GOAL_OPTIONS = [
  "Seguro de vida",
  "Ahorrar e invertir",
  "Planificación de retiro",
  "No estoy seguro aún",
];
const PROGRESS = [25, 50, 60, 75, 100];

const initialData: SurveyData = {
  ageGroup: "",
  goal: "",
  zipCode: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  countryCode: "US +1",
};

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-[#667085] stroke-[2.25]"
    >
      <path d="M14.5 5 7.5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersonGroupIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      className="h-7 w-7 text-[#2e4a88]"
    >
      <g fill="currentColor">
        <circle cx="14" cy="8" r="3.4" />
        <circle cx="6.8" cy="10" r="2.6" opacity="0.92" />
        <circle cx="21.2" cy="10" r="2.6" opacity="0.92" />
        <path d="M10.1 13.4c1.1 0 2 .9 2 2v7.2H8.3v-4.3a4.9 4.9 0 0 1 1.8-3.8Z" />
        <path d="M17.9 13.4a4.9 4.9 0 0 1 1.8 3.8v4.3h-3.8v-7.2c0-1.1.9-2 2-2Z" />
        <path d="M14 12.4a5.6 5.6 0 0 1 5.6 5.6v4.7H8.4V18a5.6 5.6 0 0 1 5.6-5.6Z" />
        <path d="M3 6.3h3.1V3.2h1.8v3.1H11v1.8H7.9v3.1H6.1V8.1H3Z" />
      </g>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-[#6b7280] stroke-[1.8]"
    >
      <path
        d="M4.5 7.5h15v9h-15z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m5.5 8.5 6.5 5 6.5-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[18px] border bg-white px-5 py-6 text-left text-[1.02rem] font-medium text-[#111827] shadow-[0_8px_28px_rgba(15,23,42,0.08)] transition-colors ${
        selected
          ? "border-[#4f83ff]"
          : "border-[#a7adb7] hover:border-[#7e8796]"
      }`}
    >
      {label}
    </button>
  );
}

function ContinueButton({
  children,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`mt-7 flex min-h-[56px] w-full items-center justify-center rounded-full px-6 text-lg font-medium transition-colors ${
        disabled
          ? "bg-[#a9c1f2] text-white/90"
          : "bg-[#3f73e0] text-white hover:bg-[#2f67db]"
      }`}
    >
      <span>{children}</span>
      <span className="ml-3 text-2xl leading-none">→</span>
    </button>
  );
}

function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  extraLeft,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  extraLeft?: React.ReactNode;
}) {
  return (
    <label className="flex min-h-[58px] items-center gap-3 rounded-[18px] border border-[#a7adb7] bg-white px-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
      {extraLeft}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent text-[1.05rem] text-[#111827] outline-none placeholder:text-[#98a2b3]"
      />
    </label>
  );
}

export default function SurveyClient() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>(initialData);

  const canContinue = useMemo(() => {
    if (step === 2) {
      return /^\d{5}$/.test(data.zipCode);
    }

    if (step === 3) {
      return Boolean(data.firstName.trim() && data.lastName.trim());
    }

    if (step === 4) {
      return Boolean(data.phone.trim() && data.email.trim());
    }

    return true;
  }, [data, step]);

  function update<K extends keyof SurveyData>(key: K, value: SurveyData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1));
  }

  function goNext() {
    setStep((current) => Math.min(4, current + 1));
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#0f172a]">
      <header className="border-b border-black/6 bg-white/96 shadow-[0_6px_18px_rgba(18,31,53,0.08)] backdrop-blur-sm">
        <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-4 md:relative md:justify-center">
          <div className="flex items-center gap-2 md:absolute md:left-4">
            <div className="flex items-center gap-2">
              <PersonGroupIcon />
              <span className="text-[1.05rem] font-extrabold tracking-tight text-[#334155]">
                BEST LIFE
              </span>
            </div>
          </div>
          <Image
            src="/secure-form-best-life2.png"
            alt="Secure Form"
            width={263}
            height={69}
            className="h-auto w-[128px] md:absolute md:right-4 md:w-[136px]"
            priority
          />
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[1200px] flex-col items-center px-3 pb-8 pt-8 md:px-4 md:pb-10 md:pt-5">
        <section className="w-full">
          <div className="mx-auto flex w-full max-w-[760px] flex-col items-center">
            <div className="flex w-full items-center gap-4">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              aria-label="Volver"
              className="shrink-0 disabled:opacity-50"
            >
              <ChevronLeftIcon />
            </button>

            <div className="relative h-[7px] flex-1 overflow-hidden rounded-full bg-[#d7dbe1]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#3f73e0] transition-all duration-300"
                style={{ width: `${PROGRESS[step]}%` }}
              />
              <div className="absolute inset-y-0 left-1/4 w-px bg-[#c7ccd4]" />
              <div className="absolute inset-y-0 left-2/4 w-px bg-[#c7ccd4]" />
              <div className="absolute inset-y-0 left-3/4 w-px bg-[#c7ccd4]" />
            </div>
          </div>

            {step === 0 && (
              <div className="pt-12 md:pt-10">
                <h1 className="max-w-[11.5ch] text-[2.05rem] font-bold leading-[1.02] tracking-[-0.055em] text-[#07152d] md:max-w-[720px] md:text-center md:text-[46px]">
                ¿En qué grupo de edad estás?
                </h1>
                <div className="mt-8 grid w-full max-w-[420px] gap-4 md:mt-10">
                  {AGE_OPTIONS.map((option) => (
                    <OptionButton
                      key={option}
                      label={option}
                      selected={data.ageGroup === option}
                      onClick={() => {
                        update("ageGroup", option);
                        goNext();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="pt-12 md:pt-10">
                <h1 className="max-w-[13.4ch] text-[2.05rem] font-bold leading-[1.02] tracking-[-0.055em] text-[#07152d] md:max-w-[720px] md:text-center md:text-[46px]">
                Cuéntame, ¿qué te gustaría lograr con un seguro de vida?
                </h1>
                <div className="mt-8 grid w-full max-w-[460px] gap-4 md:mt-10">
                  {GOAL_OPTIONS.map((option) => (
                    <OptionButton
                      key={option}
                      label={option}
                      selected={data.goal === option}
                      onClick={() => {
                        update("goal", option);
                        goNext();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="pt-12 md:pt-10">
                <h1 className="text-center text-[2.05rem] font-bold leading-[1.02] tracking-[-0.055em] text-[#07152d] md:max-w-[720px] md:text-[46px]">
                Cual es tu ZIP code?
                </h1>
                <div className="mt-8 flex w-full max-w-[460px] flex-col gap-4 md:mt-10">
                  <TextField
                    value={data.zipCode}
                    onChange={(value) =>
                      update("zipCode", value.replace(/\D/g, "").slice(0, 5))
                    }
                    placeholder="Ej: 33101"
                    type="text"
                  />
                  <p className="text-[0.95rem] leading-6 text-[#6b7280]">
                    Usamos tu ZIP code para identificar tu estado.
                  </p>
                  <ContinueButton disabled={!canContinue} onClick={goNext}>
                    Confirmar ZIP code
                  </ContinueButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="pt-12 md:pt-10">
                <h1 className="max-w-[13.2ch] text-[2.05rem] font-bold leading-[1.02] tracking-[-0.055em] text-[#07152d] md:max-w-[720px] md:text-center md:text-[46px]">
                ¿Cuál es tu nombre completo?
                </h1>
                <div className="mt-8 flex w-full max-w-[460px] flex-col gap-4 md:mt-10">
                  <TextField
                    value={data.firstName}
                    onChange={(value) => update("firstName", value)}
                    placeholder="Nombre"
                  />
                  <TextField
                    value={data.lastName}
                    onChange={(value) => update("lastName", value)}
                    placeholder="Apellido"
                  />
                  <ContinueButton disabled={!canContinue} onClick={goNext}>
                    Seguir
                  </ContinueButton>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="pt-12 md:pt-10">
                <h1 className="text-center text-[2.05rem] font-bold leading-[1.02] tracking-[-0.055em] text-[#07152d] md:max-w-[720px] md:text-[46px]">
                ¿A qué número te enviamos tu cotización personalizada?
                </h1>
                <div className="mt-8 flex w-full max-w-[460px] flex-col gap-4 md:mt-10">
                  <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-3">
                    <label className="flex min-h-[58px] items-center rounded-[18px] border border-[#a7adb7] bg-white px-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
                      <select
                        value={data.countryCode}
                        onChange={(event) =>
                          update("countryCode", event.target.value)
                        }
                        className="w-full appearance-none bg-transparent text-[1.05rem] text-[#111827] outline-none"
                      >
                        <option>US +1</option>
                      </select>
                    </label>

                    <label className="flex min-h-[58px] items-center rounded-[18px] border border-[#a7adb7] bg-[#dce8ff] px-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)]">
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        placeholder="519 255 4736"
                        className="w-full border-0 bg-transparent text-[1.05rem] text-[#111827] outline-none placeholder:text-[#233b6c]"
                      />
                    </label>
                  </div>

                  <TextField
                    value={data.email}
                    onChange={(value) => update("email", value)}
                    placeholder="correo@ejemplo.com"
                    type="email"
                    extraLeft={<MailIcon />}
                  />

                  <ContinueButton disabled={!canContinue}>
                    Ver mi cotización ahora
                  </ContinueButton>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
