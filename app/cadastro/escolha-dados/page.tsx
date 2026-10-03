"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const benchmarkOptions = [
  {
    key: "salary",
    label: "Benchmark Salarial",
    unavailableMessage: "às informações salariais de mercado",
  },
  {
    key: "benefits",
    label: "Benchmark de Benefícios",
    unavailableMessage: "aos dados de benefícios oferecidos no mercado",
  },
  {
    key: "shortTermIncentives",
    label: "Benchmark de Incentivos de Curto Prazo",
    unavailableMessage:
      "às informações de mercado de Incentivo de Curto Prazo como bônus, comissão e outros",
  },
] as const;

function joinWithAnd(items: string[]) {
  if (items.length < 2) return items[0] ?? "";

  return `${items.slice(0, -1).join(", ")} e ${items.at(-1)}`;
}

export default function EscolhaDadosPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({
    salary: false,
    shortTermIncentives: false,
    benefits: false,
  });
  const [showWarning, setShowWarning] = useState(false);

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

  const unselectedOptions = benchmarkOptions.filter(
    ({ key }) => !selectedOptions[key],
  );

  const handleAdvance = () => {
    if (unselectedOptions.length > 0) {
      setShowWarning(true);
      return;
    }

    router.push("/cadastro/finalizar-cadastro");
  };

  return (
    <main className="min-h-screen bg-background font-sans px-4 pt-4 pb-4" aria-label="Escolha de dados no cadastro">
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

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleAdvance}
                className="inline-flex items-center justify-center rounded-full border-2 border-transparent bg-[#f4374c] px-3 py-1.5 text-[13px] leading-[18px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Avançar
              </button>
            </div>
          </div>
        </section>
      </div>

      {showWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="warning-title"
            aria-describedby="warning-description"
            className="w-full max-w-[620px] rounded-3xl bg-white p-7 shadow-2xl"
          >
            <h2
              id="warning-title"
              className="text-[24px] leading-[31px] font-bold text-[#111922]"
            >
              Atenção
            </h2>
            <p
              id="warning-description"
              className="mt-3 text-[16px] leading-[24px] text-[#4c5560]"
            >
              Você não selecionou{" "}
              <strong className="font-bold text-[#111922]">
                {joinWithAnd(unselectedOptions.map(({ label }) => label))}
              </strong>
              . Ao continuar, você não terá acesso{" "}
              {joinWithAnd(
                unselectedOptions.map(
                  ({ unavailableMessage }) => unavailableMessage,
                ),
              )}
              . Deseja continuar?
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowWarning(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#d6dbe1] bg-white px-5 py-2.5 text-[15px] leading-[21px] font-bold text-[#111922] transition hover:bg-[#eef0f3] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => router.push("/cadastro/finalizar-cadastro")}
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#f4374c] px-5 py-2.5 text-[15px] leading-[21px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Continuar sem acesso
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
