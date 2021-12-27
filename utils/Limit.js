import {getType} from './Type'

export const Size = (val, min = -Infinity, max = Infinity) => Math.min(Math.max(val, min), max)

export const hasEmpty = value => {
  switch (getType(value)) {
    case 'string':
      return !value
    case 'number':
      return isNaN(value)
    case 'array':
      return value.length === 0
    case 'object':
      return Object.keys(value).length === 0
    default:
      return !value
  }
}
