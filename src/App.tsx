import { useState } from 'react';

interface UserCompletedChallenge {
    id: string;
    completedDate: number;
    files: unknown[];
    solution?: string;
    githubLink?: string;
    challengeType?: number;
}

interface BlockCompletionData {
    blockName: string;
    blockLabel: string;
    superBlock: string;
    moduleName: string | null;
    totalChallenges: number;
    completedCount: number;
    completionPercentage: number;
    started: boolean;
    completedChallenges: UserCompletedChallenge[];
}

export default function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<Record<string, BlockCompletionData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedSuperBlock, setSelectedSuperBlock] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const fetchUserChallenges = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    setSelectedSuperBlock(null);
    setSelectedModule(null);
    
    try {
      const response = await fetch(`/api/get-user-challenges/${encodeURIComponent(username)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data. Make sure the username is correct and their profile is public.');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Group data
  // superBlock -> moduleName -> block[]
  const groupedData: Record<string, Record<string, BlockCompletionData[]>> = {};

  if (data) {
    for (const blockData of Object.values(data)) {
      const sb = blockData.superBlock || 'Unknown SuperBlock';
      const mod = blockData.moduleName || 'Other Modules';
      
      if (!groupedData[sb]) groupedData[sb] = {};
      if (!groupedData[sb][mod]) groupedData[sb][mod] = [];
      
      groupedData[sb][mod].push(blockData);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header and Search */}
        <div className="bg-slate-800 p-6 md:p-10 rounded-3xl shadow-2xl border border-slate-700/50">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-8">
            FCC Progress Tracker
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchUserChallenges()}
              placeholder="Enter FreeCodeCamp Username"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-inner placeholder-slate-500"
            />
            <button
              onClick={fetchUserChallenges}
              disabled={loading || !username.trim()}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Fetching...</span>
              ) : (
                'Track Progress'
              )}
            </button>
          </div>
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {data && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-slate-400 font-medium mb-8">
              <button 
                onClick={() => { setSelectedSuperBlock(null); setSelectedModule(null); }}
                className={`hover:text-purple-400 transition-colors ${!selectedSuperBlock ? 'text-purple-400 font-bold' : ''}`}
              >
                All Superblocks
              </button>
              
              {selectedSuperBlock && (
                <>
                  <span>/</span>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className={`hover:text-purple-400 transition-colors capitalize ${!selectedModule ? 'text-purple-400 font-bold' : ''}`}
                  >
                    {selectedSuperBlock.replace(/-/g, ' ')}
                  </button>
                </>
              )}
              
              {selectedModule && (
                <>
                  <span>/</span>
                  <span className="text-purple-400 font-bold capitalize">
                    {selectedModule.replace(/-/g, ' ')}
                  </span>
                </>
              )}
            </div>

            {/* View 1: Superblocks Grid */}
            {!selectedSuperBlock && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(groupedData).map(([sbName, modules]) => {
                  let sbTotal = 0;
                  let sbCompleted = 0;
                  Object.values(modules).forEach(modBlocks => {
                    modBlocks.forEach(b => {
                      sbTotal += b.totalChallenges;
                      sbCompleted += b.completedCount;
                    });
                  });
                  const sbPct = sbTotal > 0 ? (sbCompleted / sbTotal) * 100 : 0;

                  return (
                    <div 
                      key={sbName} 
                      onClick={() => setSelectedSuperBlock(sbName)}
                      className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-white capitalize tracking-tight pr-4">{sbName.replace(/-/g, ' ')}</h3>
                        <div className="text-3xl font-black text-slate-200">{Math.round(sbPct)}%</div>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium text-slate-400 mb-4">
                        <span>{Object.keys(modules).length} Modules</span>
                        <span>{sbCompleted} / {sbTotal} challenges</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${sbPct}%` }}
                        ></div>
                      </div>
                      
                      {/* Decorative background element */}
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View 2: Modules Grid */}
            {selectedSuperBlock && !selectedModule && groupedData[selectedSuperBlock] && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-extrabold text-white capitalize tracking-tight">
                    {selectedSuperBlock.replace(/-/g, ' ')} Modules
                  </h2>
                  <button 
                    onClick={() => setSelectedSuperBlock(null)}
                    className="text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-lg transition-colors border border-slate-700 hover:border-slate-500"
                  >
                    &larr; Back
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(groupedData[selectedSuperBlock]).map(([modName, blocks]) => {
                    let modTotal = 0;
                    let modCompleted = 0;
                    blocks.forEach(b => {
                      modTotal += b.totalChallenges;
                      modCompleted += b.completedCount;
                    });
                    const modPct = modTotal > 0 ? (modCompleted / modTotal) * 100 : 0;

                    return (
                      <div 
                        key={modName}
                        onClick={() => setSelectedModule(modName)}
                        className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden"
                      >
                        <h4 className="text-xl font-bold text-slate-200 capitalize mb-4 flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                          {modName.replace(/-/g, ' ')}
                        </h4>
                        
                        <div className="flex justify-between items-end mt-8 mb-3">
                          <div className="text-sm font-bold text-slate-400">{modCompleted} / {modTotal}</div>
                          <div className="text-2xl font-black text-white">{Math.round(modPct)}%</div>
                        </div>
                        
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-indigo-400 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${modPct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View 3: Blocks Grid */}
            {selectedSuperBlock && selectedModule && groupedData[selectedSuperBlock][selectedModule] && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-white capitalize tracking-tight flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                    {selectedModule.replace(/-/g, ' ')}
                  </h2>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-lg transition-colors border border-slate-700 hover:border-slate-500"
                  >
                    &larr; Back to Modules
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupedData[selectedSuperBlock][selectedModule].map(block => (
                    <div 
                      key={block.blockName} 
                      className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ${
                        block.completionPercentage === 100 
                          ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)]' 
                          : block.started
                            ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgb(245,158,11,0.12)]'
                            : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 hover:shadow-xl'
                      }`}
                    >
                      {/* Status Indicator */}
                      <div className="absolute top-5 right-5 flex items-center gap-2">
                        {block.started && block.completionPercentage < 100 && (
                          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/20">
                            In Progress
                          </span>
                        )}
                        {block.completionPercentage === 100 && (
                          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/20">
                            Completed
                          </span>
                        )}
                        {!block.started && (
                          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-700/80 text-slate-400 rounded-full border border-slate-600">
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="pr-24">
                        <h5 className="font-bold text-slate-100 mb-1.5 capitalize truncate text-lg" title={block.blockName.replace(/-/g, ' ')}>
                          {block.blockName.replace(/-/g, ' ')}
                        </h5>
                        <div className="text-sm font-medium text-slate-400 capitalize">
                          {block.blockLabel}
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-6">
                        <div className="text-4xl font-black tracking-tighter opacity-90">
                          {block.completionPercentage}%
                        </div>
                        <div className="text-sm font-bold text-slate-500 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-700/50">
                          {block.completedCount} / {block.totalChallenges}
                        </div>
                      </div>
                      
                      {/* Very subtle progress bar at bottom of card */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent">
                        <div 
                          className={`h-full ${block.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'} opacity-50`}
                          style={{ width: `${block.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
