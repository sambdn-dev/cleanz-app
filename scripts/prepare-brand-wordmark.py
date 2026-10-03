"""Extract the supplied logo's letter outlines, without changing their design.

Asset preparation only; needs Pillow, NumPy and SciPy, not used by the app.
Run from the repository root: python scripts/prepare-brand-wordmark.py
"""
from pathlib import Path
from urllib.parse import quote
import numpy as np
from PIL import Image
from scipy.ndimage import label

root = Path(__file__).resolve().parents[1]
image = np.asarray(Image.open(root / 'docs/assets/cleanz-logo-reference.png').convert('RGB'))
bright = image.min(axis=2) > 155
components, count = label(bright)
sizes = np.bincount(components.ravel())
letters = np.isin(components, np.flatnonzero(sizes > 3000)[1:])
ys, xs = np.nonzero(letters)
x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
letters = letters[y0:y1, x0:x1]
height, width = letters.shape

# Follow exposed pixel edges, including counters, then simplify below a pixel.
edges = {}
def edge(start, end):
    edges.setdefault(start, []).append(end)

def follow(point):
    ends = edges[point]
    end = ends.pop()
    if not ends: del edges[point]
    return end

for y, x in zip(*np.nonzero(letters)):
    if y == 0 or not letters[y - 1, x]: edge((x, y), (x + 1, y))
    if x == width - 1 or not letters[y, x + 1]: edge((x + 1, y), (x + 1, y + 1))
    if y == height - 1 or not letters[y + 1, x]: edge((x + 1, y + 1), (x, y + 1))
    if x == 0 or not letters[y, x - 1]: edge((x, y + 1), (x, y))

def simplify(points, tolerance=.65):
    start, end = points[0], points[-1]
    line = end - start
    distances = (np.abs(line[0] * (start[1] - points[:, 1]) - (start[0] - points[:, 0]) * line[1])
                 / max(float(np.linalg.norm(line)), 1))
    furthest = int(distances.argmax())
    if distances[furthest] <= tolerance:
        return points[[0, -1]]
    return np.concatenate((simplify(points[:furthest + 1])[:-1], simplify(points[furthest:])))

paths = []
while edges:
    start = next(iter(edges))
    points, current = [start], follow(start)
    while current != start:
        points.append(current)
        current = follow(current)
    points = np.asarray(points)
    if len(points) < 50: continue
    middle = len(points) // 2
    points = np.concatenate((simplify(points[:middle + 1])[:-1], simplify(np.concatenate((points[middle:], points[:1])))))
    paths.append('M' + 'L'.join(f'{x},{y}' for x, y in points) + 'Z')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}"><path fill="white" fill-rule="evenodd" d="{"".join(paths)}"/></svg>'
brand = root / 'public/brand'
brand.mkdir(exist_ok=True)
(brand / 'cleanz-wordmark.svg').write_text(svg)
mask = 'url("data:image/svg+xml,' + quote(svg, safe='') + '")'
(root / 'src/lib/cleanz-wordmark.ts').write_text(
    '// Letter silhouettes extracted from the supplied Cleanz logo, not a replacement font.\n'
    '// Source: docs/assets/cleanz-logo-reference.png; regenerate with scripts/prepare-brand-wordmark.py.\n'
    f'export const WORDMARK_MASK = {mask!r};\n'
    f'export const WORDMARK_RATIO = \'{width} / {height}\';\n')
print(f'{len(paths)} contours, {width} × {height}, {len(svg)} SVG bytes')
