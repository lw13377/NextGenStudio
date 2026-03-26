from PIL import Image, ImageDraw, ImageFont, ImageChops, ImageFilter
import os

W, H = 1200, 630
BG = (10, 10, 10)
ACCENT = (196, 84, 195)
WHITE = (241, 241, 241)
MUTED = (160, 160, 160)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

def load_font(names, size):
    search = [
        "/System/Library/Fonts/",
        "/Library/Fonts/",
        "/System/Library/Fonts/Supplemental/",
    ]
    for name in names:
        for d in search:
            for ext in [".ttc", ".ttf", ".otf"]:
                p = d + name + ext
                if os.path.exists(p):
                    try:
                        return ImageFont.truetype(p, size)
                    except:
                        pass
    return ImageFont.load_default()

# Larger fonts for zoomed-in feel
font_label = load_font(["HelveticaNeue", "Helvetica", "Arial"], 26)
font_headline = load_font(["Georgia", "Times New Roman", "TimesNewRomanPS"], 78)
font_accent_line = load_font(["Didot", "Bodoni 72", "Baskerville"], 32)

# Subtle glow background
glow = Image.new("RGB", (W, H), BG)
glow_draw = ImageDraw.Draw(glow)
for i in range(250, 0, -1):
    r = BG[0] + int(196 * 0.10 * (i / 250))
    g = BG[1] + int(84 * 0.10 * (i / 250))
    b = BG[2] + int(195 * 0.10 * (i / 250))
    glow_draw.ellipse(
        [W // 2 - i * 3, H // 2 - i * 2, W // 2 + i * 3, H // 2 + i * 2],
        fill=(min(r, 255), min(g, 255), min(b, 255)),
    )
img = glow
draw = ImageDraw.Draw(img)

def draw_centered(text, y_pos, font, color):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y_pos), text, fill=color, font=font)
    return bbox[3] - bbox[1]

# Calculate total content height to vertically center everything
# Logo ~110px + gap 20 + label ~26 + gap 24 + headline1 ~78 + gap 8 + headline2 ~78 + gap 24 + accent ~32
# Total approx: 400px
total_height = 400
y = (H - total_height) // 2

# Load and place logo — larger for visibility
logo_path = os.path.join(os.path.dirname(__file__), "assets", "nextgen-logo-transparent.png")
if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert("RGBA")
    logo_h = 110
    logo_w = int(logo.width * (logo_h / logo.height))
    logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
    logo_bg = Image.new("RGBA", logo.size, (*BG, 255))
    logo_comp = Image.alpha_composite(logo_bg, logo)
    img.paste(logo_comp.convert("RGB"), ((W - logo_w) // 2, y))
    y += logo_h + 20

# Label
h = draw_centered("AI SYSTEMS & CUSTOM DEVELOPMENT", y, font_label, ACCENT)
y += h + 24

# Headline line 1
h = draw_centered("Custom Websites & AI Systems", y, font_headline, WHITE)
y += h + 8

# Headline line 2
h = draw_centered("Built From Scratch", y, font_headline, WHITE)
y += h + 24

# Accent secondary line
draw_centered("BUILT TO SCALE REAL BUSINESSES", y, font_accent_line, ACCENT)

out_path = os.path.join(os.path.dirname(__file__), "og-image.png")
img.save(out_path, "PNG", optimize=True)
print(f"Saved {out_path} — {os.path.getsize(out_path)} bytes")
print(f"Dimensions: {W}x{H}")
