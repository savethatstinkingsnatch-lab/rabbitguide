import { createFileRoute } from "@tanstack/react-router";
import { Rabbit } from "lucide-react";
import { CareLog } from "@/components/care-log";
import { Studio } from "@/components/studio";
import { CHAPTERS, FALL_STEPS, GLOSSARY, START_STEPS } from "@/lib/hutch";

export const Route = createFileRoute("/")({ component: Home });

const NAV = [
  { href: "#start", label: "Start" },
  { href: "#droppings", label: "Two droppings" },
  { href: "#plans", label: "Hutch plans" },
  { href: "#raising", label: "Raising" },
  { href: "#health", label: "Health" },
  { href: "#glossary", label: "Glossary" },
  { href: "#about", label: "About" },
  { href: "#log", label: "Bench log" },
];

function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center md:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center bg-moss text-paper">
              <Rabbit className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xl leading-tight">Rabbits: Burrow Bench</span>
              <span className="block text-sm text-muted">Raising guide and hutch plans</span>
              <span className="block text-xs text-muted">
                The Education Revolution Pocket Guide, Volume 19: Rabbits
              </span>
              <span className="block text-xs text-muted">by Blue and the Awesome Dudes</span>
            </span>
          </a>
          <nav className="flex min-w-0 flex-1 justify-end gap-1 overflow-x-auto">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold text-ink sm:px-3"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-end gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-sm font-semibold text-clay">Solid floor. Secure hutch. Litter pan inside.</p>
            <h1 className="mt-3 max-w-xl text-4xl text-ink md:text-5xl">Start with a safe floor.</h1>
            <p className="mt-4 max-w-prose text-lg text-muted">
              A hutch needs a dry, non-slip floor that protects a rabbit's feet. Put an easy-clean litter pan
              inside, and give the rabbit daily exercise in a larger safe area.
            </p>
            <a
              href="#plans"
              className="mt-6 inline-flex min-h-11 items-center bg-moss px-5 font-semibold text-paper"
            >
              Open the hutch plans
            </a>
          </div>
          <figure className="lg:col-span-6">
            <img
              src="/images/hutch-hero.jpg"
              alt="A secure outdoor hutch with wire sides, a solid roof, and a solid floor."
              className="aspect-video w-full object-cover"
              width={1792}
              height={1008}
            />
            <figcaption className="mt-2 text-sm text-muted">
              Secure wire walls, weather protection, and a solid floor with a litter pan inside.
            </figcaption>
          </figure>
        </section>

        <section className="bg-moss text-paper">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
            <p className="max-w-3xl font-display text-2xl leading-snug md:text-3xl">
              Rabbits eat cecotropes directly. Keep the litter area clean, and ask a rabbit-savvy veterinarian if
              soft clusters are repeatedly left uneaten.
            </p>
          </div>
        </section>

        <section id="start" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">New to rabbits?</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Start here</h2>
            <ol className="mt-6 flex max-w-prose flex-col gap-3">
              {START_STEPS.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <span className="font-display text-xl text-moss tabular-nums">{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="droppings" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-clay">The part that finally makes sense</p>
              <h2 className="mt-2 text-3xl md:text-4xl">There are two things in the pile</h2>
              <div className="mt-4 flex max-w-prose flex-col gap-4 text-lg">
                <p>
                  If you kept rabbits young, you probably scraped a solid floor and got angry at an animal for using
                  the only room it had. They were not failing house-training. A rabbit has no instinct to hold it
                  for a yard they are not allowed in.
                </p>
                <p>
                  Rabbits produce hard fecal pellets and softer cecotropes. Cecotropes are normally eaten directly
                  from the body; they are not food to collect from a litter pan.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Hard fecal pellets</strong> are usually small, round,
                  and dry. Remove them and soiled litter regularly to keep the enclosure clean.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Cecotropes</strong> are soft,
                  glossy clusters made in the cecum. Rabbits usually eat them directly from the body. Repeatedly
                  finding uneaten clusters can have several causes; discuss persistent or accompanied changes with
                  a rabbit-savvy vet.
                </p>
                <p>
                  Use a solid, dry, non-slip floor and place a low-sided litter pan inside the enclosure. Choose
                  rabbit-safe litter, clean it regularly, and keep bedding dry.
                </p>
              </div>
            </div>
            <figure className="lg:col-span-5">
              <img
                src="/images/rabbit.jpg"
                alt="An adult rabbit resting in clean hay."
                className="aspect-portrait w-full object-cover"
                width={1600}
                height={1200}
              />
              <figcaption className="mt-2 text-sm text-muted">
                Cecotropes are normally eaten directly; repeated uneaten clusters can warrant a diet and health check.
              </figcaption>
            </figure>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {FALL_STEPS.map((step, index) => (
              <li key={step.title} className="border border-line bg-sheet p-5">
                <p className="font-display text-3xl text-moss tabular-nums">0{index + 1}</p>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <figure className="mt-10 grid items-center gap-6 border border-line bg-sheet p-4 md:grid-cols-2 md:p-6">
            <img
              src="/images/hutch-hero.jpg"
              alt="A secure hutch with a solid floor and a protected roof."
              className="aspect-mesh w-full object-cover"
              width={1728}
              height={1152}
            />
            <figcaption>
              <h3 className="text-2xl">Why the living floor should be solid</h3>
              <p className="mt-3 text-muted">
                A solid, non-slip floor helps protect a rabbit's feet. Use sturdy, well-fastened welded wire on
                exposed sides, a secure latch, a weatherproof roof, and a litter pan inside the living area. Check
                the hutch often for damage and keep it shaded and ventilated.
              </p>
            </figcaption>
          </figure>
        </section>

        <section id="plans" className="border-t border-line bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">The bench</p>
            <h2 className="mt-2 max-w-2xl text-3xl md:text-4xl">Draw the hutch, then cut it</h2>
            <p className="mt-3 max-w-prose text-muted">
              Pick the animal and the plan. The sheet, shopping list, and order of work follow. These dimensions
              are starting points, not universal minimums. Measure the adult rabbit and enlarge the room so it can
              stand fully upright, stretch out, turn, and move freely. A hutch alone is not a full-time home:
              provide a much larger secure exercise area with frequent access. Pet rabbits can live indoors with a
              litter box and exercise space instead of a hutch. See the{" "}
              <a href="https://rabbit.org" className="font-semibold text-moss underline">
                House Rabbit Society
              </a>{" "}
              (rabbit.org). Measure twice anyway.
            </p>
            <div className="mt-8">
              <Studio />
            </div>
          </div>
        </section>

        <aside className="border-t border-line bg-moss-soft">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
            <div className="max-w-prose border-l-4 border-clay bg-sheet px-5 py-6 md:px-8">
              <p className="text-sm font-semibold text-clay">A family note, not vet advice</p>
              <h2 className="mt-2 text-2xl md:text-3xl">What worked for us</h2>
              <div className="mt-4 flex flex-col gap-4">
                <p>
                  Growing up in Joliet, Illinois, we kept our rescue rabbits in hutches under the trees. The shade
                  kept them comfortable through hot summers and cold winters, and they stayed healthy.
                </p>
                <p>
                  Our biggest danger wasn't weather. It was the neighbors' dogs, which broke into the hutches and
                  killed rabbits. Build strong: use welded wire, not chicken wire, add sturdy latches, and if you
                  can, put a fence around the hutch area.
                </p>
                <p>
                  When a rabbit is very sick, contact a rabbit-savvy veterinarian or emergency clinic for humane
                  care. A rescue or shelter may help locate veterinary support or discuss available options. Do
                  not attempt euthanasia at home.
                </p>
                <p className="font-display text-xl">— Blue</p>
              </div>
            </div>
          </div>
        </aside>

        <section id="raising" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">Keeping them</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Raising, once the floor is right</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {CHAPTERS.map((chapter) => (
                <article key={chapter.title} id={chapter.id} className="border border-line bg-sheet p-5 md:p-6">
                  <h3 className="text-2xl">{chapter.title}</h3>
                  {chapter.paragraphs.length > 0 ? (
                    <div className="mt-3 flex flex-col gap-3 text-muted">
                      {chapter.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {chapter.bullets ? (
                    <ul className="mt-4 list-disc pl-5 text-muted">
                      {chapter.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="glossary" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">Words on the bench</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Glossary</h2>
            <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
              {GLOSSARY.map((entry) => (
                <div key={entry.term} className="bg-sheet px-4 py-3">
                  <dt className="font-semibold">{entry.term}</dt>
                  <dd className="text-muted">{entry.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">Volume 19</p>
            <h2 className="mt-2 text-3xl md:text-4xl">About and disclaimer</h2>
            <div className="mt-4 flex max-w-prose flex-col gap-4">
              <p>
                This pocket guide is for learning and is not veterinary care. Always ask a rabbit-savvy vet. Pet
                poison emergency: ASPCA Animal Poison Control (888) 426-4435 (a fee may apply). Blue and the Awesome
                Dudes, who have raised rescue rabbits, are not responsible for illness, injury, or loss. Part of The
                Education Revolution pocket guide series.
              </p>
            </div>
          </div>
        </section>

        <section id="log" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">On this device</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Bench log</h2>
            <p className="mt-3 max-w-prose text-muted">
              A short list of daily care tasks. Mark them as you go; the log stays in this browser.
            </p>
            <div className="mt-8">
              <CareLog />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <p className="max-w-prose text-sm text-muted">
            Burrow Bench is a shop and husbandry guide, not veterinary care. A rabbit who will not eat, will not
            pass hard pellets, or sits hunched and grinding needs prompt veterinary advice. Do not wait for a 12-hour mark if the rabbit is unwell.
            Flemish Giants and other giants want more length than the large plan.
          </p>
          <p className="mt-3 max-w-prose text-sm text-muted">
            Privacy: This guide does not collect your name, email, or any personal information. Your bench log is
            saved only on your own device.
          </p>
        </div>
      </footer>
    </div>
  );
}
