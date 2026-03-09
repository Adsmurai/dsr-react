/**
 * @fileoverview Stepper wrapper component for DSR Stepper
 *
 * @description
 * Wrapper that adapts DSR Stepper for multi-step processes.
 * This wrapper simplifies state management by using a single `activeStep` prop
 * instead of manually setting state on each step.
 *
 * ## Key Concepts
 *
 * ### Indexing
 * - `activeStep` prop is **0-indexed** (0 = first step, 1 = second step, etc.)
 * - `onStepClick` callback receives **1-indexed** `order` (1 = first step, 2 = second step)
 * - To convert: `stepIndex = order - 1`
 *
 * ### State Priority
 * When using `activeStep`, states are automatically assigned:
 * 1. Steps before `activeStep` → `completed`
 * 2. Step at `activeStep` → `active`
 * 3. Steps after `activeStep` → no state (future)
 *
 * You can override this by setting explicit `state` on individual steps.
 *
 * ## State Reference
 * | State | Visual | Description |
 * |-------|--------|-------------|
 * | `active` | Highlighted | Currently active step |
 * | `completed` | Checkmark | Step already finished |
 * | `error` | X icon | Step with validation error |
 * | (none) | Number | Future/inactive step |
 *
 * @ai-note IMPORTANT for click handling:
 * - `onStepClick` receives `order` as **1-indexed** (matches visual display)
 * - To get 0-indexed for state: `const stepIndex = step.order - 1`
 * - Example: clicking "Step 1" returns `order: 1`, use `activeStep: 0`
 *
 * @when_to_use
 * - Creation/editing wizards
 * - Checkout processes
 * - Multi-step forms
 * - Onboarding flows
 *
 * @when_not_to_use
 * - For simple navigation → use Tabs
 * - For indeterminate progress → use Progress
 *
 * @example Basic usage
 * ```tsx
 * const [activeStep, setActiveStep] = useState(0);
 *
 * <Stepper
 *   steps={[
 *     { title: 'Personal data' },
 *     { title: 'Payment' },
 *     { title: 'Confirmation' }
 *   ]}
 *   activeStep={activeStep}
 * />
 *
 * // Navigation
 * <Button onClick={() => setActiveStep(s => s + 1)}>Next</Button>
 * <Button onClick={() => setActiveStep(s => s - 1)}>Back</Button>
 * ```
 *
 * @example With descriptions
 * ```tsx
 * <Stepper
 *   steps={[
 *     { title: 'Account', description: 'Create your account' },
 *     { title: 'Profile', description: 'Complete your profile' },
 *     { title: 'Done', description: 'Ready to start' }
 *   ]}
 *   activeStep={1}
 * />
 * ```
 *
 * @example Vertical layout
 * ```tsx
 * <Stepper
 *   steps={steps}
 *   activeStep={1}
 *   direction="column"
 * />
 * ```
 *
 * @example With explicit states (error handling)
 * ```tsx
 * <Stepper
 *   steps={[
 *     { title: 'Data', state: 'completed' },
 *     { title: 'Validation', state: 'error' },  // Shows error icon
 *     { title: 'Submit' }
 *   ]}
 * />
 * ```
 *
 * @example Clickable steps (interactive navigation)
 * ```tsx
 * const [activeStep, setActiveStep] = useState(0);
 *
 * <Stepper
 *   steps={steps}
 *   activeStep={activeStep}
 *   onStepClick={(step) => {
 *     if (step.order !== undefined) {
 *       // Convert 1-indexed order to 0-indexed activeStep
 *       const targetStep = step.order - 1;
 *       // Only allow going back to previous steps
 *       if (targetStep <= activeStep) {
 *         setActiveStep(targetStep);
 *       }
 *     }
 *   }}
 * />
 * ```
 *
 * @example Full wizard with validation
 * ```tsx
 * const [activeStep, setActiveStep] = useState(0);
 * const [completed, setCompleted] = useState<Record<number, boolean>>({});
 *
 * const handleNext = () => {
 *   if (validateCurrentStep()) {
 *     setCompleted(prev => ({ ...prev, [activeStep]: true }));
 *     setActiveStep(prev => prev + 1);
 *   }
 * };
 *
 * // Build steps with proper state priority: active > completed
 * const steps = stepDefs.map((step, index) => {
 *   if (index === activeStep) return { ...step, state: 'active' };
 *   if (completed[index]) return { ...step, state: 'completed' };
 *   return step;
 * });
 *
 * <Stepper steps={steps} activeStep={activeStep} />
 * ```
 */
import * as React from 'react';
import { Stepper as DSRStepper } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';

/**
 * Valid stepper direction values.
 */
