import { cookies } from "next/headers";
import AuthProvider from "@/components/AuthProvider";
import TodoApp from "@/components/TodoApp";

async function getUserFromSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) return null;

    // Replace with your backend call
    // const res = await fetch('https://your-api.com/auth/me', {
    //   headers: { Cookie: `session=${sessionToken}` },
    //   cache: 'no-store'
    // });
    // if (!res.ok) return null;
    // return res.json();

    return null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const user = await getUserFromSession();

  return (
    <AuthProvider initialUser={user}>
      <TodoApp />
    </AuthProvider>
  );
}