// Hämta knappen som slumpar fram en ny maträtt
const randomBtn = document.getElementById("randomBtn");

// Hämta elementet där den slumpade maträtten ska visas
const suggestionEl = document.getElementById("suggestion");

// Hämta dropdownen för kategorival
const categorySelect = document.getElementById("categorySelect");

// Skapa en array med maträtter, varje maträtt är ett objekt med namn, länk och kategori
const meals = [
  { name: "Tacopaj", url: "https://www.koket.se/klassisk-tacopaj-med-kottfars-och-creme-fraiche", category: "kött" },
  { name: "Spaghetti bolognese", url: "https://www.koket.se/godaste-kottfarssasen", category: "kött" },
  { name: "Mustig lövbiffsgryta", url: "https://www.koket.se/mustig-lovbiffsgryta", category: "kött" },

  { name: "Renskavsgryta med lingon", url: "https://www.koket.se/renskavsgryta-med-lingon", category: "kött" },
  { name: "Härlig lasagne med salsicciafärs", url: "https://www.koket.se/mustig-lasagne-med-salsicciafars", category: "kött" },
  { name: "Krämig fiskgryta med tomat och saffran", url: "https://www.koket.se/kramig-fiskgryta-med-tomat-och-saffran", category: "fisk" },
  { name: "Grön curry med fisk", url: "https://www.koket.se/gron-curry-med-fisk", category: "fisk" },
  { name: "Ugnsbakad torsk i citron- och dillsås", url: "https://www.koket.se/ugnsbakad-torsk-i-citron-och-dillsas", category: "fisk" },
  { name: "Laxsallad med bulgur, avokado och korianderdressing", url: "https://www.koket.se/laxsallad-med-bulgur-avokado-och-korianderdressing", category: "fisk" },
  { name: "Blomkålscurry med saffransris", url: "https://www.koket.se/blomkalscurry-med-saffransris-donals-recept", category: "veg" },
  { name: "Asiatisk nudelsallad med hoisinfärs", url: "https://www.koket.se/asiatisk-nudelsallad-med-hoisinfars", category: "veg" },
  { name: "Krämig italiensk kikärtsgryta", url: "https://www.koket.se/kramig-italiensk-kikartsgryta", category: "veg" },
  { name: "Smakrik linsgryta", url: "https://www.koket.se/smakrik-linsgryta", category: "veg" },
  { name: "Pannkaka", url: "https://www.koket.se/pannkaka-2", category: "veg" },
];

// Funktion som returnerar en slumpad maträtt baserat på vald kategori
function getRandomMeal() {
  // Börja med att använda hela listan
  let filteredMeals = meals;

  // Hämta den kategori som användaren valt i dropdownen
  const selectedCategory = categorySelect.value;

  // Om användaren valt något annat än "alla", filtrera listan efter kategori
  if (selectedCategory !== "alla") {
    filteredMeals = meals.filter(meal => meal.category === selectedCategory);
  }

  // Om det inte finns några rätter i den filtrerade listan, returnera null
  if (filteredMeals.length === 0) {
    return null;
  }

  // Slumpa fram ett index inom det filtrerade arrayets längd
  const randomIndex = Math.floor(Math.random() * filteredMeals.length);

  // Returnera det slumpade maträtt-objektet
  return filteredMeals[randomIndex];
}

// Funktion som visar den slumpade maträtten på sidan
function showRandomMeal() {
  // Hämta en slumpad maträtt
  const meal = getRandomMeal();

  // Om det inte finns någon maträtt (tom lista), visa felmeddelande
  if (!meal) {
    suggestionEl.textContent = "Inga rätter finns 😢";
    return;
  }

  // Annars skriv ut maträtten som en klickbar länk i suggestionEl
  suggestionEl.innerHTML = `
    <a href="${meal.url}" target="_blank">
      ${meal.name}
    </a>
  `;
}

// När användaren klickar på knappen, visa en ny slumpad maträtt
randomBtn.addEventListener("click", showRandomMeal);

// Visa en slumpad maträtt direkt när sidan laddas
showRandomMeal();