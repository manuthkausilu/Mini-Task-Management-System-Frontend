import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-dot-pattern">
      {/* Decorative gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      
      <div className="z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-8 animate-in">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter gradient-text">
            Master Your Tasks <br /> with Precision
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-2xl/relaxed">
            The minimalist task management system designed for high-performance individuals and teams.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center">
          <Link 
            href="/register"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-medium text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Get Started
          </Link>
          <Link 
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 text-sm font-medium transition-all hover:bg-white/10 hover:scale-105 active:scale-95 glass"
          >
            Sign In
          </Link>
        </div>

        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="glass-card p-6 rounded-2xl text-left space-y-2">
            <h3 className="text-xl font-semibold text-white">Focus First</h3>
            <p className="text-zinc-400">Streamlined interface to eliminate distractions and boost productivity.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl text-left space-y-2">
            <h3 className="text-xl font-semibold text-white">Smart Tracking</h3>
            <p className="text-zinc-400">Manage priorities and deadlines with intuitive status updates.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl text-left space-y-2">
            <h3 className="text-xl font-semibold text-white">Team Ready</h3>
            <p className="text-zinc-400">Built for individual clarity and seamless team collaboration.</p>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-8 text-zinc-500 text-sm">
        © {new Date().getFullYear()} Mini Task Management System. All rights reserved.
      </footer>
    </main>
  );
}
