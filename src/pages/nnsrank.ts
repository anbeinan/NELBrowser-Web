﻿namespace WebBrowser
{
    //地址列表
    export class NNSRank implements Page
    {
        div: HTMLDivElement = document.getElementById('nnsrank-page') as HTMLDivElement;
        footer: HTMLDivElement = document.getElementById('footer-box') as HTMLDivElement;
        close(): void
        {
            this.div.hidden = true;
            this.footer.hidden = true;
        }
        private pageUtil: PageUtil;

        /**
         * addrlistInit
         */
        public async domainRankListInit(first: boolean)
        {
            $("#domainUseListPage").empty();
            let domain: DomainBided;
            if (!first) {  //判断是否为初始加载
                domain = await WWW.apiaggr_getaucteddomain(this.pageUtil.currentPage, this.pageUtil.pageSize) as DomainBided;
            } else {     //初始加载                
                domain = await WWW.apiaggr_getaucteddomain(1, 15) as DomainBided;
                if (domain) {
                    this.pageUtil = new PageUtil(domain[0].count, 15);
                }
            }
            if (domain) {
                this.loadView(domain[0].list);
                $("#nnsrank-wrap").show();
                //let minNum = this.pageUtil.currentPage * this.pageUtil.pageSize - this.pageUtil.pageSize;
                //let maxNum = this.pageUtil.totalCount;
                //let diffNum = maxNum - minNum;
                //if (diffNum > 15) {
                //    maxNum = this.pageUtil.currentPage * this.pageUtil.pageSize;
                //}
                //let pageMsg = "Live auctions " + (minNum + 1) + " to " + maxNum + " of " + this.pageUtil.totalCount;
                let pageMsg = "Page " + this.pageUtil.currentPage + " , " + this.pageUtil.totalPage + " pages in total";
                if (location.pathname == '/zh/') {
                    pageMsg = "第 " + this.pageUtil.currentPage + " 页，共 " + this.pageUtil.totalPage + " 页"
                }
                $("#nnsrank-page").find("#nnsrank-page-msg").html(pageMsg);
                if (this.pageUtil.totalPage - this.pageUtil.currentPage) {
                    $("#nnsrank-page-next").removeClass('disabled');
                } else {
                    $("#nnsrank-page-next").addClass('disabled');
                }
                if (this.pageUtil.currentPage - 1) {
                    $("#nnsrank-page-previous").removeClass('disabled');
                } else {
                    $("#nnsrank-page-previous").addClass('disabled');
                }
            } else {
                let msg = "There is no data";
                if (location.pathname == '/zh/') {
                    msg = '没有数据';
                }
                let html = `
                        <tr>
                        <td colspan="6">`+ msg + `</td>
                        </tr>`;
                $('#domainUseListPage').append(html);
                $("#nnsrank-wrap").hide();
            }
        }
        /**
         * start
         */
        public async start()
        {
            await this.domainRankListInit(true);

            $("#nnsrank-page-next").off("click").click(() => {
                if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
                    this.pageUtil.currentPage = this.pageUtil.totalPage;
                } else {
                    this.pageUtil.currentPage += 1;
                    this.domainRankListInit(false);
                }
            });
            $("#nnsrank-page-previous").off("click").click(() => {
                if (this.pageUtil.currentPage <= 1) {
                    this.pageUtil.currentPage = 1;
                } else {
                    this.pageUtil.currentPage -= 1;
                    this.domainRankListInit(false);
                }
            });
            $("#nnsrank-input").val('');
            $("#nnsrank-input").off("input").on('input', () => {
                this.doGoPage(false)
            });
            $("#nnsrank-input").off("keydown").keydown((e) => {
                if (e.keyCode == 13) {
                    this.doGoPage(true);
                }
            });
            $("#nnsrank-gopage").off("click").click(() => {
                this.doGoPage(true)
            });
            this.div.hidden = false;
            this.footer.hidden = false;
        }
        //跳转页面
        public doGoPage(gopage: boolean) {
            let page: number = $("#nnsrank-input").val() as number;
            if (page && page > this.pageUtil.totalPage) {
                page = this.pageUtil.totalPage;
                $("#nnsrank-input").val(this.pageUtil.totalPage);
            } else if (page < 0) {
                page = 1;
                $("#nnsrank-input").val(1);
            }
            if (gopage) {
                this.pageUtil.currentPage = page;
                this.domainRankListInit(false);
                $("#nnsrank-input").val('');
            }
        }

        /**
         * loadView
         */
        public loadView(rankList)
        {
            rankList.forEach((domain) =>
            {
                let endtime = '';
                if (domain.ttl != "0") {
                    let time = parseFloat(domain.ttl);
                    endtime = DateTool.getTime(time);
                } else {
                    endtime = 'Unknown';
                    if (location.pathname == '/zh/') {
                        endtime = '未知';
                    }
                }
                let href = Url.href_nns(domain.fulldomain);
                let hreftxid = Url.href_transaction(domain.lastTime.txid);
                let hrefaddr = Url.href_address(domain.maxBuyer);
                let txid = domain.lastTime.txid.substring(0, 4) + '...' + domain.lastTime.txid.substring(domain.lastTime.txid.length - 4);
                let address = '';
                if (domain.maxBuyer != '') {
                    address = domain.maxBuyer.substring(0, 4) + '...' + domain.maxBuyer.substring(domain.maxBuyer.length - 4);
                }
                let html = `
                        <tr>
                        <td>` + domain.range + `</td>
                        <td> <a href="`+ href + `" target="_self">` + domain.fulldomain + `</a></td>
                        <td> <a href="`+ hreftxid + `" target="_self">` + txid + `</a></td>
                        <td>` + domain.maxPrice + ` CGAS` + `</td>
                        <td><a href="`+ hrefaddr + `" target="_self">` + address + `</a></td>
                        <td>` + endtime + `</td>
                        </tr>`;
                $( '#domainUseListPage' ).append( html );
            } );
        }
    }
}