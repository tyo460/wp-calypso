/**
 * Internal dependencies
 */
import { registerReducer } from 'state/redux-store';
import reducer from './reducer';

registerReducer( [ 'exporter' ], reducer );