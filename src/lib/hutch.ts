export type BreedId = "dwarf" | "medium" | "large";
export type PlanId = "single" | "kindling" | "double" | "growout";
export type PartId = "floor" | "sides" | "top" | "tray" | "rest" | "roof" | "nest";
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
    blurb: "A buck, or a dry doe, with a full room and a tray underneath.",
  },
  {
    id: "kindling",
    label: "Kindling doe",
    blurb: "The same living cage, plus a solid-floor nest box on the end.",
  },
  {
    id: "double",
    label: "Side by side",
    blurb: "Two adults who must not share a room. One roof, a solid wall, two trays.",
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
  restL: number;
  restD: number;
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
    restL: Math.round(L * 0.62),
    restD: Math.round(b.D * 0.5),
    sqft: (L * b.D) / 144,
    rise,
  };
}

export function summary(m: HutchModel) {
  const room = `${m.compartmentL} × ${m.compartmentD} × ${m.height} in`;
  if (m.plan === "double") {
    return `Two rooms, each ${room}, split by a solid wall so they cannot breed or bite through the wire. One tray under each floor.`;
  }
  if (m.plan === "growout") {
    const pens = m.compartments === 1 ? "1 pen" : `${m.compartments} pens`;
    return `${m.herd} growers in ${pens}, each ${room}. One tray per pen. This is fryer space, not a permanent colony of adults.`;
  }
  if (m.nest) {
    return `Doe's room ${room}, plus a ${m.nest.l} × ${m.nest.d} × ${m.nest.h} in nest box with a solid floor. The tray runs under the wire room only.`;
  }
  return `One adult in a ${room} room, on a ${m.stand} in stand. The tray is ${m.trayL} × ${m.trayD} × ${m.trayH} in and sits ${m.gap} in under the mesh.`;
}

export type ShopLine = { item: string; qty: string; detail: string };

function rollWidth(depth: number) {
  if (depth <= 24) return 24;
  if (depth <= 36) return 36;
  return 48;
}

export function materials(m: HutchModel): ShopLine[] {
  const width = rollWidth(m.compartmentD);
  const clothFt = Math.ceil((m.livingL + 6) / 12);
  const wallSq =
    (2 * m.livingL * m.height + 2 * m.compartmentD * m.height) / 144;
  const ceilingSq = (m.livingL * m.compartmentD) / 144;
  const wireSq = Math.ceil((wallSq + ceilingSq) * 1.15);
  const wireFt = Math.ceil(wireSq / 3);
  const legs = 4 + (m.compartments - 1) * 2;
  const legIn = legs * (m.stand + m.height + 8);
  const rails =
    (m.compartments * 2 * m.compartmentL + (m.compartments + 1) * 2 * m.compartmentD) * 2;
  const joists =
    Math.max(2, Math.round(m.compartmentL / 12)) * m.compartments * m.compartmentD;
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
      item: "1/4 in hardware cloth",
      qty: `${clothFt} ft of ${width} in`,
      detail:
        "19 gauge, galvanized. Floor only. Fold cut edges under or trap them under a batten. Smooth side up.",
    },
    {
      item: "1/2 in chicken wire",
      qty: `${wireSq} sq ft`,
      detail: `Walls and the wire ceiling. About ${wireFt} ft of a 36 in roll, waste included. Stretch it drum tight.`,
    },
    {
      item: "Dropping tray",
      qty: `${m.trayCount} pan${m.trayCount > 1 ? "s" : ""}`,
      detail: `Each ${m.trayL} × ${m.trayD} × ${m.trayH} in. Galvanized sheet, or exterior plywood with a plastic liner. Cleats ${m.gap} in below the mesh.`,
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
      item: "Resting boards",
      qty: `${m.compartments * 2}`,
      detail: `Each ${m.restL} × ${m.restD} in, cut from 1× stock. Two per room so one can dry.`,
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
      name: "2×2 floor end rails. Drop the back one 1/4 in",
    },
    { qty: joists, size: `${m.compartmentD} in`, name: "2×2 floor joists, 12 in on center" },
    { qty: m.compartments * 2, size: `${m.compartmentL} in`, name: "2×2 top front and back plates" },
    { qty: (m.compartments + 1) * 2, size: `${m.compartmentD} in`, name: "2×2 top end rails" },
    { qty: m.compartments * 2, size: `${m.height} in`, name: "2×2 door stiles" },
    { qty: m.compartments * 3, size: `${doorW} in`, name: "2×2 door rails" },
    { qty: pairs * 2, size: `${rafter} in`, name: "2×2 rafters, gable across the depth" },
    { qty: m.trayCount * 2, size: `${m.compartmentL} in`, name: "1×2 tray cleats" },
    {
      qty: m.compartments * 2,
      size: `${m.restL} × ${m.restD} in`,
      name: "Resting boards, 1× stock",
    },
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
  "Build the end frames first: two legs and the depth rails. The floor sits 28 inches off the ground so the tray is a pull, not a crawl.",
  "Join the ends with the length rails. Set the back floor rail 1/4 inch lower than the front so urine walks into the tray instead of sitting in the middle.",
  "Joists every 12 inches. Quarter-inch mesh sags without them, and a sag becomes a puddle.",
  "Staple 1/4 in hardware cloth on top of the joists, smooth side up. Fold every cut edge under or cover it with a 1×2 batten.",
  "Screw cleats 3 inches below the mesh, open at the front. Slide the empty tray in and out before a rabbit ever sees it.",
  "Frame the walls and staple 1/2 in chicken wire on the outside, then the wire ceiling the same way. Drum tight. Batten every edge.",
  "Hang the door on two hinges. The latch needs a thumb. Leave no gap a kit can put a head through.",
  "Roof over the wire, with a vent gap at the eaves and overhang so rain does not blow through the chicken wire.",
  "Make the resting board, and a second one to swap in. Cover about a third of the floor. A full wood floor puts you back to scraping.",
];

