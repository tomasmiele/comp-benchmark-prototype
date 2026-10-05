type CadastroProgressProps = {
  step: 1 | 2 | 3;
};

export default function CadastroProgress({ step }: CadastroProgressProps) {
  return (
    <div
      role="progressbar"
      aria-label={`Etapa ${step} de 3 do cadastro`}
      aria-valuemin={1}
      aria-valuemax={3}
      aria-valuenow={step}
      className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-background/95 px-5 py-3 shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-center" aria-hidden="true">
        <ProgressDot active />
        <ProgressLine active={step >= 2} />
        <ProgressDot active={step >= 2} />
        <ProgressLine active={step >= 3} />
        <ProgressDot active={step >= 3} />
      </div>
    </div>
  );
}

function ProgressDot({ active }: { active: boolean }) {
  return (
    <span
      className={`h-5 w-5 shrink-0 rounded-full border-2 ${
        active
          ? "border-[#f4374c] bg-[#f4374c]"
          : "border-[#cfd4da] bg-background"
      }`}
    />
  );
}

function ProgressLine({ active }: { active: boolean }) {
  return (
    <span
      className={`h-1 w-20 sm:w-28 ${
        active ? "bg-[#f4374c]" : "bg-[#dfe3e7]"
      }`}
    />
  );
}
