"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="tool-panel">
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" />
      </div>
      {state?.error && (
        <p role="alert" className="meta-text" style={{ fontWeight: 600 }}>
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
