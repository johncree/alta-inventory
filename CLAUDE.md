# Alta Camera Inventory — Claude Context

## What this project is
A mobile-friendly single-page web app for scanning Avigilon Alta camera boxes on a job site. A technician scans QR codes on camera boxes, the app captures the Alta Key from the QR, assigns each camera a sequential name, and exports a CSV formatted for Alta Access bulk import.

Hosted on GitHub Pages. No build tools, no dependencies beyond a single CDN script.

## Stack
- Single `index.html` — all HTML, CSS, and JS in one file
- `jsQR@1.4.0` from jsDelivr CDN — QR decoding via canvas frame loop
- Camera access via `getUserMedia`, frames grabbed with `requestAnimationFrame`
- `localStorage` for session persistence between visits
- GitHub Pages for hosting (requires public repo)

## Key domain knowledge

### Alta Key format
`XXXX-XXXX-XXXX` — 4-4-4 alphanumeric, uppercase. The QR code on a camera box encodes a URL that contains the Alta Key somewhere in it.

Regex: `/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/i`

### Camera naming convention
`{SITECODE}-C{##}` — e.g. `OAKW-C01`, `OAKW-C24`. Site code is user-defined at session setup.

### CSV format
Must match the Alta Access bulk import template exactly:
```
Name, IP Address / Alta Key, Alta Key, Port, Site, Device Group, Configuration Profile, Protocol, Encryption, Connected to, Labels, GPS Coordinates
```
- `Name` — camera name (e.g. OAKW-C01)
- `IP Address / Alta Key` — left blank (Alta Key column is what matters)
- `Alta Key` — the scanned key (e.g. A1B2-C3D4-E5F6)
- `Site` — site name from session setup
- `Device Group` — group name from session setup
- All other columns — left blank for Alta Access to populate

## Architecture decisions
- **jsQR over ZXing** — ZXing's low-level bitmap API (`RGBLuminanceSource` / `BinaryBitmap` / `HybridBinarizer`) was unreliable in this context. jsQR is a single function call and handles RGBA canvas data directly.
- **Canvas frame loop over html5-qrcode** — more control, works reliably on iOS Safari with `autoplay playsinline muted` on the video element.
- **Single file** — intentional. No build step, deployable by dropping one file anywhere.
- **localStorage auto-save** — session written on every scan/skip/rename so closing the browser mid-job doesn't lose work.

## Scanner behavior
- Full frame is decoded (not just the viewfinder box — the box is UI only)
- `inversionAttempts: 'dontInvert'` — Alta QR codes are standard dark-on-light; skipping inversion doubles decode speed
- Torch/flashlight toggle appears only if `track.getCapabilities().torch` is supported
- After a successful scan: "Next camera" and "Back to list" buttons replace the auto-advance that was removed
- Duplicate key detection warns but still saves
- Re-scanning an already-captured camera requires confirmation

## Known considerations
- iOS Safari requires camera access to be triggered by a user gesture (button tap) — the current flow satisfies this
- `appearance: none` and `-webkit-appearance: none` both present on inputs (VS Code / CSS linter requirement)
- The GitHub Pages URL is the live deployment — always test on a real phone after pushing QR-related changes
