const categories = (state=[],action)=>{
  console.log(action);

  switch (action.type){
    case 'FETCH_CATEGORIES':
      console.log(action.payload.categories);
      return [...state, ...action.payload.categories];
    default : return state
  }

};
export default categories