#!/usr/bin/env python3
"""Generate assets/og-image.png (1200x630) with ML Systems branding."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

W, H = 1200, 630
ACCENT = (0, 229, 255)
ACCENT2 = (181, 102, 255)
ACCENT3 = (255, 94, 156)
TEXT = (232, 236, 244)
MUTED = (136, 146, 168)
BG0 = (8, 11, 20)
BG1 = (15, 19, 32)

def font(paths, size):
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

FB = ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/Segoe UI Bold.ttf"]
FR = ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/Segoe UI.ttf"]
MONO = ["C:/Windows/Fonts/consolab.ttf", "C:/Windows/Fonts/arialbd.ttf"]

f_name = font(FB, 60)
f_role = font(FB, 42)
f_tag = font(FR, 27)
f_foot = font(MONO, 22)
f_mono = font(MONO, 30)

# ---- base gradient background ----
base = Image.new("RGB", (W, H), BG0)
px = base.load()
for y in range(H):
    t = y / H
    r = int(BG0[0] + (BG1[0] - BG0[0]) * t)
    g = int(BG0[1] + (BG1[1] - BG0[1]) * t)
    b = int(BG0[2] + (BG1[2] - BG0[2]) * t)
    for x in range(W):
        px[x, y] = (r, g, b)

# glow blobs
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([-120, -160, 520, 420], fill=(0, 229, 255, 60))
gd.ellipse([760, 320, 1320, 820], fill=(255, 94, 156, 50))
gd.ellipse([420, 380, 900, 860], fill=(181, 102, 255, 40))
glow = glow.filter(ImageFilter.GaussianBlur(60))
base = Image.composite(Image.new("RGB", (W, H), (0, 0, 0)), base, glow.convert("L")).convert("RGB")

# dot grid
grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gdd = ImageDraw.Draw(grid)
for x in range(40, W, 40):
    for y in range(40, H, 40):
        gdd.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(255, 255, 255, 10))
base = Image.alpha_composite(base.convert("RGBA"), grid).convert("RGB")

d = ImageDraw.Draw(base)

# monogram badge
cx, cy, rad = 92, 92, 44
d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(8, 11, 20))
d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(0, 229, 255), width=3)
d.text((cx, cy), "R", font=f_mono, fill=ACCENT, anchor="mm")

# name
d.text((80, 200), "MD RAKIBUL ISLAM RAIHAN", font=f_name, fill=TEXT)

# gradient-filled role line: render gradient strip, mask with white text
role_text = "ML Systems Engineer"
role_bbox = d.textbbox((0, 0), role_text, font=f_role)
rw = role_bbox[2] - role_bbox[0]
rh = role_bbox[3] - role_bbox[1]
role_img = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
rd = ImageDraw.Draw(role_img)
rd.text((0, 0), role_text, font=f_role, fill=(255, 255, 255, 255))
grad = Image.new("RGB", (rw, rh), (0, 0, 0))
gp = grad.load()
for x in range(rw):
    t = x / max(1, rw)
    r = int(ACCENT[0] + (ACCENT3[0] - ACCENT[0]) * t)
    g = int(ACCENT[1] + (ACCENT3[1] - ACCENT[1]) * t)
    b = int(ACCENT[2] + (ACCENT3[2] - ACCENT[2]) * t)
    for y in range(rh):
        gp[x, y] = (r, g, b)
grad = grad.convert("RGBA")
role_filled = Image.composite(grad, Image.new("RGBA", (rw, rh), (0, 0, 0, 0)), role_img)
base.paste(role_filled, (80, 280), role_filled)

# gradient divider
div = Image.new("RGB", (520, 5))
dp = div.load()
for x in range(520):
    t = x / 520
    r = int(ACCENT[0] + (ACCENT2[0] - ACCENT[0]) * t)
    g = int(ACCENT[1] + (ACCENT2[1] - ACCENT[1]) * t)
    b = int(ACCENT[2] + (ACCENT2[2] - ACCENT[2]) * t)
    for y in range(5):
        dp[x, y] = (r, g, b)
base.paste(div, (80, 360))

# tagline
d.text((80, 395), "LLM Inference  ·  GPU Optimization  ·  Multimodal AI", font=f_tag, fill=MUTED)
d.text((80, 440), "KV-cache  ·  PD-Disaggregation  ·  FP8/FP4  ·  RDMA  ·  SGLang", font=f_tag, fill=MUTED)

# footer
d.text((80, 560), "theraihanrakibb.github.io", font=f_foot, fill=(120, 130, 150))

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "og-image.png")
base.save(out, "PNG")
print("wrote", out, base.size)
