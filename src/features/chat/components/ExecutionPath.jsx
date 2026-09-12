import { ArrowRight, Brain, Zap } from "lucide-react";

export default function ExecutionPath({ statusPath }) {
    if (!statusPath || statusPath.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium text-zinc-400">
            {statusPath.map((status, index) => {
                const isLast = index === statusPath.length - 1;
                
                return (
                    <div key={index} className="flex items-center gap-2">
                        <span 
                            className={`flex items-center gap-1.5 ${
                                isLast ? "text-indigo-400 font-semibold animate-pulse" : "text-zinc-400"
                            }`}
                        >
                            {/* Simple icon logic based on keywords */}
                            {status.toLowerCase().includes("architect") ? (
                                <Brain className="w-3.5 h-3.5 text-indigo-400" />
                            ) : (
                                <Zap className="w-3.5 h-3.5" />
                            )}
                            {status}
                        </span>
                        
                        {!isLast && (
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
