import React from 'react';
import { cn } from '@/core/utils/cn';
import type { ButtonProps } from './types';
import { buttonVariants } from './variants';

/**
 * @component Button
 * @summary A versatile button component with variants for different use cases.
 * @domain core
 * @type ui-component
 * @category form
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button'; // Simplified for this example, consider using Slot from radix-ui
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button };
