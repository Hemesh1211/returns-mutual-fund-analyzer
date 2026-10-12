# Free Deployment Guide — GitHub Pages

## Before publishing

1. Test the site locally and check the browser console for errors.
2. Confirm all four core files are present in the repository root:
   `index.html`, `styles.css`, `data.js`, and `app.js`.
3. Review the sample market values and the financial disclaimer. Do not present static/sample values as live verified market data.
4. Never commit passwords, API secrets, or private credentials. This project is intended to run as a static front-end.

## Publish using the GitHub website (no Git installation required)

1. Sign in at https://github.com/.
2. Click **New repository**.
3. Enter `returns-mutual-fund-analyzer` as the repository name.
4. Choose **Public** if you want it visible on your portfolio, then create the repository.
5. Select **Add file → Upload files**.
6. Upload the contents of this project folder (the files themselves, not just the ZIP).
7. Commit the files to the `main` branch.
8. Go to **Settings → Pages**.
9. Choose **Deploy from a branch**, select `main`, choose `/(root)`, and save.
10. Wait for GitHub Pages to finish building. Open the URL displayed in the Pages settings.

The URL normally follows this format:

`https://YOUR-GITHUB-USERNAME.github.io/returns-mutual-fund-analyzer/`

## Updating the website

Edit the files locally or directly on GitHub, commit the changes, and GitHub Pages will publish the update after its deployment finishes.

## Troubleshooting

- **CSS is missing:** make sure `styles.css` is at the repository root and the filename matches exactly.
- **Buttons or data are missing:** check that `data.js` loads before `app.js`, and inspect the browser console.
- **API search fails:** check the internet connection, the API status, and browser CORS restrictions. GitHub Pages cannot fix restrictions imposed by an external API.
- **A page shows old values:** bundled values may be static. Verify live values from official sources; do not assume every ticker or headline is live.
- **Root page not found:** confirm `index.html` is in the selected branch and repository root.
