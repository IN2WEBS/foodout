const categories = (state=[],action)=>{
  console.log(action);

  switch (action.type){
    case 'FETCH_CATEGORIES':
      return [...state, ...action.payload.categories];
    default : return state
  }

};
export default categories