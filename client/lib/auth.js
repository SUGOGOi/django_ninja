export const authApi = {
  login: async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  register: async (email, password, name) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
  },

  oauthLogin: (provider) => {
    window.location.href = `/api/auth/oauth/${provider}`;
  },

  getCurrentUser: async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = res.ok ? await res.json() : null;
      return data;
    } catch {
      return null;
    }
  },
};
