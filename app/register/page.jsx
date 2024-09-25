import Register from "@/Components/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('dashboard')
  return (
    <Register></Register>
  );
}