import { useEffect, useState } from "react";
import { HutchSheet } from "@/components/hutch-sheet";
import {
  BREEDS,
  BUILD_STEPS,
  KINDLE_STEP,
  PARTS,
  PART_COPY,
  PLANS,
  VIEWS,
  cuts,
  design,
  isBreed,
  isPart,
  isPlan,
  isView,
  materials,
  summary,
  type PartId,
  type ViewId,
} from "@/lib/hutch";
import { usePersisted } from "@/lib/use-persisted";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const chip =
  "min-h-11 border px-3 py-2 text-left text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss motion-reduce:transition-none";

export function Studio() {
  const [planRaw, setPlan] = usePersisted("bb-plan", "kindling");
  const [breedRaw, setBreed] = usePersisted("bb-breed", "medium");
  const [countRaw, setCount] = usePersisted("bb-count", 6);
  const [partRaw, setPart] = usePersisted("bb-part", "tray");
  const [viewRaw, setView] = usePersisted<ViewId>("bb-view", "section");
  const [copied, setCopied] = useState(false);

  const plan = isPlan(planRaw) ? planRaw : "kindling";
  const breed = isBreed(breedRaw) ? breedRaw : "medium";
  const count = typeof countRaw === "number" && Number.isFinite(countRaw) ? countRaw : 6;
  const model = design(plan, breed, count);
  const part: PartId = isPart(partRaw) ? partRaw : "tray";
  const view = isView(viewRaw) ? viewRaw : "section";

  useEffect(() => {
    if (part === "nest" && !model.nest) setPart("tray");
  }, [model.nest, part, setPart]);

  const active = PART_COPY[part === "nest" && !model.nest ? "tray" : part];
  const lines = materials(model);
  const cutList = cuts(model);

  async function copyList() {
    const text = [
      summary(model),
      "",
      "SHOPPING",
      ...lines.map((line) => `${line.item}: ${line.qty} — ${line.detail}`),
      "",
      "CUTS",
      ...cutList.map((cut) => `${cut.qty} × ${cut.size} — ${cut.name}`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold text-moss">Plan</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PLANS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={plan === item.id}
                onClick={() => setPlan(item.id)}
                className={cx(chip, plan === item.id ? "border-moss bg-moss text-paper" : "border-line bg-sheet text-ink")}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-2 max-w-prose text-sm text-muted">{PLANS.find((item) => item.id === plan)?.blurb}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-moss">Breed size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {BREEDS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={breed === item.id}
                onClick={() => setBreed(item.id)}
                className={cx(
                  chip,
                  breed === item.id ? "border-moss bg-moss text-paper" : "border-line bg-sheet text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">{BREEDS.find((item) => item.id === breed)?.examples}</p>
        </div>

        {plan === "growout" ? (
          <div>
            <p className="text-sm font-semibold text-moss">Weaned kits</p>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                className="grid size-11 place-items-center border border-line bg-sheet text-xl text-ink"
                onClick={() => setCount(Math.max(2, count - 1))}
                aria-label="Fewer kits"
              >
                −
              </button>
              <span className="min-w-10 text-center font-display text-3xl tabular-nums">{model.herd}</span>
              <button
                type="button"
                className="grid size-11 place-items-center border border-line bg-sheet text-xl text-ink"
                onClick={() => setCount(Math.min(12, count + 1))}
                aria-label="More kits"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            {plan === "double" ? "Two adults, one per room." : "One adult in the living room."}
            {plan === "kindling" ? " Kits stay in the nest box until they are out and eating hay." : ""}
          </p>
        )}
      </div>

      <p className="max-w-prose text-lg">{summary(model)}</p>
      <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        <Stat label="Each room" value={`${model.sqft.toFixed(1)} sq ft`} />
        <Stat label="Interior" value={`${model.compartmentL} × ${model.compartmentD} in`} />
        <Stat label="Height" value={`${model.height} in`} />
        <Stat label="Stand" value={`${model.stand} in`} />
      </dl>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="flex flex-wrap gap-2">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={view === item.id}
                onClick={() => setView(item.id)}
                className={cx(chip, view === item.id ? "border-moss bg-moss-soft text-moss" : "border-line bg-sheet")}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 overflow-x-auto border border-line">
            <div className="min-w-2xl">
              <HutchSheet model={model} part={part} view={view} onPart={setPart} />
            </div>
          </div>
          <p className="mt-2 text-sm text-muted">
            Use the diagrams as planning aids. The living area has a solid floor; each litter pan sits inside its room.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-2">
            {PARTS.filter((item) => item.id !== "nest" || model.nest).map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={part === item.id}
                onClick={() => setPart(item.id)}
                className={cx(chip, part === item.id ? "border-moss bg-ink text-paper" : "border-line bg-sheet")}
              >
                {item.label}
              </button>
            ))}
          </div>
          <article className="mt-4 border border-line bg-sheet p-5">
            <h3 className="text-2xl">{active.title}</h3>
            <div className="mt-3 flex flex-col gap-3 text-muted">
              {active.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-2xl">Shopping and cuts</h3>
        <button
          type="button"
          onClick={copyList}
          className="min-h-11 bg-moss px-4 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
        >
          {copied ? "Copied" : "Copy the list"}
        </button>
      </div>
      <ul className="divide-y divide-line border border-line bg-sheet">
        {lines.map((line) => (
          <li key={line.item} className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
            <div>
              <p className="font-semibold">{line.item}</p>
              <p className="text-sm text-muted">{line.detail}</p>
            </div>
            <p className="font-semibold text-moss tabular-nums sm:text-right">{line.qty}</p>
          </li>
        ))}
      </ul>

      <ol className="grid gap-3 sm:grid-cols-2">
        {cutList.map((cut) => (
          <li key={cut.name} className="border border-line bg-sheet px-4 py-3">
            <p className="font-semibold tabular-nums">
              {cut.qty} × {cut.size}
            </p>
            <p className="text-sm text-muted">{cut.name}</p>
          </li>
        ))}
      </ol>

      <div>
        <h3 className="text-2xl">Order of work</h3>
        <ol className="mt-4 flex flex-col gap-4">
          {BUILD_STEPS.map((step, index) => (
            <li key={step} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <span className="font-display text-xl text-moss tabular-nums">{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
          {model.nest ? (
            <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <span className="font-display text-xl text-moss tabular-nums">{BUILD_STEPS.length + 1}</span>
              <p>{KINDLE_STEP}</p>
            </li>
          ) : null}
        </ol>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sheet px-4 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
