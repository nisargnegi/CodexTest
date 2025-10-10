const invitationTitle = document.getElementById("invitation-title");
const invitationMessage = document.getElementById("invitation-message");
const suggestionsSection = document.querySelector(".suggestions");
const suggestionsTitle = document.getElementById("suggestions-title");
const suggestionsDescription = document.getElementById("suggestions-description");
const suggestionsGrid = document.getElementById("suggestions-grid");
const genrePicker = document.getElementById("genre-picker");
const refreshButton = document.getElementById("refresh-button");

const MOVIE_GENRES = {
  any: {
    label: "Surprise mix",
    loadingCopy: "Pulling in a mix of light thrills, mystery, and romcom smiles just for you.",
    description:
      "A little sampler platter of the thrillers, mysteries, comedies, and romcoms we keep promising to watch together.",
    endpoints: [
      "https://api.sampleapis.com/movies/romance",
      "https://api.sampleapis.com/movies/mystery",
      "https://api.sampleapis.com/movies/comedy",
      "https://api.sampleapis.com/movies/thrillers",
    ],
    fallback: [
      {
        title: "Karwaan (2018)",
        description:
          "A breezy Hindi road-trip dramedy so we can laugh with Irrfan Khan and trade travel daydreams after the credits.",
      },
      {
        title: "The Half of It (2020)",
        description:
          "Thoughtful English romcom energy with plenty of 'pause to discuss' moments for us on call.",
      },
      {
        title: "Enola Holmes (2022)",
        description:
          "Playful mystery vibes where we can guess clues together and cheer for Millie Bobby Brown's sleuthing.",
      },
      {
        title: "Phone Bhoot (2022)",
        description:
          "Ghostbusters meets desi comedy – it's silly, spooky-light, and perfect for giggles across the screen.",
      },
    ],
  },
  romcom: {
    label: "Romcom glow",
    loadingCopy: "Collecting soft, heartwarming romances that feel like us.",
    description:
      "Warm, flirty romcoms so we can blush, laugh, and quote our favorite lines back to each other.",
    endpoints: ["https://api.sampleapis.com/movies/romance"],
    fallback: [
      {
        title: "Jab We Met (2007)",
        description:
          "Classic Hindi romcom chaos – I'll be the Aditya to your Geet while we shout the lines together.",
      },
      {
        title: "Yeh Jawaani Hai Deewani (2013)",
        description:
          "Travel, friendship, and slow-burn romance with enough feel-good scenes to make us plan our own reunion.",
      },
      {
        title: "Set It Up (2018)",
        description:
          "Light English romcom matchmaking that feels like texting memes while cheering for the leads.",
      },
      {
        title: "Little Things (S1)",
        description:
          "Short, slice-of-life episodes about a long-term couple – so relatable that we'll keep saying, 'that's us!'.",
      },
    ],
  },
  comedy: {
    label: "Comedy night",
    loadingCopy: "Hunting down the funniest Hindi and English picks for our shared watchlist.",
    description:
      "Feel-good comedies that keep the banter rolling while we snack and send each other reaction selfies.",
    endpoints: ["https://api.sampleapis.com/movies/comedy"],
    fallback: [
      {
        title: "Stree (2018)",
        description:
          "Horror-comedy but mostly comedy – we can pretend to be brave for each other and laugh at Rajkummar Rao.",
      },
      {
        title: "Chupke Chupke (1975)",
        description:
          "An old-school Hindi classic that's still peak wholesome comedy for a chill evening.",
      },
      {
        title: "The Nice Guys (2016)",
        description:
          "Buddy-cop laughs with mystery sprinkles – perfect for quipping one-liners back and forth.",
      },
      {
        title: "Brooklyn Nine-Nine (S1)",
        description:
          "30-minute bursts of joy we can binge or savor, complete with heists, hugs, and Halloween references.",
      },
    ],
  },
  mystery: {
    label: "Mystery & sleuthing",
    loadingCopy: "Gathering clever mysteries so Detective Saanu & Agent Aloo can solve the case together.",
    description:
      "Whodunits and light thrillers that keep us guessing aloud and comparing theories in our chat.",
    endpoints: ["https://api.sampleapis.com/movies/mystery"],
    fallback: [
      {
        title: "Detective Byomkesh Bakshy! (2015)",
        description:
          "Stylish Hindi mystery with noir vibes – we'll pause to piece clues like a true crime-solving duo.",
      },
      {
        title: "Knives Out (2019)",
        description:
          "Twisty, witty, and perfect for placing friendly bets on the culprit before Benoit Blanc does.",
      },
      {
        title: "Only Murders in the Building (S1)",
        description:
          "Bite-sized mystery episodes packed with humor, podcast jokes, and plenty of 'next episode?' energy.",
      },
      {
        title: "Badla (2019)",
        description:
          "A taut Hindi thriller that's gripping without being gory – ideal for leaning into suspense together.",
      },
    ],
  },
  thriller: {
    label: "Gentle thrills",
    loadingCopy: "Picking the edge-of-seat stories that stay light enough for a cozy night.",
    description:
      "Tension with a soft landing – thrillers that keep hearts racing but still let us sleep easy afterward.",
    endpoints: ["https://api.sampleapis.com/movies/thrillers"],
    fallback: [
      {
        title: "Andhadhun (2018)",
        description:
          "Dark comedy-thriller goodness with Ayushmann Khurrana – suspenseful yet cheeky for playful commentary.",
      },
      {
        title: "Searching (2018)",
        description:
          "Screen-life thriller told through texts and calls; we'll feel like detectives combing through clues IRL.",
      },
      {
        title: "Ocean's Eight (2018)",
        description:
          "Heist glam, strong women, and clever twists that will inspire us to plan our own (legal) adventures.",
      },
      {
        title: "Lupin (S1)",
        description:
          "French gentleman thief with Robin Hood charm – stylish, smart, and satisfying in every episode.",
      },
    ],
  },
};

