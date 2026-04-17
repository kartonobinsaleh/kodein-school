import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui';
import { StatCard, CourseProgress, PlayerRank } from '@/components/data-display';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="bg-primary rounded-xl p-8 text-white relative overflow-hidden shadow-md border-b-4 border-primary-light">
        <div className="relative z-10">
          <h1 className="text-xl font-black mb-2 animate-fade-in-up uppercase tracking-tight">
            Welcome back, {user?.email.split('@')[0]}! 🚀
          </h1>
          <p className="text-warning text-md font-bold opacity-90 italic">
            Let's make today a great day to learn!
          </p>
        </div>
        {/* Decorative elements using tokens */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-danger/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-primary-light/30 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Gamified Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="POINTS" value="2,450" color="warning" icon="⚡" sub="Top 5% this week!" />
        <StatCard title="COURSES" value="12" color="primary" icon="📚" sub="3 completions pending" />
        <StatCard title="ATTENDANCE" value="98%" color="success" icon="📅" sub="Perfect Streak! 🔥" />
        <StatCard title="ACTIVITIES" value="45" color="danger" icon="🎯" sub="12 new challenges" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">CONTINUE LEARNING</h2>
              <button className="text-primary font-black hover:underline uppercase text-sm">VIEW ALL</button>
            </div>
            <div className="space-y-4">
              <CourseProgress title="Advanced Mathematics" progress={75} color="primary" />
              <CourseProgress title="Intro to Computer Science" progress={40} color="primary" />
              <CourseProgress title="World History" progress={90} color="warning" />
            </div>
          </Card>
        </div>

        {/* Sidebar Mini Column */}
        <div className="space-y-6">
          <Card className="!bg-warning/10 !border-warning border-2">
            <h3 className="text-warning font-black text-md mb-2 uppercase">Daily Goal</h3>
            <div className="h-4 w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-warning/20">
              <div className="h-full bg-warning w-3/4" />
            </div>
            <p className="text-sm font-bold text-warning/80 mt-2 italic uppercase">3/4 Activities Completed</p>
          </Card>

          <Card>
            <h3 className="font-black text-gray-800 dark:text-gray-100 mb-4 uppercase text-md tracking-tight">Leaderboard</h3>
            <div className="space-y-3">
              <PlayerRank rank={1} name="Alice" score="4,200" />
              <PlayerRank rank={2} name="You" score="2,450" isMe />
              <PlayerRank rank={3} name="Bob" score="2,100" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
