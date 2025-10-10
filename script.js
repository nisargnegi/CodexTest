const invitationTitle = document.getElementById("invitation-title");
const invitationMessage = document.getElementById("invitation-message");
const suggestionsSection = document.querySelector(".suggestions");
const suggestionsTitle = document.getElementById("suggestions-title");
const suggestionsDescription = document.getElementById("suggestions-description");
const suggestionsGrid = document.getElementById("suggestions-grid");
const refreshButton = document.getElementById("refresh-button");

const FALLBACK_SUGGESTIONS = {
  movie: [
    {
      title: "Karwaan (2018)",
      description:
        "A heartwarming road-trip dramedy with Dulquer Salman & Irrfan Khan—perfect for easy laughs and tender feels.",
    },
    {
      title: "The Half of It (2020)",
      description: "A sweet, thoughtful romcom about friendship and first love that we can dissect together afterward.",
    },
    {
      title: "Enola Holmes (2022)",
      description: "Light mystery, cheeky humor, and a fierce heroine—we'll be sleuthing side by side.",
    },
    {
      title: "Knives Out (2019)",
      description: "A modern whodunit with laughs and twists. We can place bets on who did it before the reveal!",
    },
  ],
  game: [
    {
      title: "It Takes Two",
      description:
        "A co-op adventure full of heartfelt storytelling and clever puzzles. We can tackle each challenge as a team.",
    },
    {
      title: "Overcooked! 2",
      description: "Chaotic kitchens, lots of laughter, and a great excuse to yell 'Yes, Chef!' at each other.",
    },
    {
      title: "A Way Out",
      description: "Cinematic split-screen adventure that feels like starring in our own interactive thriller.",
    },
    {
      title: "Stardew Valley (Co-op)",
      description: "Relaxed farming dates where we can plant, fish, and build our cozy pixel home together.",
    },
  ],
};

const API_CONFIG = {
  movie: {
    title: "Tonight's watchlist",
    description: "Here's a curated trio of cozy thrillers, romcoms, mysteries, and comedies we can stream together.",
    endpoints: [
      "https://api.sampleapis.com/movies/romance",
      "https://api.sampleapis.com/movies/mystery",
      "https://api.sampleapis.com/movies/comedy",
      "https://api.sampleapis.com/movies/thrillers",
    ],
  },
  game: {
    title: "Let's squad up",
    description: "These co-op friendly Xbox & PC games are perfect for our cross-play night.",
    endpoints: ["https://api.sampleapis.com/xbox/games"],
  },
};

const cache = new Map();

function pickRandomItems(array, amount = 3) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(amount, shuffled.length));
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

async function fetchSuggestions(choice) {
  if (cache.has(choice)) {
    return cache.get(choice);
  }

  const { endpoints } = API_CONFIG[choice];

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

    const suggestions = pickRandomItems(flattened, 3).map((item) =>
      mapToSuggestion(item)
    );

    cache.set(choice, suggestions);
    return suggestions;
  } catch (error) {
    console.warn("Falling back to offline suggestions", error);
    const suggestions = pickRandomItems(FALLBACK_SUGGESTIONS[choice], 3);
    cache.set(choice, suggestions);
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

async function handleChoice(choice) {
  const config = API_CONFIG[choice];
  invitationTitle.textContent =
    choice === "movie"
      ? "Movie night, coming right up!"
      : "Controller batteries? Charged!";
  invitationMessage.textContent =
    choice === "movie"
      ? "I'll sync the stream and you bring the cozy vibes. Here are some titles we can queue up."
      : "I'll set up the lobby and drop the invite in our chat. Pick the adventure that sounds the most fun!";

  suggestionsSection.hidden = false;
  suggestionsTitle.textContent = config.title;
  suggestionsDescription.textContent =
    "Pulling in a few options… If nothing loads, I've got a secret list ready.";
  suggestionsGrid.innerHTML = "";
  refreshButton.hidden = true;

  try {
    const items = await fetchSuggestions(choice);
    renderSuggestions(items);
    suggestionsDescription.textContent = config.description;
    refreshButton.hidden = false;
  } catch (error) {
    console.error("Unable to load suggestions", error);
    suggestionsDescription.textContent =
      "I couldn't fetch new ideas right now, but I left a few of my personal favorites below.";
  }

  refreshButton.dataset.choice = choice;
}

function setupEventListeners() {
  document.querySelectorAll(".pill-button[data-choice]").forEach((button) => {
    button.addEventListener("click", () => handleChoice(button.dataset.choice));
  });

  refreshButton.addEventListener("click", async () => {
    const choice = refreshButton.dataset.choice;
    if (!choice) return;
    cache.delete(choice);
    await handleChoice(choice);
  });
}

setupEventListeners();
