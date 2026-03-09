import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as a button element', () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has correct displayName', () => {
      expect(Button.displayName).toBe('Button');
    });
  });

  describe('variants', () => {
    it.each(Object.keys(BUTTON_VARIANTS))(
      'renders with variant="%s" without error',
      (variant) => {
        render(
          <Button variant={variant as keyof typeof BUTTON_VARIANTS}>
            Test
          </Button>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );

    it('applies default variant when not specified', () => {
      render(<Button>Default</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it.each(Object.keys(BUTTON_SIZES).filter(s => s !== 'icon'))(
      'renders with size="%s" without error',
      (size) => {
        render(
          <Button size={size as keyof typeof BUTTON_SIZES}>
            Test
          </Button>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );
  });

  describe('interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<Button onClick={onClick} disabled>Click me</Button>);
      await user.click(screen.getByRole('button'));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('loading state', () => {
    it('renders with isLoading prop', () => {
      render(<Button isLoading>Loading...</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('passes dataQa attribute', () => {
      render(<Button dataQa="test-button">Test</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-qa', 'test-button');
    });

    it('passes type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('applies fullWidth class', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('merges className', () => {
      const { container } = render(<Button className="custom-class">Test</Button>);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('icons', () => {
    it('renders with startIcon', () => {
      render(<Button startIcon="Add">Add Item</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with endIcon', () => {
      render(<Button endIcon="ArrowForward">Next</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with leadingIcon as React element', () => {
      render(<Button leadingIcon={<span data-testid="custom-icon">*</span>}>Test</Button>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders with trailingIcon as React element', () => {
      render(<Button trailingIcon={<span data-testid="custom-icon">*</span>}>Test</Button>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Test</Button>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('development warnings', () => {
    beforeEach(() => {
      vi.stubEnv('NODE_ENV', 'development');
    });

    it('warns when complex children are passed', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <Button>
          <span>Complex</span>
        </Button>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Button] Complex children')
      );

      consoleSpy.mockRestore();
    });

    it('does not warn for string children', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<Button>Simple text</Button>);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('constants export', () => {
    it('exports BUTTON_VARIANTS', () => {
      expect(BUTTON_VARIANTS).toBeDefined();
      expect(BUTTON_VARIANTS.default).toBe('default');
      expect(BUTTON_VARIANTS.destructive).toBe('destructive');
    });

    it('exports BUTTON_SIZES', () => {
      expect(BUTTON_SIZES).toBeDefined();
      expect(BUTTON_SIZES.sm).toBe('sm');
      expect(BUTTON_SIZES.lg).toBe('lg');
    });
  });
});
