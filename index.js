//Selectors for needed id´s
const colorBgContainer = document.getElementById("color-bg-container");
const colorTextContainer = document.getElementById("color-text-container");
const colorBtn = document.getElementById("color-btn");
const colorForm = document.getElementById("color-form");
const copyMessage = document.getElementById("copy-message");

const darkModeBtn = document.getElementById("dark-mode-btn");
//Fetching colors from color API to get rendered scheme pallete on website load
fetch(`https://www.thecolorapi.com/scheme?hex=1219e0&mode=monochrome&count=5`)
    .then(res => res.json())
    .then(data => colorLoop(data));


// This eventListener is fetching color from API, on basis of users choosen value of input type=color and selected scheme, there are 5 colors selected
colorBtn.addEventListener("click", () => {
    const colorHexValue = document.getElementById("color-hex-value").value.slice(1);
    const colorScheme = document.getElementById("color-scheme").value;
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHexValue}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => colorLoop(data));
    
})


// Function that is in charge of looping through data from API and adding only hex value of color we need and pushing it to new array
function colorLoop(data) {
    let colorArray = [];
    for(let color of data.colors) {
        colorArray.push({
            hexValue: color.hex.value
        })
    }
    renderColors(colorArray);
}

//This function renders looped data from colorLoop function to website, it go through all 5 selected colors and render them using forEach
function renderColors(data) {
    let colorBackground = "";
    let colorHexText = "";
    
    data.forEach(color => {
        colorBackground += `
        <div class="rendered-colors" style="background-color:${color.hexValue}" data-hex="${color.hexValue}"></div>
        `
        colorHexText += `
        <div class="rendered-text" data-hex="${color.hexValue}">${color.hexValue}</div>
        `
    })
    
    
    colorBgContainer.innerHTML = colorBackground;
    colorTextContainer.innerHTML = colorHexText;
}

//EventListener which allow us to copy hex value of rendered colors, it working with data attributes in renderColors function
document.addEventListener("click", function(e) {
    if(e.target.dataset.hex) {
        copyMessage.innerHTML = `
        <p class="copy-message">You have copied color to your clipboard!</p>
        `
        setTimeout( () => {
            copyMessage.innerHTML = "";
        }, 2000);
        navigator.clipboard.writeText(e.target.dataset.hex);
    }
})



//EventListener to toggle dark mode on click on icon and it changes type of icon depending if its light mode or dark mode
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if(darkModeBtn.classList.contains("fa-moon")){

        darkModeBtn.classList.replace("fa-moon", "fa-sun");

    }else if(darkModeBtn.classList.contains("fa-sun")){

        darkModeBtn.classList.replace("fa-sun", "fa-moon");
    }
})



//https://www.thecolorapi.com/


