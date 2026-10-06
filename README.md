# Carson Moore: Engineering Portfolio

Static portfolio for mechanical and product design recruiting. HTML, CSS, and a small JavaScript enhancement layer. No framework or production build step.

## Preview

Run `python scripts/serve.py` and open http://127.0.0.1:8000. The development server supports the same `/projects` and `/resume` URLs as Vercel. Use `--port 8765` to select another port.

## Editing

- `index.html`: alpine photo introduction, selected work, CAD/analysis display, personal photographs, background, and experience.
- `projects.html`: eight image-led engineering case studies, filters, concise introductions, expandable project details, and supporting calculations.
- `resume.html`: web résumé with print styling and a link to the original `resume.pdf`.
- `css/studio.css`: shared styles and responsive layouts.
- `css/alpine.css`: the current photo-inspired blue/slate palette, Instrument Serif headings, Manrope body type, and editorial homepage layout.
- `css/gallery.css`: full-width project imagery, clean case-study typography, responsive galleries, and masks for unwanted CAD screenshot borders.
- `js/studio.js`: navigation, CAD switching, filtering, direct project links, and image viewer.
- `projects.json`: project reference data. Pages are pre-rendered HTML; changes to JSON alone do not change the published pages. Update the corresponding HTML when changing project copy.
- `images/`: existing photographs, CAD renders, and analysis images. Attribution remains in the project galleries.

All case-study content is present in HTML. Without JavaScript, native details sections and image links remain usable. Filters and the CAD switch require JavaScript.

## Content

Target: mechanical and product design engineering internships for Spring and Summer 2027. The control-arm integration story comes from Carson's account: overlooked tolerance stackup, interference at maximum steer, an Ansys check of revised apex geometry, and material removal on the existing part. The project uses the portfolio's precise 4.6 lb weight saving; the original downloadable résumé rounds it to 5 lb.

The alpine photographs were supplied by Carson and converted from HEIC to JPEG for browser compatibility. Crops are controlled in CSS; the original photos are unchanged. No location or expedition details are assumed. Google Fonts supplies Instrument Serif and Manrope, with local serif and sans-serif fallbacks.

Brake-sizing excerpts retain revision caveats from the supplied CSVs. The hub study retains its inconsistent-bearing-weight note. The SKF report is identified as a team reference with its original author and date.

Project descriptions incorporate Carson's supplied LHR HAND CALCS notes, including SpaceX fixture and handling-tool work, suspension testing and fabrication, rotor development, and hub architecture. The full notes PDF is not included in the public site files. Carson's own SpaceX photographs provide visual context for the SpaceX projects. The Starbase portrait is shown uncropped. White CAD image backgrounds visually blend with the warm paper color through CSS, preserving the original image files and geometry.

## Deployment

`vercel.json` retains the static-site configuration and clean URLs. Review a preview before deploying to the existing `cmoore13` Vercel project. Do not create a second Vercel project or replace its domain configuration.

Original styles and `js/site.js` remain for reference but are no longer loaded by the redesigned pages.

The rear hub and bearing selection are one case study. It follows system interfaces, bearing and thickness requirements, material selection, loads and thread sizing, FEA pocketing, and manufacturing. The former `#wheel-bearings` link opens the bearing section within the combined hub project.

The brake rotor case study includes the supplied handwritten design notes: packaging coordination, a 500°C design requirement, material tradeoffs, transient thermal sizing, structural FEA, temperature-crayon testing, and outsourced three-axis CNC machining. Master-cylinder layout and hydraulic sizing are excluded from the portfolio.
