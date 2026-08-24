import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ClipboardList,
  Compass,
  Copy,
  Fish,
  FileText,
  Hotel,
  ListChecks,
  MapPin,
  NotebookPen,
  Phone,
  Ship,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DayCompare } from "@/components/guide/DayCompare";
import { LakeMark } from "@/components/guide/LakeMark";
import { SpotBlock } from "@/components/guide/SpotBlock";
import {
  DAYS,
  HOTEL,
  OVERVIEW,
  RESTAURANTS,
  TIPS,
  type DayId,
  type Plan,
} from "@/lib/guide-data";
import { PHOTO_POLICY, XHS_FILTER, spotsByIds } from "@/lib/spots";
import { XHS_BRIEF } from "@/lib/xhs-brief";
import { usePlanStore } from "@/lib/plan-store";
import { cn } from "@/lib/utils";

type Tab = "home" | DayId | "food" | "tips" | "mine" | "brief";

const BOTTOM_TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "概览" },
  { id: "fri", label: "周五" },
  { id: "sat", label: "周六" },
  { id: "sun", label: "周日" },
  { id: "food", label: "美食" },
];

export function GuideApp() {
  const [tab, setTab] = useState<Tab>("brief");
  const [mounted, setMounted] = useState(false);
  const picks = usePlanStore((s) => s.picks);
  const pickedCount = useMemo(
    () => Object.values(picks).filter(Boolean).length,
    [picks],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? pickedCount : 0;

  return (
    <div className="bg-bg text-fg min-h-dvh">
      <header className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-3xl items-start gap-3 px-5 pt-8 pb-5">
          <LakeMark className="mt-0.5 size-12 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-widest opacity-80">
              QIANDAO LAKE · FAMILY
            </p>
            <h1 className="mt-1 text-3xl leading-tight font-medium">
              千岛湖亲子自驾攻略
            </h1>
            <p className="mt-2 text-sm opacity-85">
              郝力克酒店 · 周五至周日 · 不辣鱼头
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => setTab("brief")}
              aria-label="攻略交接全文"
              aria-current={tab === "brief" ? "page" : undefined}
              className={cn(
                "grid size-11 place-items-center rounded-md transition-colors duration-[var(--motion-quick)]",
                tab === "brief"
                  ? "bg-surface text-accent"
                  : "text-accent-foreground hover:bg-accent-foreground/10",
              )}
            >
              <FileText className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setTab("tips")}
              aria-label="出行备忘"
              aria-current={tab === "tips" ? "page" : undefined}
              className={cn(
                "grid size-11 place-items-center rounded-md transition-colors duration-[var(--motion-quick)]",
                tab === "tips"
                  ? "bg-surface text-accent"
                  : "text-accent-foreground hover:bg-accent-foreground/10",
              )}
            >
              <ClipboardList className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setTab("mine")}
              aria-label="我的行程"
              aria-current={tab === "mine" ? "page" : undefined}
              className={cn(
                "relative grid size-11 place-items-center rounded-md transition-colors duration-[var(--motion-quick)]",
                tab === "mine"
                  ? "bg-surface text-accent"
                  : "text-accent-foreground hover:bg-accent-foreground/10",
              )}
            >
              <NotebookPen className="size-5" />
              {count > 0 ? (
                <span className="bg-surface text-accent absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full text-xs font-semibold tabular-nums">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pt-6 pb-28">
        {tab === "brief" && <BriefSection />}
        {tab === "home" && <Home onOpenDay={(id) => setTab(id)} onOpenBrief={() => setTab("brief")} />}
        {(tab === "fri" || tab === "sat" || tab === "sun") && (
          <DaySection dayId={tab} mounted={mounted} />
        )}
        {tab === "food" && <FoodSection />}
        {tab === "tips" && <TipsSection />}
        {tab === "mine" && (
          <MineSection onJump={(id) => setTab(id)} mounted={mounted} />
        )}
      </main>

      <nav
        className="border-border bg-surface pb-safe fixed inset-x-0 bottom-0 z-20 border-t"
        aria-label="攻略章节"
      >
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {BOTTOM_TABS.map((t) => {
            const active = tab === t.id;
            const dayPick =
              mounted && (t.id === "fri" || t.id === "sat" || t.id === "sun")
                ? picks[t.id]
                : null;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors duration-[var(--motion-quick)]",
                  active ? "text-accent" : "text-muted hover:text-fg",
                )}
              >
                {active ? (
                  <span className="bg-accent absolute top-0 h-0.5 w-8 rounded-full" />
                ) : null}
                <span>{t.label}</span>
                {dayPick ? (
                  <span className="text-subtle text-xs tabular-nums">
                    方案 {dayPick}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function Home({
  onOpenDay,
  onOpenBrief,
}: {
  onOpenDay: (id: DayId) => void;
  onOpenBrief: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onOpenBrief}
        className="bg-accent text-accent-foreground shadow-card flex min-h-11 items-center justify-between rounded-xl px-4 py-4 text-left"
      >
        <div>
          <p className="text-sm font-medium">导出完整攻略给 Grok</p>
          <p className="mt-0.5 text-xs opacity-85">
            一键复制全文，换到另一台 Grok 接着做
          </p>
        </div>
        <span className="text-xs font-medium">打开</span>
      </button>

      <p className="text-muted text-sm leading-relaxed">
        点底部「周五 / 周六 / 周日」看每天 3 套对照。点开方案看实拍和时间轴，再选用。
      </p>

      <p className="bg-elevated text-muted rounded-lg px-4 py-3 text-xs leading-relaxed">
        {PHOTO_POLICY} {XHS_FILTER}
      </p>

      <figure className="bg-surface shadow-card overflow-hidden rounded-xl">
        <img
          src="/spots/chunan-aerial-2020.jpg"
          alt="2020年航拍淳安县城与千岛湖"
          width={1280}
          height={720}
          className="h-48 w-full object-cover sm:h-56"
        />
        <figcaption className="text-subtle px-4 py-3 text-xs leading-relaxed">
          2020-07 航拍淳安县城（千岛湖镇）与湖面 · MasaneMiyaPA · Wikimedia CC
          BY-SA 4.0。这不是界首华美胜地；酒店在湖的另一侧，开车约 40–50 分钟。
        </figcaption>
      </figure>

      <section className="bg-surface shadow-card rounded-xl p-5">
        <h2 className="text-lg font-medium">行程概览</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {OVERVIEW.map((item) => (
            <div key={item.k} className="bg-bg rounded-md px-4 py-3">
              <p className="text-accent text-xs font-medium tracking-wide">
                {item.k}
              </p>
              <p className="mt-1 text-sm font-medium">{item.v}</p>
              <p className="text-muted mt-0.5 text-xs">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface shadow-card rounded-xl p-5">
        <div className="flex items-center gap-2">
          <Hotel className="text-accent size-4" />
          <h2 className="text-lg font-medium">住宿</h2>
        </div>
        <p className="mt-3 text-sm font-medium">{HOTEL.name}</p>
        <p className="text-muted mt-1 flex items-start gap-1.5 text-sm">
          <MapPin className="mt-0.5 size-3.5 shrink-0" />
          {HOTEL.address}
        </p>
        <p className="text-muted mt-1 flex items-center gap-1.5 text-sm">
          <Phone className="size-3.5 shrink-0" />
          {HOTEL.phone}
        </p>
        <p className="text-muted mt-1 text-sm">入住 {HOTEL.checkIn}</p>
        <CopyButton
          text={`${HOTEL.name} ${HOTEL.address}`}
          label="复制酒店地址"
        />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium">三天怎么玩</h2>
        <div className="flex flex-col gap-3">
          {DAYS.map((day) => (
            <button
              key={day.id}
              type="button"
              onClick={() => onOpenDay(day.id)}
              className="bg-surface shadow-card hover:shadow-card-hover flex min-h-11 items-center justify-between rounded-xl px-4 py-4 text-left transition-[box-shadow] duration-[var(--motion-quick)]"
            >
              <div>
                <p className="text-sm font-medium">
                  {day.label}
                  <span className="text-muted ml-2 font-normal">
                    {day.weekday}
                  </span>
                </p>
                <p className="text-muted mt-0.5 text-xs">{day.subtitle}</p>
              </div>
              <span className="text-accent text-xs font-medium">
                3 套方案
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function DaySection({ dayId, mounted }: { dayId: DayId; mounted: boolean }) {
  const day = DAYS.find((d) => d.id === dayId)!;
  const pick = usePlanStore((s) => s.picks[dayId]);
  const setPick = usePlanStore((s) => s.setPick);
  const shownPick = mounted ? pick : null;

  return (
    <div>
      <p className="text-accent text-xs font-medium tracking-widest">
        {day.weekday}
      </p>
      <h2 className="mt-1 text-2xl font-medium">{day.label}</h2>
      <p className="text-muted mt-2 text-sm">{day.subtitle}</p>
      <p className="text-muted mt-2 text-sm leading-relaxed">{day.note}</p>
      <div className="mt-5">
        <DayCompare day={day} />
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {day.plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={shownPick === plan.id}
            onSelect={() => setPick(dayId, plan.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  const [open, setOpen] = useState(plan.recommended ?? false);

  return (
    <article
      className={cn(
        "bg-surface shadow-card overflow-hidden rounded-xl transition-[box-shadow] duration-[var(--motion-quick)]",
        selected && "shadow-card-hover",
      )}
    >
      <button
        type="button"
        className="flex w-full items-start gap-3 px-4 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className={cn(
            "mt-0.5 grid size-8 shrink-0 place-items-center rounded-md text-sm font-semibold",
            selected
              ? "bg-accent text-accent-foreground"
              : "bg-elevated text-accent",
          )}
        >
          {plan.id}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">{plan.title}</span>
            <Badge variant={plan.recommended ? "default" : "muted"}>
              {plan.tag}
            </Badge>
            {selected ? <Badge>已选</Badge> : null}
          </span>
          <span className="text-muted mt-1 block text-xs">{plan.fit}</span>
        </span>
        <ChevronDown
          className={cn(
            "text-muted mt-1 size-4 shrink-0 transition-transform duration-[var(--motion-fast)]",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="border-border space-y-4 border-t px-4 pt-3 pb-4 text-sm">
          <ol className="space-y-2">
            {plan.hours.map((h) => (
              <li key={h.t + h.what} className="flex gap-3">
                <span className="text-accent w-12 shrink-0 font-medium tabular-nums">
                  {h.t}
                </span>
                <span>{h.what}</span>
              </li>
            ))}
          </ol>
          <p>
            <span className="text-muted">路线 · </span>
            {plan.route}
          </p>
          <p>
            <span className="text-muted">吃饭 · </span>
            {plan.meals}
          </p>
          <p>
            <span className="text-muted">带娃 · </span>
            {plan.kid}
          </p>
          <div>
            <p className="text-muted mb-1.5">和其他两套的差别</p>
            <ul className="space-y-1.5">
              {plan.vsOthers.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            {spotsByIds(plan.spotIds).map((spot) => (
              <SpotBlock key={spot.id} spot={spot} />
            ))}
          </div>
          <ul className="text-muted space-y-1.5">
            {plan.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                {d}
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant={selected ? "default" : "secondary"}
            className="w-full"
            onClick={onSelect}
          >
            {selected ? (
              <>
                <Check className="size-4" />
                已选此方案
              </>
            ) : (
              "选用此方案"
            )}
          </Button>
        </div>
      )}
    </article>
  );
}

function FoodSection() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Fish className="text-accent size-4" />
        <h2 className="text-2xl font-medium">不辣 · 干净餐厅</h2>
      </div>
      <p className="text-muted mt-2 text-sm leading-relaxed">
        点菜口令：「砂锅浓汤 / 奶白鱼头汤，不辣、少盐、清淡」。优先有机淳牌鱼。镇上餐厅距酒店约
        40–50 分钟。
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {RESTAURANTS.map((r) => (
          <article
            key={r.id}
            className="bg-surface shadow-card rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-subtle text-xs tabular-nums">0{r.rank}</p>
                <h3 className="mt-0.5 text-base font-medium">{r.name}</h3>
              </div>
              {r.nearHotel ? <Badge>酒店内</Badge> : null}
            </div>
            <p className="text-muted mt-2 text-xs">
              {r.area} · {r.price}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{r.why}</p>
            <p className="text-accent mt-2 text-sm">建议点：{r.order}</p>
            <CopyButton text={r.name} label="复制店名" />
          </article>
        ))}
      </div>
    </div>
  );
}

function TipsSection() {
  const tips = usePlanStore((s) => s.tips);
  const toggle = usePlanStore((s) => s.toggleTip);

  return (
    <div>
      <div className="flex items-center gap-2">
        <ListChecks className="text-accent size-4" />
        <h2 className="text-2xl font-medium">出行备忘</h2>
      </div>
      <p className="text-muted mt-2 text-sm">点一下可勾掉已完成的事项。</p>
      <div className="mt-5 flex flex-col gap-2">
        {TIPS.map((tip) => {
          const on = !!tips[tip.id];
          return (
            <button
              key={tip.id}
              type="button"
              onClick={() => toggle(tip.id)}
              className={cn(
                "bg-surface shadow-card flex min-h-11 items-start gap-3 rounded-xl px-4 py-4 text-left",
                on && "opacity-60",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm border",
                  on
                    ? "bg-accent border-accent text-accent-foreground"
                    : "border-border",
                )}
              >
                {on ? <Check className="size-3.5" /> : null}
              </span>
              <span>
                <span className="block text-sm font-medium">{tip.title}</span>
                <span className="text-muted mt-1 block text-sm leading-relaxed">
                  {tip.body}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MineSection({
  onJump,
  mounted,
}: {
  onJump: (id: DayId | "food") => void;
  mounted: boolean;
}) {
  const picks = usePlanStore((s) => s.picks);
  const reset = usePlanStore((s) => s.reset);

  return (
    <div>
      <div className="flex items-center gap-2">
        <NotebookPen className="text-accent size-4" />
        <h2 className="text-2xl font-medium">我的行程</h2>
      </div>
      <p className="text-muted mt-2 text-sm">
        在每天方案里点「选用此方案」，会记在这页，方便对照。
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {DAYS.map((day) => {
          const plan = mounted
            ? day.plans.find((p) => p.id === picks[day.id])
            : undefined;
          return (
            <article
              key={day.id}
              className="bg-surface shadow-card rounded-xl p-4"
            >
              <p className="text-muted text-xs">{day.label}</p>
              {plan ? (
                <>
                  <p className="mt-1 text-sm font-medium">
                    方案 {plan.id} · {plan.title}
                  </p>
                  <p className="text-muted mt-1 text-sm">{plan.meals}</p>
                </>
              ) : (
                <p className="text-muted mt-1 text-sm">还没选</p>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 -ml-2"
                onClick={() => onJump(day.id)}
              >
                {plan ? "改方案" : "去选择"}
              </Button>
            </article>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => onJump("food")}>
          <UtensilsCrossed className="size-4" />
          看餐厅
        </Button>
        <Button variant="ghost" onClick={reset}>
          清空选择
        </Button>
      </div>
      <div className="bg-elevated mt-6 rounded-xl p-4 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <Ship className="text-accent size-4" />
          周五船票
        </p>
        <p className="text-muted mt-2 leading-relaxed">
          微信「千岛湖旅游」实名预约。方案 A 走中心湖区，方案 B
          走东南湖区，方案 C 可不上大船。
        </p>
        <p className="text-muted mt-2 flex items-center gap-2">
          <Compass className="size-4 shrink-0" />
          导航搜「千岛湖郝力克酒店」
        </p>
      </div>
    </div>
  );
}

function BriefSection() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-accent text-xs font-medium tracking-widest">
          复制后发给新的 Grok
        </p>
        <h2 className="mt-1 text-2xl font-medium">攻略交接全文</h2>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          下面是这三天三套方案、餐厅、景点和照片规矩的完整稿。点复制，粘贴到另一台
          Grok，让它接着改，不用从头讲。
        </p>
        <CopyButton text={XHS_BRIEF} label="一键复制全文" strong />
      </div>
      <pre className="bg-surface shadow-card max-h-[70vh] overflow-auto rounded-xl px-4 py-4 text-xs leading-relaxed whitespace-pre-wrap">
        {XHS_BRIEF}
      </pre>
    </div>
  );
}

function CopyButton({
  text,
  label,
  strong,
}: {
  text: string;
  label: string;
  strong?: boolean;
}) {
  const [done, setDone] = useState(false);

  return (
    <Button
      type="button"
      variant={strong ? "default" : "ghost"}
      size={strong ? "default" : "sm"}
      className={strong ? "mt-4" : "mt-2 -ml-2"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1600);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}
      {done ? "已复制" : label}
    </Button>
  );
}
