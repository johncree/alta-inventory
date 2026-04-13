# Alta Camera Inventory

A mobile-friendly web app for scanning Avigilon Alta camera boxes on a job site and exporting a CSV ready for Alta Access bulk import.

**Live app:** https://johncree.github.io/alta-inventory/

---

## Installation

No install required. Open the live app URL in Safari on your iPhone and tap **Share → Add to Home Screen** for a native app-like experience with its own icon.

---

## Usage

### 1. Start a new session

Fill in the session details on the setup screen:

| Field | Example | Notes |
|---|---|---|
| Site code | `FHS` | Short identifier, used in camera names |
| Site name | `Fenton Community High School District 100` | Full site name, appears in CSV |
| Device group | `Fenton High School` | Group name for Alta Access |
| Number of cameras | `24` | Total expected cameras at this site |

Tap **Start scanning session**.

### 2. Scan cameras

Each camera gets a sequential name (e.g. `FHS-C01`, `FHS-C02`…). Tap **Scan** next to any camera to open the scanner.

- **Point your phone camera at the QR code** on the camera box — the Alta Key is extracted automatically
- **Flashlight toggle** (⚡) appears in the scanner header if your device supports it — useful in low-light installs
- After a successful scan, tap **Next camera** to advance or **Back to list** to return

#### If a QR won't scan
Tap **Enter key manually instead** and type or paste the Alta Key (`XXXX-XXXX-XXXX`) or the full URL from the QR code.

#### If a camera isn't available
Tap **Skip — camera not available to scan**. Skipped cameras are marked in the list and export with a blank Alta Key. You can come back and scan them later.

#### Renaming a camera
Tap the ✏ pencil icon next to any camera name to rename it. Useful when cameras are installed out of sequential order.

### 3. Resume a session

Your session is automatically saved as you go — closing the browser or locking your phone won't lose your work. Reopen the app and tap **Resume session** to pick up where you left off.

To resume on a different device, export a CSV first, then use **Resume from CSV** on the setup screen of the other device.

### 4. Export

Tap **Review & export CSV** (or **Review progress** at any time) to see a summary, then **Download CSV**.

- **On iPhone/iPad:** the share sheet appears — tap **Save to Files** to save to iCloud, Google Drive, or on-device storage
- **On Mac/Windows:** a standard save dialog opens

The exported CSV is ready to import directly into Alta Access bulk import — no editing required.

---

## CSV format

Matches the Alta Access bulk import template exactly:

| Column | Value |
|---|---|
| Name | Camera name (e.g. `FHS-C01`) |
| IP Address / Alta Key | *(blank)* |
| Alta Key | Scanned Alta Key (e.g. `A1B2-C3D4-E5F6`) |
| Port | *(blank)* |
| Site | Site name |
| Device Group | Device group name |
| All others | *(blank — populated by Alta Access after import)* |

Unscanned or skipped cameras are included with a blank Alta Key.

---

## Features

- QR scanning via phone camera — iOS Safari, Chrome on Android and desktop
- Manual Alta Key entry fallback
- Rename cameras for out-of-order installs
- Skip cameras that aren't available
- Torch/flashlight toggle for low-light environments
- Duplicate Alta Key detection
- Re-scan overwrite confirmation
- Session auto-saved to browser storage
- Resume from a previously exported CSV
- Native share sheet export on iOS/Android
- Dark mode support
- Installable as a home screen app (PWA)

---

## Tech

Single `index.html` file. No build tools, no backend, no login. Uses [jsQR](https://github.com/cozmo/jsQR) for QR decoding. Hosted on GitHub Pages.
