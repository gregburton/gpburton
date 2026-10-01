import * as v from "valibot";

export const ContactFormSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.nonEmpty("Please enter your name.")),
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email is not formatted correctly."),
  ),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Please type a message."),
    v.maxLength(200, "The message must be at most 200 characters."),
  ),
});

export type ContactFormProps = v.InferInput<typeof ContactFormSchema>;
