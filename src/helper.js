export function pick(obj, keys) {
   return Object.assign({}, ...keys.map(k => k in obj ? {
      [k]: obj[k]
   } : {}))
}
