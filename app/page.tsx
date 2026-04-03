const CTA_HREF = "#aplicar";

const points = [
  "Potencial de valor en efectivo",
  "Protección para tu familia",
  "Enfoque en retiro",
];

const steps = [
  "Aplica",
  "Responde la evaluación inicial",
  "Revisa si puedes avanzar por los beneficios del plan",
];

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CTA_HREF}
      className={`inline-flex min-h-13 items-center justify-center rounded-full px-6 py-3 text-center text-sm font-semibold tracking-[0.16em] uppercase transition-colors ${className}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="bg-ri-ink text-white">
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
              Aplica para recibir más dinero en tu retiro.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Descubre si puedes aplicar por los beneficios de un plan basado en
              Seguro de Vida tipo IUL.
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
            <CtaButton className="flex w-full bg-ri-green text-ri-ink hover:bg-[#52e79e]">
              Aplicar por beneficios
            </CtaButton>
            <p className="text-sm leading-6 text-slate-400">
              Evaluación inicial corta.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#0b1628]">
        <div className="mx-auto w-full max-w-md px-5 py-10 sm:max-w-xl sm:px-6 md:max-w-2xl lg:max-w-3xl lg:px-8">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Cómo funciona
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
        className="border-t border-white/8 bg-ri-ink pb-28 sm:pb-12"
      >
        <div className="mx-auto w-full max-w-md px-5 py-10 sm:max-w-xl sm:px-6 md:max-w-2xl lg:max-w-3xl lg:px-8">
          <div className="space-y-4">
            <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Revisa si calificas para los beneficios del plan.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              La elegibilidad depende de factores como edad, salud, perfil y
              condiciones del producto.
            </p>
            <div className="pt-1">
              <CtaButton className="bg-ri-blue text-white hover:bg-ri-navy">
                Quiero aplicar
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ri-ink/96 p-4 backdrop-blur sm:hidden">
        <CtaButton className="flex w-full bg-ri-green text-ri-ink hover:bg-[#52e79e]">
          Aplicar por beneficios
        </CtaButton>
      </div>
    </main>
  );
}
