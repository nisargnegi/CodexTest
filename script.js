const invitationTitle = document.getElementById("invitation-title");
const invitationMessage = document.getElementById("invitation-message");
const suggestionsSection = document.querySelector(".suggestions");
const suggestionsTitle = document.getElementById("suggestions-title");
const suggestionsDescription = document.getElementById("suggestions-description");
const suggestionsGrid = document.getElementById("suggestions-grid");
const genrePicker = document.getElementById("genre-picker");
const refreshButton = document.getElementById("refresh-button");

const SUGGESTION_COUNT = 6;
const MOVIE_API_BASE = "https://api.sampleapis.com/movies";

const MOVIE_GENRES = [
  {
    id: "action-adventure",
    label: "Action adventure",
    description:
      "Adrenaline rushes, daring escapes, and the kind of teamwork that has us cheering together over call.",
    loadingCopy: "Scouting out the boldest missions for us…",
  },
  {
    id: "animation",
    label: "Animation",
    description:
      "Bright, charming animated stories that feel like a cozy hug, no matter how many miles between us.",
    loadingCopy: "Gathering the sweetest animated tales…",
  },
  {
    id: "classic",
    label: "Classic",
    description:
      "Timeless gems to make our long-distance watch party feel like a cinematic time machine date night.",
    loadingCopy: "Dusting off the classics just for us…",
  },
  {
    id: "comedy",
    label: "Comedy",
    description:
      "Feel-good laughs that keep our call filled with giggles, inside jokes, and screenshot-worthy moments.",
    loadingCopy: "Hunting for the funniest picks…",
  },
  {
    id: "drama",
    label: "Drama",
    description:
      "Slow-burn stories with big feelings so we can unpack every twist together afterwards.",
    loadingCopy: "Queuing up the most gripping stories…",
  },
  {
    id: "horror",
    label: "Horror",
    description:
      "Spine-tingling thrills so we can clutch our pillows and pretend we’re brave for each other.",
    loadingCopy: "Calling in the spooky thrills…",
  },
  {
    id: "family",
    label: "Family",
    description:
      "Wholesome adventures and heartwarming moments perfect for an easy-going call night.",
    loadingCopy: "Collecting the coziest family picks…",
  },
  {
    id: "mystery",
    label: "Mystery",
    description:
      "Whodunits and puzzles that let us play detective together and trade theories in real time.",
    loadingCopy: "Following the clues…",
  },
  {
    id: "scifi-fantasy",
    label: "Sci‑Fi & fantasy",
    description:
      "Portal-hopping stories that feed our imagination and give us worlds to explore side by side.",
    loadingCopy: "Charting far-away realms…",
  },
  {
    id: "western",
    label: "Western",
    description:
      "Dusty duels and sprawling adventures when we feel like a stylish throwback vibe.",
    loadingCopy: "Rounding up the western legends…",
  },
];

const GAME_LIBRARY = [
  {
    title: "It Takes Two",
    summary:
      "Swap between wild co-op mechanics as we guide Cody and May through a heartfelt, imaginative adventure.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2l2x.jpg",
    note: "Cross-play via EA App – invite directly from the in-game friends list.",
  },
  {
    title: "Deep Rock Galactic",
    summary:
      "Dwarf squad shenanigans, procedurally generated caves, and teamwork that keeps us laughing the whole dig.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2e5c.jpg",
    note: "Cross-play between Xbox and Microsoft Store PC editions – host from either side.",
  },
  {
    title: "Sea of Thieves",
    summary:
      "Sail, sing, and swashbuckle as a pirate duo chasing tall tales, treasure, and cozy sunsets.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1s5y.jpg",
    note: "Full cross-play – crew up by sharing an invite code or Xbox gamertag.",
  },
  {
    title: "Forza Horizon 5",
    summary:
      "Road-trip across Mexico with convoys, expeditions, and photo ops to swap in chat afterwards.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3w7z.jpg",
    note: "Cross-play through Xbox Live – jump into each other’s convoy with a single invite.",
  },
  {
    title: "Halo Infinite",
    summary:
      "Tactical arena bouts and sweeping co-op missions so Team Aloo & Saanu can flex heroic teamwork.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p7p.jpg",
    note: "Cross-play matchmaking – party up from the social menu and head straight into action.",
  },
  {
    title: "Minecraft Dungeons",
    summary:
      "Button-mashing dungeon crawling with cute loot and plenty of moments to revive each other.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2bqz.jpg",
    note: "Cross-play enabled – use Microsoft accounts to invite across PC and Xbox.",
  },
  {
    title: "Overcooked! 2",
    summary:
      "Chaotic kitchen co-op that lets us yell playful instructions while serving up adorable dishes.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v0f.jpg",
    note: "Enable cross-platform play in-game to cook together from PC and Xbox.",
  },
  {
    title: "Splitgate",
    summary:
      "Portal-flinging arena matches where our quick comms and clever plays shine brightest.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co22k1.jpg",
    note: "Cross-play parties – link up via invite code or friends list before hopping into matches.",
  },
];

