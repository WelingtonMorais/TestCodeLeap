const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'posts/':
      return {
        ...state,
        status: 'loading',
      }
    case 'posts/fetchPostsFulfilled':
      return {
        ...state,
        status: 'succeeded',
        items: action.payload,
      }
    case 'posts/fetchPostsRejected':
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      }
    // Adicione cases para outras ações, como criar, atualizar ou excluir posts
    default:
      return state
  }
}

export default postsReducer
