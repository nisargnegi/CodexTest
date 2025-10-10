# Long-Distance Date Night Invite

A single-page website that invites your long-distance girlfriend, Saanu, to pick between a movie night or a co-op gaming night with you (Aloo). It uses the free [Sample APIs](https://sampleapis.com/) movie catalog and a curated Xbox ↔ Windows cross-play library so every suggestion works on both sides. Each card includes official artwork (when available), a quick summary, and the setup tip you need before pressing play together.

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

1. Click the **Movie Night** pill button (the left option) to load six streaming ideas, confirm the refresh button appears, and verify that each card displays an image and summary.
2. Use the genre chips (Action adventure, Animation, Classic, Comedy, Drama, Horror, Family, Mystery, Sci‑Fi & fantasy, Western) to filter the movie picks and confirm each one refetches suggestions straight from the matching API endpoint.
3. Click **Show me different ideas** to ensure a fresh set of six options loads for the active genre.
4. Click the **Co-op Game Night** pill button to swap the copy, cards, and after-date description for gaming suggestions. Confirm the genre chips disappear in game mode, each card lists the cross-play hookup tip, and every suggestion shows the refreshed co-op artwork.
5. Press **Show me different ideas** in either mode a few times to see the rotating set of six picks — the selector now advances through the expanded library instead of repeating the same cards.
6. Optionally toggle between the two choices to make sure the content updates smoothly without needing a full page refresh.

These steps are exactly what a visitor will do, so running through them verifies both the layout and the live API flow.

## Deploying for free

### GitHub Pages (recommended)

1. [Create a new GitHub repository](https://github.com/new) (public or private both work with Pages).
2. Upload or push the three project files (`index.html`, `styles.css`, `script.js`) and the `README.md` to the repository's default branch (`main` or `master`).
   - If you cloned this template locally, run `git remote add origin https://github.com/<your-username>/<repository-name>.git`, then `git push -u origin main`.
3. In the GitHub web UI, open **Settings → Pages**.
4. Under **Source**, select the default branch and keep the `/ (root)` option, then click **Save**.
5. Wait a minute or two for the deployment badge near the top of the page to turn green. Your invite will then be live at `https://<your-username>.github.io/<repository-name>/`.

GitHub Pages will automatically redeploy every time you push an update, making it a zero-cost way to keep the invite fresh.

> **Tip for seeing new changes immediately:** Browsers can aggressively cache `styles.css` and `script.js`. Any time you push larger updates, bump the version query in `index.html` (for example, change `?v=9` to `?v=10`) so Pages serves the newest files without requiring visitors to hard-refresh.

### Other free static hosting options

If you prefer a drag-and-drop flow, services like [Netlify Drop](https://app.netlify.com/drop) and [Vercel](https://vercel.com/) also host static sites for free:

1. Build the project by running one of the local preview servers above so you can double-check everything.
2. Drag the project folder (or a ZIP of it) into Netlify Drop, or create a new Vercel project and point it at your GitHub repository.
3. Both services return a shareable URL immediately, and will automatically redeploy whenever you upload a new ZIP or push changes to the connected repository.

These providers include free HTTPS certificates and let you add a custom domain if you want to personalize the link further.

## Customizing the experience

- Update the opening message in `index.html` to personalize the invitation even more.
- Adjust the `MOVIE_GENRES` array in `script.js` to tweak the genre labels, API endpoints, or loading copy. The Sample APIs movie service only exposes the ten chips listed on the page, so stick to those identifiers when swapping copy.
- Edit the `GAME_LIBRARY` list in `script.js` if you have favorite cross-play titles beyond the defaults or want to update the invite instructions per game.
- Adjust styling tokens in `styles.css` to match your shared aesthetic or add your photos as backgrounds.

## APIs used

- **Movies:** `https://api.sampleapis.com/movies/<genre>` (action-adventure, animation, classic, comedy, drama, horror, family, mystery, scifi-fantasy, western)
- **Games:** Curated Xbox ↔ Windows cross-play list maintained in `script.js` (no external game API is required).

## FAQ

- **Why do the movie genres stop at ten chips?** The Sample APIs movie service exposes exactly those ten genre endpoints. Keeping the list in sync ensures every button maps to a working API route.
- **What happens if the movie API is down?** The grid will show an error message and invite you to try again or pick another genre. No offline fallback cards are stored, so every result you see comes directly from the live API.
- **Where do the game suggestions come from?** They're curated manually to guarantee Xbox ↔ Windows cross-play support. Feel free to replace or extend the list in `GAME_LIBRARY` with your own favorites.

