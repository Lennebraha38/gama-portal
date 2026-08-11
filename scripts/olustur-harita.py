import json
import math

SRC = "src/data/turkiye-iller.geojson"
DST = "src/data/turkiye-paths.json"

with open(SRC) as f:
    data = json.load(f)

def mercator(lon, lat):
    x = math.radians(lon)
    y = -math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))
    return x, y

def douglas_peucker(points, eps):
    if len(points) < 3:
        return points
    start, end = points[0], points[-1]
    max_d, idx = -1, -1
    for i in range(1, len(points) - 1):
        d = abs(
            (end[0] - start[0]) * (start[1] - points[i][1])
            - (start[0] - points[i][0]) * (end[1] - start[1])
        ) / math.hypot(end[0] - start[0], end[1] - start[1])
        if d > max_d:
            max_d, idx = d, i
    if max_d > eps:
        left = douglas_peucker(points[: idx + 1], eps)
        right = douglas_peucker(points[idx:], eps)
        return left[:-1] + right
    return [start, end]

def simplify_ring(ring):
    pts = []
    for lon, lat in ring:
        m = mercator(lon, lat)
        if not pts or (m != pts[-1] and abs(m[0] - pts[-1][0]) > 1e-9 or abs(m[1] - pts[-1][1]) > 1e-9):
            pts.append(m)
    if len(pts) < 3:
        return []
    if pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) < 3:
        return []
    kept = douglas_peucker(pts, EPS)
    if kept and kept[0] != kept[-1]:
        kept.append(kept[0])
    return kept

def ring_to_d(ring):
    if not ring:
        return ""
    parts = [f"M{ring[0][0]:.2f},{ring[0][1]:.2f}"]
    for x, y in ring[1:]:
        parts.append(f"L{x:.2f},{y:.2f}")
    parts.append("Z")
    return " ".join(parts)

EPS = 0.0003

rename = {
    "Istanbul": "İstanbul",
    "Izmir": "İzmir",
    "Hakkâri": "Hakkari",
    "Canakkale": "Çanakkale",
}

paths = []
for feat in data["features"]:
    name = rename.get(feat["properties"]["shapeName"], feat["properties"]["shapeName"])
    geom = feat["geometry"]
    rings = []
    if geom["type"] == "Polygon":
        rings = [ring for ring in geom["coordinates"] if len(ring) > 2]
    else:
        for poly in geom["coordinates"]:
            rings += [ring for ring in poly if len(ring) > 2]
    paths.append({"il": name, "rings": [simplify_ring(r) for r in rings]})

all_pts = [p for entry in paths for r in entry["rings"] for p in r]
min_x = min(p[0] for p in all_pts)
max_x = max(p[0] for p in all_pts)
min_y = min(p[1] for p in all_pts)
max_y = max(p[1] for p in all_pts)

W, H, PAD = 1000, 460, 20
scale = min((W - 2 * PAD) / (max_x - min_x), (H - 2 * PAD) / (max_y - min_y))
off_x = (W - (max_x - min_x) * scale) / 2 - min_x * scale
off_y = (H - (max_y - min_y) * scale) / 2 - min_y * scale

def project(x, y):
    return (x * scale + off_x, y * scale + off_y)

out = []
for entry in paths:
    d_parts = []
    pts_for_centroid = []
    for ring in entry["rings"]:
        pr = [project(x, y) for x, y in ring]
        d_parts.append(ring_to_d(pr))
        pts_for_centroid.extend(pr)
    cx = sum(p[0] for p in pts_for_centroid) / len(pts_for_centroid)
    cy = sum(p[1] for p in pts_for_centroid) / len(pts_for_centroid)
    out.append({"il": entry["il"], "d": " ".join(d_parts), "cx": round(cx, 1), "cy": round(cy, 1)})

out.sort(key=lambda e: e["il"])
with open(DST, "w") as f:
    json.dump({"w": W, "h": H, "iller": out}, f, ensure_ascii=False, separators=(",", ":"))

total_points = sum(len(r) for e in paths for r in e["rings"])
print(f"{len(out)} il, {total_points} nokta")
import os
print(f"boyut: {os.path.getsize(DST)/1024:.0f} KB")
