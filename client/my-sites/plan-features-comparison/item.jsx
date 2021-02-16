/**
 * External dependencies
 */
import React from 'react';
import Gridicon from 'calypso/components/gridicon';
import classNames from 'classnames';

export function PlanFeaturesAvailableItem( { children } ) {
	return (
		<div className="plan-features-comparison__item">
			<Gridicon className="plan-features-comparison__item-checkmark" size={ 18 } icon="checkmark" />
			{ children }
		</div>
	);
}

export function PlanFeaturesMissingItem( props ) {
	const itemInfoClasses = classNames( 'plan-features-comparison__item-info-container', {
		'plan-features-comparison__item-info-annual-only': props.annualOnlyContent,
	} );
	return (
		<div className="plan-features-comparison__item plan-features-comparison__item-unavailable">
			{ props.annualOnlyContent && (
				<div className="plan-features-comparison__item-annual-plan-container">
					{ props.annualOnlyContent }
				</div>
			) }
			<div className={ itemInfoClasses }>
				<Gridicon className="plan-features-comparison__item-cross" size={ 18 } icon="cross" />
				{ props.children }
			</div>
		</div>
	);
}
