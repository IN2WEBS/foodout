const menu = (state=[],action)=>{
    console.log(action.payload);
  switch (action.type){
    case 'FETCH_MENU': return [...state, ...action.payload.menu];
    default : return state
  }
};
export default menu