export const STEPPER_DIRECTIONS = {
  row: 'row',
  column: 'column',
} as const;

/**
 * Valid step state values.
 */
export const STEPPER_STATES = {
  active: 'active',
  completed: 'completed',
  error: 'error',
} as const;

/**
 * Configuration for a single step in the Stepper.
 *
 * @example
 * ```tsx
 * const step: StepperStep = {
 *   title: 'Account Setup',
 *   description: 'Create your account credentials',
 *   state: 'completed'  // Optional: override automatic state
 * };
 * ```
 */
export interface StepperStep {
  /**
   * Step title displayed as the main label.
   * Keep it short (1-3 words recommended).
   */
  title: string;

  /**
   * Optional description shown below the title.
   * Use for additional context or instructions.
   */
  description?: string;

  /**
   * Explicit step state - overrides automatic calculation based on activeStep.
   * Use this for custom state management (e.g., showing errors).
   *
   * - `active`: Currently selected step (highlighted)
   * - `completed`: Finished step (shows checkmark)
   * - `error`: Step with validation error (shows X icon)
   * - `undefined`: Future step (shows number)
   */
  state?: 'active' | 'completed' | 'error';
}

/**
 * Props for the Stepper component.
 */
export interface StepperProps {
  /**
   * Array of steps to display.
   * Each step must have at least a `title`.
   */
  steps: StepperStep[];

  /**
   * Current active step index (**0-indexed**).
   * - `0` = first step
   * - `1` = second step
   * - etc.
   *
   * Ignored for steps that have explicit `state` set.
   * @default 0
   */
  activeStep?: number;

  /**
   * Layout direction.
   * - `row`: Horizontal layout (default)
   * - `column`: Vertical layout
   * @default 'row'
   */
  direction?: 'row' | 'column';

  /**
   * Callback fired when a step is clicked.
   *
   * @param step - Object containing:
   *   - `order`: **1-indexed** step number (1 = first step). Use `order - 1` to get 0-indexed.
   *   - `state`: Current state of the clicked step
   *
   * @example
   * ```tsx
   * onStepClick={(step) => {
   *   if (step.order !== undefined) {
   *     const stepIndex = step.order - 1;  // Convert to 0-indexed
   *     setActiveStep(stepIndex);
   *   }
   * }}
   * ```
   */
  onStepClick?: (step: { order?: number; state?: 'completed' | 'error' | 'active' }) => void;

  /** data-qa attribute for testing */
  dataQa?: string;

  /** Additional CSS classes for the container */
  className?: string;
}

// Internal step state type
type StepState = 'active' | 'completed' | 'error' | undefined;

/**
 * Stepper component - wrapper for DSR Stepper
 *
 * Displays progress through a sequence of steps.
 * Automatically maps `activeStep` to DSR's per-step state model.
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep = 0,
  direction = 'row',
  onStepClick,
  dataQa,
  className,
}) => {
  // Development validation
  if (process.env.NODE_ENV === 'development') {
    if (!steps || steps.length === 0) {
      console.warn(
        '[Stepper] Empty steps array provided. ' +
        'Ensure at least one step is defined.'
      );
    }
    if (activeStep < 0 || activeStep >= steps.length) {
      console.warn(
        `[Stepper] activeStep (${activeStep}) is out of bounds. ` +
        `Valid range: 0-${steps.length - 1}`
      );
    }
  }

  // DSR Stepper uses state per step, not global activeStep
  // Map activeStep to individual states (unless steps have explicit state)
  const stepsWithState = steps.map((step, index) => {
    // If the step has explicit state, use it
    if (step.state) {
      return {
        title: step.title,
        description: step.description,
        state: step.state,
      };
    }

    // Calculate state based on activeStep
    let state: StepState = undefined; // inactive/future
    if (index < activeStep) {
      state = 'completed';
    } else if (index === activeStep) {
      state = 'active';
    }

    return {
      title: step.title,
      description: step.description,
      state,
    };
  });

  // DSR Stepper returns order as 0-based index in click handler
  // We convert to 1-based for consistency with visual display (Step 1, Step 2, etc.)
  const handleClick = onStepClick
    ? (clickedStep: { order?: number }) => {
        // DSR returns 0-based index as order, convert to 1-based
        const order = clickedStep.order !== undefined ? clickedStep.order + 1 : undefined;
        onStepClick({ ...clickedStep, order });
      }
    : undefined;

  return (
    <div className={cn(className)}>
      <DSRStepper
        steps={stepsWithState}
        direction={direction}
        handleOnClick={handleClick}
        dataQa={dataQa}
      />
    </div>
  );
};

Stepper.displayName = 'Stepper';

export default Stepper;
