import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="glass p-12 rounded-3xl text-center max-w-lg space-y-6">
                        <div className="p-4 bg-orange-500/10 rounded-full w-fit mx-auto">
                            <AlertTriangle className="w-12 h-12 text-orange-400" />
                        </div>
                        <h2 className="text-2xl font-black text-white">Interface Interrupted</h2>
                        <p className="text-slate-400">
                            The dashboard encountered an unexpected state. This has been logged for our engineers.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10"
                        >
                            Refresh Interface
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
