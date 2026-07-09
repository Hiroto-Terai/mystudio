// Hirot Design System — component library barrel.
// Screens import primitives from here rather than reimplementing them.

// core
export { Logo } from "./core/Logo.tsx";
export type { LogoProps, LogoVariant, LogoTone } from "./core/Logo.tsx";
export { Card } from "./core/Card.tsx";
export type { CardProps, CardVariant, CardElevation, CardRadius } from "./core/Card.tsx";
export { Avatar } from "./core/Avatar.tsx";
export type { AvatarProps } from "./core/Avatar.tsx";
export { Divider } from "./core/Divider.tsx";
export type { DividerProps } from "./core/Divider.tsx";

// buttons
export { Button } from "./buttons/Button.tsx";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./buttons/Button.tsx";
export { IconButton } from "./buttons/IconButton.tsx";
export type { IconButtonProps, IconButtonVariant } from "./buttons/IconButton.tsx";

// forms
export { Input } from "./forms/Input.tsx";
export { Select } from "./forms/Select.tsx";
export { Checkbox } from "./forms/Checkbox.tsx";
export { Radio } from "./forms/Radio.tsx";
export { Switch } from "./forms/Switch.tsx";

// feedback
export { Badge } from "./feedback/Badge.tsx";
export { Tag } from "./feedback/Tag.tsx";
export { Toast } from "./feedback/Toast.tsx";
export { Tooltip } from "./feedback/Tooltip.tsx";
export { Dialog } from "./feedback/Dialog.tsx";

// navigation
export { NavBar } from "./navigation/NavBar.tsx";
export { Footer } from "./navigation/Footer.tsx";
export { Breadcrumb } from "./navigation/Breadcrumb.tsx";
export { Tabs } from "./navigation/Tabs.tsx";

// commerce
export { ProductCard } from "./commerce/ProductCard.tsx";
export { Price } from "./commerce/Price.tsx";
export { Rating } from "./commerce/Rating.tsx";
export { QuantityStepper } from "./commerce/QuantityStepper.tsx";
