import * as musicActions from './music.actions';
import * as userActions from './user.actions';
import * as searchActions from './search.actions';

export default {...musicActions, ...searchActions, ...userActions};
