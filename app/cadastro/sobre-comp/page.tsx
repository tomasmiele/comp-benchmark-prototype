"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SobreCompPage() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    if (!isPopupOpen) {
      setSecondsLeft(5);
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timerId);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isPopupOpen]);

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
                  onClick={() => setIsPopupOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border-[3px] border-transparent bg-[#f4374c] p-[13px] text-[15px] leading-[21px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  style={{ transform: "translateX(-0.5px)" }}
                >
                  <span>Continuar para escolha de dados</span>
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

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="relative h-72 w-full max-w-xl rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              aria-label="Fechar pop-up"
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111922] transition hover:bg-[#eef0f3]"
            >
              x
            </button>

            <div className="pr-12 text-[#111922]">
              <p className="text-[22px] leading-[28px] font-bold">
                1. Escolha quais informações compartilhar
              </p>
              <p className="mt-1.5 text-[16px] leading-[21px] font-normal text-[#4c5560]">
                Quanto mais dados enviar, mais insights de mercado terá acesso
              </p>
              <p className="mt-4 text-[22px] leading-[28px] font-bold">
                2. Crie sua conta em poucos passos
              </p>
              <p className="mt-3 text-[22px] leading-[28px] font-bold">
                3. Receba acesso gratuito aos dados de mercado
              </p>
            </div>

            <button
              type="button"
              disabled={secondsLeft > 0}
              onClick={() => {
                setIsPopupOpen(false);
                router.push("/cadastro/escolha-dados");
              }}
              className="absolute right-4 bottom-4 inline-flex items-center justify-center rounded-full border-[2.25px] border-transparent bg-[#f4374c] px-[15px] py-[9.75px] text-[12px] leading-[15.75px] font-bold text-white transition enabled:hover:bg-accent-strong enabled:focus-visible:ring-3 enabled:focus-visible:ring-ring enabled:focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {secondsLeft > 0 ? `Continuar (${secondsLeft})` : "Continuar"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
