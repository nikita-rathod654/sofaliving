# SOFALIVING Sofa Customiser

Front-end-only sofa customiser built with Next.js (App Router), React and plain CSS. Pick a model, colour, fabric and seating size, see a live price and photo, then send an enquiry with your exact configuration.

> A fictional brand created for a coding assignment.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

- `lib/data.js`: models, colours, fabrics, seating rules, `price()` and `photoSrcs()`.
- `app/page.js`: page sections and the shared state `{ model, colour, fabric, seats }`.
- `components/`: Navbar, SofaCard, SofaCustomiser, ColourSelector, PriceSummary, EnquiryForm, Photo, Sofa, Reveal.

## How it works

- Default: Luna / Beige / Natural Linen / 3 Seater = ₹42,999.
- Price = base price + fabric adjustment + seating adjustment, calculated from data with no hardcoded combinations.
- Changing the model swaps the available colours. If the current colour isn't valid for the new model, it resets to that model's first colour.
- The selection is saved in `localStorage` and restored on refresh.
- The enquiry form validates name, 10-digit phone, email, and city with a 6-digit pincode, then shows a success state.
- Animations: scroll reveal, hovers, photo fade-in, price count-up. Reduced-motion is respected for the stat counters.

## Using real images

Put photos in `public/sofas/`, using lowercase file names.

- `hero.png` for the hero.
- `luna.png`, `urban.png`, `cloud.png` for the cards, and for each model's own colour (Beige, Charcoal, Olive).
- `<model>_<colour>.png` for every other combination, e.g. `luna_charcoal.png`, `cloud_midnight.png` (`midnigth` also works).
- If a file is missing, an SVG sofa in the selected colour is shown instead.

## Known limitations

- No backend: the enquiry form only simulates sending, and nothing is stored or emailed.
- The photo changes with model and colour only. Fabric and seating change the price and labels, not the image.
- "360° Inspection Ready" is a short CSS spin, not a real 3D viewer.
- Prices, contact details and stats are static placeholder data.
- Photos use plain `<img>`, not `next/image`, so large PNGs load slowly. WebP would help.
- No automated tests, and only basic accessibility (`aria` attributes) has been done.