"use client";

import { useState } from "react";
import { Form, Field as FormischField, reset, useForm } from "@formisch/react";
import type { SubmitHandler } from "@formisch/react";

import getErrorMessage from "@/lib/error-handlers";
import { ContactFormSchema } from "@/types/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function ContactForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    schema: ContactFormSchema,
    initialInput: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit: SubmitHandler<typeof ContactFormSchema> = async (
    output,
  ) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // const response = await sendContactEmail(output);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(output),
      });
      if (!res.ok) {
        const body = await res.json();
        const error_message = getErrorMessage(body.error);
        setErrorMessage(error_message || "Email could not be sent.");
      } else {
        setSuccessMessage("Email Sent!");
        handleResetForm();
      }
    } catch (error) {
      const error_message = getErrorMessage(error);
      setErrorMessage(error_message || "Email could not be sent.");
    }
  };

  function handleResetForm() {
    setSuccessMessage("");
    setErrorMessage("");
    reset(form);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Contact Me</CardTitle>
        <CardDescription>Reach out to me for further inquiries</CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="contact-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["name"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="name">Your Name</FieldLabel>
                  <Input
                    {...field.props}
                    id="name"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder=""
                    autoComplete="off"
                  />
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
            <FormischField of={form} path={["email"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="email">Your Email</FieldLabel>
                  <Input
                    {...field.props}
                    id="email"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder="your@email.com"
                    autoComplete="on"
                  />
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
            <FormischField of={form} path={["message"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    {...field.props}
                    id="message"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                    placeholder=""
                    autoComplete="off"
                    className="min-h-30"
                  />
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4">
        <Field orientation="horizontal" className="flex">
          <Button type="submit" form="contact-form" className="flex-1">
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={handleResetForm}>
            Reset
          </Button>
        </Field>
        {successMessage && <p className="text-emerald-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </CardFooter>
    </Card>
  );
}
