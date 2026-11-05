import type { HutchModel, PartId, ViewId } from "@/lib/hutch";

type Props = {
  model: HutchModel;
  part: PartId;
  view: ViewId;
  onPart: (part: PartId) => void;
};

const ink = "var(--color-ink)";
const muted = "var(--color-muted)";
const moss = "var(--color-moss)";
const mossSoft = "var(--color-moss-soft)";
const clay = "var(--color-clay)";
const claySoft = "var(--color-clay-soft)";
const sheet = "var(--color-sheet)";
const sans = "Source Sans 3, Segoe UI, sans-serif";
const display = "Fraunces, Georgia, serif";

function hit(id: PartId, part: PartId, onPart: (part: PartId) => void) {
  return {
    onClick: () => onPart(id),
    className: "cursor-pointer",
    strokeWidth: part === id ? 3 : 1.5,
  };
}

export function HutchSheet({ model: m, part, view, onPart }: Props) {
  const title =
    view === "section" ? "Section through the room" : view === "front" ? "Front elevation" : "Floor plan";
  const caption =
    view === "section"
      ? "End view. The litter pan sits inside on a solid floor."
      : view === "front"
        ? "The face you open. Each door is wire, not wood."
        : "Looking down. Solid floor with a litter pan in each room.";

  return (
    <svg viewBox="0 0 720 520" role="img" aria-label={`${title}. ${caption}`} className="h-auto w-full">
      <rect width="720" height="520" fill={sheet} />
      <defs>
        <pattern id="wire12" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14 L14 0 M0 0 L14 14" stroke={ink} strokeWidth="0.55" opacity="0.4" />
        </pattern>
        <pattern id="pellets" width="18" height="14" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="7" r="1.7" fill={ink} opacity="0.4" />
          <circle cx="13" cy="5" r="1.4" fill={ink} opacity="0.28" />
        </pattern>
      </defs>
      <text x="28" y="36" fill={ink} fontFamily={display} fontSize="22">
        {title}
      </text>
      <text x="28" y="58" fill={muted} fontFamily={sans} fontSize="14">
        {caption}
      </text>
      {view === "section" ? <SectionView model={m} part={part} onPart={onPart} /> : null}
      {view === "front" ? <FrontView model={m} part={part} onPart={onPart} /> : null}
      {view === "floor" ? <FloorView model={m} part={part} onPart={onPart} /> : null}
      <text x="28" y="500" fill={muted} fontFamily={sans} fontSize="13">
        Schematic. The stand is drawn broken so the cage can stay large. Cut the list, not the picture.
      </text>
    </svg>
  );
}

function SectionView({ model: m, part, onPart }: Omit<Props, "view">) {
  const s = 5.4;
  const x = 214;
  const depth = m.compartmentD * s;
  const ht = 118;
  const floorY = 328;
  const topY = floorY - ht;
  const panY = floorY - 32;
  const panH = 24;
  const selected = (id: PartId) => part === id;
  const roof = roofPoly(x - 26, x + depth + 26, topY - 16, 50);
  const legTop = floorY + 8;

  return (
    <g fontFamily={sans}>
      <g {...hit("roof", part, onPart)}>
        <path d={roof} fill={selected("roof") ? moss : mossSoft} stroke={moss} />
      </g>
      <g {...hit("top", part, onPart)}>
        <rect x={x} y={topY - 9} width={depth} height={9} fill="url(#wire12)" stroke={selected("top") ? moss : ink} />
      </g>
      <g {...hit("sides", part, onPart)}>
        <rect x={x + 9} y={topY} width={depth - 18} height={ht} fill={selected("sides") ? mossSoft : sheet} stroke="none" />
        <rect x={x} y={topY} width={9} height={ht} fill={moss} />
        <rect x={x + depth - 9} y={topY} width={9} height={ht} fill={moss} />
      </g>
      <g {...hit("floor", part, onPart)}>
        <rect x={x} y={floorY} width={depth} height={12} fill={selected("floor") ? moss : mossSoft} stroke={ink} />
      </g>
      <g {...hit("tray", part, onPart)}>
        <rect x={x + 20} y={panY} width={depth * 0.52} height={panH} rx={3} fill={selected("tray") ? claySoft : sheet} stroke={clay} />
        <rect x={x + 27} y={panY + 5} width={depth * 0.52 - 14} height={panH - 10} fill="url(#pellets)" />
      </g>
      <line x1={x + 14} x2={x + 14} y1={legTop} y2={legTop + 22} stroke={moss} strokeWidth="4" />
      <line x1={x + 14} x2={x + 14} y1={legTop + 40} y2={448} stroke={moss} strokeWidth="4" />
      <line x1={x + depth - 14} x2={x + depth - 14} y1={legTop} y2={legTop + 22} stroke={moss} strokeWidth="4" />
      <line x1={x + depth - 14} x2={x + depth - 14} y1={legTop + 40} y2={448} stroke={moss} strokeWidth="4" />
      <g pointerEvents="none">
        <Callout x={28} y={topY - 62} text="Weather roof" active={selected("roof")} />
        <Callout x={28} y={topY + 4} text="1/2 × 1 wire top" active={selected("top")} />
        <Callout x={28} y={topY + 56} text={`${m.height} in high`} active={false} />
        <Callout x={28} y={floorY + 10} text="Solid floor" active={selected("floor")} />
        <Callout x={28} y={panY + 16} text="Litter pan inside" active={selected("tray")} tone="clay" />
        <text x={x} y={468} fill={muted} fontSize="14">
          {m.compartmentD} in deep · {m.stand} in stand, drawn broken
        </text>
      </g>
    </g>
  );
}

