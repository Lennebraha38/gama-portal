"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function KatilimSayaci({ slug }: { slug: string }) {
  const [sayi, setSayi] = useState<number | null>(null);

  useEffect(() => {
    let iptal = false;
    async function yukle() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("icerik_etkinlikler")
        .select("katilim_sayisi")
        .eq("slug", slug)
        .single();
      if (error || iptal) return;
      setSayi(data?.katilim_sayisi ?? 0);
    }
    yukle();
    return () => {
      iptal = true;
    };
  }, [slug]);

  if (sayi === null) return null;

  return (
    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
      {sayi} genç kayıtlı
    </span>
  );
}