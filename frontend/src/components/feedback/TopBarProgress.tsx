export function TopBarProgress() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] overflow-hidden bg-transparent">
      <div className="h-full bg-primary animate-width-alternate shadow-[0_0_10px_rgba(70,23,143,0.5)]" />
    </div>
  );
}

// Tambahkan animasi kustom ke tailwind jika belum ada
// Di index.css:
// .animate-width-alternate {
//   animation: width-alternate 1.5s ease-in-out infinite;
// }
// @keyframes width-alternate {
//   0% { width: 0%; left: 0%; }
//   50% { width: 70%; left: 15%; }
//   100% { width: 0%; left: 100%; }
// }