const GAME_CONFIG = {
  title: "Let's squad up",
  description: "Cross-play friendly games so Xbox-Saanu and PC-Aloo can conquer quests together.",
  endpoints: ["https://api.sampleapis.com/xbox/games"],
  fallback: [
    {
      title: "It Takes Two",
      description:
        "Our ultimate team-up story – puzzles, heartfelt moments, and plenty of 'we got this!' high fives.",
    },
    {
      title: "Overcooked! 2",
      description:
        "Chaotic kitchens that guarantee laughter, shouting orders, and maybe a few playful mock arguments.",
    },
    {
      title: "A Way Out",
      description:
        "Co-op cinematic adventure where we plan each escape route like pros and celebrate every close call.",
    },
    {
      title: "Stardew Valley (Co-op)",
      description:
        "A slow evening on our shared farm – fishing, gifting, and plotting out the cutest pixel home.",
    },
  ],
};

const state = {
  choice: null,
  genre: "any",
};

const cache = new Map();

function getCacheKey(choice, { genre = "any" } = {}) {
  return choice === "movie" ? `${choice}-${genre}` : choice;
}

function pickRandomItems(array, amount = 3) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(amount, shuffled.length));
}

function normalizeGenres(genre) {
  if (!genre) return [];
  const value = Array.isArray(genre) ? genre : `${genre}`.split(",");
  return value.map((item) => item.trim());
}

