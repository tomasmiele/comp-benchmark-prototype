"use client";

import { useRouter } from "next/navigation";

export default function PlanilhaColaboradoresPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-background px-4 pt-3 pb-8 font-sans"
      aria-label="Planilha de colaboradores"
    >
      <div className="mx-auto flex min-h-[calc(100vh-44px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar para salário e incentivos"
            onClick={() => router.push("/cadastro/salario-incentivos")}
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
            Salário e Incentivos
          </p>
        </header>

        <section className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="flex w-full max-w-[720px] flex-col items-center">
            <h1 className="text-center text-[28px] leading-[39px] font-bold text-[#111922]">
              Criamos um modelo de planilha para você preencher com todos os
              dados dos colaboradores.
            </h1>

            <button
              type="button"
              className="mt-7 inline-flex items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-6 py-2.5 text-[15px] leading-[21px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Baixar a planilha e continuar
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
