/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';
import { dispatch } from '@wordpress/data';
import { recordTracksEvent } from '@automattic/calypso-analytics';
import 'a8c-fse-common-data-stores';
import '@wordpress/editor';

/**
 * Internal dependencies
 */
import { inIframe } from '../../../block-inserter-modifications/contextual-tips/utils';
import { GUTENBOARDING_LAUNCH_FLOW, FOCUSED_LAUNCH_FLOW, SITE_LAUNCH_FLOW } from '../constants';
import './styles.scss';

let handled = false;

domReady( () => {
	// If site launch options does not exist, stop.
	const siteLaunchOptions = window.wpcomEditorSiteLaunch;
	if ( ! siteLaunchOptions ) return;

	// Don't proceed if this function has already run
	if ( handled ) {
		return;
	}
	handled = true;

	const awaitSettingsBar = setInterval( () => {
		const settingsBar = document.querySelector( '.edit-post-header__settings' );
		if ( ! settingsBar ) {
			return;
		}
		clearInterval( awaitSettingsBar );

		const body = document.querySelector( 'body' );
		if ( ! body ) {
			return;
		}

		const { launchUrl, launchFlow, isGutenboarding, anchorFmPodcastId } = siteLaunchOptions;

		// Wrap 'Launch' button link to control launch flow.
		const launchButton = document.createElement( 'button' );
		launchButton.className = 'editor-gutenberg-launch__launch-button components-button is-primary';
		launchButton.addEventListener( 'click', ( e: Event ) => {
			// Prevent default behaviour
			e.preventDefault();

			recordTracksEvent( 'calypso_newsite_editor_launch_click', {
				is_new_site: !! isGutenboarding,
				launch_flow: launchFlow,
				is_in_iframe: inIframe(),
			} );

			// Enable anchor-flavoured gutenboarding features (the launch button works immediately).
			const isAnchorFm = !! anchorFmPodcastId;
			if ( isAnchorFm ) {
				dispatch( 'automattic/launch' ).enableAnchorFm();
			}

			const { savePost } = dispatch( 'core/editor' );
			const delayedSavePost = () => setTimeout( () => savePost(), 1000 );

			switch ( launchFlow ) {
				case GUTENBOARDING_LAUNCH_FLOW:
					// Save post in the background while step-by-step flow opens
					dispatch( 'automattic/launch' ).openSidebar();
					delayedSavePost();
					break;
				case FOCUSED_LAUNCH_FLOW:
					// Save post in the background while focused launch flow opens
					dispatch( 'automattic/launch' ).openFocusedLaunch();
					delayedSavePost();
					break;
				case SITE_LAUNCH_FLOW:
					// Save post first before redirecting to launch url
					( async () => {
						await savePost();
						window.top.location.href = launchUrl;
					} )();
					break;
			}
		} );

		/*
		 * translators: "Launch" here refers to launching a whole site.
		 * Please translate differently from "Publish", which intstead
		 * refers to publishing a page.
		 */
		const textContent = document.createTextNode( __( 'Launch', 'full-site-editing' ) );
		launchButton.appendChild( textContent );

		body.classList.add( 'editor-gutenberg-launch__fse-overrides' );

		// 'Update'/'Publish' primary button to become 'Save' tertiary button.
		const saveButton = settingsBar.querySelector( '.editor-post-publish-button__button' );
		// This line causes a reconciliation error in React and a page bork
		// leaving it in there until we can decide on the UX for this component
		// saveButton && ( saveButton.innerText = __( 'Save' ) );

		// Put 'Launch' and 'Save' back on bar in desired order.
		settingsBar.prepend( launchButton );
		saveButton && settingsBar.prepend( saveButton );
	} );
} );
