"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const industries = [
  "Agricultura",
  "Agritech",
  "Alimentos e Bebidas",
  "Automotivo",
  "Beleza e Bem-estar",
  "Cibersegurança",
  "Consultoria",
  "E-commerce",
  "Edtech",
  "Educação",
  "Energia e Recursos Naturais",
  "Fintech",
  "Foodtech",
  "Gestão de Investimentos",
  "Hardware",
  "Healthtech",
  "HRtech",
  "Imobiliário",
  "Insurtech",
  "Inteligência de Mercado",
  "Jogos",
  "Legaltech",
  "Logística",
  "Logtech",
  "Manufatura",
  "Marketing e Publicidade",
  "Mídia e Entretenimento",
  "Recursos Humanos",
  "Saúde",
  "Segurança",
  "Seguros",
  "Serviços Corporativos",
  "Serviços Financeiros",
  "Serviços Jurídicos",
  "Serviços Profissionais",
  "Software e Serviços",
  "Telecomunicações",
  "Transporte",
  "Varejo",
  "Viagens e Lazer",
  "Outro",
];

const fieldClassName =
  "h-[52px] w-full rounded-lg bg-[#e7e7e7] px-5 text-[15px] leading-[20px] font-bold text-[#111922] outline-none focus:ring-2 focus:ring-[#b8c2cf] aria-[invalid=true]:bg-[#f4ecef]";

const floatingLabelClassName =
  "pointer-events-none absolute left-5 top-2 text-[11px] leading-[14px] text-[#4c5560] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-bold peer-placeholder-shown:text-[#111922] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-normal peer-focus:text-[#4c5560]";

