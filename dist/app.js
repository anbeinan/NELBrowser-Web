/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Ajax {
    constructor() { }
    /**
     * async post
     */
    post(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: 'http://47.96.168.8:81/api/testnet',
                    data: JSON.stringify({
                        "jsonrpc": "2.0",
                        "method": method,
                        "params": params,
                        "id": 1
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (data, status) => {
                        if ('result' in data) {
                            // console.log(data['result']);              
                            resolve(data['result']);
                        }
                        else if ('error' in data) {
                            if (data['error']['code'] == -1) {
                                resolve([]);
                            }
                            else {
                                resolve([]);
                                reject("参数出错 code:-100");
                            }
                        }
                    },
                    error: () => {
                        reject("请求失败");
                    }
                });
            });
            return promise;
        });
    }
    /**
     * async post
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    url: 'https://47.96.168.8:4431/api/testnet?jsonrpc=2.0&method=getblock&params=%5b1000%5d&id=1001',
                    success: (data, status) => {
                        resolve(data['result']);
                    },
                    error: () => {
                        reject("请求失败");
                    }
                });
            });
            return promise;
        });
    }
}
exports.Ajax = Ajax;
class LocationUtil {
    constructor() {
        this.LocString = String(location.href);
    }
    GetQueryString(name) {
        let rs = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "gi").exec(this.LocString), tmp;
        if (tmp = rs) {
            return decodeURI(tmp[2]);
        }
        // parameter cannot be found
        return "";
    }
    getRootPath_web() {
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath = window.document.location.href;
        console.log(curWwwPath);
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        console.log(pathName);
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        console.log(pos);
        var localhostPaht = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/uimcardprj
        console.log(localhostPaht);
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        console.log(projectName);
        return (localhostPaht + projectName);
    }
    getRootPath() {
        var pathName = window.location.pathname.substring(1);
        var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        if (webName == "") {
            return window.location.protocol + '//' + window.location.host;
        }
        else {
            return window.location.protocol + '//' + window.location.host + '/' + webName;
        }
    }
}
exports.LocationUtil = LocationUtil;
class NeoUtil {
    constructor() { }
    /**
     * verifyPublicKey 验证公钥
     * @param publicKey 公钥
     */
    verifyPublicKey(publicKey) {
        var array = Neo.Cryptography.Base58.decode(publicKey);
        //var hexstr = array.toHexString();
        //var salt = array.subarray(0, 1);
        //var hash = array.subarray(1, 1 + 20);
        var check = array.subarray(21, 21 + 4); //
        var checkdata = array.subarray(0, 21); //
        var hashd = Neo.Cryptography.Sha256.computeHash(checkdata); //
        hashd = Neo.Cryptography.Sha256.computeHash(hashd); //
        var hashd = hashd.slice(0, 4); //
        var checked = new Uint8Array(hashd); //
        var error = false;
        for (var i = 0; i < 4; i++) {
            if (checked[i] != check[i]) {
                error = true;
                break;
            }
        }
        return !error;
    }
    /**
     * wifDecode wif解码
     * @param wif wif私钥
     */
    wifDecode(wif) {
        let result = { err: false, result: { pubkey: "", prikey: "", address: "" } };
        var prikey;
        var pubkey;
        var address;
        try {
            prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
            var hexstr = prikey.toHexString();
            result.result.prikey = hexstr;
        }
        catch (e) {
            result.err = true;
            result.result = e.message;
            return result;
        }
        try {
            pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
            var hexstr = pubkey.toHexString();
            result.result.pubkey = hexstr;
        }
        catch (e) {
            result.err = true;
            result.result = e.message;
            return result;
        }
        try {
            address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
            result.result.address = address;
        }
        catch (e) {
            result.err = true;
            result.result = e.message;
            return result;
        }
        return result;
    }
    /**
     * nep2FromWif
     */
    nep2FromWif(wif, password) {
        var prikey;
        var pubkey;
        var address;
        let res = { err: false, result: { address: "", nep2: "" } };
        try {
            prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
            var n = 16384;
            var r = 8;
            var p = 8;
            ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, (info, result) => {
                res.err = false;
                res.result.nep2 = result;
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                var hexstr = pubkey.toHexString();
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                res.result.address = address;
                return res;
            });
        }
        catch (e) {
            res.err = true;
            res.result = e.message;
            return res;
        }
    }
}
exports.NeoUtil = NeoUtil;
function pageCut(pageUtil) {
    if (pageUtil.totalPage - pageUtil.currentPage) {
        $("#next").removeClass('disabled');
    }
    else {
        $("#next").addClass('disabled');
    }
    if (pageUtil.currentPage - 1) {
        $("#previous").removeClass('disabled');
    }
    else {
        $("#previous").addClass('disabled');
    }
}
exports.pageCut = pageCut;
class TableView {
    constructor(divId, tableMode) {
        this._tableMode = tableMode;
        this.divId = divId;
        let html = "<table id='" + tableMode.tablId + "'>"
            + "<thead><head></head></thead><tbody></tbody></table>";
        $("#" + this.divId).append(html);
    }
    update() {
        this._tableMode.ths.forEach((th) => {
            $("#blocklist").children('thead').append('<th>' + th + '</th>');
        });
        let tbody = $("#blocklist").children('tbody');
        let tr = '';
        this._tableMode.tds.forEach((tdMap) => {
            let td = "";
            this._tableMode.ths.forEach((val, key) => {
                td += "<td>" + tdMap.get(key) + "</td>";
            });
            tr += "<tr>" + td + "</tr>";
        });
        tbody.empty();
        tbody.append(tr);
    }
    set className(className) {
        $("#" + this._tableMode.tablId).addClass(className);
    }
    set tableMode(tableMode) {
        this._tableMode = tableMode;
    }
}
exports.TableView = TableView;
class walletStorage {
    constructor() {
        this.wallets = localStorage.getItem("Nel_wallets");
    }
    /**
     * setWallet
     */
    setWallet(address, nep2) {
        let json = { address, nep2 };
        let wallets = JSON.parse(this.wallets);
    }
}
exports.walletStorage = walletStorage;
class GetNep5Info {
    constructor() {
        this.nep5decimals = 0;
    }
    //http://47.96.168.8:20332/?jsonrpc=2.0&id=1&method=invokescript&params=[%2200c1046e616d6567056bd94ecab6fe9607014624ef66bbc991dbcc3f%22]
    makeRpcUrl(url, method, ..._params) {
        if (url[url.length - 1] != '/')
            url = url + "/";
        var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
        for (var i = 0; i < _params.length; i++) {
            urlout += JSON.stringify(_params[i]);
            if (i != _params.length - 1)
                urlout += ",";
        }
        urlout += "]";
        return urlout;
    }
    getInfo(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = { err: false, result: { name: "", symbol: "", decimals: 0, totalsupply: 0 } };
            try {
                //拼接三次调用
                var sb = new ThinNeo.ScriptBuilder();
                sb.EmitParamJson(JSON.parse("[]")); //参数倒序入
                sb.EmitParamJson("(str)name"); //参数倒序入
                var shash = sid.hexToBytes();
                sb.EmitAppCall(shash.reverse()); //nep5脚本
                sb.EmitParamJson(JSON.parse("[]"));
                sb.EmitParamJson("(str)symbol");
                var shash = sid.hexToBytes();
                sb.EmitAppCall(shash.reverse());
                sb.EmitParamJson(JSON.parse("[]"));
                sb.EmitParamJson("(str)decimals");
                var shash = sid.hexToBytes();
                sb.EmitAppCall(shash.reverse());
                sb.EmitParamJson(JSON.parse("[]"));
                sb.EmitParamJson("(str)totalSupply");
                var shash = sid.hexToBytes();
                sb.EmitAppCall(shash.reverse());
                var data = sb.ToArray();
                var url = this.makeRpcUrl("http://47.96.168.8:20332", "invokescript", data.toHexString());
                let response = yield fetch(url, { "method": "get" });
                let json = yield response.json();
                // info1.textContent = JSON.stringify(r);
                try {
                    var state = json.result.state;
                    // info2.textContent = "";
                    if (state.includes("HALT")) {
                        // info2.textContent += "Succ\n";
                        res.err = false;
                    }
                    var stack = json.result.stack;
                    //find name 他的type 有可能是string 或者ByteArray
                    if (stack[0].type == "String") {
                        // info2.textContent += "name=" + stack[0].value + "\n";
                        res.result.name = stack[0].value;
                    }
                    else if (stack[0].type == "ByteArray") {
                        var bs = stack[0].value.hexToBytes();
                        var str = ThinNeo.Helper.Bytes2String(bs);
                        // info2.textContent += "name=" + str + "\n";
                        res.result.name = str;
                    }
                    //find symbol 他的type 有可能是string 或者ByteArray
                    if (stack[1].type == "String") {
                        // info2.textContent += "symbol=" + stack[1].value + "\n";
                        res.result.symbol = stack[1].value;
                    }
                    else if (stack[1].type == "ByteArray") {
                        var bs = stack[1].value.hexToBytes();
                        var str = ThinNeo.Helper.Bytes2String(bs);
                        // info2.textContent += "symbol=" + str + "\n";
                        res.result.symbol = str;
                    }
                    //find decimals 他的type 有可能是 Integer 或者ByteArray
                    if (stack[2].type == "Integer") {
                        this.nep5decimals = (new Neo.BigInteger(stack[2].value)).toInt32();
                    }
                    else if (stack[2].type == "ByteArray") {
                        var bs = stack[2].value.hexToBytes();
                        var num = new Neo.BigInteger(bs);
                        this.nep5decimals = num.toInt32();
                    }
                    //find decimals 他的type 有可能是 Integer 或者ByteArray
                    if (stack[3].type == "Integer") {
                        var totalsupply = (new Neo.BigInteger(stack[3].value)).toInt32();
                    }
                    else if (stack[3].type == "ByteArray") {
                        var bs = stack[3].value.hexToBytes();
                        var num = new Neo.BigInteger(bs);
                        totalsupply = num.toInt32();
                    }
                    // info2.textContent += "decimals=" + this.nep5decimals + "\n";
                    res.result.totalsupply = totalsupply;
                    res.result.decimals = this.nep5decimals;
                    return res;
                }
                catch (e) {
                    res.err = true;
                    res.result = e.message;
                    return res;
                }
            }
            catch (e) {
                res.err = true;
                res.result = e.message;
                return res;
            }
        });
    }
    getBalance(sid, addr) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = { err: false, result: 0 };
            var sb = new ThinNeo.ScriptBuilder();
            sb.EmitParamJson(["(addr)" + addr]); //参数倒序入
            sb.EmitParamJson("(str)balanceOf"); //参数倒序入 //name//totalSupply//symbol//decimals
            var shash = sid.hexToBytes();
            sb.EmitAppCall(shash.reverse()); //nep5脚本
            var data = sb.ToArray();
            // info1.textContent = data.toHexString();        
            try {
                var url = this.makeRpcUrl("http://47.96.168.8:20332", "invokescript", data.toHexString());
                let response = yield fetch(url, { "method": "get" });
                let json = yield response.json();
                var state = json.result.state;
                // info2.textContent = "";
                if (state.includes("HALT")) {
                    // info2.textContent += "Succ\n";
                }
                var stack = json.result.stack;
                var bnum = new Neo.BigInteger(0);
                //find decimals 他的type 有可能是 Integer 或者ByteArray
                if (stack[0].type == "Integer") {
                    bnum = new Neo.BigInteger(stack[0].value);
                }
                else if (stack[0].type == "ByteArray") {
                    var bs = stack[0].value.hexToBytes();
                    bnum = new Neo.BigInteger(bs);
                }
                var v = 1;
                for (var i = 0; i < this.nep5decimals; i++) {
                    v *= 10;
                }
                var intv = bnum.divide(v).toInt32();
                var smallv = bnum.mod(v).toInt32() / v;
                // info2.textContent += "count=" + (intv + smallv);
                res.result = intv + smallv;
            }
            catch (e) {
                res.err = true;
                res.result = e.message;
                return res;
            }
            return res;
        });
    }
}
exports.GetNep5Info = GetNep5Info;
class StorageUtil {
    /**
     * setStorage
     */
    setStorage(name, str) {
        localStorage.setItem(name, str);
    }
    /**
     * getStorage
     */
    getStorage(name, decoder) {
        let res = localStorage.getItem(name);
        if (!res) {
            localStorage.setItem(name, "");
        }
        if (decoder) {
            if (!res) {
                return [];
            }
            let item = localStorage.getItem(name).split(decoder);
            return item;
        }
        else {
            let item = JSON.parse(localStorage.getItem(name));
            return item;
        }
    }
}
exports.StorageUtil = StorageUtil;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @private currentPage 当前页
 * @private pageSize 每页条数
 * @private totalCount 总记录数
 * @private currentPage 当前页
 */
