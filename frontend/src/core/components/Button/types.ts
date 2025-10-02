import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './variants';
import { ButtonHTMLAttributes, RefObject } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
