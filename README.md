# Carson Moore — Engineering Portfolio

Static site. No build step, no framework: semantic HTML, vanilla CSS with custom
properties, and a single vanilla JS file.

Content lives in `projects.json` — editing that file is how you add, remove, or
reorder projects. You do not need to touch the HTML.

---

## Run it locally

The pages `fetch()` `projects.json`, so opening `index.html` straight off disk
will not work (browsers block `file://` fetches). Serve the folder instead:

```bash
python -m http.server 8000
```

Then open <http://127.0.0.1:8000>.

---

## Layout

```
index.html          Hero, about, experience, project cards, community, contact
projects.html       Every project in detail, built from projects.json
resume.html         Full résumé, styled for screen and for print
projects.json       ← all the project content
resume.pdf          Generated from CarsonMooreResume.docx
css/tokens.css      UT Austin palette + type scale (edit colors here)
css/layout.css      Structure and components
css/animations.css  Reveal + entrance motion
js/site.js          Nav, scroll reveal, JSON → DOM rendering
images/             Photos, CAD renders, FEA screenshots
vercel.json         Clean URLs + security headers
```

### Colors

`css/tokens.css` holds the palette. Primary is UT burnt orange `#BF5700` with
`#F8971F` for text-on-dark accents — burnt orange alone fails contrast on the dark
background. The rest of the official UT secondary palette is defined there too.

---

## Adding a project

Append an object to `projects.json`:

```json
{
  "id": "url-slug",
  "org": "Team or company — your role",
  "title": "Project name",
  "when": "2025 – 2026",
  "featured": true,
  "card": "images/thumbnail.jpg",
  "summary": "One or two sentences.",
  "tags": ["Material", "Tool", "Result"],
  "points": [{ "lead": "Design goal", "text": "..." }],
  "specs": [["Material", "7075-T6"], ["Weight saved", "0.8 lb"]],
  "gallery": [{ "src": "images/one.jpg", "cap": "Caption" }],
  "note": "Optional footnote, e.g. a proprietary-content disclaimer."
}
```

- `featured: true` puts it on the home page card grid.
- An empty `gallery` renders the project as a single centred column.

---

## Keeping the résumé in sync

Two places hold résumé content: `resume.html` (the web version) and `resume.pdf`
(the download). Regenerate the PDF from the Word source after any edit:

```powershell
$w = New-Object -ComObject Word.Application
$d = $w.Documents.Open("C:\Work\CarsonMooreResume.docx", $false, $true)
$d.SaveAs([ref]"C:\Work\portfolio\resume.pdf", [ref]17)
$d.Close($false); $w.Quit()
```

`resume.html` also has a print stylesheet, so Ctrl+P on that page produces a clean
light-background copy if you ever need one without opening Word.

---

## Deploying to Vercel

Requires a Vercel account — sign up at <https://vercel.com/signup> (the Hobby tier
is free and enough for this).

```bash
npm i -g vercel
vercel login
vercel --prod
```

On the first `vercel --prod` the CLI asks a few questions. Answers that matter:

| Prompt | Answer |
|---|---|
| Set up and deploy? | `y` |
| Which scope? | your personal account |
| Link to existing project? | `n` |
| Project name? | **`cmoore13`** |
| In which directory is your code? | `./` |
| Modify build settings? | `n` |

Naming the project `cmoore13` claims `https://cmoore13.vercel.app`, which was
unclaimed as of 2 September 2026.

To redeploy after any edit, run `vercel --prod` again from this folder.

### A custom domain

If you want `cmoore13.com` instead, that domain also had no DNS records as of
2 September 2026 — but it has to be bought. Register it anywhere (Vercel, Cloudflare,
Namecheap), then `vercel domains add cmoore13.com` and follow the DNS instructions.

---

## What is proprietary

The SpaceX projects are described in words only. No CAD, drawings, part numbers,
or hardware imagery from that work is included, and none should be added.
