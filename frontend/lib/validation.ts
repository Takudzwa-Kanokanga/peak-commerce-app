// lib/validation.ts
/**
 * Validation utilities for forms
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Zimbabwe format with +263 or local)
 */
export const validatePhone = (phone: string): boolean => {
  // Accept +263 format or local format
  const phoneRegex = /^(\+263|0)[1-9]\d{7,9}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

/**
 * Validate postal code (basic)
 */
export const validatePostalCode = (code: string): boolean => {
  // Accept any alphanumeric postal code with 3-10 chars
  return /^[a-zA-Z0-9\s\-]{3,10}$/.test(code);
};

/**
 * Validate required field
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value: string, length: number): boolean => {
  return value.trim().length >= length;
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const validateCreditCard = (number: string): boolean => {
  const sanitized = number.replace(/\D/g, '');
  
  if (sanitized.length < 13 || sanitized.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate expiry date (MM/YY format)
 */
export const validateExpiryDate = (date: string): boolean => {
  const [month, year] = date.split('/');
  
  if (!month || !year) return false;
  
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (monthNum < 1 || monthNum > 12) return false;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (yearNum < currentYear) return false;
  if (yearNum === currentYear && monthNum < currentMonth) return false;
  
  return true;
};

/**
 * Validate CVV (3 or 4 digits)
 */
export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv.trim());
};

/**
 * Validate checkout form
 */
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export const validateCheckoutForm = (data: CheckoutFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // First Name
  if (!validateRequired(data.firstName)) {
    errors.firstName = 'First name is required';
  } else if (!validateMinLength(data.firstName, 2)) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name
  if (!validateRequired(data.lastName)) {
    errors.lastName = 'Last name is required';
  } else if (!validateMinLength(data.lastName, 2)) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email
  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone
  if (!validateRequired(data.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Address
  if (!validateRequired(data.address)) {
    errors.address = 'Address is required';
  } else if (!validateMinLength(data.address, 5)) {
    errors.address = 'Address must be at least 5 characters';
  }

  // City
  if (!validateRequired(data.city)) {
    errors.city = 'City is required';
  } else if (!validateMinLength(data.city, 2)) {
    errors.city = 'City must be at least 2 characters';
  }

  // Postal Code
  if (!validateRequired(data.postalCode)) {
    errors.postalCode = 'Postal code is required';
  } else if (!validatePostalCode(data.postalCode)) {
    errors.postalCode = 'Please enter a valid postal code';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate payment form
 */
export interface PaymentFormData {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export const validatePaymentForm = (data: PaymentFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Card Holder
  if (!validateRequired(data.cardHolder)) {
    errors.cardHolder = 'Card holder name is required';
  } else if (!validateMinLength(data.cardHolder, 3)) {
    errors.cardHolder = 'Card holder name must be at least 3 characters';
  }

  // Card Number
  if (!validateRequired(data.cardNumber)) {
    errors.cardNumber = 'Card number is required';
  } else if (!validateCreditCard(data.cardNumber)) {
    errors.cardNumber = 'Please enter a valid card number';
  }

  // Expiry Date
  if (!validateRequired(data.expiryDate)) {
    errors.expiryDate = 'Expiry date is required';
  } else if (!validateExpiryDate(data.expiryDate)) {
    errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
  }

  // CVV
  if (!validateRequired(data.cvv)) {
    errors.cvv = 'CVV is required';
  } else if (!validateCVV(data.cvv)) {
    errors.cvv = 'CVV must be 3 or 4 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format card number with spaces (XXXX XXXX XXXX XXXX)
 */
export const formatCardNumber = (value: string): string => {
  const sanitized = value.replace(/\D/g, '');
  const parts: string[] = [];
  
  for (let i = 0; i < sanitized.length; i += 4) {
    parts.push(sanitized.substring(i, i + 4));
  }
  
  return parts.join(' ');
};

/**
 * Format expiry date (MM/YY)
 */
export const formatExpiryDate = (value: string): string => {
  const sanitized = value.replace(/\D/g, '');
  
  if (sanitized.length <= 2) {
    return sanitized;
  }
  
  return `${sanitized.substring(0, 2)}/${sanitized.substring(2, 4)}`;
};

/**
 * Format phone number for Zimbabwe
 */
export const formatPhoneNumber = (value: string): string => {
  let sanitized = value.replace(/\D/g, '');
  
  if (sanitized.startsWith('263')) {
    return `+${sanitized}`;
  }
  
  if (sanitized.startsWith('0')) {
    return `+263${sanitized.substring(1)}`;
  }
  
  if (!sanitized.startsWith('+')) {
    return `+263${sanitized}`;
  }
  
  return `+${sanitized}`;
};
