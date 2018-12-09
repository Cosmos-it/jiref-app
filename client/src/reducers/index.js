import {
   combineReducers
} from 'redux';
import _auth from './auth';
import _errors from './error';
import _profile from './profile';
import _post from './post';

export default combineReducers({
   auth: _auth,
   errors: _errors,
   profile: _profile,
   education: _profile,
   project: _profile,
   experience: _profile,
   post: _post
});
