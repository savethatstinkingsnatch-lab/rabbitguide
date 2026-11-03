import { usePersisted } from "@/lib/use-persisted";

const TASKS = [
  {
    id: "water",
    label: "Water checked",
    days: 1,
    hint: "Twice if it is frozen or hot. A nursing doe can empty a bottle before noon.",
  },
  {
    id: "hay",
    label: "Hay rack filled",
    days: 1,
    hint: "If the hay runs out they eat pellets and leave cecotropes behind.",
  },
  {
    id: "tray",
    label: "Tray dumped",
    days: 1,
    hint: "This is the whole point of the mesh. Ammonia builds in a day of warm weather.",
  },
  {
    id: "ceco",
    label: "No cecotropes stuck on the rabbit",
    days: 1,
    hint: "A clean vent means they made the reach. Smears are diet or pain, not a tray to feed back.",
  },
  {
    id: "board",
    label: "Resting board swapped",
    days: 7,
    hint: "Wet wood and wire together are how sore hocks start.",
  },
  {
    id: "brush",
    label: "Mesh brushed, tray washed",
    days: 7,
    hint: "Hair mats on 1/4 in mesh until pellets sit in it instead of falling through.",
  },
  {
    id: "wire",
    label: "Wire, latches, and staples",
    days: 7,
    hint: "A loose corner is an exit, or a cut foot.",
  },
  {
    id: "hocks",
    label: "Hocks and teeth looked at",
    days: 7,
    hint: "Red heels or drool are not a cleaning problem.",
  },
] as const;

type Log = Record<string, string>;

function startOfDay(time: number) {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function due(iso: string | undefined, days: number) {
  if (!iso) return true;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return true;
  if (days <= 1) return startOfDay(then) < startOfDay(Date.now());
  return Date.now() - then > days * 24 * 60 * 60 * 1000;
}

function whenLabel(iso: string | undefined) {
  if (!iso) return "Not logged yet";
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "Not logged yet";
  return `Last ${then.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

export function CareLog() {
  const [log, setLog] = usePersisted<Log>("bb-care", {});
  const [notes, setNotes] = usePersisted<string>("bb-notes", "");
  const safeLog = log && typeof log === "object" ? log : {};
  const noteText = typeof notes === "string" ? notes : "";

  function mark(id: string) {
    setLog({ ...safeLog, [id]: new Date().toISOString() });
  }

  const open = TASKS.filter((task) => due(safeLog[task.id], task.days)).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
      <div>
        <p className="text-sm font-semibold text-moss">
          {open === 0 ? "Nothing due. The hutch is current." : `${open} thing${open === 1 ? "" : "s"} due`}
        </p>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {TASKS.map((task) => {
            const isDue = due(safeLog[task.id], task.days);
            return (
              <li key={task.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-prose">
                  <p className="font-semibold">{task.label}</p>
                  <p className="text-sm text-muted">
                    {whenLabel(safeLog[task.id])} · {task.hint}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => mark(task.id)}
                  className={
                    isDue
                      ? "min-h-11 shrink-0 bg-moss px-4 font-semibold text-paper"
                      : "min-h-11 shrink-0 border border-line bg-sheet px-4 font-semibold text-moss"
                  }
                >
                  {isDue ? "Mark done" : "Done today"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border border-line bg-sheet p-5">
        <label htmlFor="shop-notes" className="font-display text-xl">
          Shop notes
        </label>
        <p className="mt-1 text-sm text-muted">What you actually built. Saved on this device.</p>
        <textarea
          id="shop-notes"
          value={noteText}
          onChange={(event) => setNotes(event.target.value)}
          rows={8}
          placeholder="Tray ended up 37 in. Back rail dropped a full half inch."
          className="mt-4 w-full resize-y border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
        />
      </div>
    </div>
  );
}
