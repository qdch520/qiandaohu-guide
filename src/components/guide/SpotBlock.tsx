import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Spot } from "@/lib/spots";
import { xhsSearchUrl } from "@/lib/spots";

export function SpotBlock({ spot }: { spot: Spot }) {
  return (
    <article className="bg-bg rounded-lg p-3">
      <p className="text-subtle text-xs">{spot.area}</p>
      <h4 className="mt-0.5 text-sm font-medium">{spot.name}</h4>
      {spot.photos.length > 0 ? (
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {spot.photos.map((photo) => (
            <figure key={photo.src} className="w-56 shrink-0 sm:w-64">
              <img
                src={photo.src}
                alt={photo.alt}
                width={1280}
                height={960}
                loading="lazy"
                className="border-border h-40 w-full rounded-md border object-cover"
              />
              <figcaption className="text-subtle mt-1.5 text-xs leading-relaxed">
                {photo.caption}
                <span className="mt-0.5 block">
                  {photo.year} · {photo.credit}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="border-border bg-elevated text-muted mt-3 rounded-md border border-dashed px-3 py-2 text-xs leading-relaxed">
          {spot.noPhoto ?? "不配图"}
        </p>
      )}
      {spot.liveNote ? (
        <p className="text-accent mt-3 text-xs leading-relaxed">
          {spot.liveNote}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed">{spot.see}</p>
      <p className="text-muted mt-2 text-sm leading-relaxed">
        带娃 · {spot.kid}
      </p>
      <p className="text-muted mt-1 text-sm leading-relaxed">
        花费 · {spot.pay}
      </p>
      <XhsRow keyword={spot.xhsKeyword} />
    </article>
  );
}

function XhsRow({ keyword }: { keyword: string }) {
  const [done, setDone] = useState(false);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <p className="text-subtle w-full text-xs">
        小红书词 · {keyword}
      </p>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(keyword);
            setDone(true);
            window.setTimeout(() => setDone(false), 1600);
          } catch {
            setDone(false);
          }
        }}
      >
        {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {done ? "已复制" : "复制搜索词"}
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <a
          href={xhsSearchUrl(keyword)}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink className="size-3.5" />
          打开小红书
        </a>
      </Button>
    </div>
  );
}
