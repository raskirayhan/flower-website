# Flower Market

[![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Flower Market is a responsive static flower-shop landing page built with plain HTML and CSS. It presents a floral hero section, plant cards, a plant-lover feature section, promotional deals, a newsletter call to action, and a footer with local social icons.

## Preview Asset

The page uses this local hero asset:

![Flower Market hero asset](assets/hero-flower.png)

## Features

- Responsive navigation and hero layout
- Plant catalog cards with a client-side "added to cart" alert
- Plant-lover content section with a rotating trusted badge
- Promotional deal panels backed by local image assets
- Newsletter call to action and footer navigation layout
- Mobile layout rules for the catalog, feature sections, deals, and footer

The project is a visual front-end exercise. It has no shopping-cart state, checkout, newsletter service, or backend.

## Tech Stack

- HTML5
- CSS3 with responsive media queries and local image assets
- Google Fonts (`Noto Serif` and `Inter`)
- Font Awesome 6 CDN for the cart icon

## Setup and Usage

There is no package manager or build step. Open `index.html` in a browser, or serve the directory locally for more predictable asset loading:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Folder Structure

```text
flower-website/
├── assets/              # Logo, flower, deal, badge, and social images
├── styles/
│   └── flower.css       # Layout, typography, colors, and responsive rules
├── index.html           # Single-page markup and small inline alert handler
└── README.md
```

## Deployment

No hosted deployment URL is present in the repository or verified from the local files. Any static host that serves `index.html` and the relative `assets/` and `styles/` paths can host the page.

## Roadmap

- Replace placeholder navigation links with real sections or pages.
- Add a real cart model and product data instead of repeated static cards.
- Connect newsletter submission to a service with consent and validation.
- Improve semantic markup, image alt text, and keyboard interaction.

## Known Issues

- Navigation, deal, footer, and policy links currently use empty `href` values.
- The cart total is static and the add-to-cart action only displays an alert.
- The newsletter form has no submission handler.
- Several images have empty alt text, and the markup contains a misspelled `setion` element.
- Font Awesome and Google Fonts require network access when loaded from a local file or static server.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). For visual changes, check the page at a desktop width and at a narrow mobile width before opening a pull request.

## License

Distributed under the MIT License. See [LICENSE](LICENSE).

## Author

Maintained by [raskirayhan](https://github.com/raskirayhan).
