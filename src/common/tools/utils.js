//防抖函数
export function debounce(method, delay){
  let timer = null;
  return (...args)=>{
    clearTimeout(timer);
    timer = setTimeout(() => {
      method.apply(this, args);
    }, delay);
  }
}

/**
 * 数据格式转换
 * ObjArray  要转换的对象数组或数组
 * objImgURLName  存放图片URL的键名
 * objLinkName  存放图片Link的键名
 */
export function imgResolveData(ObjArray, objImgURLName, objLinkName){
  let imgresolve = [];
  let _objImgURLName = objImgURLName || null;
  let _objLinkName = objLinkName || null;
  for(let index in ObjArray){
    if(ObjArray[index] instanceof Object){
      if(ObjArray[index].hasOwnProperty(_objImgURLName) && ObjArray[index].hasOwnProperty(_objImgURLName)){
        imgresolve.push({
          imgURL : ObjArray[index][_objImgURLName],
          link : ObjArray[index][_objLinkName]
        });
      }
    }else{
      imgresolve.push({
        imgURL : ObjArray[index],
        link : null
      });
    }
  }
  return imgresolve;
}

/**
 * 时间格式转换
 * @param {*} date date对象
 * @param {*} fmt 格式
 */
export function formatDate (date, fmt) { 
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  let o = { 
     "M+" : date.getMonth()+1,                 //月份 
     "d+" : date.getDate(),                    //日 
     "h+" : date.getHours(),                   //小时 
     "m+" : date.getMinutes(),                 //分 
     "s+" : date.getSeconds(),                 //秒 
  }; 
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
 return fmt; 
};

function padLeftZero (str)  {
  return ('00' + str).substr(str.length)
};