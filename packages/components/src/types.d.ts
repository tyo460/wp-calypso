declare module 'gridicons';

declare module '*.svg' {
	const url: string;
	export default url;
}

declare module '@wordpress/components' {
	export function VisuallyHidden( props: {
		children: React.ReactNode;
		as?: React.ElementType;
		className?: string;
	} ): JSX.Element;

	export namespace Slot {
		export interface Props {
			children: React.ReactNode;
			name?: string;
			bubblesVirtually?: boolean;
		}
	}

	export function Slot( props: Slot.Props ): JSX.Element;
}
