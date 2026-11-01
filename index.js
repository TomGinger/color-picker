// Selectors for needed ids
const colorBgContainer = document.getElementById("color-bg-container");
const colorTextContainer = document.getElementById("color-text-container");
const colorForm = document.getElementById("color-form");
const colorHexInput = document.getElementById("color-hex-value");
const colorSchemeSelect = document.getElementById("color-scheme");
const copyMessage = document.getElementById("copy-message");
const darkModeBtn = document.getElementById("dark-mode-btn");
const darkModeIcon = document.getElementById("dark-mode-icon");

const COLOR_COUNT = 5;
let messageTimeout;

// Fetches a color scheme from The Color API (https://www.thecolorapi.com/) – no API key needed
async function getScheme(hex, mode) {
    try {
        const url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${COLOR_COUNT}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`API responded with status ${res.status}`);
        }
        const data = await res.json();
        renderColors(data.colors.map(color => color.hex.value));
    } catch (err) {
        console.error(err);
        showMessage("Could not load the color scheme. Please try again.");
    }
}

// Reads the user's chosen color and scheme and fetches the matching palette
function getSchemeFromForm() {
    const hex = colorHexInput.value.slice(1);
    const mode = colorSchemeSelect.value;
    getScheme(hex, mode);
}

// Renders the colors (and their hex values) to the page
function renderColors(hexValues) {
    colorBgContainer.innerHTML = hexValues.map(hex => `
        <div class="rendered-colors" style="background-color:${hex}" data-hex="${hex}" title="Copy ${hex}"></div>
    `).join("");

    colorTextContainer.innerHTML = hexValues.map(hex => `
        <div class="rendered-text" data-hex="${hex}" title="Copy ${hex}">${hex}</div>
    `).join("");
}

// Shows a short message under the form for 2 seconds
function showMessage(text) {
    copyMessage.innerHTML = `<p class="copy-message">${text}</p>`;
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        copyMessage.innerHTML = "";
    }, 2000);
}

// Form submit (button click or Enter) fetches a new scheme
colorForm.addEventListener("submit", e => {
    e.preventDefault();
    getSchemeFromForm();
});

// Copy hex value of a rendered color, works with the data-hex attributes from renderColors
document.addEventListener("click", e => {
    const hex = e.target.dataset.hex;
    if (!hex) return;

    navigator.clipboard.writeText(hex)
        .then(() => showMessage(`You have copied ${hex} to your clipboard!`))
        .catch(() => showMessage("Copying to clipboard failed."));
});

// Dark mode – the initial theme is applied by an inline script in index.html,
// here we only sync the icon and handle toggling (and remember the choice)
function updateDarkModeIcon() {
    const isDark = document.documentElement.classList.contains("dark-mode");
    darkModeIcon.classList.toggle("fa-moon", !isDark);
    darkModeIcon.classList.toggle("fa-sun", isDark);
}

darkModeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateDarkModeIcon();
});

updateDarkModeIcon();

// Render a palette on page load
getSchemeFromForm();
