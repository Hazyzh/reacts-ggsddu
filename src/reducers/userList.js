

const createReduce = (initState, reduces) => (state = initState, action) => {
	let _reduce = reduces[action.type]
	if(typeof _reduce == 'function') {
		if (action.payload) {
      action.error && console.log('err!!!', action.payload)
			return _reduce(state, action.payload, action.params)
		} else {
			return _reduce(state, null, action.params)
		}
	}

	return state
}

const initState = {
  name: 'hello reselect',
  toggle: false
}
const userInfo2 = createReduce(initState, {
  'TOGGLE_USER': (state, data, params) => {
      return {...state, toggle: !state.toggle}
  },
  'FETCH_DATA_SUCCESS': (state, data, params) => {
      console.log('%c fetch_data_SUCCESS', 'color:red', data)
      return state
  },
  'FETCH_DATA_ERROR': (state, data, params) => {
    // console.log('%c fetch_data_ERROR', 'color:red', params)
    return state
  }
})


/**
 * for test reselect
 * @param  {Object} state
 * @param  {Object} action   action
 * @return {Object}          same as initstate
 */
const userInfo = (state = {  }, action) => {
  switch (action.type) {
    case 'TOGGLE_USER':
      return {...state, toggle: !state.toggle}
    case 'FETCH_DATA':
      console.log('fetch_data_ing')
      return state
    case 'FETCH_DATA_LOADING':
      console.log('fetch_data_LOADING')
      return state
    case 'FETCH_DATA_SUCCESS':
      console.log('fetch_data_SUCCESS')
      console.log(action.payload)
      return state
    case 'FETCH_DATA_ERROR':
      console.log('fetch_data_ERROR')
      return state
    default:
      return state
  }
}

export default userInfo2
