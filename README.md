# MillbornBoots
Handmade Leather Boots and Goods

The Millborn Boots website: a static site in plain HTML, CSS and JavaScript, with no build step.

## Structure

- `index.html`: the page (hero, collection, craft, story, care FAQ, custom-order form)
- `css/styles.css`: styles
- `js/main.js`: mobile nav, product filters, form handling, scroll reveals
- `assets/favicon.svg`: site icon

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Before launch

- Set `CONTACT_EMAIL` at the top of `js/main.js` to the shop's real address. The form opens the visitor's email app with the inquiry filled in.
- Update the product names, prices and descriptions in `index.html`.
- Add real product photos when they're ready (the cards are text-only for now).

## Deploy

The site is static, so any static host works: GitHub Pages (Settings → Pages → deploy from this branch, root folder), Netlify, Cloudflare Pages, etc.
