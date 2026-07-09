import * as React from "react";

export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}

/** −/value/+ quantity control for carts. */
export function QuantityStepper(props: QuantityStepperProps): JSX.Element;
