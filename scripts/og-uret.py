#!/usr/bin/env python3
"""OG paylaşım görseli üretici: public/og.png (1200x630)"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

W, H = 1200, 630
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_L = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
LOGO = "public/gama-logo-128.webp"
CIKIS = "public/og.png"

# 1) Gradient zemin (#050816 -> #0a0f2e -> #0d0b2a) köşegen
x = np.linspace(0, 1, W, dtype=np.float32)[None, :]
y = np.linspace(0, 1, H, dtype=np.float32)[:, None]
t = (x + y) / 2.0
ust = np.array([5, 8, 22], dtype=np.float32)
orta = np.array([10, 15, 46], dtype=np.float32)
alt = np.array([13, 11, 42], dtype=np.float32)

grad = np.zeros((H, W, 3), dtype=np.float32)
for c in range(3):
    grad[..., c] = np.where(
        t < 0.5,
        ust[c] + (orta[c] - ust[c]) * (t / 0.5),
        orta[c] + (alt[c] - orta[c]) * ((t - 0.5) / 0.5),
    )

img = Image.fromarray(grad.astype(np.uint8), "RGB")
d = ImageDraw.Draw(img, "RGBA")

# 2) Mor/cyan glow (sol üst + sağ alt)
for cx, cy, r, renk in [
    (W * 0.12, H * 0.25, 420, (124, 58, 237, 55)),
    (W * 0.88, H * 0.8, 460, (34, 211, 238, 45)),
]:
    katman = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dk = ImageDraw.Draw(katman)
    dk.ellipse((cx - r, cy - r, cx + r, cy + r), fill=renk)
    katman = katman.filter(ImageFilter.GaussianBlur(80))
    img = Image.alpha_composite(img.convert("RGBA"), katman)
    d = ImageDraw.Draw(img, "RGBA")

# 3) İnce çizgi ayrımı
d.line([(0, H - 6), (W, H - 6)], fill=(139, 92, 246, 255), width=6)

# 4) Logo (sağ alt, hafif saydamlık)
try:
    logo = Image.open(LOGO).convert("RGBA").resize((150, 150), Image.LANCZOS)
    logo.putalpha(logo.getchannel("A").point(lambda a: int(a * 0.25)))
    img.alpha_composite(logo, (W - 180, H - 175))
except FileNotFoundError:
    pass
d = ImageDraw.Draw(img, "RGBA")

# 5) Metinler
f_buyuk = ImageFont.truetype(FONT, 74)
f_orta = ImageFont.truetype(FONT, 40)
f_kucuk = ImageFont.truetype(FONT, 26)
f_ince = ImageFont.truetype(FONT_L, 26)

baslik = "GAMA"
alt_baslik = "Türkiye'nin geleceğine imza at."
etiket = "Teknolojik ve bilimsel bağımsızlık için gençler buluşuyor."

# GAMA başlığına gradient metin
def gradient_metin(d, xy, metin, font, renkler):
    x0, y0 = xy
    bbox = d.textbbox((0, 0), metin, font=font)
    gw, gh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    katman = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dk = ImageDraw.Draw(katman)
    dk.text((x0, y0), metin, font=font, fill=(255, 255, 255, 255))
    px = np.array(katman)
    alpha = px[..., 3] / 255.0
    mask = alpha > 0
    renkler = np.array(renkler, dtype=np.float32)
    renk_aralik = (mask.sum(axis=1).cumsum().max(),)
    # yatay gradient
    ys, xs = np.where(mask)
    if len(xs) == 0:
        return
    t = (xs - xs.min()) / max(xs.max() - xs.min(), 1)
    for i in range(3):
        px[ys, xs, i] = (renkler[0, i] + (renkler[1, i] - renkler[0, i]) * t).astype(np.uint8)
    px[ys, xs, 3] = 255
    img.alpha_composite(Image.fromarray(px, "RGBA"))

gradient_metin(d, (80, 110), baslik, f_buyuk, [(139, 92, 246), (34, 211, 238)])

# alt başlık
d.text((84, 225), alt_baslik, font=f_orta, fill=(255, 255, 255, 255))

# etiket satırı (2 satıra böl)
s1 = "Teknolojik ve bilimsel bağımsızlık için"
s2 = "gençler buluşuyor."
d.text((84, 300), s1, font=f_ince, fill=(200, 205, 235, 255))
d.text((84, 340), s2, font=f_ince, fill=(200, 205, 235, 255))

# rozet
rozet = "gama-portal"
d.rounded_rectangle((84, 420, 84 + 260, 480), radius=30, fill=(255, 255, 255, 18), outline=(255, 255, 255, 60))
d.text((112, 438), rozet, font=f_kucuk, fill=(255, 255, 255, 230))

img.convert("RGB").save(CIKIS, "PNG", optimize=True)
print("KAYDEDİLDİ:", CIKIS)
