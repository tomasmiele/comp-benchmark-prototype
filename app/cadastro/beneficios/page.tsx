"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CadastroProgress from "../_components/CadastroProgress";

export default function BeneficiosPage() {
  const router = useRouter();
  const [showBenefitsIntro, setShowBenefitsIntro] = useState(false);

  return (
    <main
      className="min-h-screen bg-background px-4 pt-3 pb-24 font-sans"
      aria-label="Benefícios"
    >
      <div className="mx-auto flex min-h-[calc(100vh-44px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar para informações sobre a empresa"
            onClick={() => router.push("/cadastro/finalizar-cadastro")}
            className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-foreground transition hover:bg-[#eef0f3]"
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
          <p className="max-w-[520px] truncate text-[15px] leading-[21px] font-bold text-[#111922]">
            Dados da empresa
          </p>
        </header>

        <section className="mt-8 flex justify-center">
          <h1 className="max-w-[760px] text-center text-[28px] leading-[41px] font-bold text-[#0f1923]">
            Benefícios
          </h1>
        </section>

        <section className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="flex w-full max-w-[620px] flex-col items-center">
            <h2 className="text-center text-[24px] leading-[32px] font-bold text-[#111922]">
              Sua empresa possui benefícios diferentes por nível de cargo?
            </h2>

            <div
              className="mt-6 flex items-center justify-center gap-3"
              role="group"
              aria-label="Benefícios diferentes por nível de cargo"
            >
              <button
                type="button"
                onClick={() => setShowBenefitsIntro(true)}
                className="inline-flex min-w-[92px] items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-5 py-2 text-[15px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => router.push("/cadastro/beneficios/detalhes")}
                className="inline-flex min-w-[92px] items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-5 py-2 text-[15px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Não
              </button>
            </div>
          </div>
        </section>
      </div>

      <CadastroProgress step={2} />

      {showBenefitsIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="benefits-intro-title"
            className="w-full max-w-[560px] rounded-3xl bg-white p-7 shadow-2xl"
          >
            <h2
              id="benefits-intro-title"
              className="text-center text-[22px] leading-[31px] font-bold text-[#111922]"
            >
              Preencha os benefícios que abrangem a maior parte dos seus
              colaboradores.
            </h2>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/cadastro/beneficios/detalhes")}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-5 py-2 text-[15px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
