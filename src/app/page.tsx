"use client";
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
      <h1 className="text-3xl font-bold text-primary">
        Welcome to Smart Shopper!
      </h1>
      <p className="text-muted-foreground mt-2">
        Your intelligent shopping list app.
      </p>
    </div>
  );
}
