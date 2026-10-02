"use client";

import { useRouter } from "next/navigation";

export default function SobreCompPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background font-sans px-4 pt-4 pb-4">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Voltar"
              aria-disabled="true"
              disabled
              className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-foreground cursor-default"
              style={{ transform: "translateX(-0.5px)" }}
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
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0rem",
                lineHeight: "21px",
                color: "#111922",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                transform: "translateX(-0.5px)",
              }}
            >
              Cadastro
            </p>
        </header>

        <section className="mt-2 grid flex-1 grid-cols-1 items-center gap-2 lg:grid-cols-2">
            <div className="order-1 flex flex-col">
              <h2
                className="max-w-[640px] text-[28px] leading-[41px] font-bold text-[#ff4655]"
                style={{ transform: "translateX(-0.5px)" }}
              >
                Simples, rápido e eficiente.
              </h2>
              <p
                className="mt-4 max-w-[640px] text-[28px] leading-[36px] font-bold text-[#0f1923]"
                style={{ transform: "translateX(-0.5px)" }}
              >
                Não somos uma pesquisa tradicional, mas uma plataforma dinâmica e em tempo real, onde você pode mapear seus dados de forma inteligente e acessar tudo em até 24 horas.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => router.push("/cadastro/proxima-etapa")}
                  className="inline-flex items-center justify-center rounded-full border-[3px] border-transparent bg-[#f4374c] p-[13px] text-[15px] leading-[21px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  style={{ transform: "translateX(-0.5px)" }}
                >
                  <span>Continuar cadastro</span>
                </button>
              </div>
            </div>

            <div className="order-2 w-full">
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
    </main>
  );
}