class PageUtil {
    /**
     *
     * @param total 总记录数
     * @param pageSize 每页条数
     */
    constructor(total, pageSize) {
        this._currentPage = 1;
        this._totalCount = total;
        this._pageSize = pageSize;
        this._totalPage = total % pageSize == 0 ? total / pageSize : Math.ceil((total / pageSize));
    }
    ;
    /**
     * currentPage 返回当前页码
     */
    get currentPage() {
        return this._currentPage;
    }
    /**
     *
     */
    set currentPage(currentPage) {
        this._currentPage = currentPage;
    }
    /**
     * pageSize 每页条数
     */
    get pageSize() {
        return this._pageSize;
    }
    /**
     * set count
     */
    set pageSize(pageSize) {
        this._pageSize = pageSize;
    }
    /**
     * pageSize 每页条数
     */
    get totalCount() {
        return this._totalCount;
    }
    /**
     * set count
     */
    set totalCount(totalCount) {
        this._totalCount = totalCount;
    }
    /**
 * pageSize 总页数
 */
    get totalPage() {
        this._totalPage = this._totalCount % this._pageSize == 0 ? this._totalCount / this._pageSize : Math.ceil(this._totalCount / this._pageSize);
        return this._totalPage;
    }
}
exports.PageUtil = PageUtil;
class Nep5as {
}
exports.Nep5as = Nep5as;
var AssetEnum;
(function (AssetEnum) {
    AssetEnum["NEO"] = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    AssetEnum["GAS"] = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
})(AssetEnum = exports.AssetEnum || (exports.AssetEnum = {}));
class TableMode {
    constructor(ths, tds, tableId) {
        this.ths = ths;
        this.tds = tds;
        this.tablId = tableId;
    }
}
exports.TableMode = TableMode;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../lib/neo-ts.d.ts"/>
/// <reference types="jquery" />
/// <reference types="bootstrap" />
const Util_1 = __webpack_require__(0);
const PagesController_1 = __webpack_require__(3);
const Entitys_1 = __webpack_require__(1);
const blocks_1 = __webpack_require__(5);
const Trasction_1 = __webpack_require__(6);
let ajax = new Util_1.Ajax();
//主页
function indexPage() {
    return __awaiter(this, void 0, void 0, function* () {
        //查询区块高度(区块数量-1)
        let blockCount = yield ajax.post('getblockcount', []);
        let blockHeight = blockCount[0]['blockcount'] - 1;
        $("#blockHeight").text(blockHeight.toLocaleString()); //显示在页面
        //查询交易数量
        let txCount = yield ajax.post('gettxcount', []);
        txCount = txCount[0]['txcount'];
        $("#txcount").text(txCount.toLocaleString()); //显示在页面
        //查询地址总数
        let addrCount = yield ajax.post('getaddrcount', []);
        addrCount = addrCount[0]['addrcount'];
        $("#addrCount").text(addrCount.toLocaleString());
        $("#index-page").find("#blocks").children("tbody").empty();
        //分页查询区块数据
        let blocks = yield ajax.post('getblocks', [10, 1]);
        blocks.forEach((item, index, input) => {
            var newDate = new Date();
            newDate.setTime(item.time * 1000);
            let html = '';
            html += '<tr><td><a class="code" class="code" target="_blank" rel="external nofollow"  href="./page/blockInfo.html?index=' + item.index + '">';
            html += item.index + '</a></td><td>' + item.size + ' bytes</td><td>';
            html += newDate.toLocaleString() + '</td>';
            html += '<td>' + item.tx.length + '</td></tr>';
            $("#index-page").find("#blocks").append(html);
        });
        //分页查询交易记录
        let txs = yield ajax.post('getrawtransactions', [10, 1]);
        $("#index-page").find("#transactions").children("tbody").empty();
        txs.forEach((tx) => {
            let txid = tx.txid;
            txid = txid.substring(0, 4) + '...' + txid.substring(txid.length - 4);
            let html = "";
            html += "<tr>";
            html += "<td><a class='code' class='code' target='_blank' rel='external nofollow'  href='./page/txInfo.html?txid=" + tx.txid + "'>" + txid + "</a>";
            html += "</td>";
            html += "<td>" + tx.type;
            html += "</td>";
            html += "<td>" + tx.blockindex;
            html += "</td>";
            html += "<td>" + tx.size + " bytes";
            html += "</td>";
            html += "</tr>";
            $("#index-page").find("#transactions").children("tbody").append(html);
        });
    });
}
;
//区块列表
function blocksPage() {
    return __awaiter(this, void 0, void 0, function* () {
        //查询区块数量
        let blockCount = yield ajax.post('getblockcount', []);
        //分页查询区块数据
        let pageUtil = new Entitys_1.PageUtil(blockCount[0]['blockcount'], 15);
        let block = new blocks_1.BlockPage();
        block.updateBlocks(pageUtil);
        //监听下一页
        $("#blocks-page").find("#next").click(() => {
            if (pageUtil.currentPage == pageUtil.totalPage) {
                alert('当前页已经是最后一页了');
                return;
            }
            pageUtil.currentPage += 1;
            block.updateBlocks(pageUtil);
        });
        $("#blocks-page").find("#previous").click(() => {
            if (pageUtil.currentPage <= 1) {
                alert('当前已经是第一页了');
                return;
            }
            pageUtil.currentPage -= 1;
            block.updateBlocks(pageUtil);
        });
    });
}
$(() => {
    let page = $('#page').val();
    let locationutil = new Util_1.LocationUtil();
    let hash = location.hash;
    redirect(hash);
    new PagesController_1.SearchController();
    if (page === 'txInfo') {
        let txid = locationutil.GetQueryString("txid");
        let ts = new Trasction_1.TrasctionInfo();
        ts.updateTxInfo(txid);
    }
    if (page === 'blockInfo') {
        let index = Number(locationutil.GetQueryString("index"));
        let block = new blocks_1.BlockPage();
        block.queryBlock(index);
    }
    if (page === 'addrInfo') {
        let addr = locationutil.GetQueryString("addr");
        let addrInfo = new PagesController_1.AddressControll(addr);
        addrInfo.addressInfo();
    }
});
// $("#txlist-btn").click(()=>{redirect('#txlist-page')})
// $("#addrs-btn").click(()=>{redirect("#addrs-page")})
// $("#blocks-btn").click(()=>{redirect("#blocks-page")})
// $("#asset-btn").click(()=>{redirect("#asset-page")})
// $("#index-btn").click(()=>{redirect("")});
// $("#wallet-btn").click(()=>{redirect("#wallet-page")});
function redirect(page) {
    if (page === '') {
        indexPage();
        $('#index-page').show();
        $("#index-btn").addClass("active");
        $("#brow-btn").removeClass("active");
    }
    else {
        $('#index-page').hide();
        $("#brow-btn").addClass("active");
        $("#index-btn").removeClass("active");
    }
    if (page === '#blocks-page') {
        // let blocks=new BlocksControll();
        // blocks.start();
        blocksPage();
        $(page).show();
        $("#blocks-btn").addClass("active");
    }
    else {
        $('#blocks-page').hide();
        $("#blocks-btn").removeClass("active");
    }
    if (page === '#txlist-page') {
        let ts = new Trasction_1.Trasctions();
        $(page).show();
        $("#txlist-btn").addClass("active");
    }
    else {
        $('#txlist-page').hide();
        $("#txlist-btn").removeClass("active");
    }
    if (page === '#addrs-page') {
        let addrlist = new PagesController_1.addrlistControll();
        addrlist.start();
        $(page).show();
        $("#addrs-btn").addClass("active");
    }
    else {
        $('#addrs-page').hide();
        $("#addrs-btn").removeClass("active");
    }
    if (page === '#asset-page') {
        //启动asset管理器
        let assetControll = new PagesController_1.AssetControll();
        assetControll.allAsset();
        $(page).show();
        $("#asset-btn").addClass("active");
    }
    else {
        $('#asset-page').hide();
        $("#asset-btn").removeClass("active");
    }
    if (page == "#wallet-page") {
        let wallet = new PagesController_1.WalletControll();
        $(page).show();
        $("#wallet-btn").addClass("active");
        $("#brow-btn").removeClass("active");
    }
    else {
        $("#wallet-page").hide();
        $("#wallet-btn").removeClass("active");
    }
}
function onhash() {
    let hash = location.hash;
    redirect(hash);
}
document.getElementsByTagName("body")[0].onhashchange = () => { onhash(); };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="jquery" />
// import * as $ from "jquery";
const Util_1 = __webpack_require__(0);
const Entitys_1 = __webpack_require__(1);
const PageViews_1 = __webpack_require__(4);
class SearchController {
    constructor() {
        this.locationUtil = new Util_1.LocationUtil();
        let page = $('#page').val().toString();
        let url = "";
        let neoUtil = new Util_1.NeoUtil();
        if (page == 'index') {
            url = './page/';
        }
        else {
            url = './';
        }
        $("#searchBtn").click(() => {
            let search = $("#searchText").val().toString();
            if (search.length == 34) {
                if (neoUtil.verifyPublicKey(search)) {
                    window.location.href = url + 'address.html?addr=' + search;
                }
                else {
                    alert('请输入正确的地址');
                }
            }
            search = search.replace('0x', '');
            if (search.length == 64) {
                window.location.href = url + 'txInfo.html?txid=' + search;
            }
            if (!isNaN(Number(search))) {
                window.location.href = url + 'blockInfo.html?index=' + search;
            }
        });
    }
}
exports.SearchController = SearchController;
class AddressControll {
    constructor(address) {
        this.ajax = new Util_1.Ajax();
        this.address = address;
        $("#nep5-btn").click(() => {
            this.nep5Info();
        });
    }
    /**
     * nep5Info
     */
    nep5Info() {
        return __awaiter(this, void 0, void 0, function* () {
            let getNep5 = new Util_1.GetNep5Info();
            let asset = $("#nep5-text").val().toString();
            let stouitl = new Util_1.StorageUtil();
            if (asset.length < 1)
                alert("请输入资产id");
            getNep5.getInfo(asset).then((res) => {
                if (!res.err) {
                    let name = res.result["name"];
                    let symbol = res.result["symbol"];
                    return res;
                }
                else {
                    alert("-_-!!!抱歉您的资产id好像不太正确 \n error[" + res.result + "]");
                }
            })
                .then((res) => {
                getNep5.getBalance(asset, this.address)
                    .then((balance) => {
                    if (balance.err) {
                        alert("=_=!抱歉查询查询余额失败，请检查您的资产id \n error[" + balance.result + "]");
                    }
                    else {
                        this.addInfo.loadNep5(res.result.name, res.result.symbol, balance.result);
                        let asids = stouitl.getStorage("assetIds_nep5", "|");
                        if (!asids.find(as => as == asset)) {
                            asids.push(asset);
                            stouitl.setStorage("assetIds_nep5", asids.join('|'));
                        }
                    }
                });
            });
        });
    }
    addressInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let balances = yield this.ajax.post('getbalance', [this.address]).catch((e) => {
                alert(e);
            });
            ;
            if (balances.length < 1) {
                alert("当前地址余额为零");
            }
            balances.map((balance) => {
                if (balance.asset == Entitys_1.AssetEnum.NEO) {
                    balance.name = [{ lang: 'en', name: 'NEO' }];
                }
                if (balance.asset == Entitys_1.AssetEnum.GAS) {
                    balance.name = [{ lang: 'en', name: "GAS" }];
                }
            });
            let utxo = yield this.ajax.post('getutxo', [this.address]).catch((e) => {
                alert(e);
            });
            let allAsset = yield this.ajax.post('getallasset', []);
            allAsset.map((asset) => {
                if (asset.id == Entitys_1.AssetEnum.NEO) {
                    asset.name = [{ lang: 'en', name: 'NEO' }];
                }
                if (asset.id == Entitys_1.AssetEnum.GAS) {
                    asset.name = [{ lang: 'en', name: "GAS" }];
                }
            });
            utxo.map((item) => {
                item.asset = allAsset.find(val => val.id == item.asset).name.map((name) => { return name.name; }).join("|");
            });
            this.addInfo = new PageViews_1.AddressInfoView(balances, utxo, this.address);
            this.addInfo.loadView(); //加载页面
        });
    }
}
exports.AddressControll = AddressControll;
//地址列表
class addrlistControll {
    constructor() {
        this.ajax = new Util_1.Ajax();
        $("#addrs-page").find("#next").click(() => {
            if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                alert('当前页已经是最后一页了');
                return;
            }
            else {
                this.pageUtil.currentPage += 1;
                this.addrlistInit();
            }
        });
        $("#addrs-page").find("#previous").click(() => {
            if (this.pageUtil.currentPage <= 1) {
                alert('当前已经是第一页了');
                return;
            }
            else {
                this.pageUtil.currentPage -= 1;
                this.addrlistInit();
            }
        });
    }
    /**
     * addrlistInit
     */
    addrlistInit() {
        return __awaiter(this, void 0, void 0, function* () {
            let addrcount = yield this.ajax.post('getaddrcount', []).catch((e) => {
                alert(e);
            });
            if (addrcount.length == 0) {
                alert('此地址余额为空，utxo为空');
            }
            this.pageUtil.totalCount = addrcount[0]['addrcount'];
            let addrlist = yield this.ajax.post('getaddrs', [this.pageUtil.pageSize, this.pageUtil.currentPage]);
            let newDate = new Date();
            addrlist.map((item) => {
                newDate.setTime(item.firstuse.blocktime.$date);
                item.firstDate = newDate.toLocaleString();
                newDate.setTime(item.lastuse.blocktime.$date);
                item.lastDate = newDate.toLocaleString();
            });
            let view = new PageViews_1.AddrlistView();
            view.loadView(addrlist);
            Util_1.pageCut(this.pageUtil);
        });
    }
    /**
     * start
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let prom = yield this.ajax.post('getaddrcount', []);
            this.pageUtil = new Entitys_1.PageUtil(prom[0]['addrcount'], 15);
            this.addrlistInit();
        });
    }
}
exports.addrlistControll = addrlistControll;
//资产页面管理器
class AssetControll {
    constructor() {
        this.ajax = new Util_1.Ajax();
    }
    allAsset() {
        return __awaiter(this, void 0, void 0, function* () {
            let allAsset = yield this.ajax.post('getallasset', []);
            allAsset.map((asset) => {
                if (asset.id == Entitys_1.AssetEnum.NEO) {
                    asset.name = [{ lang: 'en', name: 'NEO' }];
                }
                if (asset.id == Entitys_1.AssetEnum.GAS) {
                    asset.name = [{ lang: 'en', name: "GAS" }];
                }
                let name = asset.name.map((name) => { return name.name; });
                asset.names = name.join("|");
            });
            let nep5Info = new Util_1.GetNep5Info();
            let storutil = new Util_1.StorageUtil();
            let nep5asids = storutil.getStorage("assetIds_nep5", "|");
            let nep5s = new Array();
            for (let n = 0; n < nep5asids.length; n++) {
                let res = yield nep5Info.getInfo(nep5asids[n]);
                let assetnep5 = new Entitys_1.Nep5as();
                if (!res.err) {
                    assetnep5.names = res.result["name"];
                    assetnep5.type = res.result["symbol"];
                    assetnep5.amount = res.result["totalsupply"];
                    assetnep5.id = nep5asids[n];
                }
                nep5s.push(assetnep5);
            }
            let assetView = new PageViews_1.AssetsView(allAsset, nep5s);
            yield assetView.loadView(); //调用loadView方法渲染页面
        });
    }
}
exports.AssetControll = AssetControll;
class BlocksControll {
    constructor() {
        this.ajax = new Util_1.Ajax();
        this.previous = document.createElement("li");
        this.next = document.createElement("li");
        this.ul = document.createElement("ul");
        this.ul.className = "pager";
        this.previous.className = "previous disabled";
        this.next.className = "next";
        this.older = document.createElement("a");
        this.newer = document.createElement("a");
        this.text = document.createElement("a");
        this.previous.appendChild(this.older);
        this.next.appendChild(this.newer);
        this.older.text = "← Older";
        this.newer.text = "Newer →";
        this.ul.appendChild(this.previous);
        this.ul.appendChild(this.text);
        this.ul.appendChild(this.next);
        let div = document.getElementById("blocks-page");
        div.appendChild(this.ul);
        this.next.onclick = () => {
            if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                alert('当前页已经是最后一页了');
                return;
            }
            else {
                this.pageUtil.currentPage += 1;
                this.blocksInit();
            }
        };
        this.previous.onclick = () => {
            if (this.pageUtil.currentPage <= 1) {
                alert('当前已经是第一页了');
                return;
            }
            else {
                this.pageUtil.currentPage -= 1;
                this.blocksInit();
            }
        };
    }
    /**
     * blocksInit
     */
    blocksInit() {
        return __awaiter(this, void 0, void 0, function* () {
            //分页查询区块数据
            let blocks = yield this.ajax.post('getblocks', [
                this.pageUtil.pageSize,
                this.pageUtil.currentPage
            ]);
            let ths = new Map();
            let tds = new Array();
            ths.set('index', 'index');
            ths.set('size', 'size');
            ths.set('time', 'time');
            ths.set('txnumber', 'txnumber');
            let newDate = new Date();
            blocks.forEach((block) => {
                let td = new Map();
                newDate.setTime(block.time * 1000);
                let a = '<a href="./page/blockInfo.html?index=' + block.index + '">';
                a += block.index + '</a>';
                td.set('index', a);
                td.set('size', block.size);
                td.set('time', newDate.toLocaleString());
                td.set('txnumber', block.tx.length);
                tds.push(td);
            });
            let tbmode = new Entitys_1.TableMode(ths, tds, "blocklist");
            let blocksView = new PageViews_1.BlocksView(tbmode, this.next, this.previous, this.text);
            blocksView.loadView(this.pageUtil);
        });
    }
    /**
     * start
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //查询区块数量
            let blockCount = yield this.ajax.post('getblockcount', []);
            this.pageUtil = new Entitys_1.PageUtil(blockCount[0]['blockcount'], 15);
            this.blocksInit();
        });
    }
}
exports.BlocksControll = BlocksControll;
class WalletControll {
    constructor() {
        this.neoUtil = new Util_1.NeoUtil();
        this.wifInput = $('#createWallet').find("#wif-input").children('input');
        this.p1Input = $('#password1');
        this.p2Input = $('#password2');
        this.wifInput.blur(() => {
            this.verifWif();
        });
        this.p1Input.blur(() => {
            this.verifpassword();
        });
        this.p2Input.blur(() => {
            this.verifpassword();
        });
        $('#send-wallet').click(() => {
            if (this.verifWif() == 1) {
                if (this.verifpassword()) {
                    let res = this.neoUtil.nep2FromWif(this.wifInput.val().toString(), this.p1Input.val().toString());
                    if (!res.err) {
                        res.result;
                    }
                }
            }
            if (this.verifWif() > 1) {
                this.verifpassword();
            }
        });
    }
    verifWif() {
        let wifGroup = $('#createWallet').find("#wif-input");
        var wif = this.wifInput.val().toString();
        if (wif.length) {
            try {
                let result = this.neoUtil.wifDecode(wif);
                if (result.err) {
                    wifGroup.addClass("has-error");
                    wifGroup.children("p").text("请输入正确的WIF");
                    return 0;
                }
                else {
                    wifGroup.addClass("has-success");
                    wifGroup.removeClass("has-error");
                    wifGroup.children("p").text("");
                    return 1;
                }
            }
            catch (error) {
                return 0;
            }
        }
        else {
            wifGroup.removeClass("has-error has-success");
            wifGroup.addClass("has-error");
            wifGroup.children("p").text("不得为空");
            return 2;
        }
    }
    /**
     * verif
     */
    verifpassword() {
        let p1Group = $("#p1group");
        let p2Group = $("#p2group");
        var p1 = this.p1Input.val().toString();
        var p2 = this.p2Input.val().toString();
        let neoUtil = new Util_1.NeoUtil();
        if (p1.length > 7) {
            p1Group.addClass("has-success");
            p1Group.removeClass("has-error");
            p1Group.children("p").text("");
            if (p2 === p1) {
                p2Group.addClass("has-success");
                p2Group.removeClass("has-error");
                p2Group.children("p").text("");
            }
            else {
                p2Group.addClass("has-error");
                p2Group.removeClass("has-success");
                p2Group.children("p").text("请您输入相同的登陆密码");
            }
        }
        else {
            p1Group.addClass("has-error");
            p1Group.removeClass("has-success");
            p1Group.children("p").text("密码不能小于8位");
        }
    }
}
exports.WalletControll = WalletControll;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __webpack_require__(0);
class AddressInfoView {
    constructor(balances, utxo, address) {
        this.balances = balances;
        this.address = address;
        this.utxo = utxo;
    }
    /**
     * loadView
     */
    loadView() {
        $("#balance").empty();
        $("#utxos").empty();
        $("#address").text('address | ' + this.address);
        // console.log(this.balances);
        this.balances.forEach((balance) => {
            let html = '';
            let name = balance.name.map((name) => { return name.name; }).join('|');
            html += '<div class="col-md-6">';
            html += '<div class="panel panel-default" style="height:100%">';
            html += '<div class="panel-heading">';
            html += '<h3 class="panel-title">' + name + '</h3>';
            html += '</div>';
            html += '<div id="size" class="panel-body">';
            html += balance.balance;
            html += '</div></div></div>';
            $("#balance").append(html);
        });
        this.utxo.forEach((utxo) => {
            let html = '';
            html += "<tr>";
            html += "<td class='code'>" + utxo.asset;
            html += "</td>";
            html += "<td>" + utxo.value;
            html += "</td>";
            html += "<td><a class='code' target='_blank' rel='external nofollow' href='./txInfo.html?txid=" + utxo.txid + "'>" + utxo.txid;
            html += "</a>[" + utxo.n + "]</td>";
            html += "</tr>";
            $("#utxos").append(html);
        });
    }
    /**
     * loadNep5
     */
    loadNep5(name, symbol, balance) {
        $("#nep5balance").empty();
        $("#nep5balance").append('<li class="list-group-item">[' + symbol + '] ' + name + ': ' + balance + '</li>');
    }
}
exports.AddressInfoView = AddressInfoView;
class AddrlistView {
    constructor() { }
    /**
     * loadView
     */
    loadView(addrlist) {
        $("#addrlist").empty();
        let html = '';
        addrlist.forEach(item => {
            html += '<tr>';
            html += '<td><a class="code" target="_blank" rel="external nofollow" href="./page/address.html?addr=' + item.addr + '">' + item.addr + '</a></td>';
            html += '<td>' + item.firstDate + '</td>';
            html += '<td>' + item.lastDate + '</td>';
            html += '<td>' + item.txcount + '</td>';
            html += '</tr>';
        });
        $('#addrlist').append(html);
    }
}
exports.AddrlistView = AddrlistView;
class AssetsView {
    constructor(allAsset, nep5s) {
        this.assets = allAsset;
        console.log(nep5s);
        this.nep5s = nep5s;
    }
    /**
     * loadView 页面展现
     */
    loadView() {
        $("#assets").empty();
        this.assets.forEach((asset) => {
            let html = '';
            html += '<div class="col-md-4">';
            html += '<div class="panel panel-default" style="height:100%">';
            html += '<div class="panel-heading">';
            html += '<h3 class="panel-title">' + asset.names + '</h3>';
            html += '</div>';
            html += '<ul id="size" class="list-group" >';
            html += '<li class="list-group-item"> 类型: ';
            html += asset.type;
            html += '</li>';
            html += '<li class="list-group-item"> 总量: ';
            html += asset.amount;
            html += '</li>';
            html += '<li class="list-group-item code"> id: ';
            html += asset.id;
            html += '</li>';
            html += '<li class="list-group-item code"> admin: ';
            html += asset.admin;
            html += '</li>';
            html += '</ul></div></div>';
            $("#assets").append(html);
        });
        this.nep5s.forEach((asset) => {
            let html = '';
            html += '<div class="col-md-4">';
            html += '<div class="panel panel-default" style="height:100%">';
            html += '<div class="panel-heading">';
            html += '<h3 class="panel-title">' + asset.names + '</h3>';
            html += '</div>';
            html += '<ul id="size" class="list-group" >';
            html += '<li class="list-group-item"> 类型: ';
            html += asset.type;
            html += '</li>';
            html += '<li class="list-group-item"> 总量: ';
            html += asset.amount;
            html += '</li>';
            html += '<li class="list-group-item code"> id: ';
            html += asset.id;
            html += '</li>';
            html += '</ul></div></div>';
            $("#nep5ass").append(html);
        });
    }
}
exports.AssetsView = AssetsView;
/**
 * @class 交易记录
 */
