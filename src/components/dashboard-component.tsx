"use client";

import { logout } from "@/app/actions";

export function DashboardComponent() {  
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
