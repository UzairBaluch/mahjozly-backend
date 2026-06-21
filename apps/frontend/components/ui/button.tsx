import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary = black button (secondary CTA, "Get started" in nav etc.)
        primary:
          'bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-clay-hover)]',
        // Accent = blue button (the main "Start free" hero CTA)
        accent:
          'bg-[color:var(--color-thread)] text-white hover:bg-[color:var(--color-thread-hover)]',
        outline:
          'border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]',
        ghost:
          'text-[color:var(--color-ink)] hover:bg-[color:var(--color-mist-soft)]',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';
