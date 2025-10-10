const invitationTitle = document.getElementById("invitation-title");
const invitationMessage = document.getElementById("invitation-message");
const suggestionsSection = document.querySelector(".suggestions");
const suggestionsTitle = document.getElementById("suggestions-title");
const suggestionsDescription = document.getElementById("suggestions-description");
const suggestionsGrid = document.getElementById("suggestions-grid");
const genrePicker = document.getElementById("genre-picker");
const refreshButton = document.getElementById("refresh-button");

const SUGGESTION_COUNT = 6;

const MOVIE_GENRES = {
  any: {
    label: "Surprise mix",
    loadingCopy: "Pulling in a mix of light thrills, mystery, and romcom smiles just for you.",
    description:
      "A little sampler platter of the thrillers, mysteries, comedies, and romcoms we keep promising to watch together.",
    fallbackDescription:
      "Our personal stash of must-watch mysteries, thrillers, romcoms, and comedies while the API catches its breath.",
    endpoints: [
      "https://api.sampleapis.com/movies/romance",
      "https://api.sampleapis.com/movies/mystery",
      "https://api.sampleapis.com/movies/comedy",
      "https://api.sampleapis.com/movies/thrillers",
    ],
    fallback: [
      {
        title: "Karwaan (2018)",
        summary:
          "When a mistaken corpse delivery sends three strangers on a road trip from Bangalore to Kochi, they find closure, friendship, and plenty of laughs.",
        reason:
          "A breezy Hindi road-trip dramedy so we can laugh with Irrfan Khan and trade travel daydreams after the credits.",
        image: "https://placehold.co/600x900/1f2933/eff6ff?text=Karwaan",
      },
      {
        title: "The Half of It (2020)",
        summary:
          "Shy wordsmith Ellie agrees to ghostwrite love letters for a classmate, only to fall for the same girl in this tender coming-of-age story.",
        reason:
          "Thoughtful English romcom energy with plenty of 'pause to discuss' moments for us on call.",
        image: "https://placehold.co/600x900/1f2933/eff6ff?text=The+Half+of+It",
      },
      {
        title: "Enola Holmes (2022)",
        summary:
          "Sherlock's fearless younger sister cracks a missing-person case in bustling Victorian London, blending mystery with playful rebellion.",
        reason:
          "Playful mystery vibes where we can guess clues together and cheer for Millie Bobby Brown's sleuthing.",
        image: "https://placehold.co/600x900/1f2933/eff6ff?text=Enola+Holmes",
      },
      {
        title: "Phone Bhoot (2022)",
        summary:
          "Two ghost-obsessed slackers team up with a friendly spirit to run a ghostbusting startup in this spooky-silly Hindi comedy.",
        reason:
          "Ghostbusters meets desi comedy – it's silly, spooky-light, and perfect for giggles across the screen.",
        image: "https://placehold.co/600x900/1f2933/eff6ff?text=Phone+Bhoot",
      },
      {
        title: "Jaane Tu... Ya Jaane Na (2008)",
        summary:
          "Two best friends insist they're not in love until life pulls them apart and forces them to confront their feelings.",
        reason:
          "Bollywood college nostalgia with singalong-worthy tracks – perfect for reminiscing on our own adventures.",
        image: "https://placehold.co/600x900/312e81/ede9fe?text=Jaane+Tu",
      },
      {
        title: "The Adam Project (2022)",
        summary:
          "A time-traveling pilot teams up with his younger self to save the future while healing old wounds.",
        reason:
          "Sci-fi heart with quick banter – ideal for nerding out together and sharing our favorite lines.",
        image: "https://placehold.co/600x900/1f2933/eff6ff?text=Adam+Project",
      },
    ],
  },
  romcom: {
    label: "Romcom glow",
    loadingCopy: "Collecting soft, heartwarming romances that feel like us.",
    description:
      "Warm, flirty romcoms so we can blush, laugh, and quote our favorite lines back to each other.",
    fallbackDescription:
      "I grabbed the romcoms that always make us smile in case the API leaves this row empty.",
    endpoints: ["https://api.sampleapis.com/movies/romance"],
    fallback: [
      {
        title: "Jab We Met (2007)",
        summary:
          "A heartbroken businessman finds joy again after meeting a free-spirited woman on a train, leading to self-discovery and second chances.",
        reason:
          "Classic Hindi romcom chaos – I'll be the Aditya to your Geet while we shout the lines together.",
        image: "https://placehold.co/600x900/b83280/fef9ff?text=Jab+We+Met",
      },
      {
        title: "Yeh Jawaani Hai Deewani (2013)",
        summary:
          "A group of friends reunites across years and continents, balancing wanderlust with heartfelt relationships and romance.",
        reason:
          "Travel, friendship, and slow-burn romance with enough feel-good scenes to make us plan our own reunion.",
        image: "https://placehold.co/600x900/b83280/fef9ff?text=YJHD",
      },
      {
        title: "Set It Up (2018)",
        summary:
          "Two overworked assistants scheme to set up their demanding bosses, only to spark their own unexpected chemistry.",
        reason:
          "Light English romcom matchmaking that feels like texting memes while cheering for the leads.",
        image: "https://placehold.co/600x900/b83280/fef9ff?text=Set+It+Up",
      },
      {
        title: "Little Things (S1)",
        summary:
          "Young couple Dhruv and Kavya navigate everyday Mumbai life, showcasing the intimate rhythms of long-term love.",
        reason:
          "Short, slice-of-life episodes about a long-term couple – so relatable that we'll keep saying, 'that's us!'.",
        image: "https://placehold.co/600x900/b83280/fef9ff?text=Little+Things",
      },
      {
        title: "Hasee Toh Phasee (2014)",
        summary:
          "A quirky scientist and a stressed event planner collide a week before his wedding, discovering an unexpected connection.",
        reason:
          "Adorkable chaos, dance numbers, and brainy banter – tailor-made for a light-hearted night with you.",
        image: "https://placehold.co/600x900/b83280/fef9ff?text=Hasee+Toh+Phasee",
      },
      {
        title: "Crazy Rich Asians (2018)",
        summary:
          "Rachel Chu discovers her boyfriend's family is ridiculously wealthy, plunging into high-society antics and heartfelt moments.",
        reason:
          "Glitzy romcom fun with plenty of jokes and big feelings – ideal for gossiping over video chat.",
        image: "https://placehold.co/600x900/b83280/fef9ff?text=Crazy+Rich+Asians",
      },
    ],
  },
  comedy: {
    label: "Comedy night",
    loadingCopy: "Hunting down the funniest Hindi and English picks for our shared watchlist.",
    description:
      "Feel-good comedies that keep the banter rolling while we snack and send each other reaction selfies.",
    fallbackDescription:
      "Serving our tried-and-true comfort comedies until the API sends new laughs our way.",
    endpoints: ["https://api.sampleapis.com/movies/comedy"],
    fallback: [
      {
        title: "Stree (2018)",
        summary:
          "In a small town plagued by a legendary spirit, a tailor and his friends must solve the mystery to save their loved ones.",
        reason:
          "Horror-comedy but mostly comedy – we can pretend to be brave for each other and laugh at Rajkummar Rao.",
        image: "https://placehold.co/600x900/127c71/edfff9?text=Stree",
      },
      {
        title: "Chupke Chupke (1975)",
        summary:
          "A newlywed botany professor plays a prank by impersonating a driver, leading to a cascade of witty misunderstandings.",
        reason:
          "An old-school Hindi classic that's still peak wholesome comedy for a chill evening.",
        image: "https://placehold.co/600x900/127c71/edfff9?text=Chupke+Chupke",
      },
      {
        title: "The Nice Guys (2016)",
        summary:
          "An unlikely detective duo investigates a missing person case in 1970s Los Angeles, blending action with sharp humor.",
        reason:
          "Buddy-cop laughs with mystery sprinkles – perfect for quipping one-liners back and forth.",
        image: "https://placehold.co/600x900/127c71/edfff9?text=The+Nice+Guys",
      },
      {
        title: "Brooklyn Nine-Nine (S1)",
        summary:
          "Precinct 99's offbeat detectives solve crimes while keeping the laughs coming in this workplace comedy.",
        reason:
          "30-minute bursts of joy we can binge or savor, complete with heists, hugs, and Halloween references.",
        image: "https://placehold.co/600x900/127c71/edfff9?text=B99+S1",
      },
      {
        title: "Badhaai Ho (2018)",
        summary:
          "When a middle-aged couple announces an unexpected pregnancy, their adult son must rethink family, love, and pride.",
        reason:
          "Wholesome hilarity with heartfelt moments – perfect for giggling about family chaos together.",
        image: "https://placehold.co/600x900/127c71/edfff9?text=Badhaai+Ho",
      },
      {
        title: "The Intern (2015)",
        summary:
          "A 70-year-old widower becomes a senior intern at a fashion startup, forming an unlikely friendship with the founder.",
        reason:
          "Soft comedy with warm life lessons – ideal for chatting about work, dreams, and us.",
        image: "https://placehold.co/600x900/127c71/edfff9?text=The+Intern",
      },
    ],
  },
  feelgood: {
    label: "Comfort binge",
    loadingCopy: "Stacking up the coziest romcom-comedy blend for a low-stress cuddle over video call.",
    description:
      "Soft, feel-good stories with big hearts so we can unwind together and trade favorite quotes.",
    fallbackDescription:
      "Serving our ultra-cozy go-tos while the API warms up fresh comfort watches for us.",
    endpoints: [
      "https://api.sampleapis.com/movies/romance",
      "https://api.sampleapis.com/movies/comedy",
    ],
    fallback: [
      {
        title: "Dil Dhadakne Do (2015)",
        summary:
          "A wealthy Punjabi family confronts secrets and relationships while cruising the Mediterranean with friends.",
        reason:
          "Family drama plus comedy, all on a luxe cruise – perfect for dreaming up our own getaway.",
        image: "https://placehold.co/600x900/7c3aed/f8f5ff?text=Dil+Dhadakne+Do",
      },
      {
        title: "Notting Hill (1999)",
        summary:
          "A bookshop owner falls for a famous actress, leading to gentle humor, mishaps, and tender romance.",
        reason:
          "Charming British romcom vibes that feel like a warm hug – ideal for quoting the sweetest lines.",
        image: "https://placehold.co/600x900/7c3aed/f8f5ff?text=Notting+Hill",
      },
      {
        title: "Zindagi Na Milegi Dobara (2011)",
        summary:
          "Three friends take a life-changing road trip across Spain, embracing adventure and reconnecting with themselves.",
        reason:
          "Feel-good travel inspo with poetry, friendship, and bucket-list energy to share together.",
        image: "https://placehold.co/600x900/7c3aed/f8f5ff?text=ZNMD",
      },
      {
        title: "About Time (2013)",
        summary:
          "A man with the ability to travel through time uses his gift to perfect love, family, and life's simple joys.",
        reason:
          "Timey-wimey romance that reminds us to savor every ordinary moment we share.",
        image: "https://placehold.co/600x900/7c3aed/f8f5ff?text=About+Time",
      },
      {
        title: "Lunchbox (2013)",
        summary:
          "A misdelivered lunchbox sparks an unlikely epistolary friendship between a lonely widower and a neglected housewife.",
        reason:
          "Tender storytelling and heartfelt notes – it's basically our long-distance love in film form.",
        image: "https://placehold.co/600x900/7c3aed/f8f5ff?text=Lunchbox",
      },
      {
        title: "Paddington 2 (2017)",
        summary:
          "A polite bear in London goes on an adventure to clear his name, spreading kindness wherever he goes.",
        reason:
          "Pure serotonin with British humor and heartfelt lessons – great for turning any day into a warm blanket night.",
        image: "https://placehold.co/600x900/7c3aed/f8f5ff?text=Paddington+2",
      },
    ],
  },
  mystery: {
    label: "Mystery & sleuthing",
    loadingCopy: "Gathering clever mysteries so Detective Saanu & Agent Aloo can solve the case together.",
    description:
      "Whodunits and light thrillers that keep us guessing aloud and comparing theories in our chat.",
    fallbackDescription:
      "Calling in our favorite clue-filled picks until the API serves up fresh cases to crack.",
    endpoints: ["https://api.sampleapis.com/movies/mystery"],
    fallback: [
      {
        title: "Detective Byomkesh Bakshy! (2015)",
        summary:
          "Set in 1940s Calcutta, the legendary detective untangles a conspiracy involving Japanese spies and chemical weapons.",
        reason:
          "Stylish Hindi mystery with noir vibes – we'll pause to piece clues like a true crime-solving duo.",
        image: "https://placehold.co/600x900/2f3061/f2f2ff?text=Byomkesh",
      },
      {
        title: "Knives Out (2019)",
        summary:
          "Renowned detective Benoit Blanc investigates a family's patriarch's death, exposing secrets with wit and flair.",
        reason:
          "Twisty, witty, and perfect for placing friendly bets on the culprit before Benoit Blanc does.",
        image: "https://placehold.co/600x900/2f3061/f2f2ff?text=Knives+Out",
      },
      {
        title: "Only Murders in the Building (S1)",
        summary:
          "Three true-crime fans start a podcast while unraveling a murder in their New York apartment building.",
        reason:
          "Bite-sized mystery episodes packed with humor, podcast jokes, and plenty of 'next episode?' energy.",
        image: "https://placehold.co/600x900/2f3061/f2f2ff?text=OMITB",
      },
      {
        title: "Badla (2019)",
        summary:
          "A businesswoman accused of murder seeks help from a veteran lawyer, leading to twisty interrogations and reveals.",
        reason:
          "A taut Hindi thriller that's gripping without being gory – ideal for leaning into suspense together.",
        image: "https://placehold.co/600x900/2f3061/f2f2ff?text=Badla",
      },
      {
        title: "Sherlock (S1)",
        summary:
          "A modern-day Sherlock Holmes solves London crimes with Dr. Watson, mixing razor-sharp deductions and wit.",
        reason:
          "Brisk mystery episodes perfect for pausing mid-case to trade theories on video call.",
        image: "https://placehold.co/600x900/2f3061/f2f2ff?text=Sherlock",
      },
      {
        title: "The Afterparty (S1)",
        summary:
          "Each episode retells a high-school reunion murder from a different guest's genre-twisted perspective.",
        reason:
          "Playful whodunit storytelling that lets us pick favorites and predict the finale together.",
        image: "https://placehold.co/600x900/2f3061/f2f2ff?text=Afterparty",
      },
    ],
  },
  thriller: {
    label: "Gentle thrills",
    loadingCopy: "Picking the edge-of-seat stories that stay light enough for a cozy night.",
    description:
      "Tension with a soft landing – thrillers that keep hearts racing but still let us sleep easy afterward.",
    fallbackDescription:
      "Swapping in our trusted gentle thrillers until the API restocks this suspenseful lineup.",
    endpoints: ["https://api.sampleapis.com/movies/thrillers"],
    fallback: [
      {
        title: "Andhadhun (2018)",
        summary:
          "A blind pianist becomes entangled in a mysterious murder, forcing him to improvise his way out of danger.",
        reason:
          "Dark comedy-thriller goodness with Ayushmann Khurrana – suspenseful yet cheeky for playful commentary.",
        image: "https://placehold.co/600x900/8c2f39/fff4f4?text=Andhadhun",
      },
      {
        title: "Searching (2018)",
        summary:
          "Told entirely through digital screens, a father scours the internet to track down his missing daughter.",
        reason:
          "Screen-life thriller told through texts and calls; we'll feel like detectives combing through clues IRL.",
        image: "https://placehold.co/600x900/8c2f39/fff4f4?text=Searching",
      },
      {
        title: "Ocean's Eight (2018)",
        summary:
          "Debbie Ocean recruits a crew of specialists to pull off a dazzling Met Gala jewelry heist.",
        reason:
          "Heist glam, strong women, and clever twists that will inspire us to plan our own (legal) adventures.",
        image: "https://placehold.co/600x900/8c2f39/fff4f4?text=Ocean%27s+8",
      },
      {
        title: "Lupin (S1)",
        summary:
          "Gentleman thief Assane Diop masterminds heists inspired by Arsène Lupin to expose a wealthy family's crimes.",
        reason:
          "French gentleman thief with Robin Hood charm – stylish, smart, and satisfying in every episode.",
        image: "https://placehold.co/600x900/8c2f39/fff4f4?text=Lupin",
      },
      {
        title: "Kahaani (2012)",
        summary:
          "A pregnant woman arrives in Kolkata searching for her missing husband, uncovering secrets that put her life in danger.",
        reason:
          "Gripping yet grounded suspense with Vidya Balan leading the charge – perfect for theory crafting together.",
        image: "https://placehold.co/600x900/8c2f39/fff4f4?text=Kahaani",
      },
      {
        title: "The Night Manager (2023)",
        summary:
          "A former soldier infiltrates an arms dealer's inner circle, balancing espionage with moral dilemmas.",
        reason:
          "Stylish spy thrills that stay bingeable without going too dark – we can whisper our favorite twists.",
        image: "https://placehold.co/600x900/8c2f39/fff4f4?text=Night+Manager",
      },
    ],
  },
};

