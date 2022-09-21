const initialState = {
  companyId: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMPANYID":
      return { ...state, ompanyId: action.payload };
  }
};

export default rootReducer;
