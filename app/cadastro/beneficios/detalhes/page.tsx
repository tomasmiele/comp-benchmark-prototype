"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CadastroProgress from "../../_components/CadastroProgress";

const benefitOptions = [
  "Auxílio atividade física",
  "Auxílio creche",
  "Auxílio educação",
  "Auxílio home office",
  "Auxílio saúde mental",
  "Benefício flexível",
  "Licença aniversário (birthday off)",
  "Licença maternidade estendida",
  "Licença paternidade estendida",
  "Plano de saúde",
  "Plano odontológico",
  "Previdência privada",
  "Refeitório/alimentação no local",
  "Seguro de vida",
  "Trabalho remoto",
  "Vale alimentação e Vale refeição",
] as const;

const physicalActivityProviders = ["Total Pass", "Wellhub", "Outro"];

const mentalHealthProviders = [
  "Kosenti",
  "Momentum",
  "Vittude",
  "Wellz Care",
  "Zenklub",
  "Outro",
];

const flexibleBenefitProviders = [
  "Alymente",
  "Beflex",
  "Caju",
  "Creditas",
  "Flash",
  "Ifood",
  "Swile",
  "Uppo",
  "Outro",
];

const healthInsurers = [
  "Alice",
  "Allianz",
  "Amil",
  "Bradesco",
  "Cnu",
  "Hapvida",
  "Omint",
  "Porto Seguro",
  "Sami",
  "Sompo",
  "Sul America",
  "Unimax",
  "Unimed",
  "Outro",
];

const dentalInsurers = [
  "Amil",
  "Bradesco",
  "Caixa",
  "Care Plus",
  "Metlife",
  "Odontoprev",
  "Porto Seguro",
  "Sul America",
  "Unimed",
  "Outro",
];

const configKeysByBenefit: Record<string, string[]> = {
  "Auxílio atividade física": ["physicalProvider", "physicalProviderOther"],
  "Auxílio creche": ["childcareMonthlyValue"],
  "Auxílio educação": ["educationMonthlyValue"],
  "Auxílio home office": ["homeOfficeOneTime", "homeOfficeMonthly"],
  "Auxílio saúde mental": ["mentalProvider", "mentalProviderOther"],
  "Benefício flexível": [
    "flexibleProvider",
    "flexibleProviderOther",
    "flexibleMonthlyValue",
  ],
  "Licença maternidade estendida": ["maternityDays"],
  "Licença paternidade estendida": ["paternityDays"],
  "Plano de saúde": [
    "healthInsurer",
    "healthInsurerOther",
    "healthAccommodation",
    "healthCopay",
    "healthContribution",
    "healthDependentCharge",
  ],
  "Plano odontológico": [
    "dentalInsurer",
    "dentalInsurerOther",
    "dentalCopay",
    "dentalContribution",
    "dentalDependentCharge",
  ],
  "Previdência privada": [
    "pensionProvider",
    "pensionVestingYears",
    "pensionMatching",
  ],
  "Trabalho remoto": ["remoteWorkModel"],
  "Vale alimentação e Vale refeição": ["mealMonthlyValue"],
};

const compactFieldClassName =
  "h-[52px] w-full rounded-lg bg-[#e7e7e7] px-5 text-[15px] leading-[20px] font-bold text-[#111922] outline-none focus:ring-2 focus:ring-[#b8c2cf]";

const floatingLabelClassName =
  "pointer-events-none absolute left-5 top-2 text-[11px] leading-[14px] text-[#4c5560] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-bold peer-placeholder-shown:text-[#111922] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-normal peer-focus:text-[#4c5560]";

type BenefitConfig = Record<string, string>;

function isFilled(value: string | undefined) {
  return Boolean(value?.trim());
}

