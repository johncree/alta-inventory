# Alta Camera Inventory

A mobile-friendly web app for scanning Avigilon Alta camera boxes on a job site and exporting a CSV ready for Alta Access bulk import.

**Live app:** https://johncree.github.io/alta-inventory/

## What it does

1. Set up a scanning session — enter a site code, site name, device group, and camera count
2. Scan the QR code on each camera box with your phone camera
3. The app extracts the Alta Key from the QR, assigns each camera a sequential name (e.g. `OAKW-C01`)
4. Export a CSV drop-in compatible with Alta Access bulk import

## Features

- QR scanning via phone camera (iOS Safari and Chrome on Android/desktop)
- Manual key entry fallback if a QR won't scan
- Rename any camera in the list (for out-of-order installs)
- Skip cameras that aren't available to scan
- Torch/flashlight toggle for low-light environments
- Duplicate Alta Key detection
- Resume from a previously exported CSV — picks up where you left off
- Session auto-saved to browser storage — closing the tab mid-job doesn't lose work
- Dark mode support

## CSV format

Exports match the Alta Access bulk import template:

| Column | Value |
|---|---|
| Name | Camera name (e.g. OAKW-C01) |
| IP Address / Alta Key | *(blank)* |
| Alta Key | Scanned Alta Key |
| Site | Site name |
| Device Group | Device group name |
| All others | *(blank)* |

## Tech

Single `index.html` file. No build tools, no backend. Uses [jsQR](https://github.com/cozmo/jsQR) for QR decoding. Hosted on GitHub Pages.
