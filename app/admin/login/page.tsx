import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div style={{ maxWidth: 360, margin: "var(--space-8) auto" }}>
      <h1>Admin Login</h1>
      <LoginForm />
    </div>
  );
}
