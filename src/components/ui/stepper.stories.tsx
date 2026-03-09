import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { Stepper } from "./stepper";
import type { StepperStep } from "./stepper";
import { Button } from "./button";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Alert } from "./alert";

const meta: Meta<typeof Stepper> = {
  title: "DSR Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    activeStep: {
      control: { type: "number", min: 0, max: 4 },
      description: "Current active step (0-indexed)",
    },
    direction: {
      control: "select",
      options: ["row", "column"],
      description: "Layout direction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps = [
  { title: "Account" },
  { title: "Profile" },
  { title: "Review" },
];

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Stepper steps={basicSteps} activeStep={1} />
    </div>
  ),
};

export const AllStates: Story = {
  name: "All Step States",
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 1 active (start)</p>
        <Stepper steps={basicSteps} activeStep={0} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 2 active (middle)</p>
        <Stepper steps={basicSteps} activeStep={1} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 3 active (end)</p>
        <Stepper steps={basicSteps} activeStep={2} />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">All completed</p>
        <Stepper steps={basicSteps} activeStep={3} />
      </div>
    </div>
  ),
};

export const WithDescriptions: Story = {
  name: "With Descriptions",
  render: () => {
    const stepsWithDesc = [
      { title: "Personal Info", description: "Enter your basic details" },
      { title: "Address", description: "Where should we ship?" },
      { title: "Payment", description: "Choose payment method" },
      { title: "Confirm", description: "Review your order" },
    ];

    return (
      <div className="w-[700px]">
        <Stepper steps={stepsWithDesc} activeStep={1} />
      </div>
    );
  },
};

export const VerticalLayout: Story = {
  name: "Vertical Layout",
  render: () => {
    const steps = [
      { title: "Create account", description: "Set up your credentials" },
      { title: "Complete profile", description: "Add your information" },
      { title: "Verify email", description: "Confirm your address" },
      { title: "Get started", description: "Start using the app" },
    ];

    return (
      <div className="w-[300px]">
        <Stepper steps={steps} activeStep={1} direction="column" />
      </div>
    );
  },
};

export const WithErrorState: Story = {
  name: "With Error State",
  render: () => {
    const stepsWithError = [
      { title: "Details", state: "completed" as const },
      { title: "Validation", state: "error" as const },
      { title: "Submit" },
    ];

    return (
      <div className="w-[500px]">
        <Stepper steps={stepsWithError} />
      </div>
    );
  },
};

export const Interactive: Story = {
  name: "Interactive Stepper",
  render: function Render() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
      { title: "Step 1" },
      { title: "Step 2" },
      { title: "Step 3" },
      { title: "Step 4" },
    ];

    const handleNext = () => {
      setActiveStep((prev) => Math.min(prev + 1, steps.length));
    };

    const handleBack = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <div className="w-[500px] space-y-6">
        <Stepper steps={steps} activeStep={activeStep} />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          {activeStep < steps.length ? (
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          ) : (
            <Button onClick={handleReset}>Reset</Button>
          )}
        </div>

        <p className="text-sm text-gray-500 text-center">
          {activeStep < steps.length
            ? `Current step: ${activeStep + 1} of ${steps.length}`
            : "All steps completed!"}
        </p>
      </div>
    );
  },
};

export const ClickableSteps: Story = {
  name: "Clickable Steps",
  render: function Render() {
    const [activeStep, setActiveStep] = useState(1);
    const steps = [
      { title: "Account" },
      { title: "Details" },
      { title: "Payment" },
      { title: "Confirm" },
    ];

    return (
      <div className="w-[600px] space-y-4">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          onStepClick={(step) => {
            if (step.order !== undefined) {
              setActiveStep(step.order - 1);
            }
          }}
        />
        <p className="text-sm text-gray-500 text-center">
          Click on any step to navigate. Current: Step {activeStep + 1}
        </p>
      </div>
    );
  },
};

export const CheckoutExample: Story = {
  name: "Checkout Flow Example",
  render: function Render() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
      { title: "Cart", description: "Review items" },
      { title: "Shipping", description: "Delivery address" },
      { title: "Payment", description: "Payment method" },
      { title: "Confirm", description: "Place order" },
    ];

    const stepContent = [
      <div key="cart" className="p-4 border rounded">
        <h3 className="font-medium mb-2">Shopping Cart</h3>
        <p className="text-sm text-gray-600">3 items in your cart</p>
        <p className="text-lg font-bold mt-2">Total: $149.99</p>
      </div>,
      <div key="shipping" className="p-4 border rounded">
        <h3 className="font-medium mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-600">123 Main Street</p>
        <p className="text-sm text-gray-600">New York, NY 10001</p>
      </div>,
      <div key="payment" className="p-4 border rounded">
        <h3 className="font-medium mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">Visa ending in 4242</p>
      </div>,
      <div key="confirm" className="p-4 border rounded bg-green-50">
        <h3 className="font-medium mb-2 text-green-700">Order Summary</h3>
        <p className="text-sm text-gray-600">Ready to place your order</p>
      </div>,
    ];

    return (
      <div className="w-[600px] space-y-6">
        <Stepper steps={steps} activeStep={activeStep} />

        <div className="min-h-[120px]">{stepContent[activeStep]}</div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setActiveStep((s) => s - 1)}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => setActiveStep((s) => Math.min(s + 1, steps.length - 1))}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 2 ? "Place Order" : "Continue"}
          </Button>
        </div>
      </div>
    );
  },
};

