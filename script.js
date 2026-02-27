const invitationTitle = document.getElementById("invitation-title");
const invitationMessage = document.getElementById("invitation-message");
const suggestionsSection = document.querySelector(".suggestions");
const suggestionsTitle = document.getElementById("suggestions-title");
const suggestionsDescription = document.getElementById("suggestions-description");
const suggestionsGrid = document.getElementById("suggestions-grid");
const genrePicker = document.getElementById("genre-picker");
const refreshButton = document.getElementById("refresh-button");

const SUGGESTION_COUNT = 6;
const MOVIE_API_BASE = "movies.json";

const MOVIE_GENRES = [
  {
    id: "action-adventure",
    label: "Action & Adventure",
    description:
      "Big set pieces and bold escapes when we want our long-distance date to feel like a blockbuster team-up.",
    loadingCopy: "Packing our virtual go-bag with daring picks…",
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
    id: "family",
    label: "Family",
    description:
      "Wholesome adventures and heartwarming moments perfect for an easy-going call night.",
    loadingCopy: "Collecting the coziest family picks…",
  },
  {
    id: "horror",
    label: "Horror",
    description:
      "Spine-tingling thrills so we can clutch our pillows and pretend we’re brave for each other.",
    loadingCopy: "Calling in the spooky thrills…",
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
    label: "Sci‑Fi & Fantasy",
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
      "The ultimate couple's adventure. We'll work together through every puzzle and laugh at the chaos.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2l2x.jpg",
    note: "Best played with voice chat on!",
  },
  {
    title: "Stardew Valley",
    summary:
      "Let's build a farm, raise some chickens, and live a peaceful virtual life together.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.jpg",
    note: "Relaxing vibes guaranteed.",
  },
  {
    title: "Sea of Thieves",
    summary:
      "Just you, me, and the open sea. We can hunt for treasure or just sail into the sunset.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1s5y.jpg",
    note: "Prepare for pirate shenanigans!",
  },
  {
    title: "Unravel Two",
    summary:
      "A beautiful puzzle platformer where we're literally tied together. Symbolism much?",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x76.jpg",
    note: "Requires teamwork and patience.",
  },
  {
    title: "Portal 2",
    summary:
      "For when we want to feel smart (or confused) together. Science has never been this romantic.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.jpg",
    note: "High fives after every puzzle.",
  },
  {
    title: "Minecraft",
    summary:
      "We can build our dream house, go on adventures, or just tend to our garden.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co28f8.jpg",
    note: "Creative mode or Survival, you pick.",
  },
  {
    title: "Overcooked! 2",
    summary:
      "Chaotic kitchen co-op. A true test of our communication skills (and patience!).",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v0f.jpg",
    note: "Try not to burn the kitchen down!",
  },
  {
    title: "Haven",
    summary:
      "A RPG about everyday love, rebelling against the rules, and staying together.",
    image:
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.jpg",
    note: "A story made for two.",
  },
];

let currentMode = null;
let activeGenreId = MOVIE_GENRES[0].id;

function getPosterUrl(item) {
  const candidates = [item?.posterURL, item?.posterUrl, item?.poster];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
        return candidate.trim();
    }
  }
  return null;
}

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
    const response = await fetch(MOVIE_API_BASE);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const allMovies = await response.json();
    const genreMovies = allMovies[genre.id] || [];

    const cleaned = genreMovies.filter((item) => item?.title && getPosterUrl(item));

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
      image.src = getPosterUrl(item);
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

      const trailerLink = document.createElement("a");
      trailerLink.className = "suggestion-card__trailer";
      trailerLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " trailer")}`;
      trailerLink.target = "_blank";
      trailerLink.rel = "noopener noreferrer";
      trailerLink.textContent = "▶ Watch Trailer";
      body.appendChild(trailerLink);

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
