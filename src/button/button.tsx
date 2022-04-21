import * as React from 'react';
import { FC, PropsWithChildren, DetailedHTMLProps, ButtonHTMLAttributes, useMemo } from 'react';

export type IButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	variant?: 'primary' | 'success' | 'warning' | 'danger'
	size?: 'sm' | 'md' | 'lg'
};

const buildClass = (props: IButton) => {
	const variant = props.variant ?? 'primary';
	const size = props.size ?? 'md';
	const override = props.className ?? ''; // Override with user specified classes
	const disabled = !!props.disabled;
	let baseClass = `inline-flex items-center justify-center font-sans `;

	// Constants
	const bgColors: Record<typeof variant, string> = {
		primary: 'bg-blue-600 dark:bg-blue-100',
		success: 'bg-green-600 dark:bg-green-100',
		warning: 'bg-orange-600 dark:bg-orange-100',
		danger: 'bg-red-600 dark:bg-red-100',
	};

	const bgHoverColors: Record<typeof variant, string> = {
		primary: 'hover:bg-blue-700 dark:hover:bg-blue-200',
		success: 'hover:bg-green-700 dark:hover:bg-green-200',
		warning: 'hover:bg-orange-700 dark:hover:bg-orange-200',
		danger: 'hover:bg-red-700 dark:hover:bg-red-200',
	};

	const textColors: Record<typeof variant, string> = {
		primary: 'text-white dark:text-blue-700',
		success: 'text-white dark:text-green-700',
		warning: 'text-white dark:text-orange-700',
		danger: 'text-white dark:text-red-700',
	};

	const fontSizes: Record<typeof size, string> = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
	};

	const fontWeights: Record<typeof size, string> = {
		sm: 'font-light',
		md: 'font-normal',
		lg: 'font-medium',
	};

	const paddings: Record<typeof size, string> = {
		sm: 'px-1.5 py-0.5',
		md: 'px-2 py-1',
		lg: 'px-2.5 py-1.5',
	};

	const shadowSizes: Record<typeof size, string> = {
		sm: 'shadow-sm',
		md: 'shadow-md',
		lg: 'shadow-lg',
	};

	const shadowColors: Record<typeof variant, string> = {
		primary: 'shadow-blue-500/50',
		success: 'shadow-green-500/50',
		warning: 'shadow-orange-500/50',
		danger: 'shadow-red-500/50',
	};

	const ringColors: Record<typeof variant, string> = {
		primary: 'focus:ring-blue-500',
		success: 'focus:ring-green-500',
		warning: 'focus:ring-orange-500',
		danger: 'focus:ring-red-500',
	};

	// Calculate
	const textColor = textColors[variant];
	const bgColor = bgColors[variant];
	const bgHoverColor = !disabled ? bgHoverColors[variant] : '';
	const fontSize = fontSizes[size];
	const fontWeight = fontWeights[size];
	const padding = paddings[size];
	const shadowSize = shadowSizes[size];
	const shadowColor = shadowColors[variant];
	const border = `border border-transparent border-solid rounded-md`;
	const ring = !disabled ? `focus:outline-none ${ringColors[variant]} focus:ring-2 focus:ring-offset-2 dark:focus:ring-0 dark:focus:ring-offset-0` : '';
	const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
	const opacity = disabled ? 'opacity-75' : 'opacity-100';

	return baseClass.concat(
		`${bgColor} ${bgHoverColor} ${fontSize} ${fontWeight} ${textColor} ${padding} ${shadowSize} ${shadowColor} ${border} ${ring} ${cursor} ${opacity} ${override}`
	);
};

const Button: FC<PropsWithChildren<IButton>> = (props) => {
	const {children, ...rest} = props;

	rest.className = useMemo(() => {
		return buildClass(props);
	}, [props.variant, props.size, props.className, props.disabled]);

	return (
		<button {...rest}>
			{children}
		</button>
	);
};

export default Button;
