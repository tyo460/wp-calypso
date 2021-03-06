/**
 * External dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { dispatch } from '@wordpress/data';
import { initializeTracksWithIdentity } from '@automattic/page-template-modal';

/**
 * Internal dependencies
 */
import { PageTemplatesPlugin } from './page-template-plugin';
import './store';
import './index.scss';

// Load config passed from backend.
const {
	templates = [],
	vertical,
	segment,
	tracksUserData,
	screenAction,
	theme,
	isFrontPage,
	locale,
	hideFrontPageTitle,
} = window.starterPageTemplatesConfig;

if ( tracksUserData ) {
	initializeTracksWithIdentity( tracksUserData );
}

const templatesPluginSharedProps = {
	segment,
	templates,
	theme,
	vertical,
	isFrontPage,
	locale,
	hidePageTitle: Boolean( isFrontPage && hideFrontPageTitle ),
};

// Open plugin only if we are creating new page.
if ( screenAction === 'add' ) {
	dispatch( 'automattic/starter-page-layouts' ).setOpenState( 'OPEN_FROM_ADD_PAGE' );
}

// Always register ability to open from document sidebar.
registerPlugin( 'page-templates', {
	render: () => {
		return (
			<>
				<PageTemplatesPlugin { ...templatesPluginSharedProps } shouldPrefetchAssets={ false } />
			</>
		);
	},
} );
