"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const incentiveOptions = ["Bônus", "Comissão", "PLR"] as const;

export default function SalarioIncentivosPage() {
  const router = useRouter();
  const [selectedIncentives, setSelectedIncentives] = useState<string[]>([]);
  const [offersOtherIncentives, setOffersOtherIncentives] = useState(false);
  const [otherIncentives, setOtherIncentives] = useState("");
  const [showNoIncentivesWarning, setShowNoIncentivesWarning] = useState(false);

  const toggleIncentive = (incentive: string) => {
    setSelectedIncentives((current) =>
      current.includes(incentive)
        ? current.filter((item) => item !== incentive)
        : [...current, incentive],
    );
  };

  const handleNext = () => {
    if (selectedIncentives.length === 0 && !offersOtherIncentives) {
      setShowNoIncentivesWarning(true);
      return;
    }

    router.push("/cadastro/planilha-colaboradores");
  };

  return (
    <main
      className="min-h-screen bg-background px-4 pt-3 pb-8 font-sans"
      aria-label="Salário e Incentivos"
    >
      <div className="mx-auto flex min-h-[calc(100vh-44px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Voltar para configuração de benefícios"
            onClick={() => router.push("/cadastro/beneficios/detalhes")}
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
            Benefícios
          </p>
        </header>

        <section className="mt-8 flex justify-center">
          <h1 className="max-w-[760px] text-center text-[28px] leading-[41px] font-bold text-[#0f1923]">
            Salário e Incentivos
          </h1>
        </section>

        <section className="mt-5 flex justify-center pb-8">
          <div
            className="flex w-full max-w-[420px] flex-col gap-2"
            role="group"
            aria-label="Práticas de remuneração variável"
          >
            {incentiveOptions.map((incentive) => {
              const isSelected = selectedIncentives.includes(incentive);

              return (
                <button
                  key={incentive}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleIncentive(incentive)}
                  className={`flex min-h-[52px] w-full items-center justify-between gap-4 rounded-lg border-2 px-5 py-3 text-left text-[15px] leading-[20px] font-bold transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    isSelected
                      ? "border-[#f4374c] bg-[#fff0f2] text-[#111922]"
                      : "border-transparent bg-[#e7e7e7] text-[#111922] hover:border-[#b8c2cf]"
                  }`}
                >
                  <span>{incentive}</span>
                  <SelectionIndicator selected={isSelected} />
                </button>
              );
            })}

            <div className="flex flex-col gap-2">
              <button
                type="button"
                aria-pressed={offersOtherIncentives}
                onClick={() => setOffersOtherIncentives((current) => !current)}
                className={`flex min-h-[52px] w-full items-center justify-between gap-4 rounded-lg border-2 px-5 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  offersOtherIncentives
                    ? "border-[#f4374c] bg-[#fff0f2] text-[#111922]"
                    : "border-transparent bg-[#e7e7e7] text-[#111922] hover:border-[#b8c2cf]"
                }`}
              >
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] leading-[20px] font-bold">
                    Ofereço outros Incentivos de Curto Prazo
                  </span>
                  <span className="text-[12px] leading-[17px] font-normal text-[#4c5560]">
                    Se sua empresa oferece outros tipos de Incentivo de Curto
                    Prazo além dos listados, descreva-os detalhadamente no campo
                    abaixo.
                  </span>
                </span>
                <SelectionIndicator selected={offersOtherIncentives} />
              </button>

              {offersOtherIncentives && (
                <div className="rounded-lg bg-[#f2f2f2] p-3">
                  <label
                    htmlFor="other-incentives"
                    className="mb-2 block text-[12px] leading-[17px] font-bold text-[#4c5560]"
                  >
                    Descreva os outros Incentivos de Curto Prazo
                  </label>
                  <textarea
                    id="other-incentives"
                    value={otherIncentives}
                    onChange={(event) => setOtherIncentives(event.target.value)}
                    rows={4}
                    placeholder="Digite aqui"
                    className="w-full resize-y rounded-lg bg-white px-4 py-3 text-[14px] leading-[20px] text-[#111922] outline-none placeholder:text-[#8a929c] focus:ring-2 focus:ring-[#b8c2cf]"
                  />
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-4 py-1.5 text-[13px] leading-[18px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Próximo
              </button>
            </div>
          </div>
        </section>
      </div>

      {showNoIncentivesWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="no-incentives-title"
            aria-describedby="no-incentives-description"
            className="w-full max-w-[560px] rounded-3xl bg-white p-7 shadow-2xl"
          >
            <h2
              id="no-incentives-title"
              className="text-[24px] leading-[31px] font-bold text-[#111922]"
            >
              Atenção
            </h2>
            <p
              id="no-incentives-description"
              className="mt-3 text-[16px] leading-[24px] text-[#4c5560]"
            >
              Você não selecionou nenhuma opção de Incentivo de Curto Prazo. Se seguir dessa forma você não terá acesso aos benchmarks de Incentivo de Curto Prazo, tem certeza que deseja continuar?
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowNoIncentivesWarning(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#d6dbe1] bg-white px-5 py-2.5 text-[15px] leading-[21px] font-bold text-[#111922] transition hover:bg-[#eef0f3] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Preencher
              </button>
              <button
                type="button"
                onClick={() => router.push("/cadastro/planilha-colaboradores")}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-5 py-2 text-[15px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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

function SelectionIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] text-white ${
        selected ? "bg-[#f4374c]" : "bg-white"
      }`}
    >
      {selected ? "✓" : ""}
    </span>
  );
}