class Trasctions {
    constructor() { }
    //更新交易记录
    loadView(txs) {
        $("#transactions").empty();
        txs.forEach((tx) => {
            // console.log(tx);
            let html = "";
            html += "<tr>";
            html += "<td><a class='code' href='./txInfo.html?txid=" + tx.txid + "'>" + tx.txid;
            html += "</a></td>";
            html += "<td><a href='./blcokInfo.html?index=" + tx.blockindex + "'>" + tx.blockindex;
            html += "</a></td>";
            html += "<td>" + tx.type;
            html += "</td>";
            html += "<td>" + (tx.gas == undefined ? '0' : tx.gas);
            html += "</td>";
            html += "<td>" + tx.size + " bytes";
            html += "</td>";
            html += "</tr>";
            $("#transactions").append(html);
        });
    }
}
exports.Trasctions = Trasctions;
class BlocksView {
    constructor(tbmode, next, previous, text) {
        this.next = next;
        this.previous = previous;
        this.text = text;
        this.tbview = new Util_1.TableView("blocks-page", tbmode);
        this.tbview.className = "table cool table-hover";
        this.tbview.update();
    }
    /**
     * loadView()
     */
    loadView(pageUtil) {
        this.text.text = "总记录数:" + pageUtil.totalCount + " 总页数:" + pageUtil.totalPage + " 当前页:" + pageUtil.currentPage;
        if (pageUtil.totalPage - pageUtil.currentPage) {
            this.next.classList.remove('disabled');
        }
        else {
            this.next.classList.add('disabled');
        }
        if (pageUtil.currentPage - 1) {
            this.previous.classList.remove('disabled');
        }
        else {
            this.previous.classList.add('disabled');
        }
        this.tbview.update();
    }
}
exports.BlocksView = BlocksView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as $ from "jquery";
/// <reference types="jquery" />
const Util_1 = __webpack_require__(0);
class BlockPage {
    constructor() {
        $("#searchBtn").click(() => {
            window.location.href = './blockInfo.html?index=' + $("#searchText").val();
        });
    }
    updateBlocks(pageUtil) {
        return __awaiter(this, void 0, void 0, function* () {
            let ajax = new Util_1.Ajax();
            let blocks = yield ajax.post('getblocks', [pageUtil.pageSize, pageUtil.currentPage]);
            console.log("blocks-page");
            $("#blocks-page").children("table").children("tbody").empty();
            if (pageUtil.totalPage - pageUtil.currentPage) {
                $("#blocks-page").find("#next").removeClass('disabled');
            }
            else {
                $("#blocks-page").find("#next").addClass('disabled');
            }
            if (pageUtil.currentPage - 1) {
                $("#blocks-page").find("#previous").removeClass('disabled');
            }
            else {
                $("#blocks-page").find("#previous").addClass('disabled');
            }
            let newDate = new Date();
            blocks.forEach((item, index, input) => {
                newDate.setTime(item.time * 1000);
                let html;
                html += '<tr><td>';
                html += '<a href="./page/blockInfo.html?index=' + item.index + '">';
                html += item.index + '</a></td><td>' + item.size;
                html += ' bytes</td><td>' + newDate.toLocaleString() + '</td></tr>';
                $("#blocks-page").find("tbody").append(html);
            });
        });
    }
    queryBlock(index) {
        return __awaiter(this, void 0, void 0, function* () {
            let ajax = new Util_1.Ajax();
            let newDate = new Date();
            let blocks = yield ajax.post('getblock', [index]);
            let block = blocks[0];
            console.log(block);
            newDate.setTime(block.time * 1000);
            $("#hash").text(block.hash);
            $("#size").text(block.size + ' byte');
            $("#time").text(newDate.toLocaleString());
            $("#version").text(block.version);
            $("#index").text(block.index);
            let txs = block.tx;
            txs.forEach(tx => {
                $("#txs").append('<tr><td><a href="./txInfo.html?txid=' + tx.txid + '">' + tx.txid + '</a></td><td>' + tx.type + '</td><td>' + tx.size + ' bytes</td><td>' + tx.version + '</td></tr>');
            });
        });
    }
}
exports.BlockPage = BlockPage;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as $ from "jquery";
/// <reference types="jquery" />
const Util_1 = __webpack_require__(0);
const Entitys_1 = __webpack_require__(1);
const Entitys_2 = __webpack_require__(1);
/**
 * @class 交易记录
 */
