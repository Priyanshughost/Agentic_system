import { Network, UserCircle2, Cpu, Globe, Calculator, FileText, Database, Wrench, Loader2 } from "lucide-react";

const ToolIcon = ({ toolName }) => {
    switch (toolName) {
        case "web_scraper_tool":
        case "wikipedia_tool":
            return <Globe className="w-3 h-3" />;
        case "calculator_tool":
            return <Calculator className="w-3 h-3" />;
        case "document_generator_tool":
            return <FileText className="w-3 h-3" />;
        case "hacker_news_tool":
            return <Database className="w-3 h-3" />;
        default:
            return <Wrench className="w-3 h-3" />;
    }
};

export default function AgentOverview({ agents }) {
    if (!agents || agents.length === 0) return null;

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 mb-6 shadow-2xl relative overflow-hidden w-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase flex items-center gap-2">
                    <Network className="w-4 h-4 text-indigo-400" /> Active Swarm
                </h3>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
                    Runtime Generated
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 relative z-10">
                {agents.map((agent, idx) => {
                    const isActive = !!agent.activeAction || (agent.thought && agent.thought.length > 0);

                    return (
                        <div 
                            key={idx}
                            className={`bg-zinc-900/80 rounded-lg p-4 border transition-colors flex flex-col relative overflow-hidden ${
                                isActive ? "border-indigo-500/50" : "border-zinc-800"
                            }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 ring-1 ring-indigo-500/30 ring-inset rounded-lg animate-[pulse_2s_ease-in-out_infinite]"></div>
                            )}

                            <div className="flex flex-col gap-3 mb-3 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
                                        <UserCircle2 className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-zinc-200 truncate">{agent.persona}</h4>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wide truncate">{agent.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-700 w-fit">
                                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                                    <span className="text-[10px] text-zinc-400 font-mono">{agent.model}</span>
                                </div>
                            </div>

                            {/* Assigned Tools */}
                            {agent.requiredTools && agent.requiredTools.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
                                    {agent.requiredTools.map(tool => tool !== "NONE" && (
                                        <span key={tool} className="flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20">
                                            <ToolIcon toolName={tool} />
                                            {tool.replace("_tool", "").replace("_", " ")}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Live Actions & Thoughts */}
                            <div className="mt-auto pt-3 border-t border-zinc-800 relative z-10">
                                {agent.activeAction && (
                                    <div className="flex items-center gap-2 text-xs text-indigo-400 mb-2 font-medium">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        {agent.activeAction}
                                    </div>
                                )}
                                
                                {agent.thought && (
                                    <div className="bg-black/40 rounded p-2 text-[11px] font-mono text-zinc-400 max-h-24 overflow-y-auto scrollbar-hide break-words leading-relaxed border border-zinc-800/50">
                                        {agent.thought}
                                        <span className="inline-block w-1 h-3 bg-zinc-500 animate-pulse ml-1 align-middle"></span>
                                    </div>
                                )}
                                
                                {!agent.activeAction && !agent.thought && (
                                    <div className="text-xs text-zinc-600 italic">Idle</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
