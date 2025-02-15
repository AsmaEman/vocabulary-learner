
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">تعلم العربية</h1>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-lg bg-card">
              <h3 className="font-medium text-muted-foreground">Words Learned</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="font-medium text-muted-foreground">Current Streak</h3>
              <p className="text-3xl font-bold">0 days</p>
            </div>
            <div className="p-6 rounded-lg bg-card">
              <h3 className="font-medium text-muted-foreground">Today's Goal</h3>
              <p className="text-3xl font-bold">0%</p>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="h-24 text-lg"
              onClick={() => toast({
                title: "Coming Soon",
                description: "This feature will be available soon!",
              })}
            >
              Start New Lesson
            </Button>
            <Button
              variant="secondary"
              className="h-24 text-lg"
              onClick={() => toast({
                title: "Coming Soon",
                description: "This feature will be available soon!",
              })}
            >
              Practice Words
            </Button>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="rounded-lg bg-card p-6">
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
