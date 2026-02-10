import { notFound } from "next/navigation";
import { UserProfileCard } from "@/components/user-profile-card";
import { User, ApiResponse } from "@/types/api";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getUser(id: string): Promise<User | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const response: ApiResponse<User> = await res.json();
    return response.data || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function UserDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const queryParams = await searchParams;
  
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  // Build back URL with preserved query params
  const backParams = new URLSearchParams();
  if (queryParams.search) backParams.set("search", queryParams.search as string);
  if (queryParams.activeFilter) backParams.set("activeFilter", queryParams.activeFilter as string);
  if (queryParams.skillFilter) backParams.set("skillFilter", queryParams.skillFilter as string);
  if (queryParams.page) backParams.set("page", queryParams.page as string);
  
  const backUrl = backParams.toString() ? `/?${backParams.toString()}` : "/";

  return <UserProfileCard user={user} backUrl={backUrl} />;
}
