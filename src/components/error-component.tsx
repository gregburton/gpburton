"use client";

export default function ErrorComponent({ error }: { error: unknown | Error }) {
  return (
    <div className="container mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
      <pre>
        <code>
          {typeof error === "string"
            ? error
            : error instanceof Error
              ? error.message
              : String(error)}
        </code>
      </pre>
    </div>
  );
}
