import React from 'react'

interface LoadingIndicatorProps {
    color: "Accent" | "White"
}

export default function LoadingIndicator({color} :LoadingIndicatorProps) {
	return (
		<div className={`border-t-2 border-l-2 rounded-full ${color === "White" ? "border-white" : "border-accent"} w-8 h-8 animate-spin`}></div>
	)
}