export const KINDLE_STEP =
  "Build the nest box with a solid floor and a 4 inch sill. Put it on at day 28 after breeding, not the day you breed. Kits and quarter-inch mesh do not mix.";

export const PARTS: { id: PartId; label: string }[] = [
  { id: "floor", label: "1/4 in floor" },
  { id: "sides", label: "1/2 in sides" },
  { id: "top", label: "1/2 in top" },
  { id: "tray", label: "Dropping tray" },
  { id: "rest", label: "Resting board" },
  { id: "roof", label: "Weather roof" },
  { id: "nest", label: "Nest box" },
];

export const PART_COPY: Record<PartId, { title: string; body: string[] }> = {
  floor: {
    title: "Quarter-inch mesh, and nothing wider",
    body: [
      "The floor is 1/4 inch hardware cloth, 19 gauge, galvanized. That is the shop name for the mesh. Half-inch chicken wire is the wrong roll down here: a kit can put a foot through it, and pellets hang up in the hex.",
      "Staple it on top of joists every 12 inches. Pitch the back 1/4 inch lower than the front so urine follows the pellets instead of pooling in a belly in the cloth.",
      "Smooth side up. Every cut end folded under or trapped under a batten. A point that can catch a heel will catch a heel. When the galvanizing flakes and rusts, replace the panel. Do not paint a floor they will chew.",
    ],
  },
  sides: {
    title: "Half-inch chicken wire on the walls",
    body: [
      "The sides are 1/2 inch chicken wire, stretched on the outside of the 2×2 frame and battened so a nose cannot peel a staple. It gives air and a view. A solid box does not.",
      "Chicken wire keeps a rabbit in. It does not keep a raccoon out. A determined raccoon unzips it. If you have raccoons, dogs, or foxes, build this same frame with 1/2 inch welded wire and a latch that needs a thumb. The floor, the tray, and the roof stay as drawn.",
      "Adults of breeding age do not share a wire wall. They will breed through it, or fight through it. The side-by-side plan uses a solid plywood divider for that reason.",
    ],
  },
  top: {
    title: "Half-inch chicken wire for the ceiling",
    body: [
      "The ceiling of the cage is 1/2 inch chicken wire, the same roll as the walls. It stops a hop into the roof framing and, if something pulls the weather roof off, it is the last thing between a rabbit and a hawk.",
      "Wire is not a roof. Rain beads on it and noon sun turns it into a broiler. The solid roof sits above this wire with a vent gap so heat can leave.",
      "Hang the water where they can drink without pressing their head into the ceiling all day. A bottle that drips onto the mesh is a wet floor, which is how sore hocks start.",
    ],
  },
  tray: {
    title: "In the hutch, outside the cage",
    body: [
      "The tray is a pan the size of one room: this plan's length and depth, about 2 1/2 inches deep. Galvanized sheet, or exterior plywood lined with a plastic tray. It rides on cleats 3 inches below the mesh and slides out the front.",
      "Those 3 inches are the design. If the pile touches the cloth, the rabbit is standing over a wet sponge and you are scraping again, only from underneath.",
      "A handful of plain wood-stove pellets in the tray — not in the cage — drinks the urine. No clay cat litter. No cedar dust rising into the wire. Dump it every day in warm weather. Ammonia from a skipped tray burns lungs.",
      "Do not feed the tray back. The round dry pellets in it are waste. The soft clusters a rabbit must eat, cecotropes, are taken straight from the body. If those clusters are sitting in the tray, the rabbit missed them. That is a health note, not a serving.",
    ],
  },
  rest: {
    title: "A board on part of the floor",
    body: [
      "Any wire floor, including 1/4 inch, can wear the fur off a heel. That is sore hocks, and it ends rabbits who otherwise look fine.",
      "The resting board covers about a third of each room. They will sit on it. Most of the hard pellets still hit mesh, as long as you do not get kind and floor the whole cage in wood.",
      "Make two boards. Swap when the one in service is wet. Wet wood against wire is not a rest.",
    ],
  },
  roof: {
    title: "A real roof over the wire",
    body: [
      "The sheet draws a gable along the length, metal or shingles, with overhang so rain does not blow straight through the chicken wire. A shed roof is just as honest if you would rather not cut a ridge. Keep the wire ceiling either way.",
      "Shade is not optional. Rabbits die of heat long before they die of cold. Above about 85°F, frozen bottles and moving air matter more than another scoop of feed. A wire top in full sun is not a roof.",
      "Cold they can take if they are dry, out of the wind, and buried in hay. Wet plus wind is the killer, not the thermometer.",
    ],
  },
  nest: {
    title: "The only solid floor in the plan",
    body: [
      "Newborn kits slip through 1/4 inch mesh. The nest box is plywood, solid on the bottom, with a doorway and a 4 inch sill so they do not wander out before their eyes open around day 10.",
      "Hang it on day 28 after breeding, full of straw and hay. The doe adds fur. You mostly stay out. Gestation is about 31 days. She may kindle at night and only nurse once or twice a day. An empty-looking box in the afternoon can be normal.",
      "A chilled, scattered litter in the morning is not normal. Warm live kits in your hands and rebuild the nest. The dropping tray does not run under this box. Urine in a nest is a bedding change.",
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
    value === "rest" ||
    value === "roof" ||
    value === "nest"
  );
}

export const FALL_STEPS = [
  {
    title: "They fall through",
    body: "Hard pellets hit the 1/4 inch mesh and leave the room. The rabbit is not standing in yesterday.",
  },
  {
    title: "The tray is outside",
    body: "The pan is part of the hutch and outside the cage. Three inches of air under the mesh, so the pile never climbs back up.",
  },
  {
    title: "You dump, you don't serve",
    body: "Once a day the tray slides out. You do not feed it back. Cecotropes were eaten at the source, usually before you were up.",
  },
];

export const CHAPTERS: { title: string; paragraphs: string[]; bullets?: string[] }[] = [
  {
    title: "Hay first, then a measured pellet",
    paragraphs: [
      "Grass hay is the diet: timothy, orchard, meadow. It should be in front of them all day. Teeth and guts both depend on it. Alfalfa is for growers and nursing does, not for a fat adult buck who already skips his cecotropes.",
      "A workable adult measure is about 1/4 cup of plain pellets per 5 pounds of rabbit, once a day. If the body is rounding and soft clusters are being left behind, cut the pellets. Do not cut the hay.",
      "Nursing does and fryer-age growers need more: alfalfa hay and a grower pellet available through most of the day. A doe with a litter can drink a quart and more. Check the bottle at noon.",
    ],
  },
  {
    title: "Water, weather, and the hours you actually show up",
    paragraphs: [
      "Fresh water every day. In a freeze, swap bottles or break the ice in a crock morning and night. In heat, a second check is not fussiness.",
      "Above about 85°F, get the hutch into shade, freeze a bottle, and give them a cool rest — the board, or a tile you can spare. Below freezing they are fine if the coat is dry and the wind cannot cut through a solid back. Stuff extra hay in. Do not close the hutch into an airtight box.",
    ],
  },
  {
    title: "Breeding without a surprise litter",
    paragraphs: [
      "Wait until a doe has her adult frame: about 6 months for small and medium breeds, closer to 8 for the large ones. A 12-week pregnancy is how people lose a doe.",
      "Take the doe to the buck's hutch, not the other way. Stay for the breeding. Write the date down. Gestation runs about 31 days. Hang the nest box on day 28.",
      "Sex them before you trust a grow-out pen. Littermates get along until they don't, which is often the week hormones arrive. Split by sex before then. Two adults of breeding age will mate through a wire divider — use the solid wall in the side-by-side plan.",
    ],
  },
  {
    title: "When it is not a cleaning problem",
    paragraphs: [
      "No hard pellets for half a day, a hunched sit, teeth grinding, hay refused: that can be gut stasis. It is an emergency, not a tray you forgot.",
      "Soft clusters smeared on the mesh or matted on the hindquarters mean the rabbit produced cecotropes and did not eat them. Too many pellets, a body too round to turn, a sore hock, or teeth that hurt. A bright rabbit still eating hay can be steered with diet. A quiet one needs a vet.",
    ],
    bullets: [
      "Moldy hay, heated grass clippings, anything sprayed",
      "Avocado, chocolate, rhubarb, potato plants, onion in any serious amount",
      "A diet of pellets and no hay",
      "Cedar bedding in the cage, or clay litter in the tray",
    ],
  },
];
