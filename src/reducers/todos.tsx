import { handleActions } from 'redux-actions';

const initialState: TodoStoreState = [{
  id: 0,
  text: 'Use Redux',
  completed: false
}];

export default handleActions<TodoStoreState, TodoActionPayload>({
  'add todo': (state, action) => {
    return [{
      ...action.payload,
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
    }, ...state];
  },

  'delete todo': (state, action) => {
    return state.filter(todo => todo.id !== action.payload);
  },

  'edit todo': (state, action) => {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    });
  },

  'complete todo': (state, action) => {
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    });
  },

  'complete all': (state, action) => {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      }
    });
  },

  'clear complete': (state, action) => {
    return state.filter(todo => todo.completed === false);
  }
}, initialState);
