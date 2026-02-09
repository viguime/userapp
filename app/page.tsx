export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to User App
          </h1>
          <p className="text-secondary mb-6">
            A Next.js application with App Router, React 19, TypeScript, Tailwind CSS, and ShadCN UI.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Next.js 15
              </h2>
              <p className="text-secondary text-sm">
                Built with the latest Next.js App Router
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                React 19
              </h2>
              <p className="text-secondary text-sm">
                Using the latest React features
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                ShadCN UI
              </h2>
              <p className="text-secondary text-sm">
                Beautiful, accessible components
              </p>
            </div>
          </div>

          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Get Started
            </h3>
            <p className="text-secondary mb-4">
              Edit <code className="bg-muted px-2 py-1 rounded text-sm">app/page.tsx</code> to start building your application.
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
