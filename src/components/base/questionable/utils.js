function clone (obj) {
  if (obj == null || typeof obj !== 'object') return obj

  let newObj = null

  // 时间对象有特殊性
  if (obj.constructor === Date) {
    newObj = new obj.constructor(obj)
  } else {
    // 兼容Moments等库
    if (obj.clone) {return obj.clone() }
    newObj = new obj.constructor()
  }
  for (let key in Object.getOwnPropertyDescriptors(obj)) {
    if (key !== '__ob__') {
      newObj[key] = clone(obj[key])
    }
  }
  return newObj
}

export default {
  clone
}