class Trasctions {
    constructor() {
        this.ajax = new Util_1.Ajax();
        this.txlist = $("#txlist-page");
        this.start();
        //监听交易列表选择框
        $("#TxType").change(() => {
            this.updateTrasctions(this.pageUtil, $("#TxType").val());
        });
        this.txlist.find(".next").click(() => {
            if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                alert('当前页已经是最后一页了');
                return;
            }
            else {
                this.pageUtil.currentPage += 1;
                this.updateTrasctions(this.pageUtil, $("#TxType").val());
            }
        });
        this.txlist.find(".previous").click(() => {
            if (this.pageUtil.currentPage <= 1) {
                alert('当前已经是第一页了');
                return;
            }
            else {
                this.pageUtil.currentPage -= 1;
                this.updateTrasctions(this.pageUtil, $("#TxType").val());
            }
        });
    }
    //更新交易记录
    updateTrasctions(pageUtil, txType) {
        return __awaiter(this, void 0, void 0, function* () {
            //分页查询交易记录
            let txs = yield this.ajax.post('getrawtransactions', [pageUtil.pageSize, pageUtil.currentPage, txType]);
            this.txlist.find("table").children("tbody").empty();
            txs.forEach((tx) => {
                let txid = tx.txid;
                txid = txid.substring(0, 6) + '...' + txid.substring(txid.length - 6);
                let html = "";
                html += "<tr>";
                html += "<td><a class='code' target='_blank' rel='external nofollow' href='./page/txInfo.html?txid=" + tx.txid + "'>" + txid;
                html += "</a></td>";
                html += "<td><a href='./blcokInfo.html?index=" + tx.blockindex + "'>" + tx.blockindex;
                html += "</a></td>";
                html += "<td>" + tx.type;
                html += "</td>";
                html += "<td>" + (tx.gas == undefined ? '0' : tx.gas);
                html += "</td>";
                html += "<td>" + tx.size + " bytes";
                html += "</td>";
                html += "</tr>";
                this.txlist.find("table").children("tbody").append(html);
            });
            Util_1.pageCut(this.pageUtil);
        });
    }
    /**
     * async start
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let txCount = yield this.ajax.post('gettxcount', []);
            txCount = txCount[0]['txcount'];
            //初始化交易列表
            this.pageUtil = new Entitys_2.PageUtil(txCount, 15);
            this.updateTrasctions(this.pageUtil, $("#TxType").val());
        });
    }
}
exports.Trasctions = Trasctions;
/**
 * @class 交易详情
 */
