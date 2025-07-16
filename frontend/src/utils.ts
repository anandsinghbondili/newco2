// src/lib/validations.ts
import type { ApiError } from "./client";
import { showErrorToast } from "@/components/ext/window/Toaster";

// Email validation pattern
export const emailPattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
};

// Name validation pattern (supports international characters)
export const namePattern = {
    value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
    message: "Invalid name",
};

// Password validation rules
export const passwordRules = (isRequired = true): PasswordRules => {
    const rules: PasswordRules = {
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
        },
    };

    if (isRequired) {
        rules.required = "Password is required";
    }

    return rules;
};

// Confirm password validation rules
interface Values {
    password?: string;
    new_password?: string;
}
export const confirmPasswordRules = (
    getValues: () => Values,
    isRequired = true
): ConfirmPasswordRules => {
    const rules: ConfirmPasswordRules = {
        validate: (value: string) => {
            const password = getValues().password || getValues().new_password;
            return value === password || "The passwords do not match";
        },
    };

    if (isRequired) {
        rules.required = "Password confirmation is required";
    }

    return rules;
};

// Error handling utility
interface ApiErrorDetail {
    detail: string | { msg: string }[];
}
export const handleError = (err: ApiError) => {
    const errDetail = (err.body as ApiErrorDetail).detail;

    let errorMessage = "Something went wrong.";

    if (typeof errDetail === "string") {
        errorMessage = errDetail;
    } else if (Array.isArray(errDetail) && errDetail.length > 0) {
        errorMessage = errDetail[0]?.msg || errorMessage;
    }

    showErrorToast(errorMessage);
};

// Type definitions
type PasswordRules = {
    required?: string;
    minLength: {
        value: number;
        message: string;
    };
};

type ConfirmPasswordRules = {
    required?: string;
    validate: (value: string) => true | string;
};