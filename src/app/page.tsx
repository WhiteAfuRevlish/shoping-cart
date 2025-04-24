"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { user, signInWithEmailAndPassword, createUserWithEmailAndPassword } = useAuth();
  const router = useRouter();

  useEffect(() => {   
    if (user?.email) {
      router.push('/home');
    }
  }, [user, router]);

  const handleSignIn = async () => {
    await signInWithEmailAndPassword("test@test.com", "123456");
  };

  const handleCreateAccount = async () => {
    await createUserWithEmailAndPassword("test@test.com", "123456");
  }


  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">My Smart Shopper</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-secondary">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold text-primary">Welcome to Smart Shopper!</h1>
          <p className="text-muted-foreground mt-4">Your intelligent shopping list app.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button onClick={handleSignIn} className="w-full sm:w-auto" variant="default">
              Sign In
            </Button>
            <Button onClick={handleCreateAccount} className="w-full sm:w-auto" variant="outline">
              Create account
            </Button>
          </div>          
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground p-4 mt-auto">
        <div className="container mx-auto text-center">          
          <p>&copy; {new Date().getFullYear()} Smart Shopper</p>
        </div>
      </footer>
      </div>
  );
}
