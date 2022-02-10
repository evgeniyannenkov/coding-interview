const toLowerCase = str => str.toLowerCase()
const trim = str => str.trim();
const removeExtraSpaces = str => str.replace(/\s+/, ' ');
const log = data => console.log(data) || data;

const composeFn = (...rest) => {
  return rest.reduce((acc, fn) => (...data) => fn(acc(...data)));
}
const compose = (...fns) => (initialData) => fns.reduce((result, fn) => fn(result), initialData);

const sanitizeString = composeFn(
  toLowerCase,
  trim,
  removeExtraSpaces,
  log
);

const sanitizeString2 = compose(
  toLowerCase,
  trim,
  removeExtraSpaces,
  log
);

sanitizeString('Hello    there, bitch.  ');
sanitizeString2('Hello    there, bitch.  ');
