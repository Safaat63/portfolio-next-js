"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogFilters({ tags }: { tags: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTag = searchParams.get("tag") ?? "";

  const updateParams = useCallback(
    (next: { q?: string; tag?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.q !== undefined) {
        if (next.q) params.set("q", next.q);
        else params.delete("q");
      }
      if (next.tag !== undefined) {
        if (next.tag) params.set("tag", next.tag);
        else params.delete("tag");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ q: query }), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, updateParams]);

  const clearAll = () => {
    setQuery("");
    router.push(pathname, { scroll: false });
  };

  const hasFilters = query.trim().length > 0 || activeTag.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
          className="input-field !pl-11"
        />
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-teal-400/50 hover:text-white"
            aria-label="Clear filters"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParams({ tag: "" })}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
            !activeTag
              ? "border-teal-400/50 bg-teal-400/15 text-teal-300"
              : "border-white/10 bg-white/5 text-slate-400 hover:border-teal-400/40 hover:text-white"
          )}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => updateParams({ tag: activeTag === tag ? "" : tag })}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
              activeTag === tag
                ? "border-teal-400/50 bg-teal-400/15 text-teal-300"
                : "border-white/10 bg-white/5 text-slate-400 hover:border-teal-400/40 hover:text-white"
            )}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
