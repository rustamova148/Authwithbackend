import type { ReactNode } from "react";

export type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
}

export type ImageSwiperProps = {
  images: string[];
};

export type InputSimpleProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    name?: string;
}

export type InputWithIconProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    name?: string;
}