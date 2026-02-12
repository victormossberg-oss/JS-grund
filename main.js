// Hämtar knappen för att spara favorit (om du använder en sådan i HTML)
const saveBtn = document.getElementById("saveBtn");

// Hämtar listan där favoriter ska visas
const favoritesList = document.getElementById("favoritesList");

// Variabel som håller koll på den senaste slumpade maträtten
let currentMeal = null;


// ==============================
// HÄMTA ELEMENT FRÅN HTML
// ==============================

// Knappen som slumpar fram ny maträtt
const randomBtn = document.getElementById("randomBtn");

// Elementet där maträtten visas
const suggestionEl = document.getElementById("suggestion");

// Dropdown för kategorival
const categorySelect = document.getElementById("categorySelect");


// ==============================
// LISTA MED ALLA MATRÄTTER
// ==============================

const meals = [
  { name: "Tacopaj", url: "https://www.koket.se/klassisk-tacopaj-med-kottfars-och-creme-fraiche", category: "kött" },
  { name: "Spaghetti bolognese", url: "https://www.koket.se/godaste-kottfarssasen", category: "kött" },
  { name: "Mustig lövbiffsgryta", url: "https://www.koket.se/mustig-lovbiffsgryta", category: "kött" },
  { name: "Renskavsgryta med lingon", url: "https://www.koket.se/renskavsgryta-med-lingon", category: "kött" },
  { name: "Papas med grillat kött", url: "https://www.koket.se/papas-med-grillat-kott", category: "kött" },
  { name: "Hamburgare med tryffelmayo och karamelliserad lök", url: "https://www.koket.se/hamburgare-med-tryffelmayo-och-karamelliserad-lok", category: "kött" },
  { name: "Härlig lasagne med salsicciafärs", url: "https://www.koket.se/mustig-lasagne-med-salsicciafars", category: "kött" },

  { name: "Krämig fiskgryta med tomat och saffran", url: "https://www.koket.se/kramig-fiskgryta-med-tomat-och-saffran", category: "fisk" },
  { name: "Grön curry med fisk", url: "https://www.koket.se/gron-curry-med-fisk", category: "fisk" },
  { name: "Fish & chips", url: "https://www.koket.se/per-morbergs-fish-chips", category: "fisk" },
  { name: "Ugnsbakad torsk i citron- och dillsås", url: "https://www.koket.se/ugnsbakad-torsk-i-citron-och-dillsas", category: "fisk" },
  { name: "Laxsallad med bulgur, avokado och korianderdressing", url: "https://www.koket.se/laxsallad-med-bulgur-avokado-och-korianderdressing", category: "fisk" },
  { name: "Salmon melt - Godaste mackan!", url: "https://www.koket.se/salmon-melt-godaste-mackan", category: "fisk" },
  { name: "Gubbröra med matjessill på fröknäcke", url: "https://www.koket.se/gubbrora-med-matjessill-pa-froknacke", category: "fisk" },

  { name: "Blomkålscurry med saffransris", url: "https://www.koket.se/blomkalscurry-med-saffransris-donals-recept", category: "veg" },
  { name: "Asiatisk nudelsallad med hoisinfärs", url: "https://www.koket.se/asiatisk-nudelsallad-med-hoisinfars", category: "veg" },
  { name: "Krämig italiensk kikärtsgryta", url: "https://www.koket.se/kramig-italiensk-kikartsgryta", category: "veg" },
  { name: "Smakrik linsgryta", url: "https://www.koket.se/smakrik-linsgryta", category: "veg" },
  { name: "Pannkaka", url: "https://www.koket.se/pannkaka-2", category: "veg" },
  { name: "Soppa på rostade rotfrukter", url: "https://www.koket.se/soppa-pa-rostade-rotfrukter", category: "veg" },
  { name: "Crispy rice salad", url: "https://www.koket.se/crispy-rice-salad", category: "veg" },
];


// ==============================
// SLUMPA MATRÄTT BASERAT PÅ KATEGORI
// ==============================

function getRandomMeal() {

  // Börjar med hela listan
  let filteredMeals = meals;

  // Hämtar vald kategori från dropdown
  const selectedCategory = categorySelect.value;

  // Om inte "alla" → filtrera listan
  if (selectedCategory !== "alla") {
    filteredMeals = meals.filter(meal => meal.category === selectedCategory);
  }

  // Om inga rätter finns → returnera null
  if (filteredMeals.length === 0) {
    return null;
  }

  // Slumpar fram ett index i arrayen
  const randomIndex = Math.floor(Math.random() * filteredMeals.length);

  // Returnerar slumpad maträtt
  return filteredMeals[randomIndex];
}


// ==============================
// VISA SLUMPAD MATRÄTT PÅ SIDAN
// ==============================

function showRandomMeal() {

  // Hämtar slumpad maträtt
  const meal = getRandomMeal();

  // Om ingen finns → visa feltext
  if (!meal) {
    suggestionEl.textContent = "Inga rätter finns 😢";
    return;
  }

  // Sparar senaste rätt så vi kan favorit-spara den
  currentMeal = meal;

  // Skriver ut som klickbar länk
  suggestionEl.innerHTML = `
    <a href="${meal.url}" target="_blank">
      ${meal.name}
    </a>
  `;
}


// ==============================
// FAVORITER – LOCALSTORAGE
// ==============================

// Hämtar favoriter från localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Sparar favoriter till localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}


// ==============================
// SPARA FAVORIT (KNAPP)
// ==============================

saveBtn.addEventListener("click", () => {

  // Om ingen rätt vald → gör inget
  if (!currentMeal) return;

  const favorites = getFavorites();

  // Kolla om redan sparad
  const alreadySaved = favorites.some(f => f.name === currentMeal.name);
  if (alreadySaved) return;

  // Lägg till i listan
  favorites.push(currentMeal);

  // Spara i localStorage
  saveFavorites(favorites);

  // Rita om favoritlistan
  renderFavorites();
});


// ==============================
// VISA FAVORITLISTAN PÅ SIDAN
// ==============================

function renderFavorites() {

  const favorites = getFavorites();

  // Töm listan innan vi ritar om
  favoritesList.innerHTML = "";

  // Om inga favoriter finns
  if (favorites.length === 0) {
    favoritesList.innerHTML = "<li>Inga favoriter ännu</li>";
    return;
  }

  // Loopa igenom alla favoriter
  favorites.forEach((meal, index) => {

    const li = document.createElement("li");

    // Skapa länk + ta-bort-knapp
    li.innerHTML = `
      <a href="${meal.url}" target="_blank">${meal.name}</a>
      <button class="remove-btn">❌</button>
    `;

    // När man klickar på ❌
    li.querySelector(".remove-btn").addEventListener("click", () => {

      const updatedFavorites = getFavorites();

      // Ta bort rätt favorit via index
      updatedFavorites.splice(index, 1);

      // Spara nya listan
      saveFavorites(updatedFavorites);

      // Rita om listan
      renderFavorites();
    });

    favoritesList.appendChild(li);
  });
}


// ==============================
// EVENT NÄR MAN KLICKAR "NY MATRÄTT"
// ==============================

randomBtn.addEventListener("click", showRandomMeal);


// ==============================
// KÖRS NÄR SIDAN LADDAS
// ==============================

// Visa slumpad rätt direkt
showRandomMeal();

// Rita upp favoriter från localStorage
renderFavorites();