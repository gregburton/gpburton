import { ContactFormProps } from "@/types/schemas";

export function ContactEmailTemplate({
  name,
  email,
  message,
}: ContactFormProps) {
  return (
    <div>
      <p>{`${name} <${email}>`}</p>
      <br />
      <p>{message}</p>
    </div>
  );
}
