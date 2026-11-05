import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Rabbit } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-6JcGPCSQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function usePersisted(key, initial) {
	const [value, setValue] = (0, import_react.useState)(initial);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(key);
			if (raw != null) setValue(JSON.parse(raw));
		} catch {}
		setReady(true);
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(key, JSON.stringify(value));
	}, [
		key,
		ready,
		value
	]);
	return [value, setValue];
}
var TASKS = [
	{
		id: "water",
		label: "Water checked",
		days: 1,
		hint: "Twice if it is frozen or hot. A nursing doe can empty a bottle before noon."
	},
	{
		id: "hay",
		label: "Hay rack filled",
		days: 1,
		hint: "If the hay runs out they eat pellets and leave cecotropes behind."
	},
	{
		id: "tray",
		label: "Tray dumped",
		days: 1,
		hint: "This is the whole point of the mesh. Ammonia builds in a day of warm weather."
	},
	{
		id: "ceco",
		label: "No cecotropes stuck on the rabbit",
		days: 1,
		hint: "A clean vent means they made the reach. Smears are diet or pain, not a tray to feed back."
	},
	{
		id: "board",
		label: "Resting board swapped",
		days: 7,
		hint: "Wet wood and wire together are how sore hocks start."
	},
	{
		id: "brush",
		label: "Mesh brushed, tray washed",
		days: 7,
		hint: "Hair mats on 1/4 in mesh until pellets sit in it instead of falling through."
	},
	{
		id: "wire",
		label: "Wire, latches, and staples",
		days: 7,
		hint: "A loose corner is an exit, or a cut foot."
	},
	{
		id: "hocks",
		label: "Hocks and teeth looked at",
		days: 7,
		hint: "Red heels or drool are not a cleaning problem."
	}
];
function startOfDay(time) {
	const date = new Date(time);
	date.setHours(0, 0, 0, 0);
	return date.getTime();
}
function due(iso, days) {
	if (!iso) return true;
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return true;
	if (days <= 1) return startOfDay(then) < startOfDay(Date.now());
	return Date.now() - then > days * 24 * 60 * 60 * 1e3;
}
function whenLabel(iso) {
	if (!iso) return "Not logged yet";
	const then = new Date(iso);
	if (Number.isNaN(then.getTime())) return "Not logged yet";
	return `Last ${then.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})}`;
}
function CareLog() {
	const [log, setLog] = usePersisted("bb-care", {});
	const [notes, setNotes] = usePersisted("bb-notes", "");
	const safeLog = log && typeof log === "object" ? log : {};
	const noteText = typeof notes === "string" ? notes : "";
	function mark(id) {
		setLog({
			...safeLog,
			[id]: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	const open = TASKS.filter((task) => due(safeLog[task.id], task.days)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-moss",
			children: open === 0 ? "Nothing due. The hutch is current." : `${open} thing${open === 1 ? "" : "s"} due`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-line border-y border-line",
			children: TASKS.map((task) => {
				const isDue = due(safeLog[task.id], task.days);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-prose",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: task.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								whenLabel(safeLog[task.id]),
								" · ",
								task.hint
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => mark(task.id),
						className: isDue ? "min-h-11 shrink-0 bg-moss px-4 font-semibold text-paper" : "min-h-11 shrink-0 border border-line bg-sheet px-4 font-semibold text-moss",
						children: isDue ? "Mark done" : "Done today"
					})]
				}, task.id);
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-line bg-sheet p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "shop-notes",
					className: "font-display text-xl",
					children: "Shop notes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "What you actually built. Saved on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "shop-notes",
					value: noteText,
					onChange: (event) => setNotes(event.target.value),
					rows: 8,
					placeholder: "Tray ended up 37 in. Back rail dropped a full half inch.",
					className: "mt-4 w-full resize-y border border-line bg-paper px-3 py-3 text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
				})
			]
		})]
	});
}
var ink = "var(--color-ink)";
var muted = "var(--color-muted)";
var moss = "var(--color-moss)";
var mossSoft = "var(--color-moss-soft)";
var clay = "var(--color-clay)";
var claySoft = "var(--color-clay-soft)";
var sheet = "var(--color-sheet)";
var sans = "Source Sans 3, Segoe UI, sans-serif";
var display = "Fraunces, Georgia, serif";
function hit(id, part, onPart) {
	return {
		onClick: () => onPart(id),
		className: "cursor-pointer",
		strokeWidth: part === id ? 3 : 1.5
	};
}
function HutchSheet({ model: m, part, view, onPart }) {
	const title = view === "section" ? "Section through the room" : view === "front" ? "Front elevation" : "Floor plan";
	const caption = view === "section" ? "End view. The tray pulls to the front, on the right." : view === "front" ? "The face you open. Each door is wire, not wood." : "Looking down. Tight grid is the 1/4 in floor.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 720 520",
		role: "img",
		"aria-label": `${title}. ${caption}`,
		className: "h-auto w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "720",
				height: "520",
				fill: sheet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
					id: "mesh14",
					width: "6",
					height: "6",
					patternUnits: "userSpaceOnUse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M6 0 H0 V6",
						fill: "none",
						stroke: moss,
						strokeWidth: "0.7"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
					id: "wire12",
					width: "14",
					height: "14",
					patternUnits: "userSpaceOnUse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 14 L14 0 M0 0 L14 14",
						stroke: ink,
						strokeWidth: "0.55",
						opacity: "0.4"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
					id: "pellets",
					width: "18",
					height: "14",
					patternUnits: "userSpaceOnUse",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "5",
						cy: "7",
						r: "1.7",
						fill: ink,
						opacity: "0.4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "13",
						cy: "5",
						r: "1.4",
						fill: ink,
						opacity: "0.28"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "28",
				y: "36",
				fill: ink,
				fontFamily: display,
				fontSize: "22",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "28",
				y: "58",
				fill: muted,
				fontFamily: sans,
				fontSize: "14",
				children: caption
			}),
			view === "section" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionView, {
				model: m,
				part,
				onPart
			}) : null,
			view === "front" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrontView, {
				model: m,
				part,
				onPart
			}) : null,
			view === "floor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorView, {
				model: m,
				part,
				onPart
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "28",
				y: "500",
				fill: muted,
				fontFamily: sans,
				fontSize: "13",
				children: "Schematic. The stand is drawn broken so the cage can stay large. Cut the list, not the picture."
			})
		]
	});
}
function SectionView({ model: m, part, onPart }) {
	const s = 5.4;
	const x = 214;
	const depth = m.compartmentD * s;
	const ht = 118;
	const floorY = 328;
	const topY = 210;
	const trayH = 32;
	const pull = 42;
	const meshT = 10;
	const trayY = 366;
	const selected = (id) => part === id;
	const roof = roofPoly(188, x + depth + 26, 194, 50);
	const legTop = 398;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fontFamily: sans,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("roof", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: roof,
					fill: selected("roof") ? moss : mossSoft,
					stroke: moss
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("top", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: 201,
					width: depth,
					height: 9,
					fill: "url(#wire12)",
					stroke: selected("top") ? moss : ink
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				...hit("sides", part, onPart),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 223,
						y: topY,
						width: depth - 18,
						height: ht,
						fill: selected("sides") ? mossSoft : sheet,
						stroke: "none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x,
						y: topY,
						width: 9,
						height: ht,
						fill: moss
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: x + depth - 9,
						y: topY,
						width: 9,
						height: ht,
						fill: moss
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("rest", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 236,
					y: 316,
					width: Math.min(m.restD * s, depth * .42),
					height: 12,
					fill: selected("rest") ? moss : mossSoft,
					stroke: moss
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("floor", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: floorY,
					width: depth,
					height: meshT,
					fill: "url(#mesh14)",
					stroke: selected("floor") ? moss : ink
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				...hit("tray", part, onPart),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x,
						y: trayY,
						width: depth + pull,
						height: trayH,
						fill: selected("tray") ? claySoft : sheet,
						stroke: clay
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 222,
						y: 372,
						width: depth + pull - 20,
						height: 20,
						fill: "url(#pellets)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: x + depth + pull,
						y: 376,
						width: 12,
						height: 12,
						fill: clay,
						stroke: "none"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 228,
				x2: 228,
				y1: legTop,
				y2: 420,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 228,
				x2: 228,
				y1: 438,
				y2: 448,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + depth - 14,
				x2: x + depth - 14,
				y1: legTop,
				y2: 420,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + depth - 14,
				x2: x + depth - 14,
				y1: 438,
				y2: 448,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				pointerEvents: "none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						x: 28,
						y: 148,
						text: "Weather roof",
						active: selected("roof")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						x: 28,
						y: 214,
						text: "1/2 × 1 wire top",
						active: selected("top")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						x: 28,
						y: 266,
						text: `${m.height} in high`,
						active: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						x: 28,
						y: 332,
						text: "1/4 in mesh",
						active: selected("floor")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						x: 28,
						y: 386,
						text: "Tray pulls out",
						active: selected("tray"),
						tone: "clay"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 242,
						y: 310,
						fill: selected("rest") ? moss : muted,
						fontSize: "13",
						children: "Rest board"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x,
						y: 468,
						fill: muted,
						fontSize: "14",
						children: [
							m.gap,
							" in gap under the mesh · ",
							m.compartmentD,
							" in deep · ",
							m.stand,
							" in stand, drawn broken"
						]
					})
				]
			})
		]
	});
}
function FrontView({ model: m, part, onPart }) {
	const nestL = m.nest?.l ?? 0;
	const total = m.livingL + nestL;
	const s = Math.min(4.6, 520 / total);
	const x = 36;
	const floorY = 312;
	const ht = 128;
	const topY = 184;
	const livingW = m.livingL * s;
	const bay = m.compartmentL * s;
	const nestW = nestL * s;
	const selected = (id) => part === id;
	const rise = 46;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fontFamily: sans,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("roof", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: gable(22, x + livingW + nestW + 14, 172, rise),
					fill: selected("roof") ? moss : mossSoft,
					stroke: moss
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("top", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: 176,
					width: livingW,
					height: 8,
					fill: "url(#wire12)",
					stroke: selected("top") ? moss : ink
				})
			}),
			Array.from({ length: m.compartments }, (_, i) => {
				const bx = x + i * bay;
				const doorW = bay * .58;
				const doorX = bx + (bay - doorW) / 2;
				const doorH = ht * .72;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					...hit("sides", part, onPart),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: bx,
							y: topY,
							width: bay,
							height: ht,
							fill: "url(#wire12)",
							stroke: selected("sides") ? moss : ink
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: doorX,
							y: 200,
							width: doorW,
							height: doorH,
							fill: sheet,
							stroke: ink
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: doorX + 3,
							y: 203,
							width: doorW - 6,
							height: 86.16,
							fill: "url(#wire12)",
							stroke: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: doorX + doorW - 12,
							cy: 246.07999999999998,
							r: "3.5",
							fill: clay
						})
					]
				}, i);
			}),
			m.nest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("nest", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x + livingW,
					y: floorY - m.nest.h * s,
					width: nestW,
					height: m.nest.h * s,
					fill: mossSoft,
					stroke: moss,
					strokeWidth: selected("nest") ? 3 : 1.5
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("floor", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: floorY,
					width: livingW,
					height: 8,
					fill: "url(#mesh14)",
					stroke: selected("floor") ? moss : ink
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("tray", part, onPart),
				children: Array.from({ length: m.trayCount }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x + i * bay + 8,
					y: 348,
					width: Math.max(12, bay - 16),
					height: 24,
					fill: claySoft,
					stroke: clay,
					strokeWidth: selected("tray") ? 3 : 1.5
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 44,
				x2: 44,
				y1: 372,
				y2: 390,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 44,
				x2: 44,
				y1: 404,
				y2: 448,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + livingW - 8,
				x2: x + livingW - 8,
				y1: 372,
				y2: 390,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + livingW - 8,
				x2: x + livingW - 8,
				y1: 404,
				y2: 448,
				stroke: moss,
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				pointerEvents: "none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 36,
						y: 96,
						fill: selected("roof") ? moss : muted,
						fontSize: "14",
						children: "Weather roof over the wire ceiling"
					}),
					m.nest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: x + livingW,
						y: floorY - m.nest.h * s - 8,
						fill: moss,
						fontSize: "13",
						children: "Solid nest"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: 36,
						y: 470,
						fill: muted,
						fontSize: "14",
						children: [
							m.livingL,
							" in of 1/4 in floor · ",
							m.trayCount,
							" tray",
							m.trayCount > 1 ? "s" : "",
							" under it · ",
							m.height,
							" in high"
						]
					})
				]
			})
		]
	});
}
function FloorView({ model: m, part, onPart }) {
	const nestL = m.nest?.l ?? 0;
	const s = Math.min(5.6, 560 / (m.livingL + nestL + 8));
	const x = 36;
	const y = 118;
	const bay = m.compartmentL * s;
	const depth = m.compartmentD * s;
	const livingW = m.livingL * s;
	const selected = (id) => part === id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fontFamily: sans,
		children: [
			Array.from({ length: m.compartments }, (_, i) => {
				const bx = x + i * bay;
				const gapW = i < m.compartments - 1 ? 8 : 0;
				const restW = Math.min(m.restL * s, (bay - gapW) * .55);
				const restH = Math.min(m.restD * s, depth * .42);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						...hit("floor", part, onPart),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: bx,
							y,
							width: bay - gapW,
							height: depth,
							fill: "url(#mesh14)",
							stroke: selected("floor") ? moss : ink
						})
					}),
					gapW ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: bx + bay - gapW,
						y,
						width: gapW,
						height: depth,
						fill: moss
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						...hit("rest", part, onPart),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: bx + 12,
							y: 130,
							width: restW,
							height: restH,
							fill: selected("rest") ? moss : mossSoft,
							stroke: moss
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						...hit("sides", part, onPart),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M ${bx + bay * .18} ${y + depth} q ${bay * .28} ${-Math.min(48, depth * .4)} ${bay * .56} 0`,
							fill: "none",
							stroke: selected("sides") ? moss : muted,
							strokeDasharray: "4 3"
						})
					})
				] }, i);
			}),
			m.nest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("nest", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x + livingW + 10,
					y: y + Math.max(0, depth - m.nest.d * s),
					width: m.nest.l * s,
					height: Math.min(depth, m.nest.d * s),
					fill: mossSoft,
					stroke: moss,
					strokeWidth: selected("nest") ? 3 : 1.5
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				...hit("tray", part, onPart),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y: y + depth + 36,
					width: livingW,
					height: 16,
					fill: claySoft,
					stroke: clay,
					strokeWidth: selected("tray") ? 3 : 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				pointerEvents: "none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x,
						y: 102,
						fill: muted,
						fontSize: "14",
						children: [
							"Back · ",
							m.livingL,
							" in long · ",
							m.compartmentD,
							" in deep"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 54,
						y: 146,
						fill: ink,
						fontSize: "13",
						children: "Rest"
					}),
					m.nest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: x + livingW + 10,
						y: y + depth + 28,
						fill: moss,
						fontSize: "13",
						children: "Nest, solid floor"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x,
						y: y + depth + 22,
						fill: muted,
						fontSize: "13",
						children: "Front · door swing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x,
						y: y + depth + 70,
						fill: clay,
						fontSize: "14",
						children: [
							"Tray footprint, ",
							m.gap,
							" in below the mesh"
						]
					})
				]
			})
		]
	});
}
function Callout({ x, y, text, active, tone = "ink" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x,
		y,
		fill: tone === "clay" ? clay : active ? moss : muted,
		fontSize: "14",
		fontFamily: sans,
		children: text
	});
}
function roofPoly(left, right, eaves, rise) {
	const mid = (left + right) / 2;
	const peak = eaves - rise;
	return `M ${left} ${eaves} L ${mid} ${peak} L ${right} ${eaves} L ${right - 12} ${eaves + 8} L ${mid} ${peak + 10} L ${left + 12} ${eaves + 8} Z`;
}
function gable(left, right, eaves, rise) {
	return roofPoly(left, right, eaves, rise);
}
var BREEDS = [
	{
		id: "dwarf",
		label: "Dwarf & mini",
		examples: "Netherland Dwarf, Holland Lop, Mini Rex"
	},
	{
		id: "medium",
		label: "Medium",
		examples: "Dutch, Rex, Mini Lop"
	},
	{
		id: "large",
		label: "Large",
		examples: "New Zealand, Californian, Champagne"
	}
];
var PLANS = [
	{
		id: "single",
		label: "One adult",
		blurb: "A buck, or a dry doe, with a full room and a tray underneath."
	},
	{
		id: "kindling",
		label: "Kindling doe",
		blurb: "The same living cage, plus a solid-floor nest box on the end."
	},
	{
		id: "double",
		label: "Side by side",
		blurb: "Two adults who must not share a room. One roof, a solid wall, two trays."
	},
	{
		id: "growout",
		label: "Grow-out",
		blurb: "Weaned kits through fryer size. The floor grows with the head count."
	}
];
var VIEWS = [
	{
		id: "section",
		label: "Section"
	},
	{
		id: "front",
		label: "Front"
	},
	{
		id: "floor",
		label: "Floor"
	}
];
var BASE = {
	dwarf: {
		L: 30,
		D: 24,
		H: 16
	},
	medium: {
		L: 36,
		D: 30,
		H: 18
	},
	large: {
		L: 48,
		D: 36,
		H: 20
	}
};
var FRYER_SQ = {
	dwarf: 2.25,
	medium: 3,
	large: 4
};
var MAX_RUN = 96;
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function nestFor(breed) {
	if (breed === "large") return {
		l: 18,
		d: 12,
		h: 12
	};
	if (breed === "dwarf") return {
		l: 12,
		d: 10,
		h: 8
	};
	return {
		l: 16,
		d: 10,
		h: 10
	};
}
function design(plan, breed, countIn) {
	const b = BASE[breed];
	let herd = 1;
	let compartments = 1;
	let L = b.L;
	let H = b.H;
	let nest = null;
	if (plan === "double") {
		herd = 2;
		compartments = 2;
	} else if (plan === "growout") {
		herd = clamp(Math.round(countIn) || 2, 2, 12);
		const totalL = Math.max(b.L, Math.ceil(herd * FRYER_SQ[breed] * 144 / b.D));
		compartments = Math.max(1, Math.ceil(totalL / MAX_RUN));
		L = Math.ceil(totalL / compartments);
		H = Math.max(b.H, 18);
	} else if (plan === "kindling") nest = nestFor(breed);
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
		restL: Math.round(L * .62),
		restD: Math.round(b.D * .5),
		sqft: L * b.D / 144,
		rise
	};
}
function summary(m) {
	const room = `${m.compartmentL} × ${m.compartmentD} × ${m.height} in`;
	if (m.plan === "double") return `Two rooms, each ${room}, split by a solid wall so they cannot breed or bite through the wire. One tray under each floor.`;
	if (m.plan === "growout") {
		const pens = m.compartments === 1 ? "1 pen" : `${m.compartments} pens`;
		return `${m.herd} growers in ${pens}, each ${room}. One tray per pen. This is fryer space, not a permanent colony of adults.`;
	}
	if (m.nest) return `Doe's room ${room}, plus a ${m.nest.l} × ${m.nest.d} × ${m.nest.h} in nest box with a solid floor. The tray runs under the wire room only.`;
	return `One adult in a ${room} room, on a ${m.stand} in stand. The tray is ${m.trayL} × ${m.trayD} × ${m.trayH} in and sits ${m.gap} in under the mesh.`;
}
function rollWidth(depth) {
	if (depth <= 24) return 24;
	if (depth <= 36) return 36;
	return 48;
}
function materials(m) {
	const width = rollWidth(m.compartmentD);
	const clothFt = Math.ceil((m.livingL + 6) / 12);
	const wallSq = (2 * m.livingL * m.height + 2 * m.compartmentD * m.height) / 144;
	const ceilingSq = m.livingL * m.compartmentD / 144;
	const wireSq = Math.ceil((wallSq + ceilingSq) * 1.15);
	const wireFt = Math.ceil(wireSq / 3);
	const legIn = (4 + (m.compartments - 1) * 2) * (m.stand + m.height + 8);
	const rails = (m.compartments * 2 * m.compartmentL + (m.compartments + 1) * 2 * m.compartmentD) * 2;
	const joists = Math.max(2, Math.round(m.compartmentL / 12)) * m.compartments * m.compartmentD;
	const doors = m.compartments * (2 * m.height + 3 * Math.round(m.compartmentL * .62));
	const pairs = Math.ceil(m.overallL / 24) + 1;
	const rafter = Math.hypot(m.compartmentD / 2, m.rise) + 6;
	const framingFt = Math.ceil((legIn + rails + joists + doors + pairs * 2 * rafter) / 12 * 1.12);
	const battenFt = Math.ceil(m.compartments * 2 * (m.compartmentL + m.compartmentD) * 2 / 12);
	return [
		{
			item: "1/4 in hardware cloth",
			qty: `${clothFt} ft of ${width} in`,
			detail: "19 gauge, galvanized. Floor only. Fold cut edges under or trap them under a batten. Smooth side up."
		},
		{
			item: "1/2 × 1 in welded wire",
			qty: `${wireSq} sq ft`,
			detail: `Walls and the wire ceiling. Stronger than chicken wire. About ${wireFt} ft of a 36 in roll, waste included. Stretch it drum tight.`
		},
		{
			item: "Dropping tray",
			qty: `${m.trayCount} pan${m.trayCount > 1 ? "s" : ""}`,
			detail: `Each ${m.trayL} × ${m.trayD} × ${m.trayH} in. Galvanized sheet, or exterior plywood with a plastic liner. Cleats ${m.gap} in below the mesh.`
		},
		{
			item: "2×2 framing",
			qty: `${framingFt} linear ft`,
			detail: "Legs, floor, top plates, doors, and rafters, plus about 12% for bad cuts. Exterior screws, 2 1/2 in."
		},
		{
			item: "1×2 battens",
			qty: `${battenFt} linear ft`,
			detail: "Cover every wire edge a rabbit can nose. Staples alone will lose."
		},
		{
			item: "Resting boards",
			qty: `${m.compartments * 2}`,
			detail: `Each ${m.restL} × ${m.restD} in, cut from 1× stock. Two per room so one can dry.`
		},
		{
			item: "Roof",
			qty: `${Math.ceil((m.overallL + 12) / 12)} × ${Math.ceil((m.compartmentD + 10) / 12)} ft`,
			detail: `Covers ${m.overallL + 12} × ${m.compartmentD + 10} in with overhang. Metal or shingles. Gable rise about ${m.rise} in.`
		},
		{
			item: "Door hardware",
			qty: `${m.compartments} door${m.compartments > 1 ? "s" : ""}`,
			detail: "Two hinges and a thumb latch each. A rabbit will open a hook it can nose."
		},
		{
			item: "Staples",
			qty: "1 lb",
			detail: "1/2 in galvanized poultry staples, about every 2 inches, then battens over the edges."
		}
	];
}
function cuts(m) {
	const legs = 4 + (m.compartments - 1) * 2;
	const joists = Math.max(2, Math.round(m.compartmentL / 12)) * m.compartments;
	const doorW = Math.round(m.compartmentL * .62);
	const pairs = Math.ceil(m.overallL / 24) + 1;
	const rafter = Math.ceil(Math.hypot(m.compartmentD / 2, m.rise) + 6);
	const list = [
		{
			qty: legs,
			size: `${m.stand + m.height + 8} in`,
			name: "2×2 legs, from the ground into the roof"
		},
		{
			qty: m.compartments * 2,
			size: `${m.compartmentL} in`,
			name: "2×2 front and back floor rails"
		},
		{
			qty: (m.compartments + 1) * 2,
			size: `${m.compartmentD} in`,
			name: "2×2 floor end rails. Drop the back one 1/4 in"
		},
		{
			qty: joists,
			size: `${m.compartmentD} in`,
			name: "2×2 floor joists, 12 in on center"
		},
		{
			qty: m.compartments * 2,
			size: `${m.compartmentL} in`,
			name: "2×2 top front and back plates"
		},
		{
			qty: (m.compartments + 1) * 2,
			size: `${m.compartmentD} in`,
			name: "2×2 top end rails"
		},
		{
			qty: m.compartments * 2,
			size: `${m.height} in`,
			name: "2×2 door stiles"
		},
		{
			qty: m.compartments * 3,
			size: `${doorW} in`,
			name: "2×2 door rails"
		},
		{
			qty: pairs * 2,
			size: `${rafter} in`,
			name: "2×2 rafters, gable across the depth"
		},
		{
			qty: m.trayCount * 2,
			size: `${m.compartmentL} in`,
			name: "1×2 tray cleats"
		},
		{
			qty: m.compartments * 2,
			size: `${m.restL} × ${m.restD} in`,
			name: "Resting boards, 1× stock"
		}
	];
	if (m.compartments > 1) list.push({
		qty: m.compartments - 1,
		size: `${m.compartmentD} × ${m.height} in`,
		name: "3/4 in plywood divider, solid"
	});
	if (m.nest) list.push({
		qty: 1,
		size: `${m.nest.l} × ${m.nest.d} × ${m.nest.h} in inside`,
		name: "1/2 in plywood nest box, solid floor, 4 in sill"
	});
	return list;
}
var BUILD_STEPS = [
	"Build the end frames first: two legs and the depth rails. The floor sits 28 inches off the ground so the tray is a pull, not a crawl.",
	"Join the ends with the length rails. Set the back floor rail 1/4 inch lower than the front so urine walks into the tray instead of sitting in the middle.",
	"Joists every 12 inches. Quarter-inch mesh sags without them, and a sag becomes a puddle.",
	"Staple 1/4 in hardware cloth on top of the joists, smooth side up. Fold every cut edge under or cover it with a 1×2 batten.",
	"Screw cleats 3 inches below the mesh, open at the front. Slide the empty tray in and out before a rabbit ever sees it.",
	"Frame the walls and staple 1/2 × 1 in welded wire on the outside, then the wire ceiling the same way. Drum tight. Batten every edge.",
	"Hang the door on two hinges. The latch needs a thumb. Leave no gap a kit can put a head through.",
	"Roof over the wire, with a vent gap at the eaves and overhang so rain does not blow through the welded wire.",
	"Make the resting board, and a second one to swap in. Cover about a third of the floor. A full wood floor puts you back to scraping."
];
var KINDLE_STEP = "Build the nest box with a solid floor and a 4 inch sill. Put it on at day 28 after breeding, not the day you breed. Kits and quarter-inch mesh do not mix.";
var PARTS = [
	{
		id: "floor",
		label: "1/4 in floor"
	},
	{
		id: "sides",
		label: "1/2 × 1 sides"
	},
	{
		id: "top",
		label: "1/2 × 1 top"
	},
	{
		id: "tray",
		label: "Dropping tray"
	},
	{
		id: "rest",
		label: "Resting board"
	},
	{
		id: "roof",
		label: "Weather roof"
	},
	{
		id: "nest",
		label: "Nest box"
	}
];
var PART_COPY = {
	floor: {
		title: "Quarter-inch mesh, and nothing wider",
		body: [
			"The floor is 1/4 inch hardware cloth, 19 gauge, galvanized. That is the shop name for the mesh. 1/2 by 1 inch wire is the wrong roll down here: a kit can put a foot through it, and pellets hang up.",
			"Staple it on top of joists every 12 inches. Pitch the back 1/4 inch lower than the front so urine follows the pellets instead of pooling in a belly in the cloth.",
			"Smooth side up. Every cut end folded under or trapped under a batten. A point that can catch a heel will catch a heel. When the galvanizing flakes and rusts, replace the panel. Do not paint a floor they will chew."
		]
	},
	sides: {
		title: "1/2 by 1 inch welded wire on the walls",
		body: ["Sides and top are 1/2 by 1 inch welded wire. It is stronger than chicken wire and keeps raccoons, dogs, and foxes out. Stretch it on the outside of the 2×2 frame and batten every edge a nose can peel. It still gives air and a view. Use a latch that needs a thumb.", "Adults of breeding age do not share a wire wall. They will breed through it, or fight through it. The side-by-side plan uses a solid plywood divider for that reason."]
	},
	top: {
		title: "1/2 by 1 inch welded wire for the ceiling",
		body: [
			"The ceiling of the cage is 1/2 by 1 inch welded wire, the same roll as the walls. It stops a hop into the roof framing and, if something pulls the weather roof off, it is the last thing between a rabbit and a hawk.",
			"Wire is not a roof. Rain beads on it and noon sun turns it into a broiler. The solid roof sits above this wire with a vent gap so heat can leave.",
			"Hang the water where they can drink without pressing their head into the ceiling all day. A bottle that drips onto the mesh is a wet floor, which is how sore hocks start."
		]
	},
	tray: {
		title: "In the hutch, outside the cage",
		body: [
			"The tray is a pan the size of one room: this plan's length and depth, about 2 1/2 inches deep. Galvanized sheet, or exterior plywood lined with a plastic tray. It rides on cleats 3 inches below the mesh and slides out the front.",
			"Those 3 inches are the design. If the pile touches the cloth, the rabbit is standing over a wet sponge and you are scraping again, only from underneath.",
			"A handful of plain wood-stove pellets in the tray — not in the cage — drinks the urine. No clay cat litter. No cedar dust rising into the wire. Dump it every day in warm weather. Ammonia from a skipped tray burns lungs.",
			"Do not feed the tray back. The round dry pellets in it are waste. The soft clusters a rabbit must eat, cecotropes, are taken straight from the body. If those clusters are sitting in the tray, the rabbit missed them. That is a health note, not a serving."
		]
	},
	rest: {
		title: "A board on part of the floor",
		body: [
			"Any wire floor, including 1/4 inch, can wear the fur off a heel. That is sore hocks, and it ends rabbits who otherwise look fine.",
			"The resting board covers about a third of each room. They will sit on it. Most of the hard pellets still hit mesh, as long as you do not get kind and floor the whole cage in wood.",
			"Make two boards. Swap when the one in service is wet. Wet wood against wire is not a rest."
		]
	},
	roof: {
		title: "A real roof over the wire",
		body: [
			"The sheet draws a gable along the length, metal or shingles, with overhang so rain does not blow straight through the welded wire. A shed roof is just as honest if you would rather not cut a ridge. Keep the wire ceiling either way.",
			"Shade is not optional. Rabbits die of heat long before they die of cold. Above about 80°F, frozen bottles and moving air matter more than another scoop of feed. A wire top in full sun is not a roof.",
			"Cold they can take if they are dry, out of the wind, and buried in hay. Wet plus wind is the killer, not the thermometer."
		]
	},
	nest: {
		title: "The only solid floor in the plan",
		body: [
			"Newborn kits slip through 1/4 inch mesh. The nest box is plywood, solid on the bottom, with a doorway and a 4 inch sill so they do not wander out before their eyes open around day 10.",
			"Hang it on day 28 after breeding, full of straw and hay. The doe adds fur. You mostly stay out. Gestation is about 31 days. She may kindle at night and only nurse once or twice a day. An empty-looking box in the afternoon can be normal.",
			"A chilled, scattered litter in the morning is not normal. Warm live kits in your hands and rebuild the nest. The dropping tray does not run under this box. Urine in a nest is a bedding change."
		]
	}
};
function isPlan(value) {
	return value === "single" || value === "kindling" || value === "double" || value === "growout";
}
function isBreed(value) {
	return value === "dwarf" || value === "medium" || value === "large";
}
function isView(value) {
	return value === "section" || value === "front" || value === "floor";
}
function isPart(value) {
	return value === "floor" || value === "sides" || value === "top" || value === "tray" || value === "rest" || value === "roof" || value === "nest";
}
var FALL_STEPS = [
	{
		title: "They fall through",
		body: "Hard pellets hit the 1/4 inch mesh and leave the room. The rabbit is not standing in yesterday."
	},
	{
		title: "The tray is outside",
		body: "The pan is part of the hutch and outside the cage. Three inches of air under the mesh, so the pile never climbs back up."
	},
	{
		title: "You dump, you don't serve",
		body: "Once a day the tray slides out. You do not feed it back. Cecotropes were eaten at the source, usually before you were up."
	}
];
var CHAPTERS = [
	{
		title: "Hay first, then a measured pellet",
		paragraphs: [
			"Grass hay is the diet: timothy, orchard, meadow. It should be in front of them all day. Teeth and guts both depend on it. Alfalfa is for growers and nursing does, not for a fat adult buck who already skips his cecotropes.",
			"A workable adult measure is about 1/4 cup of plain pellets per 5 pounds of rabbit, once a day. If the body is rounding and soft clusters are being left behind, cut the pellets. Do not cut the hay.",
			"Nursing does and fryer-age growers need more: alfalfa hay and a grower pellet available through most of the day. A doe with a litter can drink a quart and more. Check the bottle at noon."
		]
	},
	{
		title: "Water, weather, and the hours you actually show up",
		paragraphs: ["Fresh water every day. In a freeze, swap bottles or break the ice in a crock morning and night. In heat, a second check is not fussiness.", "Above about 80°F, rabbits are in danger. Get the hutch into deep shade, give them frozen water bottles and a cool tile, and keep air moving. Signs of heatstroke: fast breathing, a wet nose, a limp or floppy body, very hot ears. Move the rabbit somewhere cool, wet the ears with cool (not ice-cold) water, and call a vet right away. Never dunk a rabbit in ice water. Below freezing they are fine if the coat is dry and the wind cannot cut through a solid back. Stuff extra hay in. Do not close the hutch into an airtight box."]
	},
	{
		title: "Breeding without a surprise litter",
		paragraphs: [
			"Wait until a doe has her adult frame: about 6 months for small and medium breeds, closer to 8 for the large ones. A 12-week pregnancy is how people lose a doe.",
			"Take the doe to the buck's hutch, not the other way. Stay for the breeding. Write the date down. Gestation runs about 31 days. Hang the nest box on day 28.",
			"Sex them before you trust a grow-out pen. Littermates get along until they don't, which is often the week hormones arrive. Split by sex before then. Two adults of breeding age will mate through a wire divider — use the solid wall in the side-by-side plan.",
			"A doe may kill, scatter, or ignore a litter if she is young, stressed, disturbed by predators or dogs, or poorly fed. Keep the area quiet, and give her plenty of hay, water, and feed. Many first litters fail. Don't breed more rabbits than you can feed, house, or find good homes for."
		]
	},
	{
		title: "When it is not a cleaning problem",
		paragraphs: ["No hard pellets for half a day, a hunched sit, teeth grinding, hay refused: that can be gut stasis. It is an emergency, not a tray you forgot.", "Soft clusters smeared on the mesh or matted on the hindquarters mean the rabbit produced cecotropes and did not eat them. Too many pellets, a body too round to turn, a sore hock, or teeth that hurt. A bright rabbit still eating hay can be steered with diet. A quiet one needs a vet."],
		bullets: [
			"Moldy hay, heated grass clippings, anything sprayed",
			"Never feed: avocado, chocolate, rhubarb, onion, garlic, leeks, iceberg lettuce, potato or tomato leaves and stems, houseplants, bread, crackers, or seeds and nuts. Fruit and carrots are treats only: a spoonful a day, not a meal. Good daily greens: romaine, cilantro, parsley, dandelion greens.",
			"A diet of pellets and no hay",
			"Cedar bedding in the cage, or clay litter in the tray"
		]
	},
	{
		id: "handling",
		title: "Handling",
		paragraphs: ["Always support the back end. Put one hand under the chest and one under the rump, and hold the rabbit close to your body. NEVER lift a rabbit by the ears or the scruff alone. A rabbit that kicks while unsupported can break its own back. Sit on the floor with young children so a dropped rabbit does not fall far."]
	},
	{
		id: "health",
		title: "Health",
		paragraphs: [],
		bullets: [
			"Gut stasis: no eating or no droppings for 12 hours is an emergency. Call a vet now.",
			"RHDV2 (rabbit hemorrhagic disease) kills fast. Ask your vet about the vaccine. Wash hands and change shoes after visiting other rabbits, and do not bring in wild-cut greens from areas with wild rabbits during an outbreak.",
			"Teeth never stop growing. Unlimited hay wears them down. Drooling, dropping food, or weight loss means a vet check.",
			"Flystrike: flies lay eggs in a dirty rear end, and maggots can kill in a day. Check every rabbit's bottom daily in warm weather.",
			"Snuffles: sneezing with white or yellow discharge. Separate the rabbit and see a vet.",
			"Coccidiosis: diarrhea, potbelly, and weight loss in young rabbits. Keep floors and feeders clean. See a vet.",
			"Ear mites: crusty ears and head shaking. See a vet.",
			"Spay and neuter pet rabbits. It reduces fighting and spraying, and it lowers the high risk of uterine cancer in unspayed does.",
			"Find a rabbit-savvy (exotics) vet BEFORE you need one."
		]
	},
	{
		id: "meat",
		title: "For meat raisers",
		paragraphs: [],
		bullets: [
			"Process quickly and humanely. Learn from an experienced person or your county extension office first.",
			"Wear gloves when cleaning rabbits. Wild and sometimes domestic rabbits can carry tularemia, a disease that infects people through cuts. Do not process a rabbit that seemed sick. Throw out a liver with white spots.",
			"Cook rabbit meat to 160°F.",
			"Wash hands, knives, and boards with hot soapy water."
		]
	},
	{
		id: "bonding",
		title: "Bonding and rehoming",
		paragraphs: ["Rabbits are social. Fixed rabbits can be bonded in pairs. Introduce them slowly on neutral ground. Many rescue rabbits need homes, so check your local rescue or shelter before you buy."]
	}
];
var START_STEPS = [
	"Decide: pet, rescue, or meat.",
	"Find a rabbit vet first.",
	"Give unlimited grass hay, measured pellets, and fresh water.",
	"Give daily exercise space.",
	"Keep them shaded and below 80°F.",
	"Handle them with the back end supported.",
	"No eating or no droppings for 12 hours means call the vet."
];
var GLOSSARY = [
	{
		term: "Doe",
		def: "Female rabbit."
	},
	{
		term: "Buck",
		def: "Male rabbit."
	},
	{
		term: "Kit",
		def: "Baby rabbit."
	},
	{
		term: "Kindling",
		def: "Giving birth."
	},
	{
		term: "Cecotropes",
		def: "Soft droppings rabbits eat for nutrition."
	},
	{
		term: "GI stasis",
		def: "When the gut slows or stops. An emergency."
	},
	{
		term: "Sore hocks",
		def: "Sores on the heels."
	},
	{
		term: "Flystrike",
		def: "Maggots in the skin."
	},
	{
		term: "RHDV2",
		def: "A deadly rabbit virus."
	},
	{
		term: "Fryer",
		def: "A young meat rabbit."
	},
	{
		term: "Hardware cloth",
		def: "Small square wire mesh."
	}
];
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
var chip = "min-h-11 border px-3 py-2 text-left text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss motion-reduce:transition-none";
function Studio() {
	const [planRaw, setPlan] = usePersisted("bb-plan", "kindling");
	const [breedRaw, setBreed] = usePersisted("bb-breed", "medium");
	const [countRaw, setCount] = usePersisted("bb-count", 6);
	const [partRaw, setPart] = usePersisted("bb-part", "tray");
	const [viewRaw, setView] = usePersisted("bb-view", "section");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const plan = isPlan(planRaw) ? planRaw : "kindling";
	const breed = isBreed(breedRaw) ? breedRaw : "medium";
	const count = typeof countRaw === "number" && Number.isFinite(countRaw) ? countRaw : 6;
	const model = design(plan, breed, count);
	const part = isPart(partRaw) ? partRaw : "tray";
	const view = isView(viewRaw) ? viewRaw : "section";
	(0, import_react.useEffect)(() => {
		if (part === "nest" && !model.nest) setPart("tray");
	}, [
		model.nest,
		part,
		setPart
	]);
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
			...cutList.map((cut) => `${cut.qty} × ${cut.size} — ${cut.name}`)
		].join("\n");
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-moss",
							children: "Plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: PLANS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": plan === item.id,
								onClick: () => setPlan(item.id),
								className: cx(chip, plan === item.id ? "border-moss bg-moss text-paper" : "border-line bg-sheet text-ink"),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-prose text-sm text-muted",
							children: PLANS.find((item) => item.id === plan)?.blurb
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-moss",
							children: "Breed size"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: BREEDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": breed === item.id,
								onClick: () => setBreed(item.id),
								className: cx(chip, breed === item.id ? "border-moss bg-moss text-paper" : "border-line bg-sheet text-ink"),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: BREEDS.find((item) => item.id === breed)?.examples
						})
					] }),
					plan === "growout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-moss",
						children: "Weaned kits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center border border-line bg-sheet text-xl text-ink",
								onClick: () => setCount(Math.max(2, count - 1)),
								"aria-label": "Fewer kits",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-10 text-center font-display text-3xl tabular-nums",
								children: model.herd
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center border border-line bg-sheet text-xl text-ink",
								onClick: () => setCount(Math.min(12, count + 1)),
								"aria-label": "More kits",
								children: "+"
							})
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [plan === "double" ? "Two adults, one per room." : "One adult in the living room.", plan === "kindling" ? " Kits stay in the nest box until they are out and eating hay." : ""]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-prose text-lg",
				children: summary(model)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Each room",
						value: `${model.sqft.toFixed(1)} sq ft`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Interior",
						value: `${model.compartmentL} × ${model.compartmentD} in`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Height",
						value: `${model.height} in`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Stand",
						value: `${model.stand} in`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: VIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": view === item.id,
								onClick: () => setView(item.id),
								className: cx(chip, view === item.id ? "border-moss bg-moss-soft text-moss" : "border-line bg-sheet"),
								children: item.label
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 overflow-x-auto border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-2xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HutchSheet, {
									model,
									part,
									view,
									onPart: setPart
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Diagonal hatch is 1/2 × 1 in welded wire. Tight grid is 1/4 in mesh. The clay pan is the tray."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: PARTS.filter((item) => item.id !== "nest" || model.nest).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": part === item.id,
							onClick: () => setPart(item.id),
							className: cx(chip, part === item.id ? "border-moss bg-ink text-paper" : "border-line bg-sheet"),
							children: item.label
						}, item.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-4 border border-line bg-sheet p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl",
							children: active.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-col gap-3 text-muted",
							children: active.body.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xl",
					children: "Shopping and cuts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: copyList,
					className: "min-h-11 bg-moss px-4 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss",
					children: copied ? "Copied" : "Copy the list"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line border border-line bg-sheet",
				children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: line.item
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: line.detail
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-moss tabular-nums sm:text-right",
						children: line.qty
					})]
				}, line.item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3 sm:grid-cols-2",
				children: cutList.map((cut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border border-line bg-sheet px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold tabular-nums",
						children: [
							cut.qty,
							" × ",
							cut.size
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: cut.name
					})]
				}, cut.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-2xl",
				children: "Order of work"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 flex flex-col gap-4",
				children: [BUILD_STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_minmax(0,1fr)] gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl text-moss tabular-nums",
						children: index + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step })]
				}, step)), model.nest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_minmax(0,1fr)] gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl text-moss tabular-nums",
						children: BUILD_STEPS.length + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: KINDLE_STEP })]
				}) : null]
			})] })
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-sheet px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-semibold tabular-nums",
			children: value
		})]
	});
}
var NAV = [
	{
		href: "#start",
		label: "Start"
	},
	{
		href: "#droppings",
		label: "Two droppings"
	},
	{
		href: "#plans",
		label: "Hutch plans"
	},
	{
		href: "#raising",
		label: "Raising"
	},
	{
		href: "#health",
		label: "Health"
	},
	{
		href: "#glossary",
		label: "Glossary"
	},
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#log",
		label: "Bench log"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-11 shrink-0 place-items-center bg-moss text-paper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rabbit, {
								className: "size-6",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl leading-tight",
									children: "Rabbits: Burrow Bench"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-muted",
									children: "Raising guide and hutch plans"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted",
									children: "The Education Revolution Pocket Guide, Volume 19: Rabbits"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted",
									children: "by Blue and the Awesome Dudes"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-w-0 flex-1 justify-end gap-1 overflow-x-auto",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold text-ink sm:px-3",
							children: item.label
						}, item.href))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto grid max-w-6xl items-end gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-clay",
									children: "Quarter-inch floor. 1/2 by 1 wire. Tray underneath."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-3 max-w-xl text-4xl text-ink md:text-5xl",
									children: "The bathroom goes under the floor."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-prose text-lg text-muted",
									children: "A hutch is the whole house, so the droppings stay in the house. The mesh lets the waste out. The tray catches it outside the room the rabbit stands in. The part they still need to eat never had to touch that tray."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#plans",
									className: "mt-6 inline-flex min-h-11 items-center bg-moss px-5 font-semibold text-paper",
									children: "Open the hutch plans"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "lg:col-span-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/images/hutch-hero.jpg",
								alt: "Cedar hutch with wire sides, a metal roof, and a galvanized tray pulled out underneath.",
								className: "aspect-video w-full object-cover",
								width: 1792,
								height: 1008
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
								className: "mt-2 text-sm text-muted",
								children: "Wire walls, a solid roof over them, and a tray that slides out under the floor."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-moss text-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-3xl font-display text-2xl leading-snug md:text-3xl",
								children: "Hard pellets are trash. The soft clusters are a meal, and a healthy rabbit takes that meal off their own body — not out of the tray."
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "start",
						className: "border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-moss",
									children: "New to rabbits?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl md:text-4xl",
									children: "Start here"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-6 flex max-w-prose flex-col gap-3",
									children: START_STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "grid grid-cols-[auto_minmax(0,1fr)] gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-xl text-moss tabular-nums",
											children: index + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step })]
									}, step))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "droppings",
						className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid items-start gap-8 lg:grid-cols-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lg:col-span-7",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-clay",
											children: "The part that finally makes sense"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-2 text-3xl md:text-4xl",
											children: "There are two things in the pile"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex max-w-prose flex-col gap-4 text-lg",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you kept rabbits young, you probably scraped a solid floor and got angry at an animal for using the only room it had. They were not failing house-training. A rabbit has no instinct to hold it for a yard they are not allowed in." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "What changes the cleaning is that the pile is two different products. Only one of them is trash." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "font-semibold text-ink",
													children: "Hard pellets"
												}), " are the trash. Small, round, dry, mostly spent hay. They should leave the room. A solid floor makes you the janitor of every one of them, mixed with urine, under the animal."] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "font-semibold text-ink",
													children: "Cecotropes"
												}), " are the second harvest. Soft, glossy, stuck together like a little bunch of grapes, made in the cecum. The rabbit turns and eats them straight from the body, usually in the quiet hours. You are not supposed to serve them from a pan. If the rabbit is well, you will almost never see one."] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "So the tray does not go inside the cage as a buffet. It goes under a quarter-inch mesh floor, outside the living space, where the hard pellets fall and you pull the mess out in one slide. The meal they still need never had to land there." })
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "lg:col-span-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/images/rabbit.jpg",
										alt: "An adult rabbit resting in clean hay.",
										className: "aspect-portrait w-full object-cover",
										width: 1600,
										height: 1200
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
										className: "mt-2 text-sm text-muted",
										children: "A healthy rabbit finishes cecotropes before you see them. Finding them is the signal, not the menu."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-10 grid gap-4 md:grid-cols-3",
								children: FALL_STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border border-line bg-sheet p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-3xl text-moss tabular-nums",
											children: ["0", index + 1]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-2 text-xl",
											children: step.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted",
											children: step.body
										})
									]
								}, step.title))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "mt-10 grid items-center gap-6 border border-line bg-sheet p-4 md:grid-cols-2 md:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/mesh-tray.jpg",
									alt: "Quarter-inch hardware cloth above a tray holding a few hard pellets.",
									className: "aspect-mesh w-full object-cover",
									width: 1728,
									height: 1152
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl",
									children: "Why the bottom is a tighter mesh than the walls"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted",
									children: "Sides and top are 1/2 by 1 inch welded wire. It is stronger than chicken wire and keeps raccoons, dogs, and foxes out. The floor is 1/4 inch hardware cloth so kits cannot slip through and hard pellets still can. The tray lives in that gap, in the hutch and outside the cage."
								})] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "plans",
						className: "border-t border-line bg-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-moss",
									children: "The bench"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 max-w-2xl text-3xl md:text-4xl",
									children: "Draw the hutch, then cut it"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 max-w-prose text-muted",
									children: [
										"Pick the animal and the plan. The sheet, the shopping list, and the order of work follow. These are minimum hutch sizes. A rabbit should be able to stand fully upright, stretch out, and take at least three hops. Every rabbit also needs time every day in a larger, safe exercise pen or rabbit-proofed room. Pet rabbits can live indoors with a litter box instead of a hutch. See the",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://rabbit.org",
											className: "font-semibold text-moss underline",
											children: "House Rabbit Society"
										}),
										" ",
										"(rabbit.org). Measure twice anyway."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "raising",
						className: "border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-moss",
									children: "Keeping them"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl md:text-4xl",
									children: "Raising, once the floor is right"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 grid gap-6 lg:grid-cols-2",
									children: CHAPTERS.map((chapter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										id: chapter.id,
										className: "border border-line bg-sheet p-5 md:p-6",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-2xl",
												children: chapter.title
											}),
											chapter.paragraphs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-3 flex flex-col gap-3 text-muted",
												children: chapter.paragraphs.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph))
											}) : null,
											chapter.bullets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-4 list-disc pl-5 text-muted",
												children: chapter.bullets.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
											}) : null
										]
									}, chapter.title))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "glossary",
						className: "border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-moss",
									children: "Words on the bench"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl md:text-4xl",
									children: "Glossary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "mt-8 grid gap-px border border-line bg-line sm:grid-cols-2",
									children: GLOSSARY.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-sheet px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "font-semibold",
											children: entry.term
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-muted",
											children: entry.def
										})]
									}, entry.term))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "about",
						className: "border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-moss",
									children: "Volume 19"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl md:text-4xl",
									children: "About and disclaimer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex max-w-prose flex-col gap-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This pocket guide is for learning and is not veterinary care. Always ask a rabbit-savvy vet. Pet poison emergency: ASPCA Animal Poison Control (888) 426-4435 (a fee may apply). Blue and the Awesome Dudes, who have raised rescue rabbits, are not responsible for illness, injury, or loss. Part of The Education Revolution pocket guide series." })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "log",
						className: "border-t border-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-moss",
									children: "On this device"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl md:text-4xl",
									children: "Bench log"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-prose text-muted",
									children: "A short list of the work the mesh does not do for you. Mark it as you go. It stays in this browser."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareLog, {})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-8 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-prose text-sm text-muted",
						children: "Burrow Bench is a shop and husbandry guide, not veterinary care. A rabbit who will not eat, will not pass hard pellets, or sits hunched and grinding needs a vet the same day — the tray cannot fix that. Flemish Giants and other giants want more length than the large plan."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-prose text-sm text-muted",
						children: "Privacy: This guide does not collect your name, email, or any personal information. Your bench log is saved only on your own device."
					})]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
