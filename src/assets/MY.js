let myInfo = null;

export const MY = {
  setMY: (info) => {
    myInfo = info;
  },
  getMY: () => {
    return myInfo;
  },
  clearMY: () => {
    myInfo = null;
  }
};