function normalizeLanguages(language) {
  if (!language) return [];
  if (Array.isArray(language)) return language.map((item) => item.trim());
  return `${language}`
    .split(/,|\//)
    .map((item) => item.trim());
}

function mapToSuggestion(item, fallbackLabel) {
  const title =
    item?.title ||
    item?.name ||
    item?.game ||
    item?.showTitle ||
    item?.shortTitle ||
    fallbackLabel ||
    "Untitled";

  const description =
    item?.synopsis ||
    item?.plot ||
    item?.overview ||
    item?.description ||
    item?.review ||
    item?.summary ||
    item?.notes ||
    (item?.genre ? `Genre: ${[].concat(item.genre).join(", ")}` : null) ||
    (item?.year ? `Released in ${item.year}.` : null) ||
    "Saving a special spot on our list.";

  return { title, description };
}

function filterMovies(items, genreKey) {
  const acceptedLanguages = ["hindi", "english"];
  const requestedGenre = MOVIE_GENRES[genreKey] ? genreKey : "any";

  return items.filter((item) => {
    const rating = (item?.rating || item?.rated || "").toUpperCase();
    if (rating && /(NC-17|R)/.test(rating)) {
      return false;
    }

    const languages = normalizeLanguages(item?.language || item?.languages);
    if (
      languages.length > 0 &&
      !languages.some((lang) =>
        acceptedLanguages.some((accepted) => lang.toLowerCase().includes(accepted))
      )
    ) {
      return false;
    }

    if (requestedGenre === "any") {
      return true;
    }

    const genres = normalizeGenres(item?.genre || item?.genres || item?.categories);
    if (genres.length === 0) {
      return true;
    }

    switch (requestedGenre) {
      case "romcom":
        return genres.some((value) => /romance|romantic|rom-com|romcom|love/i.test(value));
      case "comedy":
        return genres.some((value) => /comedy/i.test(value));
      case "mystery":
        return genres.some((value) => /mystery|detective|crime|whodunit/i.test(value));
      case "thriller":
        return genres.some((value) => /thriller|suspense|heist|spy/i.test(value));
      default:
        return true;
    }
  });
}

function filterGames(items) {
  return items.filter((item) => {
    const crossplay = `${item?.crossPlay || item?.crossplay || ""}`.toLowerCase();
    const supportsCrossplay = /pc|windows/.test(crossplay) || /cross[- ]play/.test(crossplay);
    const coop = `${item?.genres || item?.genre || item?.categories || ""}`.toLowerCase();
    const cooperative = /coop|co-op|cooperative|multiplayer|together/.test(coop);
    const maxPlayers = parseInt(item?.maxPlayers || item?.players || "", 10);
    const likelyCoop = Number.isFinite(maxPlayers) ? maxPlayers > 1 : false;
    return supportsCrossplay || cooperative || likelyCoop || !coop;
  });
}

async function fetchSuggestions(choice, { genre = "any" } = {}) {
  const cacheKey = getCacheKey(choice, { genre });
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const endpoints =
    choice === "movie"
      ? MOVIE_GENRES[genre]?.endpoints || MOVIE_GENRES.any.endpoints
      : GAME_CONFIG.endpoints;

  try {
    const results = await Promise.all(
      endpoints.map(async (endpoint) => {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
    );

    const flattened = results.flat();
    if (!Array.isArray(flattened) || flattened.length === 0) {
      throw new Error("No results returned");
    }

    const filtered =
      choice === "movie"
        ? filterMovies(flattened, genre)
        : filterGames(flattened);

    if (!Array.isArray(filtered) || filtered.length === 0) {
      throw new Error("No usable results");
    }

    const suggestions = pickRandomItems(filtered, 3).map((item) =>
      mapToSuggestion(item, choice === "movie" ? MOVIE_GENRES[genre]?.label : undefined)
    );

    cache.set(cacheKey, suggestions);
    return suggestions;
  } catch (error) {
    console.warn("Falling back to offline suggestions", error);
    const fallback =
      choice === "movie"
        ? MOVIE_GENRES[genre]?.fallback || MOVIE_GENRES.any.fallback
        : GAME_CONFIG.fallback;
    const suggestions = pickRandomItems(fallback, 3);
    cache.set(cacheKey, suggestions);
    return suggestions;
  }
}

function renderSuggestions(items) {
  suggestionsGrid.innerHTML = "";
  items.forEach(({ title, description }) => {
    const card = document.createElement("article");
    card.className = "suggestion-card";
    card.setAttribute("role", "listitem");

    const heading = document.createElement("h3");
    heading.textContent = title;
    card.appendChild(heading);

    const copy = document.createElement("p");
    copy.textContent = description;
    card.appendChild(copy);

    suggestionsGrid.appendChild(card);
  });
}

function updateGenreButtons(activeKey) {
  if (!genrePicker) return;
  [...genrePicker.querySelectorAll("button")].forEach((button) => {
    const isActive = button.dataset.genre === activeKey;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("genre-button--active", isActive);
  });
}

async function loadSuggestions(choice, { genre = "any", resetCache = false } = {}) {
  const cacheKey = getCacheKey(choice, { genre });
  if (resetCache) {
    cache.delete(cacheKey);
  }

  const isMovie = choice === "movie";
  const loadingCopy = isMovie
    ? MOVIE_GENRES[genre]?.loadingCopy || MOVIE_GENRES.any.loadingCopy
    : "Finding the best co-op quests for Team Aloo & Saanu.";

  suggestionsDescription.textContent = loadingCopy;
  suggestionsGrid.innerHTML = "";
  refreshButton.hidden = true;

  try {
    const items = await fetchSuggestions(choice, { genre });
    renderSuggestions(items);
    suggestionsDescription.textContent = isMovie
      ? MOVIE_GENRES[genre]?.description || MOVIE_GENRES.any.description
      : GAME_CONFIG.description;
    refreshButton.hidden = false;
    refreshButton.dataset.choice = choice;
    if (isMovie) {
      refreshButton.dataset.genre = genre;
    } else {
      delete refreshButton.dataset.genre;
    }
  } catch (error) {
    console.error("Unable to load suggestions", error);
    suggestionsDescription.textContent =
      "I couldn't fetch new ideas right now, but I left a few of my personal favorites below.";
  }
}

function showGenrePicker() {
  if (!genrePicker) return;
  genrePicker.hidden = false;

  if (genrePicker.childElementCount === 0) {
    Object.entries(MOVIE_GENRES).forEach(([key, config]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "genre-button";
      button.dataset.genre = key;
      button.textContent = config.label;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        if (state.genre === key) {
          loadSuggestions("movie", { genre: key, resetCache: true });
          return;
        }
        state.genre = key;
        updateGenreButtons(key);
        loadSuggestions("movie", { genre: key, resetCache: true });
      });
      genrePicker.appendChild(button);
    });
  }

  updateGenreButtons(state.genre);
}

function hideGenrePicker() {
  if (!genrePicker) return;
  genrePicker.hidden = true;
}

async function handleChoice(choice) {
  state.choice = choice;

  if (choice === "movie") {
    showGenrePicker();
    suggestionsTitle.textContent = "Movie magic for my Saanu";
    invitationTitle.textContent = "Movie night coming up, Saanu!";
    invitationMessage.textContent =
      "I'll sync the stream from here while you grab the coziest blanket. Let's pick what we're watching.";
  } else {
    hideGenrePicker();
    suggestionsTitle.textContent = "Game night loadout";
    invitationTitle.textContent = "Controller batteries? Charged!";
    invitationMessage.textContent =
      "I'll set up the lobby and drop the invite in our chat. Choose the mission that sounds most fun tonight.";
  }

  suggestionsSection.hidden = false;

  const genre = choice === "movie" ? state.genre : undefined;
  await loadSuggestions(choice, { genre });
}

function setupEventListeners() {
  document.querySelectorAll(".pill-button[data-choice]").forEach((button) => {
    button.addEventListener("click", () => handleChoice(button.dataset.choice));
  });

  refreshButton.addEventListener("click", async () => {
    const choice = refreshButton.dataset.choice;
    if (!choice) return;
    const genre = refreshButton.dataset.genre || state.genre;
    await loadSuggestions(choice, { genre, resetCache: true });
  });
}

setupEventListeners();
