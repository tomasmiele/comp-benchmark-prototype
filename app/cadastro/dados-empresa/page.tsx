"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DadosEmpresaPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({
    salary: false,
    shortTermIncentives: false,
    benefits: false,
  });

  const toggleOption = (option: "salary" | "shortTermIncentives" | "benefits") => {
    setSelectedOptions((current) => {
      const nextValue = !current[option];

      if (option === "salary" && !nextValue) {
        return {
          ...current,
          salary: false,
          shortTermIncentives: false,
        };
      }

      return {
        ...current,
        [option]: nextValue,
      };
    });
  };

  return (
    <main className="min-h-screen bg-background font-sans px-4 pt-4 pb-4" aria-label="Dados da empresa no cadastro">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar para pagina inicial"
            onClick={() => router.push("/")}
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
            title="Como Funciona"
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
            }}
          >
            Como Funciona
          </p>
        </header>

        <section className="mt-8 flex justify-center">
          <h1 className="max-w-[760px] text-center text-[28px] leading-[41px] font-bold text-[#0f1923]">
            Escolha quais dados você gostaria de enviar
          </h1>
        </section>

        <section className="mt-5 flex justify-center">
          <div className="w-full max-w-[760px]">

            <div className="mt-4 flex flex-col gap-3">
              <label
                htmlFor="salary"
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d6dbe1] bg-white p-4 transition hover:border-[#b8c2cf]"
              >
                <input
                  id="salary"
                  type="checkbox"
                  checked={selectedOptions.salary}
                  onChange={() => toggleOption("salary")}
                  className="mt-1 h-5 w-5 accent-[#f4374c]"
                />
                <span className="flex flex-col">
                  <span className="text-[22px] leading-[28px] font-bold text-[#111922]">Salário</span>
                  <span className="mt-1 text-[16px] leading-[21px] font-normal text-[#4c5560]">
                    Acesso a informações salariais de mercado
                  </span>
                </span>
              </label>

              {selectedOptions.salary && (
                <label
                  htmlFor="shortTermIncentives"
                  className="ml-8 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d6dbe1] bg-white p-4 transition hover:border-[#b8c2cf]"
                >
                  <input
                    id="shortTermIncentives"
                    type="checkbox"
                    checked={selectedOptions.shortTermIncentives}
                    onChange={() => toggleOption("shortTermIncentives")}
                    className="mt-1 h-5 w-5 accent-[#f4374c]"
                  />
                  <span className="flex flex-col">
                    <span className="text-[22px] leading-[28px] font-bold text-[#111922]">Incentivos de Curto Prazo</span>
                    <span className="mt-1 text-[16px] leading-[21px] font-normal text-[#4c5560]">
                      Acesse também informações de mercado de Incentivo de Curto Prazo como bônus, comissão e outros
                    </span>
                  </span>
                </label>
              )}

              <label
                htmlFor="benefits"
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#d6dbe1] bg-white p-4 transition hover:border-[#b8c2cf]"
              >
                <input
                  id="benefits"
                  type="checkbox"
                  checked={selectedOptions.benefits}
                  onChange={() => toggleOption("benefits")}
                  className="mt-1 h-5 w-5 accent-[#f4374c]"
                />
                <span className="flex flex-col">
                  <span className="text-[22px] leading-[28px] font-bold text-[#111922]">Benefícios</span>
                  <span className="mt-1 text-[16px] leading-[21px] font-normal text-[#4c5560]">
                    Acesso aos dados de benefícios oferecidos no mercado
                  </span>
                </span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
