# Long-Distance Date Night Invite

A single-page website that invites your long-distance girlfriend to pick between a movie night or a co-op gaming night. It uses the free [Sample APIs](https://sampleapis.com/) movie and Xbox datasets to surface light thriller, comedy, romcom, and mystery suggestions, and gracefully falls back to handpicked favorites if the API is unavailable.

## Getting started locally

The project is just three static files (`index.html`, `styles.css`, and `script.js`). To keep
the movie/game API calls working in every browser, open them through a tiny local web server
instead of double-clicking the HTML file.

1. Open a terminal in the project folder.
2. Start any lightweight static server:
   - **Python 3 (macOS, Linux, Windows)**
     ```bash
     python -m http.server 8000
     ```
   - **PowerShell on Windows (no Python required)**
     ```powershell
     Start-Process powershell -ArgumentList "-NoLogo -Command cd `"$PWD`"; npx serve -p 8000" -Wait
     ```
     (If you do not have Node/npm installed, install it or stick with the Python option.)
   - **VS Code Live Server extension** – Right-click `index.html` and choose **Open with Live Server**.
3. Visit <http://localhost:8000> (or the address Live Server prints) in your browser to interact with
   the invite.

Because everything is static HTML, CSS, and JavaScript, no build tooling is required; the server is only
there so the browser will allow the fetch requests.

### Trying the interactions

Once the page is open in your browser:

1. Click the **Movie Night** pill button (the left option) to load three streaming ideas and confirm the refresh button appears.
2. Click **Show me different ideas** to ensure a new trio of options loads.
3. Click the **Co-op Game Night** pill button to swap the copy, cards, and after-date description for gaming suggestions.
4. Optionally toggle between the two choices a few times to make sure the content updates smoothly without needing a refresh.

These steps are exactly what a visitor will do, so running through them verifies both the layout and the API/fallback logic.

## Deploying to GitHub Pages

1. Commit the contents of this repository to your GitHub repository's `main` (or `master`) branch.
2. Push to GitHub and open the repository settings.
3. Under **Pages**, choose the `main` branch with the `/ (root)` folder as the publishing source.
4. Save. GitHub Pages will serve `index.html` automatically at `https://<your-username>.github.io/<repository-name>/`.

## Customizing the experience

- Update the opening message in `index.html` to personalize the invitation even more.
- Edit the `FALLBACK_SUGGESTIONS` arrays in `script.js` to include inside jokes or personal favorites.
- Adjust styling tokens in `styles.css` to match your shared aesthetic or add your photos as backgrounds.

## APIs used

- **Movies:** `https://api.sampleapis.com/movies/*` (romance, mystery, comedy, thrillers)
- **Games:** `https://api.sampleapis.com/xbox/games`

The site automatically shows curated fallback lists if either service is unreachable so your date plans are never interrupted.
