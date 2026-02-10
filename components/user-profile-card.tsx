import { User } from "@/types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserProfileCardProps {
  user: User;
  backUrl?: string;
}

export function UserProfileCard({ user, backUrl = "/" }: UserProfileCardProps) {
  const initials = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-[500px] mx-auto">
        {/* Back Button */}
        <Link href={backUrl}>
          <Button variant="outline"
            className="mb-6 text-secondary bg-card hover:bg-muted rounded"
          >
            <span>←</span>
            Back to User List
          </Button>
        </Link>

        {/* Profile Card */}
        <div className="bg-card rounded-xl shadow-lg p-6 md:p-10">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <Avatar className="h-[100px] w-[100px]">
              <AvatarImage src={user.avatar} alt={fullName} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Name & Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {fullName}
            </h1>
            <p className="text-secondary font-semibold mb-3">{user.title}</p>
            <div className="flex justify-center mb-6">
              <Badge variant={user.active ? "success" : "destructive"}>
                {user.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            {/* Separator bar */}
              <div className="h-[1px] bg-border" />
          </div>

          {/* Details List */}
          <div className="space-y-3 mb-3">
            <div className="flex gap-2">
              <span className="text-sm font-bold text-foreground w-24">Email:</span>
              <span className="text-sm text-secondary">{user.email}</span>
            </div>

            <div className="flex gap-2">
              <span className="text-sm font-bold text-foreground w-24">Phone:</span>
              <span className="text-sm text-secondary">{user.phone_number || 'N/A'}</span>
            </div>

            <div className="flex gap-2">
              <span className="text-sm font-bold text-foreground w-24">University:</span>
              <span className="text-sm text-secondary">{user.school}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <span className="text-sm font-bold text-foreground">Skills:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Main Skill */}
              <span className="inline-flex items-center px-3 py-1.5 rounded text-xs bg-accent/10 text-accent font-bold">
                {user.main_skill}
              </span>
              {/* Secondary Skills */}
              {user.secondary_skills && user.secondary_skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded text-xs bg-muted text-foreground "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description Card */}
          {user.description && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-secondary italic leading-relaxed">
                "{user.description}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