function isBenefitConfigurationComplete(
  benefit: (typeof benefitOptions)[number],
  config: BenefitConfig,
) {
  switch (benefit) {
    case "Auxílio atividade física":
      return (
        isFilled(config.physicalProvider) &&
        (config.physicalProvider !== "Outro" ||
          isFilled(config.physicalProviderOther))
      );
    case "Auxílio creche":
      return isFilled(config.childcareMonthlyValue);
    case "Auxílio educação":
      return isFilled(config.educationMonthlyValue);
    case "Auxílio home office":
      return (
        isFilled(config.homeOfficeOneTime) &&
        isFilled(config.homeOfficeMonthly)
      );
    case "Auxílio saúde mental":
      return (
        isFilled(config.mentalProvider) &&
        (config.mentalProvider !== "Outro" ||
          isFilled(config.mentalProviderOther))
      );
    case "Benefício flexível":
      return (
        isFilled(config.flexibleProvider) &&
        (config.flexibleProvider !== "Outro" ||
          isFilled(config.flexibleProviderOther)) &&
        isFilled(config.flexibleMonthlyValue)
      );
    case "Licença maternidade estendida":
      return isFilled(config.maternityDays);
    case "Licença paternidade estendida":
      return isFilled(config.paternityDays);
    case "Plano de saúde":
      return (
        isFilled(config.healthInsurer) &&
        (config.healthInsurer !== "Outro" ||
          isFilled(config.healthInsurerOther)) &&
        isFilled(config.healthAccommodation) &&
        isFilled(config.healthCopay) &&
        isFilled(config.healthContribution) &&
        isFilled(config.healthDependentCharge)
      );
    case "Plano odontológico":
      return (
        isFilled(config.dentalInsurer) &&
        (config.dentalInsurer !== "Outro" ||
          isFilled(config.dentalInsurerOther)) &&
        isFilled(config.dentalCopay) &&
        isFilled(config.dentalContribution) &&
        isFilled(config.dentalDependentCharge)
      );
    case "Previdência privada":
      return (
        isFilled(config.pensionProvider) &&
        isFilled(config.pensionVestingYears) &&
        isFilled(config.pensionMatching)
      );
    case "Trabalho remoto":
      return isFilled(config.remoteWorkModel);
    case "Vale alimentação e Vale refeição":
      return isFilled(config.mealMonthlyValue);
    default:
      return true;
  }
}