function FrontView({ model: m, part, onPart }: Omit<Props, "view">) {
  const nestL = m.nest?.l ?? 0;
  const total = m.livingL + nestL;
  const s = Math.min(4.6, 520 / total);
  const x = 36;
  const floorY = 312;
  const ht = 128;
  const topY = floorY - ht;
  const livingW = m.livingL * s;
  const bay = m.compartmentL * s;
  const nestW = nestL * s;
  const selected = (id: PartId) => part === id;
  const rise = 46;

  return (
    <g fontFamily={sans}>
      <g {...hit("roof", part, onPart)}>
        <path d={gable(x - 14, x + livingW + nestW + 14, topY - 12, rise)} fill={selected("roof") ? moss : mossSoft} stroke={moss} />
      </g>
      <g {...hit("top", part, onPart)}>
        <rect x={x} y={topY - 8} width={livingW} height={8} fill="url(#wire12)" stroke={selected("top") ? moss : ink} />
      </g>
      {Array.from({ length: m.compartments }, (_, i) => {
        const bx = x + i * bay;
        const doorW = bay * 0.58;
        const doorX = bx + (bay - doorW) / 2;
        const doorH = ht * 0.56;
        return (
          <g key={i} {...hit("sides", part, onPart)}>
            <rect x={bx} y={topY} width={bay} height={ht} fill="url(#wire12)" stroke={selected("sides") ? moss : ink} />
            <rect x={doorX} y={topY + 16} width={doorW} height={doorH} fill={sheet} stroke={ink} />
            <rect x={doorX + 3} y={topY + 19} width={doorW - 6} height={doorH - 6} fill="url(#wire12)" stroke="none" />
            <circle cx={doorX + doorW - 12} cy={topY + 16 + doorH / 2} r="3.5" fill={clay} />
          </g>
        );
      })}
      {m.nest ? (
        <g {...hit("nest", part, onPart)}>
          <rect
            x={x + livingW}
            y={floorY - m.nest.h * s}
            width={nestW}
            height={m.nest.h * s}
            fill={mossSoft}
            stroke={moss}
            strokeWidth={selected("nest") ? 3 : 1.5}
          />
        </g>
      ) : null}
      <g {...hit("floor", part, onPart)}>
        <rect x={x} y={floorY} width={livingW} height={8} fill={selected("floor") ? moss : mossSoft} stroke={ink} />
      </g>
      <g {...hit("tray", part, onPart)}>
        {Array.from({ length: m.trayCount }, (_, i) => (
          <rect
            key={i}
            x={x + i * bay + 8}
            y={floorY - 29}
            width={Math.max(12, bay - 16)}
            height={20}
            fill={claySoft}
            stroke={clay}
            strokeWidth={selected("tray") ? 3 : 1.5}
          />
        ))}
      </g>
      <line x1={x + 8} x2={x + 8} y1={floorY + 60} y2={floorY + 78} stroke={moss} strokeWidth="4" />
      <line x1={x + 8} x2={x + 8} y1={floorY + 92} y2={448} stroke={moss} strokeWidth="4" />
      <line x1={x + livingW - 8} x2={x + livingW - 8} y1={floorY + 60} y2={floorY + 78} stroke={moss} strokeWidth="4" />
      <line x1={x + livingW - 8} x2={x + livingW - 8} y1={floorY + 92} y2={448} stroke={moss} strokeWidth="4" />
      <g pointerEvents="none">
        <text x={36} y={96} fill={selected("roof") ? moss : muted} fontSize="14">
          Weather roof over the wire ceiling
        </text>
        {m.nest ? (
          <text x={x + livingW} y={floorY - m.nest.h * s - 8} fill={moss} fontSize="13">
            Solid nest
          </text>
        ) : null}
        <text x={36} y={470} fill={muted} fontSize="14">
          {m.livingL} in of solid floor · {m.trayCount} litter pan{m.trayCount > 1 ? "s" : ""} inside · {m.height} in high
        </text>
      </g>
    </g>
  );
}

