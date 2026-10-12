# Returns — Indian Mutual Fund Analyzer 📈

A responsive, browser-based dashboard for exploring Indian mutual funds, comparing historical returns, visualizing hypothetical investment growth, estimating SIP outcomes, and learning common mutual-fund concepts.

> **Important:** This is an educational portfolio project, not an investment recommendation or a source of verified real-time financial data. Some dashboard values are sample/static values in `data.js` or the HTML. API-backed NAV information depends on the external service, network access, and browser CORS support. Verify all figures with official sources before relying on them.

## Features

- Search, filter, and sort mutual-fund schemes
- Compare up to four schemes
- Explore historical return horizons (1Y, 3Y, 5Y, and 10Y) where data is available
- Visualize hypothetical SIP and lump-sum growth
- Estimate SIP, step-up SIP, and capital-gains tax scenarios
- Explore fund houses and portfolio holdings
- Examine stock overlap between selected schemes
- Search the broader scheme database through the MFAPI service (subject to API availability)
- Read a built-in mutual-fund glossary and educational guide
- Responsive layouts, phone/laptop view controls, and dark/light themes

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- HTML Canvas for charts
- MFAPI.in integration for scheme/NAV lookup, where supported
- Google Fonts (internet connection required for remote fonts)

## Project files

```text
returns-mutual-fund-analyzer/
├── index.html       # Page structure and interface
├── styles.css       # Styling and responsive layout
├── app.js           # Interactions, rendering, and calculations
├── data.js          # Sample dataset, scheme mappings, and fund-house metadata
├── README.md        # Project documentation
├── DEPLOYMENT.md    # Free hosting steps
├── LICENSE          # MIT License
└── .gitignore       # Git ignore rules
```

## Run locally

1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` directly in a browser, or use the **Live Server** extension.
4. Keep `index.html`, `styles.css`, `data.js`, and `app.js` in the same directory.
5. An internet connection is needed for external API calls and online fonts. Static parts of the site can still render without them, but live lookup features may not work.

## Free deployment

You can publish this static site using **GitHub Pages**:

1. Create a GitHub repository named `returns-mutual-fund-analyzer`.
2. Upload all project files to the repository root.
3. Open **Settings → Pages**.
4. Under the build/deployment section, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for the deployment status to complete.

Your public URL will follow this pattern:

`https://YOUR-GITHUB-USERNAME.github.io/returns-mutual-fund-analyzer/`

Replace `YOUR-GITHUB-USERNAME` with your GitHub username. GitHub Pages serves static files; it does not run a backend server.

More detailed steps: see [DEPLOYMENT.md](DEPLOYMENT.md).

## Data and accuracy notes

- Historical returns and example market values in the bundled dataset may be illustrative, stale, or incomplete; do not assume they are current or independently verified.
- API availability, CORS rules, and the API's response format can affect live features.
- Return calculations are hypothetical estimates and do not predict future performance.
- Tax rules can change and depend on the investor's circumstances and applicable law. Confirm current rules with official sources or a qualified tax professional.
- The project does not execute trades, collect investments, or provide personalized financial advice.

## Learning goals

This project demonstrates front-end development concepts including DOM manipulation, responsive CSS, filtering and sorting, interactive controls, chart rendering, API requests, and financial formula modelling.

## License

Released under the MIT License. See [LICENSE](LICENSE).
