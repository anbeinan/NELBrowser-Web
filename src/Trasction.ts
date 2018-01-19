// import * as $ from "jquery";
/// <reference types="jquery" />
import {Ajax as Ajax} from "./Util";
import {Tx as Tx, Asset, AssetEnum} from "./Entitys";
import {PageUtil as PageUtil} from "./Entitys";

/**
 * @class 交易记录
 */
export class Trasctions{
    private ajax :Ajax = new Ajax();

    constructor(){
        //初始化交易列表
        let pageUtil:PageUtil = new PageUtil(100000,15);
        this.updateTrasctions(pageUtil,<string>$("#TxType").val());
        //监听交易列表选择框
        $("#TxType").change(()=>{
        this.updateTrasctions(pageUtil,<string>$("#TxType").val());
        });
    }

    //更新交易记录
    public async updateTrasctions(pageUtil:PageUtil,txType:string){
        //分页查询交易记录
        let txs:Tx[] = await this.ajax.post('getrawtransactions',[pageUtil.pageSize,pageUtil.currentPage,txType]);
        $("#transactions").empty();
        txs.forEach((tx)=>{
            let txid = tx.txid;
            txid = txid.substring(0,6)+'...'+txid.substring(txid.length-6);
            let html:string="";
            html+="<tr>"
            html+="<td><a class='code' href='./txInfo.html?txid="+tx.txid+"'>"+txid
            html+="</a></td>"
            html+="<td><a href='./blcokInfo.html?index="+tx.blockindex+"'>"+tx.blockindex
            html+="</a></td>"
            html+="<td>"+tx.type
            html+="</td>"
            html+="<td>"+(tx.gas==undefined?'0':tx.gas)
            html+="</td>"
            html+="<td>"+tx.size+" bytes"
            html+="</td>"
            html+="</tr>"
            $("#transactions").append(html);
        });
    }
}

/**
 * @class 交易详情
 */
export class TrasctionInfo{
    private ajax :Ajax = new Ajax();
    constructor(){
    }
    public async updateTxInfo(txid:string){
        let txInfos:Tx[] = await this.ajax.post('getrawtransaction',[txid]);
        let txInfo:Tx = txInfos[0];
        $("#txInfo").text(txInfo.type+" | Hash: "+txInfo.txid);
        $("#index").text(txInfo.blockindex);
        $("#size").text(txInfo.size+" bytes");
        
        let allAsset:Asset[] = await this.ajax.post('getallasset',[]);
        allAsset.map((asset)=>{
            if(asset.id==AssetEnum.NEO){
                asset.name=[{lang:'en',name:'NEO'}];
            }
            if(asset.id==AssetEnum.GAS){
                asset.name=[{lang:'en',name:"GAS"}];
            }
        });

        txInfo.vin.forEach(async (vin,index,arry)=>{
            let txInfos:Tx[] = await this.ajax.post('getrawtransaction',[vin.txid]);
            let vout = txInfos[0].vout[vin.vout]
            let address:string = vout.address;
            let value :string = vout.value;            
            let name = allAsset.find(val=>val.id==vout.asset).name.map(name=>{return name.name}).join("|");
            $("#from").append('<li class="list-group-item">'+address+' '+value+' '+name+' </br> txid: <a class="code" href="./txInfo.html?txid='+vin.txid+'">'+vin.txid+'</a> </br>n:'+vin.vout+' </li>');
        });
        txInfo.vout.forEach(vout=>{
            let name = allAsset.find(val=>val.id==vout.asset).name.map(name=>name.name).join("|");
            $("#to").append('<li class="list-group-item">'+vout.address+' '+vout.value+' '+name+'</br>n :'+vout.n+'</li>');
        });
    }

}