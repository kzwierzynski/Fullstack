//The same functionality as app2.ts, but main class v. dependent on changes
//what if: different set of items? 
//different way of logging (eg to file, not console) ?  

export class MainPage {
    constructor() {
        var items = ['alpha', 'bravo', 'charlie'];
        console.log("[items downloaded]", items);
    }
}

var page = new MainPage();