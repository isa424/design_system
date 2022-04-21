import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { IButton } from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const ButtonStory = {
	title: 'UI/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		onClick: {
			action: 'clicked',
		},
		children: {
			defaultValue: 'Button',
			description: 'Button content',
			type: {
				name: 'string',
				required: true,
			},
			control: 'text',
		},
		variant: {
			defaultValue: 'primary',
			description: 'Button variant',
			control: {
				type: 'select',
				options: ['primary', 'success', 'warning', 'danger'],
			},
		},
		size: {
			defaultValue: 'md',
			description: 'Button size',
			control: {
				type: 'select',
				options: ['sm', 'md', 'lg'],
			},
		},
	},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
	<div className="flex gap-3">
		<Button {...args} />
		<Button {...args} variant={'success'}/>
		<Button {...args} variant={'warning'}/>
		<Button {...args} variant={'danger'}/>
	</div>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {};

export const Small = Template.bind({});
Small.args = {
	size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
	size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
	disabled: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
	children: <div>+</div>,
	className: 'rounded-full h-8 w-8',
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.parameters = {
	backgrounds: {
		default: 'dark background',
		values: [
			{name: 'dark background', value: '#000'},
		],
	},
};
Dark.decorators = [
	(Story) => (
		<div className={'dark'}>
			{Story()}
		</div>
	),
];

export default ButtonStory;
