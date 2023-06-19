
const validator = {
  isEmail(value: string): boolean {
    const regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regExp.test(value)
  },
}

export default validator
