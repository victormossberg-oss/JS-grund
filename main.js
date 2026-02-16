// ==============================
// 1. STATE
// ==============================
// Variabel som sparar den senaste slumpade maträtten
// så att vi kan lägga till den i favoriter
let currentMeal = null;


// ==============================
// 2. DOM-ELEMENT
// ==============================
// Hämtar alla viktiga element från HTML så vi kan använda dem i JS
const randomBtn = document.getElementById("randomBtn");
const suggestionEl = document.getElementById("suggestion");
const categorySelect = document.getElementById("categorySelect");
const saveBtn = document.getElementById("saveBtn");
const favoritesList = document.getElementById("favoritesList");

const mealForm = document.getElementById("mealForm");
const mealInput = document.getElementById("mealInput");
const formMessage = document.getElementById("formMessage");


// ==============================
// 3. DATA
// ==============================
// Array med alla färdiga maträtter.
// Varje maträtt är ett objekt med namn, länk och kategori.
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
// 4. HJÄLPFUNKTIONER
// ==============================
// Hämtar favoritlistan från localStorage.
// JSON.parse gör om text → JavaScript-array.
// Om inget finns returneras en tom array.

// LocalStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Sparar favoritlistan i localStorage.
// JSON.stringify gör om array → text.
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// funktion som slumpar fram en maträtt baserad på vald kategori
function getRandomMeal() {
  // Börja med hela listan
  let filteredMeals = meals;
  // Läs vilken kategori användaren valt
  const selectedCategory = categorySelect.value;
  // Om inte "alla" → filtrera listan
  if (selectedCategory !== "alla") {
    filteredMeals = meals.filter(meal => meal.category === selectedCategory);
  }
  // Om inga rätter finns → returnera null
  if (filteredMeals.length === 0) return null;
  // Slumpa index i arrayen
  const randomIndex = Math.floor(Math.random() * filteredMeals.length);
  // Returnera slumpad maträtt
  return filteredMeals[randomIndex];
}


// ==============================
// 5. UI-FUNKTIONER
// ==============================
// Visar en slumpad maträtt på sidan
function showRandomMeal() {
  // Hämta slumpad rätt
  const meal = getRandomMeal();
  // Om ingen finns → visa feltext
  if (!meal) {
    suggestionEl.textContent = "Inga rätter finns 😢";
    return;
  }
  // Spara aktuell rätt så den kan favorit-sparas
  currentMeal = meal;
  // Visa som klickbar länk
  suggestionEl.innerHTML = `
    <a href="${meal.url}" target="_blank">${meal.name}</a>
  `;
}

// Ritar upp favoritlistan på sidan
function renderFavorites() {
  // Hämta sparade favoriter
  const favorites = getFavorites();
  // Töm listan innan vi ritar om
  favoritesList.innerHTML = "";
  // Om listan är tom → visa text
  if (favorites.length === 0) {
    favoritesList.innerHTML = "<li>Inga favoriter ännu</li>";
    return;
  }
  // Loopa igenom alla favoriter
  favorites.forEach((meal, index) => {
    // Skapa list-element
    const li = document.createElement("li");
    // Skapa länk + ta-bort-knapp
    li.innerHTML = `
      <a href="${meal.url || "#"}" target="_blank">${meal.name || meal}</a>
      <button class="remove-btn">❌</button>
    `;
    // När man klickar på ❌ → ta bort favorit
    li.querySelector(".remove-btn").addEventListener("click", () => {
      // Hämta aktuell lista
      const updated = getFavorites();
      // Ta bort rätt element
      updated.splice(index, 1);
      // Spara igen
      saveFavorites(updated);
      // Rita om listan
      renderFavorites();
    });
      // Lägg till i HTML
    favoritesList.appendChild(li);
  });
}


// ==============================
// 6. EVENTS
// ==============================

// ny slumpad maträtt
// Klick på "ny maträtt"
randomBtn.addEventListener("click", showRandomMeal);

// spara favorit
// Klick på hjärt-knappen → spara favorit
saveBtn.addEventListener("click", () => {
  // Om ingen rätt vald → gör inget
  if (!currentMeal) return;

  const favorites = getFavorites();
  // Undvik dubbletter
  const alreadySaved = favorites.some(f => f.name === currentMeal.name);
  if (alreadySaved) return;

  // Lägg till
  favorites.push(currentMeal);
  // Spara
  saveFavorites(favorites);
  // Uppdatera UI
  renderFavorites();
});

// Formulär: lägg till egen maträtt + validering
mealForm.addEventListener("submit", e => {
  // Stoppar sid-reload
  e.preventDefault();
  // Ta bort mellanslag före och efter
  const value = mealInput.value.trim();

  if (value.length < 3) {
    formMessage.textContent = "Minst 3 bokstäver.";
    formMessage.style.color = "red";
    return;
  }
  // Lägg till som favorit
  const favorites = getFavorites();
  favorites.push({ name: value, url: "#" });

  saveFavorites(favorites);
  renderFavorites();
  // Success-meddelande
  formMessage.textContent = "Sparad!";
  formMessage.style.color = "lightgreen";
  // Töm inputfält
  mealInput.value = "";
});


// ==============================
// 7. INIT
// ==============================
showRandomMeal();
renderFavorites();

