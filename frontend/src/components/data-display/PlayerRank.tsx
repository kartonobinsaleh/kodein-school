interface PlayerRankProps {
  rank: number;
  name: string;
  score: string | number;
  isMe?: boolean;
}

export function PlayerRank({ rank, name, score, isMe }: PlayerRankProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${isMe ? 'bg-primary text-white shadow-md' : 'bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
      <div className="flex items-center gap-3">
        <span className="font-black opacity-50 text-sm">#{rank}</span>
        <span className="font-bold text-sm tracking-tight">{name}</span>
      </div>
      <span className="font-black text-sm">{score}</span>
    </div>
  );
}
