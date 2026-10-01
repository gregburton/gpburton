import { Resend } from "resend";
import * as v from "valibot";
import { ContactEmailTemplate } from "@/components/contact-email-template";
import { ContactFormProps, ContactFormSchema } from "@/types/schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const form_values: ContactFormProps = await request.json();
    const validated_values = v.parse(ContactFormSchema, form_values);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["grepburton@gmail.com"],
      subject: "Hello world",
      react: ContactEmailTemplate({ ...validated_values }),
    });

    if (error) {
      return Response.json({ error }, { status: error.statusCode || 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