export const FormWizard: Story = {
  name: "Form Wizard Example",
  render: function Render() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      plan: "basic",
    });

    const steps = [
      { title: "Account" },
      { title: "Plan" },
      { title: "Done" },
    ];

    return (
      <div className="w-[500px] space-y-6">
        <Stepper steps={steps} activeStep={activeStep} />

        <div className="p-4 border rounded min-h-[150px]">
          {activeStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-3">
              <p className="font-medium">Select a plan:</p>
              {["basic", "pro", "enterprise"].map((plan) => (
                <label key={plan} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="plan"
                    value={plan}
                    checked={formData.plan === plan}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                  />
                  <span className="capitalize">{plan}</span>
                </label>
              ))}
            </div>
          )}

          {activeStep === 2 && (
            <div className="text-center py-4">
              <p className="text-green-600 font-medium text-lg mb-2">
                All done!
              </p>
              <p className="text-sm text-gray-600">
                Welcome, {formData.name || "User"}!
              </p>
              <p className="text-sm text-gray-600">
                Plan: <span className="capitalize">{formData.plan}</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setActiveStep((s) => s - 1)}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => setActiveStep((s) => Math.min(s + 1, steps.length - 1))}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 2 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    );
  },
};

export const FullInteractive: Story = {
  name: "Full Interactive Demo",
  render: function Render() {
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [completed, setCompleted] = useState<Record<number, boolean>>({});
    const [errors, setErrors] = useState<Record<number, string | null>>({});
    const [skipped, setSkipped] = useState<Set<number>>(new Set());
    const [showSuccess, setShowSuccess] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
      // Step 0: Personal
      firstName: "",
      lastName: "",
      email: "",
      // Step 1: Preferences
      notifications: true,
      newsletter: false,
      theme: "light",
      // Step 2: Security
      password: "",
      confirmPassword: "",
      twoFactor: false,
      // Step 3: Review - no data, just confirmation
      termsAccepted: false,
    });

    const stepDefinitions = [
      { title: "Personal", description: "Your basic information" },
      { title: "Preferences", description: "Customize your experience", optional: true },
      { title: "Security", description: "Protect your account" },
      { title: "Review", description: "Confirm and submit" },
    ];

    // Build steps with dynamic states
    // Priority: active > error > completed > default
    const steps: StepperStep[] = stepDefinitions.map((step, index) => {
      if (index === activeStep) {
        return { ...step, state: "active" as const };
      }
      if (errors[index]) {
        return { ...step, state: "error" as const };
      }
      if (completed[index]) {
        return { ...step, state: "completed" as const };
      }
      return step;
    });

    const isStepOptional = (step: number) => stepDefinitions[step]?.optional;
    const isStepSkipped = (step: number) => skipped.has(step);

    const validateStep = useCallback((step: number): string | null => {
      switch (step) {
        case 0:
          if (!formData.firstName.trim()) return "First name is required";
          if (!formData.lastName.trim()) return "Last name is required";
          if (!formData.email.trim()) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return "Please enter a valid email";
          }
          return null;
        case 1:
          // Optional step, always valid
          return null;
        case 2:
          if (!formData.password) return "Password is required";
          if (formData.password.length < 8) return "Password must be at least 8 characters";
          if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match";
          }
          return null;
        case 3:
          if (!formData.termsAccepted) return "You must accept the terms";
          return null;
        default:
          return null;
      }
    }, [formData]);

    const handleNext = async () => {
      const error = validateStep(activeStep);
      if (error) {
        setErrors((prev) => ({ ...prev, [activeStep]: error }));
        return;
      }

      // Simulate async validation
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);

      // Clear error and mark completed
      setErrors((prev) => ({ ...prev, [activeStep]: null }));
      setCompleted((prev) => ({ ...prev, [activeStep]: true }));

      if (activeStep === steps.length - 1) {
        // Final step - submit
        setShowSuccess(true);
      } else {
        // Move to next non-skipped step
        let nextStep = activeStep + 1;
        while (isStepSkipped(nextStep) && nextStep < steps.length - 1) {
          nextStep++;
        }
        setActiveStep(nextStep);
      }
    };

    const handleBack = () => {
      let prevStep = activeStep - 1;
      while (isStepSkipped(prevStep) && prevStep > 0) {
        prevStep--;
      }
      setActiveStep(prevStep);
    };

    const handleSkip = () => {
      if (!isStepOptional(activeStep)) return;
      setSkipped((prev) => new Set(prev).add(activeStep));
      setActiveStep((prev) => prev + 1);
    };

    const handleStepClick = (step: { order?: number; state?: string }) => {
      if (step.order === undefined || step.order < 1) return;
      const targetStep = step.order - 1; // Convert 1-based to 0-based index
      // Only allow clicking if it's a valid step and either completed or previous
      if (targetStep >= 0 && targetStep < steps.length) {
        if (targetStep <= activeStep || completed[targetStep]) {
          setActiveStep(targetStep);
        }
      }
    };

    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
      setErrors({});
      setSkipped(new Set());
      setShowSuccess(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        notifications: true,
        newsletter: false,
        theme: "light",
        password: "",
        confirmPassword: "",
        twoFactor: false,
        termsAccepted: false,
      });
    };

    const clearError = () => {
      setErrors((prev) => ({ ...prev, [activeStep]: null }));
    };

    if (showSuccess) {
      return (
        <div className="w-[650px] p-6 text-center space-y-4">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600">Registration Complete!</h2>
          <p className="text-gray-600">
            Welcome, {formData.firstName} {formData.lastName}!
          </p>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to {formData.email}
          </p>
          <div className="pt-4">
            <Button onClick={handleReset}>Start Over</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-[650px] space-y-6">
        {/* Stepper */}
        <Stepper
          steps={steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((Object.keys(completed).length) / steps.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center">
          {Object.keys(completed).length} of {steps.length} steps completed
        </p>

        {/* Error alert */}
        {errors[activeStep] && (
          <Alert variant="destructive" onClose={clearError}>
            {errors[activeStep]}
          </Alert>
        )}

        {/* Step content */}
        <div className="p-6 border rounded-lg min-h-[280px] bg-white">
          {activeStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    clearError();
                  }}
                  placeholder="John"
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                    clearError();
                  }}
                  placeholder="Doe"
                  required
                />
              </div>
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  clearError();
                }}
                placeholder="john@example.com"
                required
              />
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferences</h3>
              <p className="text-sm text-gray-500">
                This step is optional. You can skip it.
              </p>
              <div className="space-y-3 pt-2">
                <Checkbox
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifications: checked })
                  }
                >
                  Enable push notifications
                </Checkbox>
                <Checkbox
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, newsletter: checked })
                  }
                >
                  Subscribe to newsletter
                </Checkbox>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium mb-2">Theme</label>
                <div className="flex gap-4">
                  {["light", "dark", "system"].map((theme) => (
                    <label key={theme} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={formData.theme === theme}
                        onChange={(e) =>
                          setFormData({ ...formData, theme: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      <span className="capitalize">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security Settings</h3>
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  clearError();
                }}
                placeholder="At least 8 characters"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  clearError();
                }}
                placeholder="Repeat your password"
                required
              />
              <div className="pt-2">
                <Checkbox
                  checked={formData.twoFactor}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, twoFactor: checked })
                  }
                >
                  Enable two-factor authentication (recommended)
                </Checkbox>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Notifications:</span>
                  <span>{formData.notifications ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Newsletter:</span>
                  <span>{formData.newsletter ? "Subscribed" : "Not subscribed"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Theme:</span>
                  <span className="capitalize">{formData.theme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Two-Factor Auth:</span>
                  <span>{formData.twoFactor ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
              <div className="pt-2">
                <Checkbox
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => {
                    setFormData({ ...formData, termsAccepted: checked });
                    clearError();
                  }}
                >
                  I accept the terms and conditions
                </Checkbox>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0 || isLoading}
          >
            Back
          </Button>

          <div className="flex gap-2">
            {isStepOptional(activeStep) && !completed[activeStep] && (
              <Button variant="ghost" onClick={handleSkip} disabled={isLoading}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading
                ? "Validating..."
                : activeStep === steps.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          </div>
        </div>

        {/* Status info */}
        <div className="text-xs text-gray-400 text-center space-y-1">
          <p>
            Step {activeStep + 1} of {steps.length}
            {isStepOptional(activeStep) && " (Optional)"}
            {isStepSkipped(activeStep) && " (Skipped)"}
          </p>
          <p>Click on completed steps to edit them</p>
        </div>
      </div>
    );
  },
};
