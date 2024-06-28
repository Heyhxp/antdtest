import { saveAs } from 'file-saver';
import { has } from 'lodash';

const handlePropsInObject = (obj: any, props: any = []) => {
  let flag = false;
  props?.forEach((i: any) => {
    if (has(obj, i)) {
      flag = true;
    }
  });
  return flag;
};

const getPropsInObject = (obj: any, props: any = []) => {
  let arr: any = [];
  props?.forEach((i: any) => {
    if (has(obj, i)) {
      arr.push(i);
    }
  });
  return arr;
};

// 处理菜单
export function filterMenusByUserInfo(menus: any, confs: any): any {
  return menus?.reduce((newMenus: any, item: any) => {
    // 拥有associatedKeys,即这个菜单是个合成菜单
    if (has(item, 'associatedKeys')) {
      // debugger;
      if (handlePropsInObject(confs, item?.associatedKeys)) {
        // 1.该合成菜单内的key至少有一个
        let path = item?.path?.toLowerCase();
        let name = item?.name?.toLowerCase();
        let key = item.key;
        let icon = item.icon;
        let associatedKeys = getPropsInObject(confs, item.associatedKeys);
        let associatedConfs = item.associatedConfs;
        // let actions = confs[item.key]['actions'] || [];
        if (has(item, 'routes')) {
          let childRoute = filterMenusByUserInfo(item.routes, confs[item.key]);
          return [
            ...newMenus,
            { path, name, key, icon, associatedKeys, associatedConfs, routes: childRoute },
          ];
        }
        return [...newMenus, { key, path, name, icon, associatedKeys, associatedConfs }];
      } else {
        // 2.该合成菜单内的key一个也没有
        console.log('一个也没有');
      }
      // 即使associatedKeys为空时也不管
      // let path = item.path.toLowerCase();
      // let name = item.name.toLowerCase();
      // let key = item.key;
      // let icon = item.icon;
      // let associatedKeys = getPropsInObject(confs, item.associatedKeys);
      // let associatedConfs = item.associatedConfs;
      // // let actions = confs[item.key]['actions'] || [];
      // if (has(item, 'routes')) {
      //   let childRoute = filterMenusByUserInfo(item.routes, confs[item.key]);
      //   return [
      //     ...newMenus,
      //     { path, name, key, icon, associatedKeys, associatedConfs, routes: childRoute },
      //   ];
      // }
      // return [...newMenus, { key, path, name, icon, associatedKeys, associatedConfs }];
    }
    if (has(confs, item.key) || item?.isNotSetting) {
      let path = item?.path?.toLowerCase();
      let name = item?.name?.toLowerCase();
      let key = item.key;
      let icon = item.icon;
      let actions = confs[item.key]['actions'] || [];
      if (has(item, 'routes')) {
        let childRoute = filterMenusByUserInfo(item.routes, confs[item.key]);
        return [...newMenus, { path, name, key, icon, actions, routes: childRoute }];
      }
      return [...newMenus, { key, path, name, icon, actions }];
    }
    return newMenus;
  }, []);
}

// 处理权限
export function getAuth(currentKey: string, userActions: [], actionStr: string): boolean {
  let flattenArr = Object.values(userActions) as any;
  let result = false;
  let obj = {};
  for (let i = 0; i < flattenArr.length; i++) {
    console.log(flattenArr[i]);
    obj = { ...obj, ...flattenArr[i] };
  }
  if (has(obj, currentKey)) {
    if (obj[currentKey]?.actions?.length) {
      if (obj[currentKey]?.actions?.includes(actionStr)) {
        result = true;
      } else {
        result = false;
      }
    } else {
      result = false;
    }
  } else {
    result = false;
  }

  return result;
}

// 公共错误处理弹窗

// 公共弹窗，分类型-form, text,step,

// 比较两数组的不同
export function compareArrays(array1: any[] | undefined, array2: any[]) {
  const result = {
    same: [],
    different: [],
  };

  const array2Set = new Set(array2);
  array1?.forEach((item) => {
    if (array2Set.has(item.value)) {
      result.same.push(item);
    } else {
      result.different.push(item);
    }
  });

  return result;
}

export function mergeObjects(
  obj1: { [x: string]: any; hasOwnProperty?: any },
  obj2: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
  ignoreKeys = [],
) {
  // 将 obj2 中的所有属性和值添加或更新到 obj1 中
  console.log(obj1, obj2, ignoreKeys, 'sssssssssssssssssss');
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
      obj1[key] = obj2[key];
    }
  }

  // 删除 obj1 中在 obj2 中不存在的属性
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
      delete obj1[key];
    }
  }

  return obj1;
}
// 去除为空的对象key
export function formatData(data) {
  const params = Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined && data[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
  return params;
}

// js中URL的utf-8字符串转成中文
export function revertUTF8(szInput: string) {
  let x,
    wch,
    wch1,
    wch2,
    szRet = '';
  for (x = 0; x < szInput.length; x++) {
    if (szInput.charAt(x) === '%') {
      wch = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
      if (!wch) {
        break;
      }
      if (!(wch & 0x80)) {
        // wch = wch;
      } else if (!(wch & 0x20)) {
        x++;
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        wch = (wch & 0x1f) << 6;
        wch1 = wch1 & 0x3f;
        wch = wch + wch1;
      } else {
        x++;
        wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        x++;
        wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
        wch = (wch & 0x0f) << 12;
        wch1 = (wch1 & 0x3f) << 6;
        wch2 = wch2 & 0x3f;
        wch = wch + wch1 + wch2;
      }
      szRet += String.fromCharCode(wch);
    } else {
      szRet += szInput.charAt(x);
    }
  }
  return szRet;
}

// 导出文件处理
export const handleDownloadFileRes = (resData: any) => {
  const content_disposition = resData.headers['content-disposition'];
  let filename = 'file';

  if (content_disposition.indexOf('filename') > -1) {
    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    let matches = filenameRegex.exec(content_disposition);
    if (matches !== null && matches[1]) {
      filename = matches[1].trim()?.replace(/(^"*)|("*$)/g, '');
    }
    if (filename.startsWith(`utf-8''`)) {
      filename = revertUTF8(filename.replace(/^(utf-8'')/, ''));
    } else {
      filename = decodeURI(filename);
    }
  }

  saveAs(new Blob([resData.data]), filename);
};

export const transformObject = (input: any) => {
  let output = {};

  for (let key in input) {
    if (input[key] !== null && Array.isArray(input[key])) {
      output[key] = input[key].join(',');
    }
  }

  return output;
};
