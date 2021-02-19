/**
 * Internal dependencies
 */
import reducer, { connectionState } from '../reducer';
import { CONNECTION_LOST, CONNECTION_RESTORED } from 'calypso/state/action-types';
import { serialize, deserialize } from 'calypso/state/utils';

describe( 'state/application reducer', () => {
	describe( '#connectionState()', () => {
		test( 'should default to CHECKING when no arguments provided', () => {
			expect( connectionState( undefined, {} ) ).toBe( 'CHECKING' );
		} );

		test( 'should be ONLINE when action CONNECTION_RESTORED dispatched', () => {
			expect( connectionState( undefined, { type: CONNECTION_RESTORED } ) ).toBe( 'ONLINE' );
		} );

		test( 'should be OFFLINE when action CONNECTION_LOST dispatched', () => {
			expect( connectionState( undefined, { type: CONNECTION_LOST } ) ).toBe( 'OFFLINE' );
		} );

		test( 'never persists state', () => {
			const state = serialize( reducer, { connectionState: 'ONLINE' } );
			expect( state ).toBe( undefined );
		} );

		test( 'always uses initialState, even if given offline', () => {
			const state = deserialize( reducer, { connectionState: 'OFFLINE' } );
			expect( state ).toEqual( { connectionState: 'CHECKING' } );
		} );
	} );
} );