const CROSSPLAY_GAMES = [
  {
    title: "Fortnite",
    summary:
      "Colorful battle royale chaos with rotating modes, quests, and Zero Build showdowns tailor-made for duo victories.",
    reason:
      "Drop into Zero Build duos or Battle Royale and show off our teamwork no matter which screen we're on.",
    note: "Cross-play: Link our Epic accounts (Xbox gamertag + PC) and invite through the Epic friends list.",
    aliases: ["Fortnite Battle Royale"],
    image: createGameArt("Fortnite", {
      background: "#0ea5e9",
      accent: "#1d4ed8",
      emoji: "🛡️",
    }),
  },
  {
    title: "Rocket League",
    summary:
      "High-octane car soccer where rocket-powered vehicles pull off impossible saves and stylish aerial goals.",
    reason:
      "Turbo-charge our date night with car soccer chaos — perfect for cheering every goal in party chat.",
    note: "Cross-play: Enable it in Settings → Gameplay, then create a private match with a shared name & password.",
    image: createGameArt("Rocket League", {
      background: "#fb7185",
      accent: "#be123c",
      emoji: "⚽️",
    }),
  },
  {
    title: "Sea of Thieves",
    summary:
      "Open-world pirate adventures filled with treasure hunts, riddles, tall tales, and dramatic ship battles.",
    reason:
      "Set sail as a pirate duo, solve riddles, and clink grog mugs while steering the same ship across the waves.",
    note: "Cross-play: Invite via the Xbox companion app or Xbox Game Bar to drop into the same crew.",
    image: createGameArt("Sea of Thieves", {
      background: "#0f766e",
      accent: "#115e59",
      emoji: "🏴‍☠️",
    }),
  },
  {
    title: "Minecraft Dungeons",
    summary:
      "Family-friendly dungeon crawler packed with mobs, artifacts, and procedurally generated maps to explore.",
    reason:
      "Dive into dungeon-crawling co-op, share loot, and plan our next enchantments together in real time.",
    note: "Cross-play: Sign in with Microsoft accounts on both sides, then use the in-game friends tab to invite.",
    image: createGameArt("Minecraft Dungeons", {
      background: "#ea580c",
      accent: "#c2410c",
      emoji: "🛡️",
    }),
  },
  {
    title: "Overcooked! 2",
    summary:
      "Chaotic cooperative cooking where timing, teamwork, and laughter matter more than perfect plating.",
    reason:
      "Coordinate our kitchen like pros, yell playful orders, and laugh when the onion soup inevitably catches fire.",
    note: "Cross-play: Host an online session and turn on cross-platform play from the main menu options.",
    image: createGameArt("Overcooked! 2", {
      background: "#f97316",
      accent: "#facc15",
      emoji: "🍳",
    }),
  },
  {
    title: "Fall Guys",
    summary:
      "Obstacle-course battle royale featuring whimsical rounds, grabby rivals, and goofy bean avatars.",
    reason:
      "Race through obstacle courses as a matching duo and celebrate every crown-worthy near miss together.",
    note: "Cross-play: Add each other using Epic display names, then squad up from the inviting player's party screen.",
    image: createGameArt("Fall Guys", {
      background: "#ec4899",
      accent: "#9333ea",
      emoji: "👑",
    }),
  },
];

