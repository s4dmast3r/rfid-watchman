// Display currently present users
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCheck, Users, AlertCircle } from "lucide-react";
import { type User } from "@/lib/api";
import { format, parseISO } from "date-fns";

interface PresentUsersProps {
  presentUsers: (User & { last_in: string })[];
  isLoading: boolean;
  className?: string;
}

export const PresentUsers: React.FC<PresentUsersProps> = ({
  presentUsers,
  isLoading,
  className,
}) => {
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Present Now
          </CardTitle>
          <CardDescription>Currently checked in employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Present Now
          <StatusBadge variant="present" size="sm">
            {presentUsers.length}
          </StatusBadge>
        </CardTitle>
        <CardDescription>Currently checked in employees</CardDescription>
      </CardHeader>
      <CardContent>
        {presentUsers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <h4 className="text-sm font-medium">No one present</h4>
            <p className="text-xs text-muted-foreground">
              All employees are currently checked out
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {presentUsers.map((user) => {
              const lastIn = parseISO(user.last_in);
              const initials = user.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      In since {format(lastIn, 'HH:mm')}
                    </p>
                  </div>
                  <StatusBadge variant="in" size="sm">
                    IN
                  </StatusBadge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};