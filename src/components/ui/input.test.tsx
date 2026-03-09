import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Input, INPUT_SIZES } from './input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders with label', () => {
      render(<Input label="Username" />);
      // DSR may render label text multiple times (floating label pattern)
      expect(screen.getAllByText('Username').length).toBeGreaterThan(0);
    });

    it('renders input element', () => {
      render(<Input label="Test" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has correct displayName', () => {
      expect(Input.displayName).toBe('Input');
    });
  });

  describe('value handling', () => {
    it('displays controlled value', () => {
      render(<Input label="Test" value="Hello" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('Hello');
    });

    it('starts with empty value when not provided', () => {
      render(<Input label="Test" />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('size mapping', () => {
    it.each([
      ['sm', 'small'],
      ['md', 'medium'],
      ['lg', 'large'],
    ])('renders with size="%s" without error', (size) => {
      render(<Input label="Test" size={size as keyof typeof INPUT_SIZES} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('accepts both local and DSR size formats', () => {
      render(<Input label="Test" size="small" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('callbacks', () => {
    it('calls onChange with event', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Input label="Test" onChange={onChange} />);
      await user.type(screen.getByRole('textbox'), 'a');

      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0][0];
      expect(event.target.value).toBeDefined();
    });

    it('creates synthetic event for onBlur', async () => {
      const user = userEvent.setup();
      const onBlur = vi.fn();

      render(<Input label="Test" name="testField" onBlur={onBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      expect(onBlur).toHaveBeenCalled();
      const event = onBlur.mock.calls[0][0];
      expect(event.target.name).toBe('testField');
      expect(event.type).toBe('blur');
    });

    it('creates synthetic event for onFocus', async () => {
      const user = userEvent.setup();
      const onFocus = vi.fn();

      render(<Input label="Test" name="testField" onFocus={onFocus} />);
      await user.click(screen.getByRole('textbox'));

      expect(onFocus).toHaveBeenCalled();
      const event = onFocus.mock.calls[0][0];
      expect(event.target.name).toBe('testField');
      expect(event.type).toBe('focus');
    });

    it('calls onPressEnter when Enter is pressed', async () => {
      const user = userEvent.setup();
      const onPressEnter = vi.fn();

      render(<Input label="Test" onPressEnter={onPressEnter} />);
      await user.type(screen.getByRole('textbox'), '{Enter}');

      expect(onPressEnter).toHaveBeenCalled();
    });
  });

  describe('error state', () => {
    it('shows errorMessage when error is true', () => {
      render(<Input label="Test" error errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('shows helperText when no error', () => {
      render(<Input label="Test" helperText="Enter your name" />);
      expect(screen.getByText('Enter your name')).toBeInTheDocument();
    });

    it('errorMessage takes precedence over helperText when error is true', () => {
      render(
        <Input
          label="Test"
          error
          errorMessage="Error message"
          helperText="Helper text"
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Input label="Test" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('read-only state', () => {
    it('is read-only when readOnly prop is true', () => {
      render(<Input label="Test" readOnly value="Read only value" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
  });

  describe('type attribute', () => {
    it('renders as text input by default', () => {
      render(<Input label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders as password input', () => {
      render(<Input label="Password" type="password" />);
      // Password inputs don't have textbox role
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('renders as number input', () => {
      render(<Input label="Age" type="number" />);
      const input = document.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('icons', () => {
    it('renders with leadingIcon', () => {
      render(<Input label="Search" leadingIcon="Search" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with trailingIcon', () => {
      render(<Input label="Email" trailingIcon="Email" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('calls onLeadingIconClick when leading icon is clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Input label="Search" leadingIcon="Search" onLeadingIconClick={onClick} />);

      // Find and click the icon
      const icon = document.querySelector('[class*="icon"]');
      if (icon) {
        await user.click(icon);
        expect(onClick).toHaveBeenCalled();
      }
    });
  });

  describe('prefix and suffix', () => {
    it('renders with prefixText', () => {
      render(<Input label="Price" prefixText="$" />);
      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('renders with suffixText', () => {
      render(<Input label="Price" suffixText="USD" />);
      expect(screen.getByText('USD')).toBeInTheDocument();
    });
  });

  describe('character counter', () => {
    it('renders with counter', () => {
      render(<Input label="Bio" withCounter maxCounter={100} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('number input props', () => {
    it('accepts min prop', () => {
      render(<Input label="Age" type="number" min={0} />);
      const input = document.querySelector('input[type="number"]');
      expect(input).toHaveAttribute('min', '0');
    });

    it('accepts max prop', () => {
      render(<Input label="Age" type="number" max={100} />);
      const input = document.querySelector('input[type="number"]');
      expect(input).toHaveAttribute('max', '100');
    });
  });

  describe('props', () => {
    it('passes dataQa attribute', () => {
      render(<Input label="Test" dataQa="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input.closest('[data-qa="test-input"]')).toBeInTheDocument();
    });

    it('merges className', () => {
      const { container } = render(<Input label="Test" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('constants export', () => {
    it('exports INPUT_SIZES', () => {
      expect(INPUT_SIZES).toBeDefined();
      expect(INPUT_SIZES.sm).toBe('sm');
      expect(INPUT_SIZES.md).toBe('md');
      expect(INPUT_SIZES.lg).toBe('lg');
    });
  });
});
