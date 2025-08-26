Place your custom cursor files in this folder. Recommended files:

- paw-default.cur     (default cursor, .cur recommended for Windows)
- paw-pointer.cur     (pointer/tap cursor for links and buttons)

Optional PNG fallbacks (32×32 or 48×48). If you use PNGs, set hotspot coordinates in CSS as shown in project CSS:

- paw-default-32.png
- paw-pointer-32.png

Notes:
- Prefer `.cur` files since they embed hotspot info and work reliably on Windows.
- If you use PNG fallbacks, recommend hotspot values like `8 8` (adjust if your artwork needs it).
- Keep images small (32–48px). Large PNG cursors may be ignored by browsers.

After adding files, restart Vite dev server or refresh the page to see the custom paw cursor.
