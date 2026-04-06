import { SIGNUP_PASSWORD_RULES } from '@/lib/signupPasswordPolicy';

type Props = {
  /** Tailwind / arbitrary classes for text color */
  className?: string;
};

/**
 * Visible password rules so users don’t only see a generic “invalid password” from the API.
 */
export default function SignupPasswordHint({ className }: Props) {
  return (
    <div className={className ?? 'text-xs text-[rgb(var(--signup-modal-helper-text))]'}>
      <p className="mb-1.5 font-medium opacity-95">Password must include:</p>
      <ul className="list-disc space-y-0.5 pl-4 leading-relaxed">
        {SIGNUP_PASSWORD_RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </div>
  );
}
