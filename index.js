const colorBgContainer = document.getElementById("color-bg-container");
const colorTextContainer = document.getElementById("color-text-container");
const colorBtn = document.getElementById("color-btn");

colorBtn.addEventListener("click", () => {
    const colorHexValue = document.getElementById("color-hex-value").value.slice(1);
    const colorScheme = document.getElementById("color-scheme").value;
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHexValue}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => colorLoop(data));
    
})


function colorLoop(data) {
    let colorArray = [];
    for(let color of data.colors) {
        colorArray.push({
            hexValue: color.hex.value
        })
    }
    renderColors(colorArray);
}

function renderColors(data) {
    let colorBackground = "";
    let colorHexText = "";
    
    data.forEach(color => {
        colorBackground += `
        <div class="rendered-colors" style="background-color:${color.hexValue}"></div>
        `
        colorHexText += `
        <div class="rendered-text">${color.hexValue}</div>
        `
    })
    
    
    colorBgContainer.innerHTML = colorBackground;
    colorTextContainer.innerHTML = colorHexText;
}



//https://www.thecolorapi.com/


