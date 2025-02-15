
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Moon, Sun, UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Category = Database['public']['Tables']['categories']['Row'];

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setCategories(data);
      } catch (error: any) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchCategories();
    }
  }, [user, toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

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
                <UserIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
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

        {/* Categories Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <div className="col-span-full text-center p-4">Loading categories...</div>
            ) : categories.length === 0 ? (
              <div className="col-span-full text-center p-4">No categories found</div>
            ) : (
              categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center gap-2 p-4"
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "Category lessons will be available soon!",
                  })}
                >
                  <span className="text-lg font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground text-center">
                    {category.description}
                  </span>
                </Button>
              ))
            )}
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