class TrasctionInfo {
    constructor() {
        this.ajax = new Util_1.Ajax();
    }
    updateTxInfo(txid) {
        return __awaiter(this, void 0, void 0, function* () {
            let txInfos = yield this.ajax.post('getrawtransaction', [txid]);
            let txInfo = txInfos[0];
            $("#txInfo").text(txInfo.type + " | Hash: " + txInfo.txid);
            $("#index").text(txInfo.blockindex);
            $("#size").text(txInfo.size + " bytes");
            let allAsset = yield this.ajax.post('getallasset', []);
            allAsset.map((asset) => {
                if (asset.id == Entitys_1.AssetEnum.NEO) {
                    asset.name = [{ lang: 'en', name: 'NEO' }];
                }
                if (asset.id == Entitys_1.AssetEnum.GAS) {
                    asset.name = [{ lang: 'en', name: "GAS" }];
                }
            });
            txInfo.vin.forEach((vin, index, arry) => __awaiter(this, void 0, void 0, function* () {
                let txInfos = yield this.ajax.post('getrawtransaction', [vin.txid]);
                let vout = txInfos[0].vout[vin.vout];
                let address = vout.address;
                let value = vout.value;
                let name = allAsset.find(val => val.id == vout.asset).name.map(name => { return name.name; }).join("|");
                $("#from").append('<li class="list-group-item">' + address + ' ' + value + ' ' + name + ' </br> txid: <a class="code" href="./txInfo.html?txid=' + vin.txid + '">' + vin.txid + '</a> </br>n:' + vin.vout + ' </li>');
            }));
            txInfo.vout.forEach(vout => {
                let name = allAsset.find(val => val.id == vout.asset).name.map(name => name.name).join("|");
                $("#to").append('<li class="list-group-item">' + vout.address + ' ' + vout.value + ' ' + name + '</br>n :' + vout.n + '</li>');
            });
        });
    }
}
exports.TrasctionInfo = TrasctionInfo;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map