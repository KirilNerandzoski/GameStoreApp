import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    signInWithSocial, 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithDemo,
    addToast 
  } = useStore();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-reset loading lock when modal opens, when user hits browser back ("undo"),
  // or when window/tab regains focus from OAuth redirect
  useEffect(() => {
    setIsLoading(false);
    setLoadingProvider(null);
    setErrorMessage('');

    const handleResetLoading = () => {
      setIsLoading(false);
      setLoadingProvider(null);
    };

    window.addEventListener('pageshow', handleResetLoading);
    window.addEventListener('focus', handleResetLoading);
    window.addEventListener('popstate', handleResetLoading);

    return () => {
      window.removeEventListener('pageshow', handleResetLoading);
      window.removeEventListener('focus', handleResetLoading);
      window.removeEventListener('popstate', handleResetLoading);
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setIsLoading(false);
    setLoadingProvider(null);
    setErrorMessage('');
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setLoadingProvider(provider);
    setErrorMessage('');

    // Safety timeout: reset button lock after 3.5s if navigation is aborted, delayed or returned
    const resetTimer = setTimeout(() => {
      setIsLoading(false);
      setLoadingProvider(null);
    }, 3500);

    try {
      const { error } = await signInWithSocial(provider);
      if (error) {
        clearTimeout(resetTimer);
        setErrorMessage(error.message || 'Unable to connect to OAuth provider.');
        setIsLoading(false);
        setLoadingProvider(null);
      }
    } catch (err) {
      clearTimeout(resetTimer);
      setErrorMessage(err?.message || 'Authentication error.');
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    if (mode === 'signin') {
      const { data, error } = await signInWithEmail(email, password);
      setIsLoading(false);
      if (error) {
        setErrorMessage(error.message);
      } else {
        addToast('Authentication Verified', `Welcome back, Operative. Neural link connected.`, 'success');
        handleClose();
      }
    } else {
      const { data, error } = await signUpWithEmail(email, password, gamertag);
      setIsLoading(false);
      if (error) {
        setErrorMessage(error.message);
      } else {
        addToast('Account Synthesized', 'Check your inbox for confirmation or login now.', 'success');
        handleClose();
      }
    }
  };

  const handleDemoFill = () => {
    setEmail('operative_77@ignis.cyber');
    setPassword('Cyberpunk2026!');
    setGamertag('Ghost_Operative');
    setErrorMessage('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#090a12] border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#0d0e19] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.35)]">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black font-cyber text-white tracking-wider uppercase">
                  Operative Access
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  SUPABASE AUTH
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                Universal Shell Biometric & OAuth Gateway
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 p-1.5 bg-[#07080d] border-b border-zinc-800 text-xs font-cyber font-bold tracking-wider">
          <button
            onClick={() => { setMode('signin'); setErrorMessage(''); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMessage(''); }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Quick OAuth Social Providers Grid */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
              Instant Single Sign-On (SSO):
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-[#121320] hover:bg-[#18192b] border border-zinc-800 hover:border-red-500/40 transition-all flex items-center justify-center gap-2.5 text-xs font-bold text-white group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
                title="Connect with Google Account"
              >
                {loadingProvider === 'google' ? (
                  <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
                <span>{loadingProvider === 'google' ? 'Connecting...' : 'Google'}</span>
              </button>

              {/* Microsoft / Outlook */}
              <button
                type="button"
                onClick={() => handleSocialLogin('azure')}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-[#121320] hover:bg-[#18192b] border border-zinc-800 hover:border-blue-500/40 transition-all flex items-center justify-center gap-2.5 text-xs font-bold text-white group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
                title="Connect with Microsoft / Outlook Account"
              >
                {loadingProvider === 'azure' ? (
                  <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z"/>
                    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                    <path fill="#FFB900" d="M13 13h10v10H13z"/>
                  </svg>
                )}
                <span>{loadingProvider === 'azure' ? 'Connecting...' : 'Outlook'}</span>
              </button>

              {/* Apple / iCloud */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-[#121320] hover:bg-[#18192b] border border-zinc-800 hover:border-zinc-500/40 transition-all flex items-center justify-center gap-2.5 text-xs font-bold text-white group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
                title="Connect with Apple / iCloud ID"
              >
                {loadingProvider === 'apple' ? (
                  <span className="w-4 h-4 border-2 border-zinc-300 border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <svg className="w-4 h-4 shrink-0 fill-current text-white" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.87-8.91-10.43-18.96-13.68-30.15-3.25-11.19-4.88-21.95-4.88-32.27 0-14.02 3.56-25.75 10.68-35.18 7.12-9.43 16.03-14.28 26.73-14.55 5.09 0 10.64 1.34 16.64 4.01 6.01 2.68 9.94 4.09 11.8 4.24 1.48-.22 5.61-1.68 12.39-4.38 6.78-2.7 12.28-3.9 16.51-3.6 12.44.89 22.39 5.37 29.83 13.43-10.87 6.56-16.19 15.68-15.96 27.37.22 9.13 3.73 16.92 10.53 23.36 6.8 6.44 14.86 10.14 24.18 11.11-2.01 6.13-4.53 12.35-7.55 18.66zM119.22 31.84c0-7.25 2.66-14.07 7.99-20.46 5.33-6.39 11.87-10.53 19.62-12.42.22 1.11.33 2.12.33 3.02 0 7.36-2.73 14.32-8.2 20.87-5.46 6.56-12.03 10.43-19.74 11.62-.12-.89-.22-1.78-.22-2.63z"/>
                  </svg>
                )}
                <span>{loadingProvider === 'apple' ? 'Connecting...' : 'iCloud'}</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                className="p-2.5 rounded-xl bg-[#121320] hover:bg-[#18192b] border border-zinc-800 hover:border-blue-600/40 transition-all flex items-center justify-center gap-2.5 text-xs font-bold text-white group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
                title="Connect with Facebook Account"
              >
                {loadingProvider === 'facebook' ? (
                  <span className="w-4 h-4 border-2 border-[#1877F2] border-t-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <svg className="w-4 h-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                <span>{loadingProvider === 'facebook' ? 'Connecting...' : 'Facebook'}</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-[#090a12] px-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">
              Or Use Email Passkey
            </span>
            <div className="border-t border-zinc-800 w-full" />
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs font-mono flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                  Operative Gamertag
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={gamertag}
                    onChange={(e) => setGamertag(e.target.value)}
                    placeholder="e.g. Valkyrie_99"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#121320] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operative@ignis.cyber"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#121320] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                Security Passkey
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#121320] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-cyber font-black text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.35)] border border-cyan-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>SYNTHESIZING PROTOCOL...</span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'AUTHENTICATE ACCESS' : 'CREATE OPERATIVE DOSSIER'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Autofill & Instant Login */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
            <button
              type="button"
              onClick={() => {
                signInWithDemo();
                handleClose();
              }}
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Demo Login (Valkyrie_99)</span>
            </button>
            <span>AES-256 Encrypted</span>
          </div>

        </div>
      </div>
    </div>
  );
}
