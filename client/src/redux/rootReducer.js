const initialState = {
  companyId: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMPANYID":
      return { ...state, companyId: action.payload };
  }
};

export default rootReducer;
