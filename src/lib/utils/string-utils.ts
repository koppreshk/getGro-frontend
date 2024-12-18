export const getInitialsByName = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  return `${firstName[0]}${lastName ? lastName[0] : firstName[1]}`;
};

export const convertCamelCaseStringToSpaceSeparated = (value: string = '') => {
  return value
    .split(/(?=[A-Z])/)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(' ');
};
