//what if: different set of items? 
//-> just use different class using the iItemsService interface, and use it in the constructor call
//different way of logging (eg to file, not console) ? 
//-> just use different class using the iLogger interface, and use it in the constructor call

export class MainPage {
    public items : string[];
    constructor(private _logger : ILogger, private _itemsService : IItemsService) {
        this.items = _itemsService.getItems();
        _logger.logMessage("items downloaded", this.items);
    }
}

export class ItemsService implements IItemsService {
    public getItems() : string[] {
        return ["alpha", "bravo", "charlie"];
    }
}

export class AltItemsService implements IItemsService {
    public getItems() : string[] {
        return ["delta", "echo", "foxtrot"];
    }
}

export class Logger implements ILogger {
    public logMessage(title: string, message: any) {
        console.log('[' + title + '] ' + message);
    }
}

export interface ILogger {
    logMessage(title: string, message: any);
}

export interface IItemsService {
    getItems() : string[];
}

var page = new MainPage(new Logger(), new AltItemsService());