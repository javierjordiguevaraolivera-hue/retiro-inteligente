"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

const SURVEY_HREF = "/survey";
const PRELANDING_SOURCE_SESSION_KEY = "ri-prelanding-source";

const points = [
  "Obtén hasta $850,000",
  "Beneficios para tu familia",
  "Accede a tu dinero cuando lo necesites",
];

const steps = [
  "Aplica",
  "Responde unas preguntas rápidas",
  "Descubre si calificas para los beneficios",
];

const qualifiers = [
  "Sin examen médico",
  "Sin costos ocultos",
  "Aprobación en 60 segundos",
];

function CtaButton({
  children,
  className = "",
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-13 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold tracking-[0.16em] uppercase transition-colors disabled:pointer-events-none disabled:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [isExitingToSurvey, setIsExitingToSurvey] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    router.prefetch(SURVEY_HREF);

    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [router]);

  function goToSurvey() {
    if (isExitingToSurvey) return;

    const source = pathname === "/" ? "home" : pathname.replace(/^\/+/, "").replace(/\//g, "-") || "home";

    try {
      window.sessionStorage.setItem(PRELANDING_SOURCE_SESSION_KEY, source);
    } catch {
      // Ignore session storage issues in restricted browsers.
    }

    setIsExitingToSurvey(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      const queryString = window.location.search;
      router.push(queryString ? `${SURVEY_HREF}${queryString}` : SURVEY_HREF, {
        scroll: false,
      });
    }, 280);
  }

  return (
    <main
      className={`bg-ri-ink text-white transition-[opacity,transform] duration-250 ease-out ${
        isExitingToSurvey ? "translate-x-[-12px] opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <section className="mx-auto w-full max-w-md px-5 pb-24 pt-8 sm:max-w-xl sm:px-6 md:max-w-2xl lg:max-w-3xl lg:px-8 lg:pb-16">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-ri-sky/80">
              Plan de
            </p>
            <div className="space-y-1">
              <p className="text-3xl font-semibold leading-none tracking-[-0.05em] text-white sm:text-4xl">
                RETIRO
              </p>
              <p className="text-3xl font-semibold leading-none tracking-[-0.05em] text-ri-green sm:text-4xl">
                INTELIGENTE
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center rounded-full border border-ri-sky/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ri-sky">
            Seguro de Vida IUL
          </div>

          <div className="space-y-5">
            <h1 className="max-w-[11ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:max-w-none sm:text-6xl">
              Aplica y recibe más dinero para tu retiro.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Ahorra y haz crecer tu dinero con interés compuesto indexado y
              cero riesgo garantizado por contrato.
            </p>
          </div>

          <div className="grid gap-3">
            {points.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-base text-slate-100"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-1">
            <CtaButton
              onClick={goToSurvey}
              disabled={isExitingToSurvey}
              className="flex w-full bg-ri-green text-ri-ink hover:bg-[#52e79e]"
            >
              Solicitar el beneficio
            </CtaButton>
            <p className="text-sm leading-6 text-slate-400">
              Solo 5 preguntas rápidas
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#0b1628]">
        <div className="mx-auto w-full max-w-md px-5 py-10 sm:max-w-xl sm:px-6 md:max-w-2xl lg:max-w-3xl lg:px-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Cómo aplicar
            </h2>
            <div className="grid gap-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 px-4 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ri-blue text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-6 text-slate-300 sm:text-base">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="aplicar"
        className="border-t border-white/8 bg-ri-ink pb-12"
      >
        <div className="mx-auto w-full max-w-md px-5 py-10 sm:max-w-xl sm:px-6 md:max-w-2xl lg:max-w-3xl lg:px-8">
          <div className="space-y-4">
            <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Cuanto dinero puedo acceder con un IUL
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Muchas familias están asegurando su futuro y el de su familia con
              una póliza indexada que protege y ayuda a construir acceso a
              dinero para el retiro.
            </p>
            <div className="grid gap-2 pt-1">
              {qualifiers.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-ri-green">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-none stroke-current stroke-[2.5]"
                    >
                      <path
                        d="M5 12.5 9.2 16.5 19 7.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-4 pr-6">
              <div className="flex w-full flex-col items-center gap-3">
                <Image
                  src="/regulado-y-aprobado-img.png"
                  alt="Regulado y aprobado"
                  width={220}
                  height={72}
                  className="h-auto w-[180px] grayscale brightness-0 invert opacity-55"
                />
                <p className="w-full text-center text-[10px] font-light leading-4 text-white/70">
                  Disclaimer: Beneficios sujetos a elegibilidad, edad, salud,
                  condiciones de la póliza y aprobación de la aseguradora. Esto
                  no garantiza resultados ni montos específicos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
