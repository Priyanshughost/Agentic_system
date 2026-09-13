import { Network, UserCircle2, Globe, Calculator, FileText, Database, Wrench } from "lucide-react";

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
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-sm font-bold tracking-[0.2em] text-white uppercase flex items-center gap-3">
                    <div className="p-1.5 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                        <Network className="w-4 h-4 text-indigo-400" />
                    </div>
                    Active Swarm
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                {agents.map((agent, idx) => (
                    <div 
                        key={idx}
                        className="group rounded-xl p-5 border transition-all duration-500 flex flex-col relative overflow-hidden backdrop-blur-md bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                    >
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors bg-white/5 border-white/10">
                                <UserCircle2 className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm font-bold truncate transition-colors text-zinc-300 group-hover:text-white">
                                    {agent.persona}
                                </h4>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest truncate mt-0.5">
                                    {agent.role}
                                </p>
                            </div>
                        </div>

                        {/* Assigned Tools */}
                        {agent.requiredTools && agent.requiredTools.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                {agent.requiredTools.map(tool => tool !== "NONE" && (
                                    <span key={tool} className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-lg border transition-colors bg-white/5 text-zinc-400 border-white/10">
                                        <ToolIcon toolName={tool} />
                                        {tool.replace("_tool", "").replace("_", " ")}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
