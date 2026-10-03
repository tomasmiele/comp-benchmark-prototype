"use client";

import { useRouter } from "next/navigation";

export default function FinalizarCadastroPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background font-sans px-4 pt-4 pb-4" aria-label="Finalizar cadastro">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar para escolha de dados"
            onClick={() => router.push("/cadastro/escolha-dados")}
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
          <p
            title="Salário e Benefícios"
            className="max-w-[520px]"
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
            }}
          >
            Salário e Benefícios
          </p>
        </header>
      </div>
    </main>
  );
}
