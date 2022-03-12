const spaceValidationRgx = /^ *$/;

export const stringValidation = (e: any) => {
  if (
    e.key.toLocaleLowerCase() === "enter" &&
    e.target.value?.length > 0 &&
    !spaceValidationRgx.test(e.target.value)
  ) {
    return true;
  }
  return false;
};

export const spaceValidation = (text: string) => {
  return !spaceValidationRgx.test(text);
};

export const demoCardMaker = (listId: number, num: number, text: string) => {
  let result = [];
  for (let i = 1; i <= num; i++) {
    result.push({
      id: `${listId}-${i}`,
      name: `${text} ${i}`,
      draggable: true,
    });
  }
  return result;
};
