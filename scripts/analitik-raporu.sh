#!/usr/bin/env bash
# GoatCounter analitik raporu
#
# Kullanım:
#   1. https://lennebraha38.goatcounter.com > Ayarlar > API > API anahtarı oluştur
#   2. GOATCOUNTER_API_TOKEN=xxx scripts/analitik-raporu.sh
set -euo pipefail

TOKEN="${GOATCOUNTER_API_TOKEN:-}"
SITE="lennebraha38"

if [ -z "$TOKEN" ]; then
  echo "HATA: GOATCOUNTER_API_TOKEN env değişkeni boş."
  echo "  https://$SITE.goatcounter.com > Ayarlar > API > anahtar oluştur"
  echo "  Örnek: GOATCOUNTER_API_TOKEN=<anahtar> $0"
  exit 1
fi

echo "==> Toplam istatistikler"
curl -s "https://$SITE.goatcounter.com/api/v0/stats/daily?stat=totals" \
  -H "X-GoatCounter-Site: $SITE" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool || echo "(yapılandırma farklı olabilir, yanıta bakın)"

echo ""
echo "==> Son 14 gün (sayfa görüntüleme)"
curl -s "https://$SITE.goatcounter.com/api/v0/stats/daily?from=14&to=0" \
  -H "X-GoatCounter-Site: $SITE" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool || echo "(yanıta bakın)"

echo ""
echo "==> En çok görüntülenen sayfalar"
curl -s "https://$SITE.goatcounter.com/api/v0/stats/pages?period=month&limit=10" \
  -H "X-GoatCounter-Site: $SITE" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool || echo "(yanıta bakın)"

echo ""
echo "==> Ziyaretçi ülkeleri (son 30 gün)"
curl -s "https://$SITE.goatcounter.com/api/v0/stats/countries?period=month&limit=10" \
  -H "X-GoatCounter-Site: $SITE" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool || echo "(yanıta bakın)"

echo ""
echo "==> Referanslar"
curl -s "https://$SITE.goatcounter.com/api/v0/stats/referrers?period=month&limit=10" \
  -H "X-GoatCounter-Site: $SITE" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool || echo "(yanıta bakın)"
