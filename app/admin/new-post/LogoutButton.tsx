import { logoutAction } from "@/app/admin/login/actions";

// A plain server component — no client state needed for a form bound
// directly to a Server Action.
export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">Log out</button>
    </form>
  );
}
