import { useState, useEffect } from 'react';
import type { ParsedFCCResult, BlockCompletionData } from './types/fcc.ts';
import { parseFCCUserData } from './services/fccParser.ts';
import { fetchFCCUser } from './services/fccApi.ts';

// Helper to read initial URL search parameters
function getInitialUrlParams() {
  if (typeof window === 'undefined') {
    return { username: 'arnaldoperez', format: 'visual' as const, skipUnstarted: false };
  }
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username') || params.get('u') || '';
  const formatParam = params.get('format') || params.get('view');
  const isJson = formatParam === 'json' || params.get('json') === 'true';
  const skipUnstarted = params.get('skipUnstarted') === 'true';

  return {
    username: username || 'arnaldoperez',
    format: isJson ? ('json' as const) : ('visual' as const),
    skipUnstarted,
    hasInitialUsername: !!username
  };
}

// Helper to synchronize state with URL search params
function syncUrlParams(username: string, format: 'visual' | 'json', skipUnstarted: boolean) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);

  if (username.trim()) {
    url.searchParams.set('username', username.trim());
    url.searchParams.delete('u');
  } else {
    url.searchParams.delete('username');
    url.searchParams.delete('u');
  }

  if (format === 'json') {
    url.searchParams.set('format', 'json');
    url.searchParams.delete('view');
    url.searchParams.delete('json');
  } else {
    url.searchParams.delete('format');
    url.searchParams.delete('view');
    url.searchParams.delete('json');
  }

  if (skipUnstarted) {
    url.searchParams.set('skipUnstarted', 'true');
  } else {
    url.searchParams.delete('skipUnstarted');
  }

  window.history.replaceState(null, '', url.pathname + url.search);
}

