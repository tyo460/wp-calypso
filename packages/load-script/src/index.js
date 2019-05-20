/** @format */
/**
 * A little module for loading a external script
 *
 * @format
 */

/**
 * External dependencies
 */
import debugFactory from 'debug';
const debug = debugFactory( 'package/load-script' );

/**
 * Internal dependencies
 */
import { addScriptCallback, isLoading } from './callback-handler';
import { createScriptElement, attachToHead } from './dom-operations';

// NOTE: This exists for compatibility.
export { removeScriptCallback } from './callback-handler';

/**
 * Module variables
 */
export const JQUERY_URL = 'https://s0.wp.com/wp-includes/js/jquery/jquery.js';

//
// loadScript and loadjQueryDependentScript
//

export function loadScript( url, callback ) {
	// If this script is not currently being loaded, create a script element and attach to document head.
	const shouldLoadScript = ! isLoading( url );

	addScriptCallback( url, callback );

	if ( shouldLoadScript ) {
		attachToHead( createScriptElement( url ) );
	}
}

export function loadjQueryDependentScript( url, callback ) {
	debug( `Loading a jQuery dependent script from "${ url }"` );

	if ( window.jQuery ) {
		debug( `jQuery found on window, skipping jQuery script loading for "${ url }"` );
		loadScript( url, callback );
		return;
	}

	loadScript( JQUERY_URL, function( error ) {
		if ( error ) {
			callback( error );
		}
		loadScript( url, callback );
	} );
}