export default function DetalhesBeneficiosPage() {
  const router = useRouter();
  const [showNoBenefitsWarning, setShowNoBenefitsWarning] = useState(false);
  const [showVariablePayIntro, setShowVariablePayIntro] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [config, setConfig] = useState<BenefitConfig>({});

  const updateConfig = (key: string, value: string) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const toggleBenefit = (benefit: string) => {
    const isRemoving = selectedBenefits.includes(benefit);

    if (isRemoving) {
      const keysToClear = configKeysByBenefit[benefit] ?? [];
      setConfig((current) => {
        const next = { ...current };
        keysToClear.forEach((key) => delete next[key]);
        return next;
      });
    }

    setSelectedBenefits((current) =>
      isRemoving
        ? current.filter((item) => item !== benefit)
        : [...current, benefit],
    );
  };

  const handleNext = () => {
    const hasIncompleteBenefit = selectedBenefits.some(
      (benefit) =>
        !isBenefitConfigurationComplete(
          benefit as (typeof benefitOptions)[number],
          config,
        ),
    );

    if (selectedBenefits.length === 0 || hasIncompleteBenefit) {
      setShowNoBenefitsWarning(true);
      return;
    }

    setShowVariablePayIntro(true);
  };

  return (
    <main
      className="min-h-screen bg-background px-4 pt-3 pb-24 font-sans"
      aria-label="Detalhes dos benefícios"
    >
      <div className="mx-auto flex min-h-[calc(100vh-44px)] w-full max-w-[1720px] flex-col">
        <header className="flex items-center gap-1">
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              aria-label="Voltar para benefícios"
              onClick={() => router.push("/cadastro/beneficios")}
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
              Benefícios
            </p>
          </div>

        </header>

        <section className="mt-8 flex justify-center">
          <h1 className="max-w-[760px] text-center text-[28px] leading-[41px] font-bold text-[#0f1923]">
            Selecione e configure os benefícios da sua empresa
          </h1>
        </section>

        <section className="mt-5 flex justify-center pb-8">
          <div
            className="flex w-full max-w-[420px] flex-col gap-2"
            role="group"
            aria-label="Benefícios oferecidos pela empresa"
          >
            {benefitOptions.map((benefit) => {
              const isSelected = selectedBenefits.includes(benefit);

              return (
                <div key={benefit} className="flex flex-col gap-2">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleBenefit(benefit)}
                    className={`flex min-h-[52px] w-full items-center justify-between gap-4 rounded-lg border-2 px-5 py-3 text-left text-[15px] leading-[20px] font-bold transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      isSelected
                        ? "border-[#f4374c] bg-[#fff0f2] text-[#111922]"
                        : "border-transparent bg-[#e7e7e7] text-[#111922] hover:border-[#b8c2cf]"
                    }`}
                  >
                    <span>{benefit}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] text-white ${
                        isSelected ? "bg-[#f4374c]" : "bg-white"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>

                  {isSelected && (
                    <BenefitConfiguration
                      benefit={benefit}
                      config={config}
                      onChange={updateConfig}
                    />
                  )}
                </div>
              );
            })}

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

      <CadastroProgress step={2} />

      {showNoBenefitsWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="no-benefits-title"
            aria-describedby="no-benefits-description"
            className="w-full max-w-[620px] rounded-3xl bg-white p-7 shadow-2xl"
          >
            <h2
              id="no-benefits-title"
              className="text-[24px] leading-[31px] font-bold text-[#111922]"
            >
              Atenção
            </h2>
            <p
              id="no-benefits-description"
              className="mt-3 text-[16px] leading-[24px] text-[#4c5560]"
            >
              Você não selecionou nenhum benefício. Ao continuar, você não terá
              acesso aos dados de benefícios oferecidos no mercado.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowNoBenefitsWarning(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#d6dbe1] bg-white px-5 py-2.5 text-[15px] leading-[21px] font-bold text-[#111922] transition hover:bg-[#eef0f3] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Preencher benefícios
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNoBenefitsWarning(false);
                  setShowVariablePayIntro(true);
                }}
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#f4374c] px-5 py-2.5 text-[15px] leading-[21px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Continuar sem benefícios
              </button>
            </div>
          </div>
        </div>
      )}

      {showVariablePayIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="variable-pay-intro-title"
            className="w-full max-w-[560px] rounded-3xl bg-white p-7 shadow-2xl"
          >
            <h2
              id="variable-pay-intro-title"
              className="text-center text-[22px] leading-[31px] font-bold text-[#111922]"
            >
              Selecione as práticas de remuneração variável que a sua empresa
              pratica.
            </h2>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/cadastro/salario-incentivos")}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#f4374c] bg-[#f4374c] px-5 py-2 text-[15px] font-bold text-white transition hover:bg-accent-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function BenefitConfiguration({
  benefit,
  config,
  onChange,
}: {
  benefit: (typeof benefitOptions)[number];
  config: BenefitConfig;
  onChange: (key: string, value: string) => void;
}) {
  switch (benefit) {
    case "Auxílio atividade física":
      return (
        <ConfigurationPanel>
          <CompactSelect
            id="physicalProvider"
            label="Fornecedor"
            value={config.physicalProvider ?? ""}
            options={physicalActivityProviders}
            onChange={(value) => onChange("physicalProvider", value)}
          />
          {config.physicalProvider === "Outro" && (
            <CompactInput
              id="physicalProviderOther"
              label="Informe o nome do fornecedor"
              value={config.physicalProviderOther ?? ""}
              onChange={(value) => onChange("physicalProviderOther", value)}
            />
          )}
        </ConfigurationPanel>
      );

    case "Auxílio creche":
      return (
        <ConfigurationPanel>
          <Hint>
            Informe o valor médio pago por mês por criança. (Preencher
            &quot;550&quot; para R$550/criança)
          </Hint>
          <CompactInput
            id="childcareMonthlyValue"
            label="Valor médio pago por mês"
            type="number"
            value={config.childcareMonthlyValue ?? ""}
            onChange={(value) => onChange("childcareMonthlyValue", value)}
          />
        </ConfigurationPanel>
      );

    case "Auxílio educação":
      return (
        <ConfigurationPanel>
          <Hint>
            Informe o valor pago por mês para auxílio educação, apenas valores
            monetários/reembolsos.
          </Hint>
          <CompactInput
            id="educationMonthlyValue"
            label="Valor pago por mês"
            type="number"
            value={config.educationMonthlyValue ?? ""}
            onChange={(value) => onChange("educationMonthlyValue", value)}
          />
        </ConfigurationPanel>
      );

    case "Auxílio home office":
      return (
        <ConfigurationPanel>
          <Hint>Valor pago uma única vez na contratação do colaborador.</Hint>
          <CompactInput
            id="homeOfficeOneTime"
            label="Valor pago uma única vez"
            type="number"
            value={config.homeOfficeOneTime ?? ""}
            onChange={(value) => onChange("homeOfficeOneTime", value)}
          />
          <CompactInput
            id="homeOfficeMonthly"
            label="Valor pago por mês"
            type="number"
            value={config.homeOfficeMonthly ?? ""}
            onChange={(value) => onChange("homeOfficeMonthly", value)}
          />
        </ConfigurationPanel>
      );

    case "Auxílio saúde mental":
      return (
        <ConfigurationPanel>
          <CompactSelect
            id="mentalProvider"
            label="Fornecedor"
            value={config.mentalProvider ?? ""}
            options={mentalHealthProviders}
            onChange={(value) => onChange("mentalProvider", value)}
          />
          {config.mentalProvider === "Outro" && (
            <CompactInput
              id="mentalProviderOther"
              label="Informe o nome do fornecedor"
              value={config.mentalProviderOther ?? ""}
              onChange={(value) => onChange("mentalProviderOther", value)}
            />
          )}
        </ConfigurationPanel>
      );

    case "Benefício flexível":
      return (
        <ConfigurationPanel>
          <CompactSelect
            id="flexibleProvider"
            label="Fornecedor"
            value={config.flexibleProvider ?? ""}
            options={flexibleBenefitProviders}
            onChange={(value) => onChange("flexibleProvider", value)}
          />
          {config.flexibleProvider === "Outro" && (
            <CompactInput
              id="flexibleProviderOther"
              label="Informe o nome do fornecedor"
              value={config.flexibleProviderOther ?? ""}
              onChange={(value) => onChange("flexibleProviderOther", value)}
            />
          )}
          <Hint>Adicione o valor total pago mensalmente para o colaborador.</Hint>
          <CompactInput
            id="flexibleMonthlyValue"
            label="Valor mensal"
            type="number"
            value={config.flexibleMonthlyValue ?? ""}
            onChange={(value) => onChange("flexibleMonthlyValue", value)}
          />
        </ConfigurationPanel>
      );

    case "Licença maternidade estendida":
      return (
        <ConfigurationPanel>
          <Hint>
            Informe a quantidade de dias obrigatórios somados com os dias
            adicionais.
          </Hint>
          <CompactInput
            id="maternityDays"
            label="Dias totais oferecidos"
            type="number"
            value={config.maternityDays ?? ""}
            onChange={(value) => onChange("maternityDays", value)}
          />
        </ConfigurationPanel>
      );

    case "Licença paternidade estendida":
      return (
        <ConfigurationPanel>
          <Hint>
            Informe a quantidade de dias obrigatórios somados com os dias
            adicionais.
          </Hint>
          <CompactInput
            id="paternityDays"
            label="Dias totais oferecidos"
            type="number"
            value={config.paternityDays ?? ""}
            onChange={(value) => onChange("paternityDays", value)}
          />
        </ConfigurationPanel>
      );

    case "Plano de saúde":
      return (
        <ConfigurationPanel>
          <Hint>
            Caso sua empresa tenha mais de um plano, considere as informações do
            plano com maior número de colaboradores e dependentes.
          </Hint>
          <CompactSelect
            id="healthInsurer"
            label="Seguradora"
            value={config.healthInsurer ?? ""}
            options={healthInsurers}
            onChange={(value) => onChange("healthInsurer", value)}
          />
          {config.healthInsurer === "Outro" && (
            <CompactInput
              id="healthInsurerOther"
              label="Informe o nome da seguradora"
              value={config.healthInsurerOther ?? ""}
              onChange={(value) => onChange("healthInsurerOther", value)}
            />
          )}
          <CompactSelect
            id="healthAccommodation"
            label="Tipo de acomodação"
            value={config.healthAccommodation ?? ""}
            options={["Apartamento", "Enfermaria"]}
            onChange={(value) => onChange("healthAccommodation", value)}
          />
          <YesNoField
            label="O colaborador possui coparticipação?"
            value={config.healthCopay ?? ""}
            onChange={(value) => onChange("healthCopay", value)}
          />
          <YesNoField
            label="O colaborador contribui no plano de saúde?"
            value={config.healthContribution ?? ""}
            onChange={(value) => onChange("healthContribution", value)}
          />
          <YesNoField
            label="É cobrado do dependente?"
            value={config.healthDependentCharge ?? ""}
            onChange={(value) => onChange("healthDependentCharge", value)}
          />
        </ConfigurationPanel>
      );

    case "Plano odontológico":
      return (
        <ConfigurationPanel>
          <Hint>
            Caso sua empresa tenha mais de um plano, considere as informações do
            plano com maior número de colaboradores e dependentes.
          </Hint>
          <CompactSelect
            id="dentalInsurer"
            label="Seguradora"
            value={config.dentalInsurer ?? ""}
            options={dentalInsurers}
            onChange={(value) => onChange("dentalInsurer", value)}
          />
          {config.dentalInsurer === "Outro" && (
            <CompactInput
              id="dentalInsurerOther"
              label="Informe o nome da seguradora"
              value={config.dentalInsurerOther ?? ""}
              onChange={(value) => onChange("dentalInsurerOther", value)}
            />
          )}
          <YesNoField
            label="O colaborador possui coparticipação?"
            value={config.dentalCopay ?? ""}
            onChange={(value) => onChange("dentalCopay", value)}
          />
          <YesNoField
            label="O colaborador contribui no plano?"
            value={config.dentalContribution ?? ""}
            onChange={(value) => onChange("dentalContribution", value)}
          />
          <YesNoField
            label="É cobrado do dependente?"
            value={config.dentalDependentCharge ?? ""}
            onChange={(value) => onChange("dentalDependentCharge", value)}
          />
        </ConfigurationPanel>
      );

    case "Previdência privada":
      return (
        <ConfigurationPanel>
          <CompactInput
            id="pensionProvider"
            label="Fornecedor"
            value={config.pensionProvider ?? ""}
            onChange={(value) => onChange("pensionProvider", value)}
          />
          <Hint>
            Qual o período de carência para ter acesso ao valor máximo investido
            pela empresa?
          </Hint>
          <CompactInput
            id="pensionVestingYears"
            label="Período de carência (anos)"
            type="number"
            value={config.pensionVestingYears ?? ""}
            onChange={(value) => onChange("pensionVestingYears", value)}
          />
          <YesNoField
            label="Você oferece matching no valor investido?"
            value={config.pensionMatching ?? ""}
            onChange={(value) => onChange("pensionMatching", value)}
          />
        </ConfigurationPanel>
      );

    case "Trabalho remoto":
      return (
        <ConfigurationPanel>
          <CompactSelect
            id="remoteWorkModel"
            label="Qual o modelo de trabalho?"
            value={config.remoteWorkModel ?? ""}
            options={["100% Home Office", "Híbrido"]}
            onChange={(value) => onChange("remoteWorkModel", value)}
          />
        </ConfigurationPanel>
      );

    case "Vale alimentação e Vale refeição":
      return (
        <ConfigurationPanel>
          <Hint>
            Informe o valor total da soma do Vale Alimentação com o Vale
            Refeição.
          </Hint>
          <CompactInput
            id="mealMonthlyValue"
            label="Valor pago por mês"
            type="number"
            value={config.mealMonthlyValue ?? ""}
            onChange={(value) => onChange("mealMonthlyValue", value)}
          />
        </ConfigurationPanel>
      );

    default:
      return null;
  }
}

