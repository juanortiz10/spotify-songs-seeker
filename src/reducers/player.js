import { COMPLETE_SONG, IS_FETCHING, COMPLETE_FETCH } from '../constants/'

export default function player( state = [], action ) {
  switch (action.type) {
    case COMPLETE_FETCH:
      return [
        action.payload[0],
        action.payload[1],
        action.payload[2],
        action.payload[3],
        action.payload[4]
      ]
    case IS_FETCHING:
      return action
    case COMPLETE_SONG:
      return action
    default:
      return state
  }
}
