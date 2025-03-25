const div = window.document.querySelector("#target");
const p = document.createElement("p");

const browserList       = ["Chrome", "Firefox", "Safari", "Edge"]
let browserName;
let browserVersion;

for(const browser of browserList){
    if (navigator.userAgent.indexOf(browser) > -1) {
        browserName     = browser;
        browserVersion  = navigator.userAgent.match(/Chrome\/(\d+)/)[1];
    }
}

let operatingSystemName;
const browsoperatingSystemNameList       = ["Win", "Mac", "Linux"]

for(const os of browsoperatingSystemNameList){
    if (navigator.userAgent.indexOf(os) !== -1) {
        operatingSystemName     = os;
    }
}

const screenWidth       = screen.width;
const screenHeight      = screen.height;

const availableWidth    = screen.availWidth;
const availableHeight   = screen.availHeight;

const currentDate = new Date();

const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const dateInFinnish = currentDate.toLocaleDateString('fi-FI', dateOptions);  // Finnish locale

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
};

const time = currentDate.toLocaleTimeString('fi-FI', timeOptions); 

p.innerHTML =   `
                Browser name: ${browserName}<br>
                Browser version: ${browserVersion}<br><br>
                
                OS: ${operatingSystemName}<br><br>

                Monitor width: ${screenWidth}px <br>
                Monitor height: ${screenHeight}px <br><br>

                Browser width: ${availableWidth}px<br>
                Browser height: ${availableHeight}px<br><br>
                
                Current time: ${time}<br> 
                Current date: ${dateInFinnish}
                `;

div.append(p);