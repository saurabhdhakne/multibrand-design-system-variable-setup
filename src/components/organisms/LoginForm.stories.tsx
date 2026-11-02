import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { LoginForm } from './LoginForm';

const meta = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  args: { onSubmit: fn() },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ServerError: Story = { args: { error: 'Incorrect email or password' } };
export const Loading: Story = { args: { loading: true } };

/** Submitting empty shows validation errors and does not call onSubmit. */
export const Validation: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
    await expect(canvas.getByText('Enter a valid email address')).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const SuccessfulSubmit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Email/), 'jane@company.com');
    await userEvent.type(canvas.getByLabelText(/Password/), 'correct-horse');
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'jane@company.com',
      password: 'correct-horse',
      remember: false,
    });
  },
};