function ConfigurationPanel({ children }: { children: React.ReactNode }) {
  return <div className="ml-4 flex flex-col gap-2">{children}</div>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1 text-[12px] leading-[17px] text-[#4c5560]">
      {children}
    </p>
  );
}

function CompactInput({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: "text" | "number";
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        min={type === "number" ? "0" : undefined}
        inputMode={type === "number" ? "decimal" : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder=" "
        aria-label={label}
        className={`${compactFieldClassName} peer pt-4 pb-0.5`}
      />
      <label htmlFor={id} className={floatingLabelClassName}>
        {label}
      </label>
    </div>
  );
}

function CompactSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className={`${compactFieldClassName} cursor-pointer appearance-none pr-12 ${value ? "pt-4" : ""}`}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {value && (
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-1.5 left-5 text-[11px] leading-[14px] text-[#4c5560]"
        >
          {label}
        </label>
      )}
      <ChevronDown />
    </div>
  );
}

function YesNoField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-lg bg-[#e7e7e7] px-5 py-3">
      <p className="text-[13px] leading-[18px] font-bold text-[#111922]">
        {label}
      </p>
      <div className="mt-2 flex gap-2" role="group" aria-label={label}>
        {[
          ["nao", "Não"],
          ["sim", "Sim"],
        ].map(([optionValue, optionLabel]) => (
          <button
            key={optionValue}
            type="button"
            aria-pressed={value === optionValue}
            onClick={() => onChange(optionValue)}
            className={`inline-flex min-w-[64px] items-center justify-center rounded-full border px-3 py-1 text-[12px] font-bold transition ${
              value === optionValue
                ? "border-[#f4374c] bg-[#f4374c] text-white"
                : "border-[#cbd1d8] bg-white text-[#111922] hover:border-[#b8c2cf]"
            }`}
          >
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4c5560]"
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
