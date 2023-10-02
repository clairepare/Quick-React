// constants.js
export const terms = ['Fall', 'Winter', 'Spring'];

//export const dayRegex = /^(?!.*(\bM\b|\bTu\b|\bW\b|\bTh\b|\bF\b).*\1)((M|Tu|W|Th|F){1}(?!.*\2))\s((0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/;
export const spaceRegex = /.*\S \S.*/;

export const dayRegex = /^(?:M?(Tu)?(W)?(Th)?(F)?)$/;

export const timeRegex = /^((0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9])$/;