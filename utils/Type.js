export const getType = value => Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()

export const hasType = (value, types) => getType(value) === types.toLocaleLowerCase()
