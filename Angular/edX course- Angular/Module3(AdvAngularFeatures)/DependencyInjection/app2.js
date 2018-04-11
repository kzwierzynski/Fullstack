"use strict";
//Final product, very independent of changes, easy to mantain etc:
exports.__esModule = true;
var MainPage = /** @class */ (function () {
    function MainPage(_logger, _itemsService) {
        this._logger = _logger;
        this._itemsService = _itemsService;
        this.items = _itemsService.getItems();
        _logger.logMessage("items downloaded", this.items);
    }
    return MainPage;
}());
exports.MainPage = MainPage;
var ItemsService = /** @class */ (function () {
    function ItemsService() {
    }
    ItemsService.prototype.getItems = function () {
        return ["alpha", "bravo", "charlie"];
    };
    return ItemsService;
}());
exports.ItemsService = ItemsService;
var AltItemsService = /** @class */ (function () {
    function AltItemsService() {
    }
    AltItemsService.prototype.getItems = function () {
        return ["delta", "echo", "foxtrot"];
    };
    return AltItemsService;
}());
exports.AltItemsService = AltItemsService;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.logMessage = function (title, message) {
        console.log('[' + title + '] ' + message);
    };
    return Logger;
}());
exports.Logger = Logger;
var page = new MainPage(new Logger(), new AltItemsService());
