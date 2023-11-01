//Selectors for needed id´s
const colorBgContainer = document.getElementById("color-bg-container");
const colorTextContainer = document.getElementById("color-text-container");
const colorBtn = document.getElementById("color-btn");
const copyText = document.getElementById("copy-text");
const colorForm = document.getElementById("color-form");


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
copyText.addEventListener("click", function(e) {
    if(e.target.dataset.hex) {
        alert("Your color been copied to clipboard!");
        navigator.clipboard.writeText(e.target.dataset.hex);
    }
})




//https://www.thecolorapi.com/


