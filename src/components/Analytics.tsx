import { siteConfig } from "@/lib/site";

export function Analytics() {
  const site = siteConfig.analytics.goatcounter;
  if (!site) return null;
  return (
    <script
      data-goatcounter={`https://${site}.goatcounter.com/count`}
      async
      src="//gc.zgo.at/count.js"
    />
  );
}
