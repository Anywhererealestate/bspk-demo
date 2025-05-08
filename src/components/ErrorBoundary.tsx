import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

export type ErrorBoundaryProps = PropsWithChildren<{ fallback?: ReactNode }>;

export class ErrorBoundary extends Component<ErrorBoundaryProps, { error?: Error; errorInfo?: ErrorInfo }> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {};
    }

    componentDidCatch?(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.error) {
            return (
                this.props.fallback || (
                    <>
                        <h1>Something went wrong.</h1>
                        <p>{this.state.error.toString()}</p>
                        <p>{this.state.errorInfo?.componentStack}</p>
                    </>
                )
            );
        }

        return this.props.children;
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
