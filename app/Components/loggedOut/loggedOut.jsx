import React, { useState } from 'react'

const loggedOut = () => {
    const [isLoggingOut,setLoggingOut]=useState(false)
    async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Logout failed");
      router.replace("/SignIn");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
      setNotice("Could not sign out. Please try again.");
    }
  }
  return (
    <div className="loggedOut">
        thisb is
    </div>
  )
}

export default loggedOut
