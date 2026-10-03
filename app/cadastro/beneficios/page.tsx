"use client";

import { useRouter } from "next/navigation";

export default function BeneficiosPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-background px-4 pt-3 pb-8 font-sans"
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
            Salário e Benefícios
          </p>
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <h1 className="text-center text-[24px] leading-[32px] font-bold text-[#111922]">
            Benefícios
          </h1>
        </section>
      </div>
    </main>
  );
}
