#!/usr/bin/env bash
# gama.is-a.dev alan adı geçiş scripti
#
# Kullanım:
#   scripts/domain-gec.sh            # Değişiklikleri uygula (basePath + siteUrl)
#   scripts/domain-gec.sh --geri-al  # GitHub Pages URL'sine geri dön
#
# Not: is-a.dev PR'ı merge olduktan SONRA çalıştır.
# Ardından GitHub Pages ayarlarından custom domain yapılmalı (aşağıda anlatılıyor).
set -euo pipefail

SITE_TS="src/lib/site.ts"
NEXT_CFG="next.config.ts"

UYGUN="https://lennebraha38.github.io/gama-portal"
HEDEF="https://gama.is-a.dev"

echo "==> Gama domain geçiş aracı"

if [[ "${1:-}" == "--geri-al" ]]; then
  echo "==> GitHub Pages URL'sine geri dönülüyor..."
  sed -i "s|siteUrl: \"$HEDEF\"|siteUrl: \"$UYGUN\"|" "$SITE_TS"
  sed -i "s|basePath: \"\"|basePath: \"/gama-portal\"|" "$NEXT_CFG"
  echo "==> Geri alındı. npm run build && git push ile yayına al."
  exit 0
fi

# Zaten geçilmiş mi?
if grep -q "siteUrl: \"$HEDEF\"" "$SITE_TS"; then
  echo "==> Domain zaten aktif. Bir şey yapılmadı."
  exit 0
fi

echo "==> site.ts siteUrl güncelleniyor: $UYGUN -> $HEDEF"
sed -i "s|siteUrl: \"$UYGUN\"|siteUrl: \"$HEDEF\"|" "$SITE_TS"

echo "==> next.config.ts basePath temizleniyor: /gama-portal -> ''"
sed -i "s|basePath: \"/gama-portal\"|basePath: \"\"|" "$NEXT_CFG"

echo ""
echo "==> Değişiklikler uygulandı. Şimdi yapılacaklar:"
echo "    1. npm run build"
echo "    2. git add -A && git commit -m \"gama.is-a.dev alan adına geçiş\""
echo "    3. git push"
echo "    4. GitHub > Settings > Pages: Custom domain = gama.is-a.dev, Enforce HTTPS aç"
echo "    (is-a.dev DNS kaydı hazırsa yaklaşık 24 saat içinde aktif olur)"
echo ""
echo "    Geri dönmek istersen: scripts/domain-gec.sh --geri-al"
