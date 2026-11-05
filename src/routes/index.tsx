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
            <p className="text-sm font-semibold text-clay">Quarter-inch floor. 1/2 by 1 wire. Tray underneath.</p>
            <h1 className="mt-3 max-w-xl text-4xl text-ink md:text-5xl">The bathroom goes under the floor.</h1>
            <p className="mt-4 max-w-prose text-lg text-muted">
              A hutch is the whole house, so the droppings stay in the house. The mesh lets the waste out. The
              tray catches it outside the room the rabbit stands in. The part they still need to eat never had to
              touch that tray.
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
              alt="Cedar hutch with wire sides, a metal roof, and a galvanized tray pulled out underneath."
              className="aspect-video w-full object-cover"
              width={1792}
              height={1008}
            />
            <figcaption className="mt-2 text-sm text-muted">
              Wire walls, a solid roof over them, and a tray that slides out under the floor.
            </figcaption>
          </figure>
        </section>

        <section className="bg-moss text-paper">
          <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
            <p className="max-w-3xl font-display text-2xl leading-snug md:text-3xl">
              Hard pellets are trash. The soft clusters are a meal, and a healthy rabbit takes that meal off their
              own body — not out of the tray.
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
                  What changes the cleaning is that the pile is two different products. Only one of them is trash.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Hard pellets</strong> are the trash. Small, round, dry,
                  mostly spent hay. They should leave the room. A solid floor makes you the janitor of every one of
                  them, mixed with urine, under the animal.
                </p>
                <p>
                  <strong className="font-semibold text-ink">Cecotropes</strong> are the second harvest. Soft,
                  glossy, stuck together like a little bunch of grapes, made in the cecum. The rabbit turns and eats
                  them straight from the body, usually in the quiet hours. You are not supposed to serve them from a
                  pan. If the rabbit is well, you will almost never see one.
                </p>
                <p>
                  So the tray does not go inside the cage as a buffet. It goes under a quarter-inch mesh floor,
                  outside the living space, where the hard pellets fall and you pull the mess out in one slide. The
                  meal they still need never had to land there.
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
                A healthy rabbit finishes cecotropes before you see them. Finding them is the signal, not the menu.
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
              src="/images/mesh-tray.jpg"
              alt="Quarter-inch hardware cloth above a tray holding a few hard pellets."
              className="aspect-mesh w-full object-cover"
              width={1728}
              height={1152}
            />
            <figcaption>
              <h3 className="text-2xl">Why the bottom is a tighter mesh than the walls</h3>
              <p className="mt-3 text-muted">
                Sides and top are 1/2 by 1 inch welded wire. It is stronger than chicken wire and keeps raccoons, dogs,
                and foxes out. The floor is 1/4 inch hardware cloth so kits cannot slip through and hard pellets still
                can. The tray lives in that gap, in the hutch and outside the cage.
              </p>
            </figcaption>
          </figure>
        </section>

        <section id="plans" className="border-t border-line bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <p className="text-sm font-semibold text-moss">The bench</p>
            <h2 className="mt-2 max-w-2xl text-3xl md:text-4xl">Draw the hutch, then cut it</h2>
            <p className="mt-3 max-w-prose text-muted">
              Pick the animal and the plan. The sheet, the shopping list, and the order of work follow. These are
              minimum hutch sizes. A rabbit should be able to stand fully upright, stretch out, and take at least
              three hops. Every rabbit also needs time every day in a larger, safe exercise pen or rabbit-proofed
              room. Pet rabbits can live indoors with a litter box instead of a hutch. See the{" "}
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
                  We didn't have money for a vet. Once, a baby was very sick, and we had to put it down ourselves
                  and bury it deep so no other animal got sick. If you are ever in that spot, call a local rabbit
                  rescue, animal shelter, or experienced breeder first. Many will help with a quick, humane end at
                  low or no cost.
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
              A short list of the work the mesh does not do for you. Mark it as you go. It stays in this browser.
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
            pass hard pellets, or sits hunched and grinding needs a vet the same day — the tray cannot fix that.
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
