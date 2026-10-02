"use client";

import { useRouter } from "next/navigation";

export default function SobreCompPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-[1720px] flex-col px-3 sm:px-4 lg:px-5">
        <div className="flex flex-1 flex-col justify-center">
          <header className="fixed top-3 left-3 z-20 flex items-center gap-1.5 sm:top-4 sm:left-4 lg:top-5 lg:left-5">
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => router.push("/cadastro")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-foreground transition hover:bg-[#eef0f3]"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
            </button>
            <p
              title="Cadastro"
              className="max-w-[220px]"
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0rem",
                lineHeight: "1.3125rem",
                color: "#111922",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              Cadastro
            </p>
          </header>

          <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-1 flex flex-col">
              <h2 className="max-w-[640px] text-[1.825rem] leading-[1.18] font-bold text-[#ff4655]">
                Simples, rápido e eficiente.
              </h2>
              <p className="mt-5 max-w-[640px] text-[1.825rem] leading-[1.18] font-bold text-[#0f1923]">
                Não somos uma pesquisa tradicional, mas uma plataforma dinâmica e em tempo real, onde você pode mapear seus dados de forma inteligente e acessar tudo em até 24 horas.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => router.push("/cadastro/proxima-etapa")}
                  className="inline-flex h-[48px] min-w-[156px] items-center justify-center rounded-full bg-[#f4374c] px-4 text-[0.9rem] leading-none font-bold text-white transition hover:bg-accent-strong focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <span>Continuar cadastro</span>
                </button>
              </div>
            </div>

            <div className="order-2">
              <div className="aspect-video w-full overflow-hidden">
                <video
                  className="h-full w-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/videos/comp-demo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        </div>

        <div aria-hidden="true" className="pointer-events-none h-0 w-full" />
      </div>
    </main>
  );
}
