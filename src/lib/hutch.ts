export type BreedId = "dwarf" | "medium" | "large";
export type PlanId = "single" | "kindling" | "double" | "growout";
export type PartId = "floor" | "sides" | "top" | "tray" | "roof" | "nest";
export type ViewId = "section" | "front" | "floor";

export const BREEDS: { id: BreedId; label: string; examples: string }[] = [
  {
    id: "dwarf",
    label: "Dwarf & mini",
    examples: "Netherland Dwarf, Holland Lop, Mini Rex",
  },
  {
    id: "medium",
    label: "Medium",
    examples: "Dutch, Rex, Mini Lop",
  },
  {
    id: "large",
    label: "Large",
    examples: "New Zealand, Californian, Champagne",
  },
];

export const PLANS: { id: PlanId; label: string; blurb: string }[] = [
  {
    id: "single",
    label: "One adult",
    blurb: "A buck, or a dry doe, with a solid floor and an easy-clean litter pan.",
  },
  {
    id: "kindling",
    label: "Kindling doe",
    blurb: "The same living cage, plus a solid-floor nest box on the end.",
  },
  {
    id: "double",
    label: "Side by side",
    blurb: "Two adults who must not share a room. One roof, a solid wall, and one litter pan per room.",
  },
  {
    id: "growout",
    label: "Grow-out",
    blurb: "Weaned kits through fryer size. The floor grows with the head count.",
  },
];

export const VIEWS: { id: ViewId; label: string }[] = [
  { id: "section", label: "Section" },
  { id: "front", label: "Front" },
  { id: "floor", label: "Floor" },
];

const BASE: Record<BreedId, { L: number; D: number; H: number }> = {
  dwarf: { L: 30, D: 24, H: 16 },
  medium: { L: 36, D: 30, H: 18 },
  large: { L: 48, D: 36, H: 20 },
};

const FRYER_SQ: Record<BreedId, number> = {
  dwarf: 2.25,
  medium: 3,
  large: 4,
};

const MAX_RUN = 96;

export type Nest = { l: number; d: number; h: number };