const GAME_CONFIG = {
  title: "Let's squad up",
  description:
    "Every card is vetted for Xbox ↔ Windows cross-play, so Team Aloo & Saanu can jump in together instantly.",
  fallbackDescription:
    "Our handpicked cross-play library is ready to roll while we wait on fresh API matches.",
  endpoints: ["https://api.sampleapis.com/xbox/games"],
  fallback: CROSSPLAY_GAMES,
};

const state = {
  choice: null,
  genre: "any",
};

const cache = new Map();

const CROSSPLAY_LOOKUP = CROSSPLAY_GAMES.reduce((map, game) => {
  const names = [game.title, ...(game.aliases || [])];
  names
    .map((name) => normalizeTitleKey(name))
    .filter(Boolean)
    .forEach((key) => {
      if (!map.has(key)) {
        map.set(key, game);
      }
    });
  return map;
}, new Map());

function getCacheKey(choice, { genre = "any" } = {}) {
  return choice === "movie" ? `${choice}-${genre}` : choice;
}

function shuffle(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function buildSuggestionList({
  choice,
  genre = "any",
  primaryItems = [],
  fallbackItems = [],
  amount = SUGGESTION_COUNT,
}) {
  const fallbackLabel = choice === "movie" ? MOVIE_GENRES[genre]?.label : undefined;
  const suggestions = [];
  const seenTitles = new Set();
  let fallbackUsed = false;

  function tryAdd(item, useFallback = false) {
    if (!item) return;
    const suggestion = mapToSuggestion(item, fallbackLabel, choice);
    const key = normalizeTitleKey(suggestion.title);
    if (!key || seenTitles.has(key)) {
      return;
    }
    seenTitles.add(key);
    if (useFallback) {
      fallbackUsed = true;
    }
    suggestions.push(suggestion);
  }

  shuffle(primaryItems).some((item) => {
    tryAdd(item, false);
    return suggestions.length >= amount;
  });

  if (suggestions.length < amount) {
    shuffle(fallbackItems).some((item) => {
      tryAdd(item, true);
      return suggestions.length >= amount;
    });
  }

  if (suggestions.length === 0) {
    tryAdd(
      {
        title:
          fallbackLabel || (choice === "movie" ? "Movie night standby" : "Game night standby"),
        summary: "Saving a special spot on our list while the API catches up.",
        reason:
          choice === "movie"
            ? "Let's treat this as a rain check and refresh for fresh picks together."
            : "Hit refresh for new quests or pick from our cross-play library anytime.",
        image: getPlaceholderImage(
          fallbackLabel || (choice === "movie" ? "Movie" : "Game"),
          choice === "game" ? "game" : "movie"
        ),
      },
      true
    );
  }

  return { suggestions, fallbackUsed };
}

function normalizeGenres(genre) {
  if (!genre) return [];
  const value = Array.isArray(genre) ? genre : `${genre}`.split(",");
  return value.map((item) => item.trim());
}

function normalizeTitleKey(value) {
  return `${value || ""}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeLanguages(language) {
  if (!language) return [];
  if (Array.isArray(language)) return language.map((item) => item.trim());
  return `${language}`
    .split(/,|\//)
    .map((item) => item.trim());
}

function getPlaceholderImage(title, type = "movie") {
  const size = type === "game" ? "640x360" : "600x900";
  const palette =
    type === "game"
      ? { bg: "0f172a", fg: "e0f2fe" }
      : { bg: "1f2933", fg: "eff6ff" };
  const encodedTitle = encodeURIComponent(title || (type === "game" ? "Game" : "Movie"));
  return `https://placehold.co/${size}/${palette.bg}/${palette.fg}?text=${encodedTitle}`;
}

function escapeForSvg(text) {
  return `${text ?? ""}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createGameArt(
  title,
  { background = "#0f172a", accent = "#7c3aed", emoji = "🎮" } = {}
) {
  const safeTitle = escapeForSvg(title || "Game night");
  const safeEmoji = escapeForSvg(emoji || "🎮");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect fill="url(#grad)" width="400" height="225" rx="28" />
      <g font-family="'Quicksand', 'Segoe UI', sans-serif" fill="#ffffff">
        <text x="32" y="92" font-size="56" opacity="0.85">${safeEmoji}</text>
        <text x="32" y="148" font-size="32" font-weight="700">${safeTitle}</text>
        <text x="32" y="182" font-size="16" opacity="0.75">Xbox ↔ PC co-op ready</text>
      </g>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function mapToSuggestion(item, fallbackLabel, choice) {
  const title =
    item?.title ||
    item?.name ||
    item?.game ||
    item?.showTitle ||
    item?.shortTitle ||
    fallbackLabel ||
    "Untitled";

  const summary =
    item?.summary ||
    item?.synopsis ||
    item?.plot ||
    item?.overview ||
    item?.description ||
    item?.review ||
    item?.notes ||
    (item?.genre ? `Genre: ${[].concat(item.genre).join(", ")}` : null) ||
    (item?.year ? `Released in ${item.year}.` : null) ||
    "Saving a special spot on our list.";

  const reason =
    item?.reason ||
    item?.highlight ||
    item?.why ||
    item?.personalNote ||
    (choice === "movie"
      ? "Let's see if this matches our mood tonight — I love discovering stories with you."
      : "Looks like pure co-op fun for Team Aloo & Saanu.");

  const note =
    item?.note ||
    item?.notes ||
    item?.sessionTip ||
    item?.tip ||
    item?.crossplayNote ||
    item?.crossPlayNote ||
    (item?.crossPlay || item?.crossplay
      ? `Cross-play info: ${item.crossPlay || item.crossplay}`
      : null);

  const type = choice === "game" ? "game" : "movie";
  const image =
    item?.image ||
    item?.posterURL ||
    item?.posterUrl ||
    item?.poster ||
    item?.img ||
    item?.imageUrl ||
    item?.cover ||
    item?.coverImage ||
    getPlaceholderImage(title, type);

  return { title, summary, reason, note, image, type };
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
      case "feelgood":
        return genres.some((value) =>
          /comedy|romance|family|feel[- ]?good|holiday|drama/i.test(value)
        );
      case "mystery":
        return genres.some((value) => /mystery|detective|crime|whodunit/i.test(value));
      case "thriller":
        return genres.some((value) => /thriller|suspense|heist|spy/i.test(value));
      default:
        return true;
    }
  });
}

function filterGames(items = []) {
  const matches = new Map();

  items.forEach((item) => {
    const title =
      item?.title ||
      item?.name ||
      item?.game ||
      item?.shortTitle ||
      item?.slug ||
      item?.id;

    const match = CROSSPLAY_LOOKUP.get(normalizeTitleKey(title));
    if (match) {
      matches.set(match.title, match);
    }
  });

  const curatedExtras = CROSSPLAY_GAMES.filter((game) => !matches.has(game.title));
  return [...matches.values(), ...curatedExtras];
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
  const fallbackItems =
    choice === "movie"
      ? MOVIE_GENRES[genre]?.fallback || MOVIE_GENRES.any.fallback
      : GAME_CONFIG.fallback;

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

    const { suggestions, fallbackUsed } = buildSuggestionList({
      choice,
      genre,
      primaryItems: filtered,
      fallbackItems,
      amount: SUGGESTION_COUNT,
    });

    const payload = { items: suggestions, fallbackUsed };
    cache.set(cacheKey, payload);
    return payload;
  } catch (error) {
    console.warn("Falling back to offline suggestions", error);
    const { suggestions } = buildSuggestionList({
      choice,
      genre,
      primaryItems: [],
      fallbackItems,
      amount: SUGGESTION_COUNT,
    });
    const payload = { items: suggestions, fallbackUsed: true };
    cache.set(cacheKey, payload);
    return payload;
  }
}

function renderSuggestions(items) {
  suggestionsGrid.innerHTML = "";
  items.forEach(({ title, summary, reason, note, image, type }) => {
    const card = document.createElement("article");
    card.className = "suggestion-card";
    card.setAttribute("role", "listitem");
    card.dataset.suggestionType = type;

    const media = document.createElement("figure");
    media.className = "suggestion-card__media";

    const img = document.createElement("img");
    img.src = image;
    img.alt = `${title} artwork`;
    img.loading = "lazy";
    media.appendChild(img);
    card.appendChild(media);

    const body = document.createElement("div");
    body.className = "suggestion-card__body";

    const heading = document.createElement("h3");
    heading.textContent = title;
    body.appendChild(heading);

    if (summary) {
      const summaryEl = document.createElement("p");
      summaryEl.className = "suggestion-card__summary";
      summaryEl.textContent = summary;
      body.appendChild(summaryEl);
    }

    if (reason) {
      const reasonEl = document.createElement("p");
      reasonEl.className = "suggestion-card__reason";
      reasonEl.textContent = reason;
      body.appendChild(reasonEl);
    }

    if (note) {
      const noteEl = document.createElement("p");
      noteEl.className = "suggestion-card__note";
      noteEl.textContent = note;
      body.appendChild(noteEl);
    }

    card.appendChild(body);
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
  if (!refreshButton.hasAttribute("hidden")) {
    refreshButton.setAttribute("hidden", "");
  }

  try {
    const { items, fallbackUsed } = await fetchSuggestions(choice, { genre });
    renderSuggestions(items);

    const config = isMovie
      ? MOVIE_GENRES[genre] || MOVIE_GENRES.any
      : GAME_CONFIG;

    const descriptionCopy = fallbackUsed
      ? config?.fallbackDescription ||
        (isMovie
          ? "I pulled from our personal watchlist while the API catches up."
          : "Serving our trusted cross-play picks while waiting on new matches.")
      : config?.description ||
        (isMovie
          ? MOVIE_GENRES.any.description
          : GAME_CONFIG.description);

    suggestionsDescription.textContent = descriptionCopy;
    refreshButton.hidden = false;
    refreshButton.removeAttribute("hidden");
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
  genrePicker.removeAttribute("hidden");
  genrePicker.style.removeProperty("display");
  genrePicker.removeAttribute("aria-hidden");

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
  if (!genrePicker.hasAttribute("hidden")) {
    genrePicker.setAttribute("hidden", "");
  }
  genrePicker.style.display = "none";
  genrePicker.setAttribute("aria-hidden", "true");
}

async function handleChoice(choice) {
  state.choice = choice;

  if (choice === "movie") {
    if (!MOVIE_GENRES[state.genre]) {
      state.genre = "any";
    }
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
  suggestionsSection.removeAttribute("hidden");

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
