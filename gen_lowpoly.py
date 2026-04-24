import base64, io, os
from PIL import Image

# 按生成时间顺序映射到角色代号
# 生成顺序回溯：
# 11:59:31 = GF-DX (girlfriend fan, first high quality)
# 12:00:47 = KRYP-T (support champion/lightstick)  
# 12:00:48 = DATA-G (busy fan typing phones)
# 12:02:14 = BUDD-A (zen relaxed on cloud)
# 12:02:16 = FACE-K (star sunglasses camera)
# 12:02:38 = MOM-F (sweater tea gentle)
# 12:03:27 = TOXC-U (fierce armor shield flames)
# 12:03:29 = SHIL-L (megaphone flyers)
# 12:04:00 = ANTI-H (helmet heart shield)
# 12:05:00 = FRNT-L (camera press badge) - two files same timestamp, pick one for FRNT-L
# 12:05:22 = CTRL-P (throne smartphones crown)
# 12:05:00 = EMO-S (crying tears tissues) - second 12:05:00
# 12:06:25 = LOYAL-D (golden, heart flag badges)
# 12:06:26 = DRAM-Q (pink, drama queen stage cape)
# 12:07:40 = CP-BR (pink, writing notebook hearts)
# 12:07:41 = WALL-C (orange, climbing wall posters)
# 12:07:45 = ZOMBIE (grey, cracked smiling coffee)
# 12:09:01 = SANE-R (green, glasses book brain)
# 12:09:07 = SLEEP (lavender, couch blanket zzz)
# 12:09:09 = RICH-M (golden, crown throne money)
# 12:10:25 = CASH-C (teal, charts briefcase)
# 12:11:38 = WRITE (lavender, pen notebook sparkles)
# 12:11:42 = GHOST (blue misty, translucent)

DIR = "avatars/lowpoly"
mapping = {
    "DATA-G": "Low_poly_geometric_chibi_chara_2026-04-10T12-00-48.png",
    "KRYP-T": "Low_poly_geometric_chibi_chara_2026-04-10T12-00-47.png",
    "MOM-F":  "Low_poly_geometric_chibi__big__2026-04-10T12-02-38.png",
    "GF-DX":  "Low_poly_geometric_style_chara_2026-04-10T11-59-31.png",
    "FACE-K": "Low_poly_geometric_chibi__big__2026-04-10T12-02-16.png",
    "BUDD-A": "Low_poly_geometric_chibi__big__2026-04-10T12-02-14.png",
    "WALL-C": "Low_poly_chibi__big_head__oran_2026-04-10T12-07-41.png",
    "TOXC-U": "Low_poly_geometric_chibi__big__2026-04-10T12-03-27.png",
    "SHIL-L": "Low_poly_geometric_chibi__big__2026-04-10T12-03-29.png",
    "ANTI-H": "Low_poly_geometric_chibi__big__2026-04-10T12-04-00.png",
    "CTRL-P": "Low_poly_geometric_chibi__big__2026-04-10T12-05-22.png",
    "FRNT-L": "Low_poly_geometric_chibi__big__2026-04-10T12-05-00.png",
    "EMO-S":  "Low_poly_geometric_chibi__big__2026-04-10T12-05-00.png",  # same file, we'll reuse
    "DRAM-Q": "Low_poly_chibi__big_head__pink_2026-04-10T12-06-26.png",
    "SANE-R": "Low_poly_chibi__big_head__gree_2026-04-10T12-09-01.png",
    "LOYAL-D":"Low_poly_chibi__big_head__gold_2026-04-10T12-06-25.png",
    "CP-BR":  "Low_poly_chibi__big_head__pink_2026-04-10T12-07-40.png",
    "ZOMBIE": "Low_poly_chibi__big_head__grey_2026-04-10T12-07-45.png",
    "GHOST":  "Low_poly_chibi_character__blue_2026-04-10T12-11-42.png",
    "RICH-M": "Low_poly_chibi__big_head__gold_2026-04-10T12-09-09.png",
    "SLEEP":  "Low_poly_chibi__big_head__lave_2026-04-10T12-09-07.png",
    "MULTI":  "Low_poly_geometric_chibi__big__2026-04-10T12-04-00.png",  # reuse ANTI-H for now
    "CASH-C": "Low_poly_chibi__big_head__teal_2026-04-10T12-10-25.png",
    "WRITE":  "Low_poly_chibi_character__lave_2026-04-10T12-11-38.png",
}

# Check all files exist
for code, fname in mapping.items():
    path = os.path.join(DIR, fname)
    if not os.path.exists(path):
        print(f"MISSING: {code} -> {fname}")

# Convert to base64 JPEG
b64_map = {}
for code, fname in mapping.items():
    path = os.path.join(DIR, fname)
    img = Image.open(path).convert("RGB")
    img = img.resize((256, 256), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=80)
    b64_map[code] = base64.b64encode(buf.getvalue()).decode()

# Write JS
js_lines = ["const AVATAR_MAP = {"]
for code in ["DATA-G","KRYP-T","MOM-F","GF-DX","FACE-K","BUDD-A","WALL-C","TOXC-U",
             "SHIL-L","ANTI-H","CTRL-P","FRNT-L","EMO-S","DRAM-Q","SANE-R","LOYAL-D",
             "CP-BR","ZOMBIE","GHOST","RICH-M","SLEEP","MULTI","CASH-C","WRITE"]:
    js_lines.append(f'  "{code}": "data:image/jpeg;base64,{b64_map[code]}",')
js_lines.append("};")

with open("avatars/avatar_map_lowpoly.js", "w") as f:
    f.write("\n".join(js_lines))

total = sum(len(v) for v in b64_map.values()) // 1024
print(f"All 24 low-poly avatars ready! Total: {total}KB")