export type HutchModel = {
  plan: PlanId;
  breed: BreedId;
  herd: number;
  compartments: number;
  compartmentL: number;
  compartmentD: number;
  height: number;
  livingL: number;
  overallL: number;
  nest: Nest | null;
  trayL: number;
  trayD: number;
  trayH: number;
  trayCount: number;
  gap: number;
  stand: number;
  sqft: number;
  rise: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function nestFor(breed: BreedId): Nest {
  if (breed === "large") return { l: 18, d: 12, h: 12 };
  if (breed === "dwarf") return { l: 12, d: 10, h: 8 };
  return { l: 16, d: 10, h: 10 };
}

export function design(plan: PlanId, breed: BreedId, countIn: number): HutchModel {
  const b = BASE[breed];
  let herd = 1;
  let compartments = 1;
  let L = b.L;
  let H = b.H;
  let nest: Nest | null = null;

  if (plan === "double") {
    herd = 2;
    compartments = 2;
  } else if (plan === "growout") {
    herd = clamp(Math.round(countIn) || 2, 2, 12);
    const totalL = Math.max(b.L, Math.ceil((herd * FRYER_SQ[breed] * 144) / b.D));
    compartments = Math.max(1, Math.ceil(totalL / MAX_RUN));
    L = Math.ceil(totalL / compartments);
    H = Math.max(b.H, 18);
  } else if (plan === "kindling") {
    nest = nestFor(breed);
  }

  const livingL = compartments * L;
  const overallL = livingL + (nest?.l ?? 0);
  const rise = Math.round(b.D / 4);

  return {
    plan,
    breed,
    herd,
    compartments,
    compartmentL: L,
    compartmentD: b.D,
    height: H,
    livingL,
    overallL,
    nest,
    trayL: L,
    trayD: b.D,
    trayH: 2.5,
    trayCount: compartments,
    gap: 3,
    stand: 28,
    sqft: (L * b.D) / 144,
    rise,
  };
}

export function summary(m: HutchModel) {
  const room = `${m.compartmentL} × ${m.compartmentD} × ${m.height} in`;
  if (m.plan === "double") {
    return `Two rooms, each ${room}, split by a solid wall so they cannot breed or bite through the wire. Each room has a solid floor and an easy-clean litter pan.`;
  }
  if (m.plan === "growout") {
    const pens = m.compartments === 1 ? "1 pen" : `${m.compartments} pens`;
    return `${m.herd} growers in ${pens}, each ${room}. Each pen has a solid floor and litter pan. This is fryer space, not a permanent colony of adults.`;
  }
  if (m.nest) {
    return `Doe's room ${room}, with a solid floor and litter pan, plus a ${m.nest.l} × ${m.nest.d} × ${m.nest.h} in nest box with a solid floor.`;
  }
  return `One adult in a ${room} room with a solid, non-slip floor and an easy-clean litter pan. The ${m.stand} in stand raises the hutch for access and inspection.`;
}

export type ShopLine = { item: string; qty: string; detail: string };

export function materials(m: HutchModel): ShopLine[] {
  const floorSq = Math.ceil((m.livingL * m.compartmentD) / 144 * 1.1);
  const wallSq =
    (2 * m.livingL * m.height + 2 * m.compartmentD * m.height) / 144;
  const ceilingSq = (m.livingL * m.compartmentD) / 144;
  const wireSq = Math.ceil((wallSq + ceilingSq) * 1.15);
  const wireFt = Math.ceil(wireSq / 3);
  const legs = 4 + (m.compartments - 1) * 2;
  const legIn = legs * (m.stand + m.height + 8);
  const rails =
    (m.compartments * 2 * m.compartmentL + (m.compartments + 1) * 2 * m.compartmentD) * 2;
  const joists = Math.max(2, Math.round(m.compartmentL / 12)) * m.compartments * m.compartmentD;
  const doors =
    m.compartments * (2 * m.height + 3 * Math.round(m.compartmentL * 0.62));
  const pairs = Math.ceil(m.overallL / 24) + 1;
  const rafter = Math.hypot(m.compartmentD / 2, m.rise) + 6;
  const framingFt = Math.ceil(((legIn + rails + joists + doors + pairs * 2 * rafter) / 12) * 1.12);
  const battenFt = Math.ceil(
    (m.compartments * 2 * (m.compartmentL + m.compartmentD) * 2) / 12,
  );

  return [
    {
      item: "Solid floor panels",
      qty: `${floorSq} sq ft of exterior-rated plywood`,
      detail: "Cover the full living floor. Seal only with a fully cured, rabbit-safe finish; add a secure non-slip surface and replace anything chewed or damaged.",
    },
    {
      item: "1/2 × 1 in welded wire",
      qty: `${wireSq} sq ft`,
      detail: `Walls and the wire ceiling. Stronger than chicken wire. About ${wireFt} ft of a 36 in roll, waste included. Stretch it drum tight.`,
    },
    {
      item: "Litter pans",
      qty: `${m.trayCount} pan${m.trayCount > 1 ? "s" : ""}`,
      detail: `One low-sided, easy-clean pan per room. Use rabbit-safe litter; avoid clumping clay and cedar products. Size each pan to the rabbit and room.`,
    },
    {
      item: "2×2 framing",
      qty: `${framingFt} linear ft`,
      detail: "Legs, floor, top plates, doors, and rafters, plus about 12% for bad cuts. Exterior screws, 2 1/2 in.",
    },
    {
      item: "1×2 battens",
      qty: `${battenFt} linear ft`,
      detail: "Cover every wire edge a rabbit can nose. Staples alone will lose.",
    },
    {
      item: "Roof",
      qty: `${Math.ceil((m.overallL + 12) / 12)} × ${Math.ceil((m.compartmentD + 10) / 12)} ft`,
      detail: `Covers ${m.overallL + 12} × ${m.compartmentD + 10} in with overhang. Metal or shingles. Gable rise about ${m.rise} in.`,
    },
    {
      item: "Door hardware",
      qty: `${m.compartments} door${m.compartments > 1 ? "s" : ""}`,
      detail: "Two hinges and a thumb latch each. A rabbit will open a hook it can nose.",
    },
    {
      item: "Staples",
      qty: "1 lb",
      detail: "1/2 in galvanized poultry staples, about every 2 inches, then battens over the edges.",
    },
  ];
}

export type Cut = { qty: number; size: string; name: string };

export function cuts(m: HutchModel): Cut[] {
  const legs = 4 + (m.compartments - 1) * 2;
  const joists = Math.max(2, Math.round(m.compartmentL / 12)) * m.compartments;
  const doorW = Math.round(m.compartmentL * 0.62);
  const pairs = Math.ceil(m.overallL / 24) + 1;
  const rafter = Math.ceil(Math.hypot(m.compartmentD / 2, m.rise) + 6);
  const list: Cut[] = [
    { qty: legs, size: `${m.stand + m.height + 8} in`, name: "2×2 legs, from the ground into the roof" },
    { qty: m.compartments * 2, size: `${m.compartmentL} in`, name: "2×2 front and back floor rails" },
    {
      qty: (m.compartments + 1) * 2,
      size: `${m.compartmentD} in`,
      name: "2×2 floor end rails, kept level",
    },
    { qty: joists, size: `${m.compartmentD} in`, name: "2×2 floor joists, 12 in on center" },
    { qty: m.compartments * 2, size: `${m.compartmentL} in`, name: "2×2 top front and back plates" },
    { qty: (m.compartments + 1) * 2, size: `${m.compartmentD} in`, name: "2×2 top end rails" },
    { qty: m.compartments * 2, size: `${m.height} in`, name: "2×2 door stiles" },
    { qty: m.compartments * 3, size: `${doorW} in`, name: "2×2 door rails" },
    { qty: pairs * 2, size: `${rafter} in`, name: "2×2 rafters, gable across the depth" },
    { qty: m.compartments, size: `${m.compartmentL} × ${m.compartmentD} in`, name: "Solid floor panels, exterior-rated plywood" },
  ];
  if (m.compartments > 1) {
    list.push({
      qty: m.compartments - 1,
      size: `${m.compartmentD} × ${m.height} in`,
      name: "3/4 in plywood divider, solid",
    });
  }
  if (m.nest) {
    list.push({
      qty: 1,
      size: `${m.nest.l} × ${m.nest.d} × ${m.nest.h} in inside`,
      name: "1/2 in plywood nest box, solid floor, 4 in sill",
    });
  }
  return list;
}

export const BUILD_STEPS = [
  "Build the end frames first: two legs and the depth rails. Raise the solid floor only as high as you can safely reach to clean and inspect it.",
  "Join the ends with the length rails and fit joists at suitable spacing for the chosen panel thickness and load.",
  "Fasten a solid, smooth, non-slip floor panel. Keep it level; do not slope the rabbit's living surface.",
  "Place a low-sided litter pan inside each room where the rabbit can enter and turn comfortably. Secure it so it cannot tip.",
  "Use absorbent, rabbit-safe litter in the pan and clean it regularly. Keep the floor dry, clean, and free of sharp edges or chewable coatings.",
  "Frame the walls and staple 1/2 × 1 in welded wire on the outside, then the wire ceiling the same way. Drum tight. Batten every edge.",
  "Hang the door on two hinges. The latch needs a thumb. Leave no gap a kit can put a head through.",
  "Roof over the wire, with a vent gap at the eaves and overhang so rain does not blow through the welded wire.",
  "Provide a separate resting hide or board if useful, with enough clear space for the rabbit to stretch out and move normally.",
];

export const KINDLE_STEP =
  "Build the nest box with a solid floor and a 4 inch sill. Put it on at day 28 after breeding, not the day you breed. Keep newborn kits in a secure nest with a solid floor.";

export const PARTS: { id: PartId; label: string }[] = [
  { id: "floor", label: "Solid floor" },
  { id: "sides", label: "1/2 × 1 sides" },
  { id: "top", label: "1/2 × 1 top" },
  { id: "tray", label: "Litter pan" },
  { id: "roof", label: "Weather roof" },
  { id: "nest", label: "Nest box" },
];

export const PART_COPY: Record<PartId, { title: string; body: string[] }> = {
  floor: {
    title: "A solid, non-slip floor",
    body: [
      "Use a solid, dry, non-slip floor across the living area. Wire floors can injure rabbits' feet and contribute to sore hocks.",
      "Put a low-sided litter pan inside the enclosure and clean it regularly. Keep the floor level, dry, and free of sharp edges. Choose materials that are safe if chewed, and replace damaged panels.",
    ],
  },
  sides: {
    title: "1/2 by 1 inch welded wire on the walls",
    body: [
      "Use sturdy, securely fastened welded wire on exposed sides, backed by a sound frame, predator-resistant base, and secure latch. Wire size alone cannot guarantee protection from dogs, raccoons, or foxes. Cover and protect every cut edge.",
      "Adults of breeding age do not share a wire wall. They will breed through it, or fight through it. The side-by-side plan uses a solid plywood divider for that reason.",
    ],
  },
  top: {
    title: "1/2 by 1 inch welded wire for the ceiling",
    body: [
      "A securely fastened wire ceiling separates the rabbit from roof framing and adds a barrier overhead. It is only one part of a secure enclosure; check the whole structure, fasteners, roof, and latch for gaps or damage.",
      "Wire is not a roof. Rain beads on it and noon sun turns it into a broiler. The solid roof sits above this wire with a vent gap so heat can leave.",
      "Place water where it stays clean and easy to reach. Check bowls or bottles often, especially in heat and freezing weather, and keep the floor dry.",
    ],
  },
  tray: {
    title: "A litter pan inside the hutch",
    body: [
      "Use a low-sided litter pan inside the enclosure, sized so the rabbit can enter, turn, and use it comfortably. Secure it against tipping and choose rabbit-safe, absorbent litter.",
      "Avoid clumping clay litter and cedar products. Remove soiled litter frequently and keep the pan and surrounding floor dry; ammonia and damp bedding can harm respiratory and skin health.",
      "Do not feed droppings from the pan. Cecotropes are normally eaten directly by the rabbit. Repeatedly finding uneaten soft clusters can have several causes, including diet, weight, or illness; ask a rabbit-savvy vet if it persists.",
    ],
  },
  roof: {
    title: "A real roof over the wire",
    body: [
      "The sheet draws a gable along the length, metal or shingles, with overhang so rain does not blow straight through the welded wire. A shed roof is just as honest if you would rather not cut a ridge. Keep the wire ceiling either way.",
      "Shade is not optional. Long exposure above about 80°F can make rabbits sick. Move them to a cooler, well-ventilated place during heat; frozen bottles may help, but do not replace shade, fresh water, or veterinary care if they show distress.",
      "Outdoor housing needs dry shelter, protection from wind and predators, unfrozen water, and frequent checks. Bring rabbits indoors during severe cold or heat; acclimation and individual health matter.",
    ],
  },
  nest: {
    title: "Nest box for the litter",
    body: [
      "The nest box is plywood with a solid bottom, a doorway, and a 4 inch sill to help keep newborn kits in the nest.",
      "Hang it on day 28 after breeding, full of straw and hay. The doe adds fur. You mostly stay out. Gestation is about 31 days. She may kindle at night and only nurse once or twice a day. An empty-looking box in the afternoon can be normal.",
      "Check the nest and kits briefly each day. Keep bedding dry and seek experienced rabbit-care or veterinary help if kits are cold, injured, or not thriving.",
    ],
  },
};

export function isPlan(value: unknown): value is PlanId {
  return value === "single" || value === "kindling" || value === "double" || value === "growout";
}

export function isBreed(value: unknown): value is BreedId {
  return value === "dwarf" || value === "medium" || value === "large";
}

export function isView(value: unknown): value is ViewId {
  return value === "section" || value === "front" || value === "floor";
}

export function isPart(value: unknown): value is PartId {
  return (
    value === "floor" ||
    value === "sides" ||
    value === "top" ||
    value === "tray" ||
    value === "roof" ||
    value === "nest"
  );
}

export const FALL_STEPS = [
  {
    title: "Give feet a safe surface",
    body: "Use a solid, dry, non-slip floor. Wire flooring can injure feet and contribute to sore hocks.",
  },
  {
    title: "Keep the litter pan inside",
    body: "Place a low-sided, secure litter pan where the rabbit can enter and turn comfortably. Clean it regularly.",
  },
  {
    title: "Keep the living area dry",
    body: "Remove soiled litter often, refresh bedding as needed, and check the rabbit's feet and rear during daily care.",
  },
];

export const CHAPTERS: { id?: string; title: string; paragraphs: string[]; bullets?: string[] }[] = [
  {
    title: "Hay first, then a measured pellet",
    paragraphs: [
      "Grass hay is the diet: timothy, orchard, meadow. It should be in front of them all day. Teeth and guts both depend on it. Alfalfa is for growers and nursing does, not for a fat adult buck who already skips his cecotropes.",
      "A common starting guide for a healthy adult is about 1/4 cup of plain pellets per 5 pounds daily, but needs vary with breed, age, body condition, health, and pellet type. Ask a rabbit-savvy vet to adjust the amount. If the body is rounding or soft clusters are repeatedly left uneaten, arrange a diet and health check; do not cut hay.",
      "Nursing does and fryer-age growers need more: alfalfa hay and a grower pellet available through most of the day. A doe with a litter can drink a quart and more. Check the bottle at noon.",
    ],
  },
  {
    title: "Water, weather, and the hours you actually show up",
    paragraphs: [
      "Fresh water every day. In a freeze, swap bottles or break the ice in a crock morning and night. In heat, a second check is not fussiness.",
      "Above about 80°F, rabbits are especially at risk. Move them to a cooler, well-ventilated place and provide shade and fresh water. Heatstroke signs include stretching out and rapid breathing; weakness or collapse is an emergency. If you suspect heatstroke, wet the ears with cool water, place the rabbit near a fan, and call a veterinarian or emergency clinic immediately. Never dunk a rabbit in ice water. During cold weather, provide dry shelter, protection from wind and predators, unfrozen water, and frequent checks; individual health and acclimation matter.",
    ],
  },
  {
    title: "Breeding without a surprise litter",
    paragraphs: [
      "Wait until a doe has her adult frame: about 6 months for small and medium breeds, closer to 8 for the large ones. A 12-week pregnancy is how people lose a doe.",
      "Take the doe to the buck's hutch, not the other way. Stay for the breeding. Write the date down. Gestation runs about 31 days. Hang the nest box on day 28.",
      "Sex them before you trust a grow-out pen. Littermates get along until they don't, which is often the week hormones arrive. Split by sex before then. Two adults of breeding age will mate through a wire divider — use the solid wall in the side-by-side plan.",
      "A doe may kill, scatter, or ignore a litter if she is young, stressed, disturbed by predators or dogs, or poorly fed. Keep the area quiet, and give her plenty of hay, water, and feed. Many first litters fail. Don't breed more rabbits than you can feed, house, or find good homes for.",
    ],
  },
  {
    title: "When it is not a cleaning problem",
    paragraphs: [
      "A rabbit that stops eating or passing droppings, sits hunched, grinds its teeth, or refuses hay needs prompt veterinary advice. Do not wait for a 12-hour mark if the rabbit is unwell.",
      "Repeated soft clusters left uneaten or stuck on the hindquarters can be linked to diet, weight, pain, or illness. Keep the area clean and ask a rabbit-savvy vet, especially if appetite, droppings, or behavior changes.",
    ],
    bullets: [
      "Moldy hay, heated grass clippings, anything sprayed",
      "Avoid avocado, chocolate, rhubarb, onion, garlic, leeks, potato or tomato leaves and stems, bread, crackers, and seeds or nuts. Do not feed unidentified houseplants. Iceberg lettuce is low in nutrition, so choose darker leafy greens. Introduce new greens gradually; fruit and carrot are occasional treats, not a meal.",
      "A diet of pellets and no hay",
      "Cedar products or clumping clay litter",
    ],
  },
  {
    id: "handling",
    title: "Handling",
    paragraphs: [
      "Always support the back end. Put one hand under the chest and one under the rump, and hold the rabbit close to your body. NEVER lift a rabbit by the ears or the scruff alone. A rabbit that kicks while unsupported can break its own back. Sit on the floor with young children so a dropped rabbit does not fall far.",
    ],
  },
  {
    id: "health",
    title: "Health",
    paragraphs: [],
    bullets: [
      "Gut warning: contact a rabbit-savvy vet promptly if a rabbit stops eating or passing droppings, or sits hunched and grinds its teeth. Do not wait for a 12-hour mark if the rabbit is unwell.",
      "RHDV2 (rabbit hemorrhagic disease) can be fatal. Ask your veterinarian about current vaccine availability and local risk. Wash hands and change shoes after visiting other rabbits; follow local outbreak guidance for forage and equipment.",
      "Teeth never stop growing. Unlimited hay wears them down. Drooling, dropping food, or weight loss means a vet check.",
      "Flystrike: flies lay eggs in a dirty rear end, and maggots can kill in a day. Check every rabbit's bottom daily in warm weather.",
      "Snuffles: sneezing with white or yellow discharge. Separate the rabbit and see a vet.",
      "Coccidiosis: diarrhea, potbelly, and weight loss in young rabbits. Keep floors and feeders clean. See a vet.",
      "Ear mites: crusty ears and head shaking. See a vet.",
      "Spay and neuter pet rabbits. It reduces fighting and spraying, and it lowers the high risk of uterine cancer in unspayed does.",
      "Find a rabbit-savvy (exotics) vet BEFORE you need one.",
    ],
  },
  {
    id: "meat",
    title: "For meat raisers",
    paragraphs: [],
    bullets: [
      "Process quickly and humanely. Learn from an experienced person or your county extension office first.",
      "Wear disposable gloves when handling carcasses and use careful hand and surface hygiene. Tularemia can infect people through skin breaks or contaminated material. Do not process a rabbit that appeared sick; ask a veterinarian or local public-health authority how to handle it.",
      "Cook rabbit meat to 160°F.",
      "Wash hands, knives, and boards with hot soapy water.",
    ],
  },
  {
    id: "bonding",
    title: "Bonding and rehoming",
    paragraphs: [
      "Rabbits are social. Fixed rabbits can be bonded in pairs. Introduce them slowly on neutral ground. Many rescue rabbits need homes, so check your local rescue or shelter before you buy.",
    ],
  },
];

export const START_STEPS = [
  "Decide: pet, rescue, or meat.",
  "Find a rabbit vet first.",
  "Give unlimited grass hay, measured pellets, and fresh water.",
  "Give daily exercise space.",
  "Keep them shaded and below 80°F.",
  "Handle them with the back end supported.",
  "If a rabbit stops eating or passing droppings, contact a rabbit-savvy vet promptly.",
];

export const GLOSSARY: { term: string; def: string }[] = [
  { term: "Doe", def: "Female rabbit." },
  { term: "Buck", def: "Male rabbit." },
  { term: "Kit", def: "Baby rabbit." },
  { term: "Kindling", def: "Giving birth." },
  { term: "Cecotropes", def: "Soft droppings rabbits eat for nutrition." },
  { term: "GI stasis", def: "When the gut slows or stops. An emergency." },
  { term: "Sore hocks", def: "Sores on the heels." },
  { term: "Flystrike", def: "Maggots in the skin." },
  { term: "RHDV2", def: "A deadly rabbit virus." },
  { term: "Fryer", def: "A young meat rabbit." },
  { term: "Hardware cloth", def: "Small square wire mesh. Not used as a living floor in these plans." },
];
