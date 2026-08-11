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

def point_in_polygon(x, y, poly):
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi):
            inside = not inside
        j = i
    return inside

def dist_to_edges(x, y, poly):
    n = len(poly)
    best = float("inf")
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        dx, dy = x2 - x1, y2 - y1
        if dx == dy == 0:
            d = math.hypot(x - x1, y - y1)
        else:
            t = max(0.0, min(1.0, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
            d = math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
        if d < best:
            best = d
    return best

def polylabel_lite(ring, cells=60):
    xs = [p[0] for p in ring]
    ys = [p[1] for p in ring]
    minx, maxx = min(xs), max(xs)
    miny, maxy = min(ys), max(ys)
    if maxx - minx < 1e-6 or maxy - miny < 1e-6:
        return (minx + maxx) / 2, (miny + maxy) / 2
    best, best_d = None, -1
    for i in range(cells + 1):
        x = minx + (maxx - minx) * i / cells
        for j in range(cells + 1):
            y = miny + (maxy - miny) * j / cells
            if point_in_polygon(x, y, ring):
                d = dist_to_edges(x, y, ring)
                if d > best_d:
                    best_d, best = d, (x, y)
    cx, cy = best
    step = max(maxx - minx, maxy - miny) / cells
    for _ in range(4):
        local_best, local_d = None, -1
        for ox in (-step, 0, step):
            for oy in (-step, 0, step):
                x, y = cx + ox, cy + oy
                if point_in_polygon(x, y, ring):
                    d = dist_to_edges(x, y, ring)
                    if d > local_d:
                        local_d, local_best = d, (x, y)
        if local_best:
            cx, cy, best_d = local_best[0], local_best[1], local_d
        step /= 2
    return cx, cy

def outer_ring(rings):
    best, best_area = None, -1
    for r in rings:
        xs = [p[0] for p in r]
        ys = [p[1] for p in r]
        area = (max(xs) - min(xs)) * (max(ys) - min(ys))
        if area > best_area:
            best_area, best = area, r
    return best

def fit_font(name, ring, size_max=12, size_min=7):
    xs = [p[0] for p in ring]
    width = max(xs) - min(xs)
    size = min(size_max, int(width / (len(name) * 0.62))) if width > 0 else size_min
    return max(size_min, size)

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
    projected_rings = []
    for ring in entry["rings"]:
        pr = [project(x, y) for x, y in ring]
        projected_rings.append(pr)
        d_parts.append(ring_to_d(pr))
    main = outer_ring(projected_rings)
    fx, fy = polylabel_lite(main)
    fs = fit_font(entry["il"], main)
    out.append(
        {
            "il": entry["il"],
            "d": " ".join(d_parts),
            "fx": round(fx, 1),
            "fy": round(fy, 1),
            "fs": fs,
        }
    )

out.sort(key=lambda e: e["il"])
with open(DST, "w") as f:
    json.dump({"w": W, "h": H, "iller": out}, f, ensure_ascii=False, separators=(",", ":"))

total_points = sum(len(r) for e in paths for r in e["rings"])
print(f"{len(out)} il, {total_points} nokta")
import os
print(f"boyut: {os.path.getsize(DST)/1024:.0f} KB")