export default function FinalizarCadastroPage() {
  const router = useRouter();
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const [companyName, setCompanyName] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [contractType, setContractType] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [industrySearch, setIndustrySearch] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState("");
  const errorToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const closeIndustryDropdown = (event: MouseEvent) => {
      if (
        industryDropdownRef.current &&
        !industryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsIndustryOpen(false);
        setIndustrySearch("");
      }
    };

    document.addEventListener("mousedown", closeIndustryDropdown);
    return () => document.removeEventListener("mousedown", closeIndustryDropdown);
  }, []);

  useEffect(
    () => () => {
      if (errorToastTimerRef.current) {
        clearTimeout(errorToastTimerRef.current);
      }
    },
    [],
  );

  const filteredIndustries = industries.filter((industry) =>
    industry.toLocaleLowerCase("pt-BR").includes(
      industrySearch.toLocaleLowerCase("pt-BR").trim(),
    ),
  );

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((current) =>
      current.includes(industry)
        ? current.filter((item) => item !== industry)
        : [...current, industry],
    );
  };

  const hasEmployeeCountError = showValidation && employeeCount === "";
  const hasContractTypeError = showValidation && contractType === "";
  const hasAnnualRevenueError = showValidation && annualRevenue === "";

  const displayErrorToast = (message: string) => {
    setErrorToastMessage(message);
    setShowErrorToast(true);

    if (errorToastTimerRef.current) {
      clearTimeout(errorToastTimerRef.current);
    }

    errorToastTimerRef.current = setTimeout(() => {
      setShowErrorToast(false);
    }, 5000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (employeeCount === "" || contractType === "" || annualRevenue === "") {
      setShowValidation(true);
      displayErrorToast(
        "Encontramos alguns erros nos campos. Ajuste para conseguir salvar as informações.",
      );
      return;
    }

    if (Number(employeeCount) < 25) {
      setShowValidation(false);
      displayErrorToast(
        "Para participação no benchmark a Comp exige no mínimo 25 colaboradores",
      );
      return;
    }

    setShowValidation(false);
    router.push("/cadastro/beneficios");
  };

  return (
    <main
      className="min-h-screen bg-background px-4 pt-3 pb-8 font-sans"
      aria-label="Informações sobre a empresa"
    >
      <div className="mx-auto flex min-h-[calc(100vh-44px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              aria-label="Voltar para escolha de dados"
              onClick={() => router.push("/cadastro/escolha-dados")}
              className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white text-foreground transition hover:bg-[#eef0f3]"
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
          </div>
        </header>

        <section className="mt-8 flex justify-center">
          <h1 className="max-w-[760px] text-center text-[28px] leading-[41px] font-bold text-[#0f1923]">
            Informações sobre a empresa
          </h1>
        </section>

        <section className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-[420px]">
            <form
              id="company-info-form"
              className="flex w-full flex-col gap-2"
              onSubmit={handleSubmit}
            >
              <div className="relative">
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder=" "
                aria-label="Nome da empresa"
                className={`${fieldClassName} peer pt-4.5 pb-0.5`}
              />
              <label htmlFor="companyName" className={floatingLabelClassName}>
                Nome da empresa
              </label>
            </div>

            <div ref={industryDropdownRef} className="relative z-20">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isIndustryOpen}
                onClick={() => setIsIndustryOpen((current) => !current)}
                className={`${fieldClassName} flex items-center justify-between gap-4 text-left ${selectedIndustries.length > 0 ? "pt-4" : ""}`}
              >
                <span
                  className={`truncate ${selectedIndustries.length === 0 ? "text-[#111922]" : ""}`}
                  title={selectedIndustries.join(", ")}
                >
                  {selectedIndustries.length > 0
                    ? selectedIndustries.join(", ")
                    : "Setor de atuação"}
                </span>
                <ChevronDown isOpen={isIndustryOpen} />
              </button>
              {selectedIndustries.length > 0 && (
                <span className="pointer-events-none absolute top-1.5 left-5 text-[11px] leading-[14px] text-[#4c5560]">
                  Setor de atuação
                </span>
              )}

              {isIndustryOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 z-30 w-full overflow-hidden rounded-xl border border-[#e1e4e8] bg-white p-2.5 shadow-xl">
                  <input
                    type="search"
                    value={industrySearch}
                    onChange={(event) => setIndustrySearch(event.target.value)}
                    placeholder="Buscar"
                    aria-label="Buscar setor de atuação"
                    autoFocus
                    className="h-9 w-full rounded-lg border border-[#d6dbe1] px-3 text-[14px] font-semibold text-[#111922] outline-none placeholder:text-[#a3a8ae] focus:border-[#8bbff0] focus:ring-2 focus:ring-[#8bbff0]"
                  />

                  <div
                    role="listbox"
                    aria-label="Setores de atuação"
                    aria-multiselectable="true"
                    className="mt-1.5 max-h-[260px] overflow-y-auto"
                  >
                    {filteredIndustries.map((industry) => (
                      <label
                        key={industry}
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] font-bold text-[#111922] hover:bg-[#f2f4f6]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(industry)}
                          onChange={() => toggleIndustry(industry)}
                          className="h-4 w-4 shrink-0 accent-[#f4374c]"
                        />
                        <span>{industry}</span>
                      </label>
                    ))}

                    {filteredIndustries.length === 0 && (
                      <p className="px-3 py-4 text-[15px] text-[#4c5560]">
                        Nenhum setor encontrado.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <input
                id="employeeCount"
                name="employeeCount"
                type="number"
                min="0"
                inputMode="numeric"
                value={employeeCount}
                onChange={(event) => setEmployeeCount(event.target.value)}
                placeholder=" "
                aria-label="Número de colaboradores"
                aria-invalid={hasEmployeeCountError}
                aria-describedby={
                  hasEmployeeCountError ? "employeeCount-error" : undefined
                }
                className={`${fieldClassName} peer pt-4.5 pb-0.5`}
              />
              <label htmlFor="employeeCount" className={floatingLabelClassName}>
                Número de colaboradores
              </label>
              {hasEmployeeCountError && (
                <p
                  id="employeeCount-error"
                  className="mt-1 px-5 text-[12px] leading-[16px] text-[#df0071]"
                >
                  campo obrigatório
                </p>
              )}
            </div>

            <div className="relative">
              <select
                id="contractType"
                name="contractType"
                value={contractType}
                onChange={(event) => setContractType(event.target.value)}
                aria-label="Tipo de contrato dos colaboradores"
                aria-invalid={hasContractTypeError}
                aria-describedby={
                  hasContractTypeError ? "contractType-error" : undefined
                }
                className={`${fieldClassName} cursor-pointer appearance-none pr-12 ${contractType !== "" ? "pt-4" : ""}`}
              >
                <option value="" disabled>
                  Tipo de contrato dos colaboradores
                </option>
                <option value="PJ">PJ</option>
                <option value="CLT">CLT</option>
                <option value="Ambos">Ambos</option>
              </select>
              {contractType !== "" && (
                <label
                  htmlFor="contractType"
                  className="pointer-events-none absolute top-1.5 left-5 text-[11px] leading-[14px] text-[#4c5560]"
                >
                  Tipo de contrato dos colaboradores
                </label>
              )}
              <ChevronDown />
              {hasContractTypeError && (
                <p
                  id="contractType-error"
                  className="mt-1 px-5 text-[12px] leading-[16px] text-[#df0071]"
                >
                  campo obrigatório
                </p>
              )}
            </div>

            <div className="relative">
              <select
                id="annualRevenue"
                name="annualRevenue"
                value={annualRevenue}
                onChange={(event) => setAnnualRevenue(event.target.value)}
                aria-label="Faturamento anual"
                aria-invalid={hasAnnualRevenueError}
                aria-describedby={
                  hasAnnualRevenueError ? "annualRevenue-error" : undefined
                }
                className={`${fieldClassName} cursor-pointer appearance-none pr-12 ${annualRevenue !== "" ? "pt-4" : ""}`}
              >
                <option value="" disabled>
                  Faturamento anual
                </option>
                <option value="Menos de R$150 milhões">
                  Menos de R$150 milhões
                </option>
                <option value="Entre R$150 milhões e R$500 milhões">
                  Entre R$150 milhões e R$500 milhões
                </option>
                <option value="Mais de R$500 milhões">
                  Mais de R$500 milhões
                </option>
                <option value="Não sei informar">Não sei informar</option>
              </select>
              {annualRevenue !== "" && (
                <label
                  htmlFor="annualRevenue"
                  className="pointer-events-none absolute top-1.5 left-5 text-[11px] leading-[14px] text-[#4c5560]"
                >
                  Faturamento anual
                </label>
              )}
              <ChevronDown />
              {hasAnnualRevenueError && (
                <p
                  id="annualRevenue-error"
                  className="mt-1 px-5 text-[12px] leading-[16px] text-[#df0071]"
                >
                  campo obrigatório
                </p>
              )}
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border-2 border-transparent bg-[#f4374c] px-3 py-1.5 text-[12px] leading-[17px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Salvar e Continuar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {showErrorToast && (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-32px)] max-w-[980px] -translate-x-1/2 rounded-xl bg-[#111922] px-8 py-4 text-center text-[15px] leading-[22px] text-[#dfe3e7] shadow-xl"
        >
          {errorToastMessage}
        </div>
      )}
    </main>
  );
}

function ChevronDown({ isOpen = false }: { isOpen?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4c5560] transition ${isOpen ? "rotate-180" : ""}`}
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