export default function App() {
  const initial = getInitialUrlParams();

  const [username, setUsername] = useState(initial.username);
  const [skipUnstarted, setSkipUnstarted] = useState(initial.skipUnstarted);
  const [outputTab, setOutputTab] = useState<'visual' | 'json'>(initial.format);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Result state
  const [rawFCCData, setRawFCCData] = useState<any | null>(null);
  const [parsedResult, setParsedResult] = useState<ParsedFCCResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Visual navigation state
  const [selectedSuperBlock, setSelectedSuperBlock] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-progress' | 'completed' | 'unstarted'>('all');

  // Apply parsed data to state
  const applyData = (data: any, shouldSkip: boolean) => {
    try {
      const parsed = parseFCCUserData(data, { skipUnstarted: shouldSkip });
      setRawFCCData(data);
      setParsedResult(parsed);
      setError(null);
      setSelectedSuperBlock(null);
      setSelectedModule(null);
    } catch (err: any) {
      setError(err.message || 'Error al procesar los datos de freeCodeCamp.');
      setParsedResult(null);
    }
  };

  const handleFetchUser = async (userToFetch = username, shouldSkip = skipUnstarted) => {
    const cleanUser = userToFetch.trim();
    if (!cleanUser) return;

    setLoading(true);
    setError(null);

    // Sync URL with current user and options
    syncUrlParams(cleanUser, outputTab, shouldSkip);

    try {
      const data = await fetchFCCUser(cleanUser);
      applyData(data, shouldSkip);
    } catch (err: any) {
      setError(err.message || 'Error al obtener la información del usuario.');
      setParsedResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load: fetch if username is present or default
  useEffect(() => {
    handleFetchUser(initial.username, initial.skipUnstarted);
  }, []);

  const handleOutputTabChange = (tab: 'visual' | 'json') => {
    setOutputTab(tab);
    syncUrlParams(username, tab, skipUnstarted);
  };

  const handleToggleSkipUnstarted = (checked: boolean) => {
    setSkipUnstarted(checked);
    syncUrlParams(username, outputTab, checked);
    if (rawFCCData) {
      applyData(rawFCCData, checked);
    }
  };

  const handleCopyJson = () => {
    const textToCopy = JSON.stringify(parsedResult?.blocks, null, 2);
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJson = () => {
    const textToDownload = JSON.stringify(parsedResult?.blocks, null, 2);
    if (!textToDownload) return;

    const blob = new Blob([textToDownload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fcc-${parsedResult?.username || 'user'}-blocks.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // PURE JSON MODE (when format=json is active)
  // Renders purely the JSON output, not the website layout
  // ==========================================
  if (outputTab === 'json') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-mono text-xs selection:bg-purple-500 selection:text-white">
        {/* Floating action bar */}
        <div className="fixed top-3 right-4 flex items-center gap-2 bg-slate-900/95 border border-slate-800 px-3.5 py-2 rounded-2xl shadow-2xl z-50 backdrop-blur">
          <button
            onClick={() => handleOutputTabChange('visual')}
            className="text-purple-400 hover:text-purple-300 font-sans text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>📊</span>
            <span>Vista Visual</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={handleCopyJson}
            disabled={!parsedResult}
            className="text-slate-300 hover:text-white font-sans text-xs font-medium transition-colors disabled:opacity-50"
          >
            {copied ? '✓ ¡Copiado!' : 'Copiar'}
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={handleDownloadJson}
            disabled={!parsedResult}
            className="text-slate-300 hover:text-white font-sans text-xs font-medium transition-colors disabled:opacity-50"
          >
            ⬇ Descargar .json
          </button>
        </div>

        {/* Pure JSON output */}
        <pre className="p-4 sm:p-6 overflow-x-auto whitespace-pre font-mono text-xs leading-relaxed text-slate-300">
          <code>
            {loading
              ? JSON.stringify({ status: 'loading', username }, null, 2)
              : error
                ? JSON.stringify({ error, username }, null, 2)
                : parsedResult
                  ? JSON.stringify(parsedResult.blocks, null, 2)
                  : JSON.stringify({ status: 'empty' }, null, 2)}
          </code>
        </pre>
      </div>
    );
  }

  // ==========================================
  // VISUAL MODE (Interactive dashboard view)
  // ==========================================
  const groupedData: Record<string, Record<string, BlockCompletionData[]>> = {};

  if (parsedResult) {
    const query = searchQuery.trim().toLowerCase();
    for (const block of Object.values(parsedResult.blocks)) {
      // Filter by status
      if (statusFilter === 'in-progress' && (!block.started || block.completionPercentage === 100)) continue;
      if (statusFilter === 'completed' && block.completionPercentage < 100) continue;
      if (statusFilter === 'unstarted' && block.started) continue;

      // Filter by search query
      if (query) {
        const matchesName = block.blockName.toLowerCase().includes(query);
        const matchesLabel = block.blockLabel.toLowerCase().includes(query);
        const matchesSuperBlock = block.superBlock.toLowerCase().includes(query);
        const matchesModule = (block.moduleName || '').toLowerCase().includes(query);
        if (!matchesName && !matchesLabel && !matchesSuperBlock && !matchesModule) {
          continue;
        }
      }

      const sb = block.superBlock || 'otros';
      const mod = block.moduleName || 'general';

      if (!groupedData[sb]) groupedData[sb] = {};
      if (!groupedData[sb][mod]) groupedData[sb][mod] = [];
      groupedData[sb][mod].push(block);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-purple-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* App Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 font-mono font-black text-xl border border-purple-500/30 shadow-lg shadow-purple-500/10">
                ( )
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-indigo-400 tracking-tight">
                FCC Parser SPA
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              SPA cliente sin Express • Parámetros en URL (<code className="text-purple-300 font-mono text-xs">?username=...&amp;format=json</code>)
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => handleOutputTabChange('json')}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900 hover:bg-slate-800 text-purple-400 border border-slate-800 hover:border-purple-500/40 flex items-center gap-1.5 shadow-md"
            >
              <span>{"{ }"}</span>
              <span>Modo JSON API</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Modo SPA
            </span>
          </div>
        </header>

        {/* Search Input Card */}
        <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl backdrop-blur-sm">
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Nombre de usuario de FreeCodeCamp (sincronizado en la URL):
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetchUser()}
                placeholder="Ingresa username (ej: arnaldoperez)"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-slate-600"
              />
              <button
                onClick={() => handleFetchUser()}
                disabled={loading || !username.trim()}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Parseando...
                  </span>
                ) : (
                  'Cargar Usuario'
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2 pt-1">
              <div className="flex items-center gap-2">
                <span>Ejemplo rápido:</span>
                <button
                  onClick={() => {
                    setUsername('arnaldoperez');
                    handleFetchUser('arnaldoperez');
                  }}
                  className="text-purple-400 hover:text-purple-300 underline font-medium"
                >
                  arnaldoperez
                </button>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={skipUnstarted}
                  onChange={(e) => handleToggleSkipUnstarted(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 bg-slate-950 border-slate-700 focus:ring-purple-500"
                />
                <span>Ocultar no iniciados (<code className="text-purple-300">skipUnstarted=true</code>)</span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div className="flex-1">
                <p className="font-semibold">Error</p>
                <p className="mt-0.5 text-red-300/90 leading-relaxed">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Area */}
        {parsedResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            {/* User Overview Stats Card */}
            <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  {parsedResult.profile?.picture ? (
                    <img 
                      src={parsedResult.profile.picture} 
                      alt={parsedResult.username} 
                      className="w-16 h-16 rounded-2xl border-2 border-purple-500/40 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-inner">
                      {parsedResult.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      {parsedResult.profile?.name || parsedResult.username}
                      <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        @{parsedResult.username}
                      </span>
                    </h2>
                    {parsedResult.profile?.about && (
                      <p className="text-sm text-slate-400 mt-1 max-w-xl">{parsedResult.profile.about}</p>
                    )}
                    {parsedResult.profile?.location && (
                      <p className="text-xs text-slate-500 mt-1">📍 {parsedResult.profile.location}</p>
                    )}
                  </div>
                </div>

                {/* View Switcher Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOutputTabChange('json')}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 flex items-center gap-2"
                  >
                    <span>{"{ }"}</span>
                    <span>Ver Formato JSON</span>
                  </button>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs text-slate-400 font-medium">Retos Completados</div>
                  <div className="text-2xl md:text-3xl font-black text-purple-400 mt-1">
                    {parsedResult.summary.totalUserCompleted}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs text-slate-400 font-medium">Bloques Iniciados</div>
                  <div className="text-2xl md:text-3xl font-black text-indigo-400 mt-1">
                    {parsedResult.summary.blocksStarted}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs text-slate-400 font-medium">Bloques al 100%</div>
                  <div className="text-2xl md:text-3xl font-black text-emerald-400 mt-1">
                    {parsedResult.summary.blocksCompleted}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  <div className="text-xs text-slate-400 font-medium">Progreso Global</div>
                  <div className="text-2xl md:text-3xl font-black text-white mt-1">
                    {parsedResult.summary.overallPercentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Visual View Controls: Breadcrumbs, Status Filter, Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 font-medium">
                <button 
                  onClick={() => { setSelectedSuperBlock(null); setSelectedModule(null); }}
                  className={`hover:text-purple-400 transition-colors ${!selectedSuperBlock ? 'text-purple-400 font-bold' : ''}`}
                >
                  Todos los Superbloques
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

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrar por nombre..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 w-44"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="in-progress">En progreso</option>
                  <option value="completed">Completados (100%)</option>
                  <option value="unstarted">Sin iniciar</option>
                </select>
              </div>
            </div>

            {/* Level 1: Superblocks Grid */}
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
                      className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white capitalize tracking-tight pr-4">
                          {sbName.replace(/-/g, ' ')}
                        </h3>
                        <div className="text-2xl md:text-3xl font-black text-slate-200">
                          {Math.round(sbPct)}%
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium text-slate-400 mb-4">
                        <span>{Object.keys(modules).length} Módulos</span>
                        <span>{sbCompleted} / {sbTotal} retos</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${sbPct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Level 2: Modules Grid */}
            {selectedSuperBlock && !selectedModule && groupedData[selectedSuperBlock] && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white capitalize tracking-tight">
                    Módulos de {selectedSuperBlock.replace(/-/g, ' ')}
                  </h2>
                  <button 
                    onClick={() => setSelectedSuperBlock(null)}
                    className="text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-xl transition-colors border border-slate-700 hover:border-slate-500"
                  >
                    ← Volver a Superbloques
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                        className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden"
                      >
                        <h4 className="text-lg font-bold text-slate-200 capitalize mb-4 flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                          {modName.replace(/-/g, ' ')}
                        </h4>
                        
                        <div className="flex justify-between items-end mt-6 mb-3">
                          <div className="text-sm font-bold text-slate-400">{modCompleted} / {modTotal}</div>
                          <div className="text-2xl font-black text-white">{Math.round(modPct)}%</div>
                        </div>
                        
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-indigo-400 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${modPct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Level 3: Blocks Grid */}
            {selectedSuperBlock && selectedModule && groupedData[selectedSuperBlock][selectedModule] && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-extrabold text-white capitalize tracking-tight flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
                    Bloques de {selectedModule.replace(/-/g, ' ')}
                  </h2>
                  <button 
                    onClick={() => setSelectedModule(null)}
                    className="text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-xl transition-colors border border-slate-700 hover:border-slate-500"
                  >
                    ← Volver a Módulos
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
                                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          {/* Status Badge */}
                          <div className="absolute top-5 right-5 flex items-center gap-2">
                            {block.started && block.completionPercentage < 100 && (
                              <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/20">
                                En Progreso
                              </span>
                            )}
                            {block.completionPercentage === 100 && (
                              <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/20">
                                Completado
                              </span>
                            )}
                            {!block.started && (
                              <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                                Pendiente
                              </span>
                            )}
                          </div>

                          <div className="pr-24">
                            <h5 className="font-bold text-slate-100 mb-1 capitalize truncate text-base" title={block.blockName.replace(/-/g, ' ')}>
                              {block.blockName.replace(/-/g, ' ')}
                            </h5>
                            <div className="text-xs font-medium text-slate-400 capitalize">
                              {block.blockLabel}
                            </div>
                          </div>

                          <div className="flex items-end justify-between mt-6">
                            <div className="text-3xl font-black tracking-tighter opacity-90">
                              {block.completionPercentage}%
                            </div>
                            <div className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                              {block.completedCount} / {block.totalChallenges}
                            </div>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent">
                            <div 
                              className={`h-full ${block.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'} opacity-60`}
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
