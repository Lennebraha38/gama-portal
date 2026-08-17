"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export function UyelikRozeti() {
  const [uyeMi, setUyeMi] = useState(false);

  useEffect(() => {
    let iptal = false;
    async function yukle() {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (!iptal) setUyeMi(Boolean(data.session));
    }
    yukle();
    return () => {
      iptal = true;
    };
  }, []);

  if (!uyeMi) return null;

  return (
    <Link
      href="/uye"
      title="Gama Üyesi hesabın"
      className="hidden rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/20 sm:block"
    >
      Üye
    </Link>
  );
}