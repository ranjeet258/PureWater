export type ContactInput = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(raw: unknown): {
  data?: ContactInput;
  errors: FieldErrors;
} {
  const obj = (raw ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const data: ContactInput = {
    name: str(obj.name),
    email: str(obj.email),
    organization: str(obj.organization),
    message: str(obj.message),
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2 || data.name.length > 100)
    errors.name = "Please enter your name (2–100 characters).";
  if (!EMAIL_RE.test(data.email) || data.email.length > 200)
    errors.email = "Please enter a valid email address.";
  if (data.organization.length > 150)
    errors.organization = "Organization must be under 150 characters.";
  if (data.message.length < 10 || data.message.length > 3000)
    errors.message = "Message should be 10–3000 characters.";

  return Object.keys(errors).length ? { errors } : { data, errors };
}
