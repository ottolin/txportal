import fetch from 'isomorphic-fetch';
import {
    TXT_RV_REQ,
    TXT_RV_RECV,
    TXT_RV_SELECT_ONE,
    TXT_RV_INVALIDATE
} from '../constants/action_types';

export function txtRvSelectOne(txtRv) {
	return {
		type: TXT_RV_SELECT_ONE,
		txtRv
	};
}

export function txtRvInvalidate(branch) {
	return {
		type: TXT_RV_INVALIDATE,
		branch
	};
}

export function txtRvReq(branch) {
	return {
		type: TXT_RV_REQ,
		branch
	};
}

export function txtRvRecv(branch, json) {
	return {
		type: TXT_RV_REQ,
		branch,
		txtRv: json,
		receivedAt: Date.now()
	};
}

export function fetchTxtRv(branch) {
	return dispatch => {
		dispatch(txtRvReq(branch));
		return fetch('/api/txt/results')
		.then(req => req.json())
		.then(json => dispatch(txtRvRecv(branch, json)));
	}
}
