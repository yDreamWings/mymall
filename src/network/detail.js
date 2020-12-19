import {request} from './request';

export function getDetailData(iid){
  return request({
    url : '/detail/',
    params : {
      iid
    }
  });
}

export function getDetailRecommend(){
  return request({
    url : '/recommend',
  });
}

export class Goods {
  constructor(itemInfo, columns, services){
    this.discountBgColor = itemInfo.discountBgColor;
    this.discountDesc = itemInfo.discountDesc;
    this.desc = itemInfo.desc;
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;

  }
}

export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}