let currentMode = null;
let activeGenreId = MOVIE_GENRES[0].id;

function pickRandomItems(items, count) {
  const pool = [...items];
  const selection = [];
  const maxCount = Math.min(count, pool.length);

  for (let i = 0; i < maxCount; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    selection.push(pool.splice(index, 1)[0]);
  }

  return selection;
}

function setButtonState(mode) {
  const heroButtons = document.querySelectorAll(".pill-button[data-choice]");
  heroButtons.forEach((button) => {
    const isActive = button.dataset.choice === mode;
    button.classList.toggle("pill-button--active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function renderGenreButtons() {
  genrePicker.innerHTML = "";

  MOVIE_GENRES.forEach((genre) => {
    const button = document.createElement("button");
    button.className = "genre-button";
    button.type = "button";
    button.textContent = genre.label;
    button.dataset.genreId = genre.id;
    button.setAttribute("aria-pressed", genre.id === activeGenreId ? "true" : "false");

    if (genre.id === activeGenreId) {
      button.classList.add("genre-button--active");
    }

    button.addEventListener("click", () => {
      if (activeGenreId === genre.id) return;
      activeGenreId = genre.id;
      updateGenreButtonState();
      loadMovieSuggestions();
    });

    genrePicker.appendChild(button);
  });
}

function updateGenreButtonState() {
  const buttons = genrePicker.querySelectorAll(".genre-button");
  buttons.forEach((button) => {
    const isActive = button.dataset.genreId === activeGenreId;
    button.classList.toggle("genre-button--active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

async function loadMovieSuggestions() {
  const genre = MOVIE_GENRES.find((item) => item.id === activeGenreId);

  if (!genre) {
    suggestionsDescription.textContent = "Pick a genre to see what I found for us.";
    suggestionsGrid.innerHTML = "";
    return;
  }

  suggestionsTitle.textContent = "Tonight's watchlist";
  suggestionsDescription.textContent = genre.loadingCopy;
  refreshButton.hidden = false;
  refreshButton.disabled = true;
  refreshButton.textContent = "Loading…";

  try {
    const response = await fetch(`${MOVIE_API_BASE}/${genre.id}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const cleaned = data.filter((item) => {
      if (!item?.title) return false;

      const poster = item?.posterURL || item?.posterUrl || item?.poster;
      if (!poster || poster === "N/A") return false;

      const summary =
        (typeof item.plot === "string" && item.plot.trim()) ||
        (typeof item.description === "string" && item.description.trim()) ||
        (typeof item.overview === "string" && item.overview.trim());

      return Boolean(summary);
    });

    const selection = pickRandomItems(cleaned, SUGGESTION_COUNT);

    suggestionsDescription.textContent = genre.description;
    suggestionsGrid.innerHTML = "";

    if (selection.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "suggestions__empty";
      emptyState.textContent = "No titles popped up for that genre right now. Try a different vibe or tap refresh.";
      suggestionsGrid.appendChild(emptyState);
      return;
    }

    selection.forEach((item) => {
      const card = document.createElement("article");
      card.className = "suggestion-card";
      card.setAttribute("role", "listitem");
      card.dataset.suggestionType = "movie";

      const media = document.createElement("div");
      media.className = "suggestion-card__media";
      const image = document.createElement("img");
      image.loading = "lazy";
      image.src = item.posterURL || item.posterUrl || item.poster;
      image.alt = `${item.title} poster`;
      media.appendChild(image);

      const body = document.createElement("div");
      body.className = "suggestion-card__body";

      const title = document.createElement("h3");
      title.textContent = item.title;
      body.appendChild(title);

      const metaBits = [];
      if (item.year) metaBits.push(item.year);
      if (item.runtime) metaBits.push(`${item.runtime} mins`);

      const director = item.director || item.directors;
      if (director) {
        metaBits.push(`Director: ${Array.isArray(director) ? director.join(", ") : director}`);
      }

      const metaText = metaBits.join(" • ");

      if (metaText) {
        const meta = document.createElement("p");
        meta.className = "suggestion-card__meta";
        meta.textContent = metaText;
        body.appendChild(meta);
      }

      const summary = document.createElement("p");
      summary.className = "suggestion-card__summary";
      const summaryText =
        (typeof item.plot === "string" && item.plot.trim()) ||
        (typeof item.description === "string" && item.description.trim()) ||
        (typeof item.overview === "string" && item.overview.trim()) ||
        "Let's find out what makes this one special together.";
      summary.textContent = summaryText;

      body.appendChild(summary);

      card.appendChild(media);
      card.appendChild(body);
      suggestionsGrid.appendChild(card);
    });
  } catch (error) {
    suggestionsGrid.innerHTML = "";
    const errorMessage = document.createElement("p");
    errorMessage.className = "suggestions__error";
    errorMessage.textContent = "I couldn't load that genre right now. Let's try again in a moment or pick another one.";
    suggestionsGrid.appendChild(errorMessage);
    console.error(error);
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "Show me different ideas";
  }
}

function loadGameSuggestions() {
  suggestionsTitle.textContent = "Tonight's game queue";
  suggestionsDescription.textContent =
    "Every pick keeps Xbox and Windows PC cross-play ready so we can jump in together instantly.";
  genrePicker.hidden = true;

  const selection = pickRandomItems(GAME_LIBRARY, SUGGESTION_COUNT);
  suggestionsGrid.innerHTML = "";

  selection.forEach((item) => {
    const card = document.createElement("article");
    card.className = "suggestion-card";
    card.setAttribute("role", "listitem");
    card.dataset.suggestionType = "game";

    const media = document.createElement("div");
    media.className = "suggestion-card__media";
    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = item.image;
    image.alt = `${item.title} cover art`;
    media.appendChild(image);

    const body = document.createElement("div");
    body.className = "suggestion-card__body";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const summary = document.createElement("p");
    summary.className = "suggestion-card__summary";
    summary.textContent = item.summary;

    const note = document.createElement("p");
    note.className = "suggestion-card__note";
    note.textContent = item.note;

    body.appendChild(title);
    body.appendChild(summary);
    body.appendChild(note);

    card.appendChild(media);
    card.appendChild(body);
    suggestionsGrid.appendChild(card);
  });

  refreshButton.hidden = GAME_LIBRARY.length <= SUGGESTION_COUNT;
  refreshButton.disabled = false;
  refreshButton.textContent = "Show me different ideas";
}

function setMode(mode) {
  if (currentMode === mode) return;
  currentMode = mode;
  setButtonState(mode);
  suggestionsSection.hidden = false;
  suggestionsGrid.innerHTML = "";
  refreshButton.hidden = false;
  refreshButton.disabled = false;
  refreshButton.textContent = "Show me different ideas";

  if (mode === "movie") {
    genrePicker.hidden = false;
    renderGenreButtons();
    loadMovieSuggestions();
  } else if (mode === "game") {
    loadGameSuggestions();
  }

  invitationTitle.textContent =
    mode === "movie" ? "Let’s press play together" : "Ready to dive into game night?";
  invitationMessage.textContent =
    mode === "movie"
      ? "Pick a genre and I’ll queue a fresh batch of films for us to stream side by side."
      : "Here’s our cross-play friendly lineup so we can squad up without any fuss.";
}

refreshButton.addEventListener("click", () => {
  if (currentMode === "movie") {
    loadMovieSuggestions();
  } else if (currentMode === "game") {
    loadGameSuggestions();
  }
});

document.querySelectorAll(".pill-button[data-choice]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.choice));
});

// Default to movie mode on load so the genre chips are ready to go.
setMode("movie");
