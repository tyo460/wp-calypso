/**
 * External dependencies
 */
import { useTranslate } from 'i18n-calypso';
import React from 'react';

/**
 * Internal dependencies
 */
import JetpackComMasterbar from '../jpcom-masterbar';
import FormattedHeader from 'calypso/components/formatted-header';
import { preventWidows } from 'calypso/lib/formatting';

// Fresh Start 2021 promotion; runs from Feb 1 00:00 to Feb 14 23:59 UTC automatically.
// Safe to remove on or after Feb 15.
import FreshStart2021SaleBanner from 'calypso/components/jetpack/fresh-start-2021-sale-banner';

/**
 * Style dependencies
 */
import './style.scss';

const Header: React.FC< Props > = ( { urlQueryArgs } ) => {
	const translate = useTranslate();

	return (
		<>
			<JetpackComMasterbar />

			<FreshStart2021SaleBanner urlQueryArgs={ urlQueryArgs } />

			<div className="header">
				<FormattedHeader
					className="header__main-title"
					headerText={ preventWidows(
						translate( 'Security, performance, and marketing tools made for WordPress' )
					) }
					align="center"
				/>
			</div>
		</>
	);
};

type Props = {
	urlQueryArgs: { [ key: string ]: string };
};

export default Header;