function FloorView({ model: m, part, onPart }: Omit<Props, "view">) {
  const nestL = m.nest?.l ?? 0;
  const s = Math.min(5.6, 560 / (m.livingL + nestL + 8));
  const x = 36;
  const y = 118;
  const bay = m.compartmentL * s;
  const depth = m.compartmentD * s;
  const livingW = m.livingL * s;
  const selected = (id: PartId) => part === id;

  return (
    <g fontFamily={sans}>
      {Array.from({ length: m.compartments }, (_, i) => {
        const bx = x + i * bay;
        const gapW = i < m.compartments - 1 ? 8 : 0;
        return (
          <g key={i}>
            <g {...hit("floor", part, onPart)}>
              <rect
                x={bx}
                y={y}
                width={bay - gapW}
                height={depth}
                fill={selected("floor") ? moss : mossSoft}
                stroke={selected("floor") ? moss : ink}
              />
            </g>
            {gapW ? <rect x={bx + bay - gapW} y={y} width={gapW} height={depth} fill={moss} /> : null}
            <g {...hit("tray", part, onPart)}>
              <rect
                x={bx + bay * 0.12}
                y={y + depth * 0.52}
                width={bay * 0.42}
                height={depth * 0.32}
                rx={4}
                fill={selected("tray") ? claySoft : sheet}
                stroke={clay}
              />
            </g>
            <g {...hit("sides", part, onPart)}>
              <path
                d={`M ${bx + bay * 0.18} ${y + depth} q ${bay * 0.28} ${-Math.min(48, depth * 0.4)} ${bay * 0.56} 0`}
                fill="none"
                stroke={selected("sides") ? moss : muted}
                strokeDasharray="4 3"
              />
            </g>
          </g>
        );
      })}
      {m.nest ? (
        <g {...hit("nest", part, onPart)}>
          <rect
            x={x + livingW + 10}
            y={y + Math.max(0, depth - m.nest.d * s)}
            width={m.nest.l * s}
            height={Math.min(depth, m.nest.d * s)}
            fill={mossSoft}
            stroke={moss}
            strokeWidth={selected("nest") ? 3 : 1.5}
          />
        </g>
      ) : null}
      <g pointerEvents="none">
        <text x={x} y={y - 16} fill={muted} fontSize="14">
          Back · {m.livingL} in long · {m.compartmentD} in deep
        </text>
        <text x={x + 18} y={y + 28} fill={ink} fontSize="13">Solid floor</text>
        {m.nest ? (
          <text x={x + livingW + 10} y={y + depth + 28} fill={moss} fontSize="13">
            Nest, solid floor
          </text>
        ) : null}
        <text x={x} y={y + depth + 22} fill={muted} fontSize="13">
          Front · door swing
        </text>
        <text x={x} y={y + depth + 70} fill={clay} fontSize="14">
          Litter pan inside the room
        </text>
      </g>
    </g>
  );
}

function Callout({ x, y, text, active, tone = "ink" }: { x: number; y: number; text: string; active: boolean; tone?: "ink" | "clay" }) {
  const color = tone === "clay" ? clay : active ? moss : muted;
  return (
    <text x={x} y={y} fill={color} fontSize="14" fontFamily={sans}>
      {text}
    </text>
  );
}

function roofPoly(left: number, right: number, eaves: number, rise: number) {
  const mid = (left + right) / 2;
  const peak = eaves - rise;
  return `M ${left} ${eaves} L ${mid} ${peak} L ${right} ${eaves} L ${right - 12} ${eaves + 8} L ${mid} ${peak + 10} L ${left + 12} ${eaves + 8} Z`;
}

function gable(left: number, right: number, eaves: number, rise: number) {
  return roofPoly(left, right, eaves, rise);
}
