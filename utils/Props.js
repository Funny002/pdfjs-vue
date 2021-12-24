export const createProp = (type, value, required, validator) => {
  return {type, default: () => value, required, validator}
}

export const PropFunction = (value, required, validator) => {
  return {type: Function, default: value, required, validator}
}

export const PropArray = (value, required, validator) => createProp(Array, value, required, validator)

export const PropString = (value, required, validator) => createProp(String, value, required, validator)

export const PropNumber = (value, required, validator) => createProp(Number, value, required, validator)

export const PropObject = (value, required, validator) => createProp(Object, value, required, validator)

export const PropBoolean = (value, required, validator) => createProp(Boolean, value, required, validator)

export default {createProp, PropString, PropNumber, PropBoolean, PropArray, PropObject, PropFunction}
