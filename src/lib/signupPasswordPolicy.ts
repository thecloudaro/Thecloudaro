/**
 * Shown on signup UI and used for client-side checks so users see rules before submit.
 * Align with typical Upmind / hosting panel complexity rules.
 */

export const SIGNUP_PASSWORD_RULES = [
  'At least 8 characters',
  'At least one uppercase letter (A–Z)',
  'At least one lowercase letter (a–z)',
  'At least one number (0–9)',
  'At least one symbol (e.g. ! @ # $ % & * _ -)',
] as const;

export function getSignupPasswordRequirementsText(): string {
  return ['Please use a password that includes:', ...SIGNUP_PASSWORD_RULES.map((r) => `• ${r}`)].join(
    '\n'
  );
}

/**
 * Use in the red error banner only — full rules stay in the gray “Password must include” list.
 * Avoids duplicating bullets when email/other field errors are shown together.
 */
export const SIGNUP_PASSWORD_RED_HINT =
  'Adjust your password to match the requirements shown below.';

/** First failing rule as a short message (for inline validation). */
export function getSignupPasswordValidationError(password: string): string | null {
  const p = password;
  if (p.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(p)) return 'Add at least one uppercase letter (A–Z).';
  if (!/[a-z]/.test(p)) return 'Add at least one lowercase letter (a–z).';
  if (!/[0-9]/.test(p)) return 'Add at least one number (0–9).';
  if (!/[^A-Za-z0-9]/.test(p)) {
    return 'Add at least one symbol (e.g. ! @ #).';
  }
  return null;
}
