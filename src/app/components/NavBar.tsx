"use client"

import { useState } from 'react';
import { Menu, MessageSquare, CheckSquare, Calendar as CalendarIcon, BookText, Palette } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className={`h-screen bg-[var(--c64-tan)] border-r-2 border-[var(--c64-brown)] 
                    transition-all duration-300 flex flex-col
                    ${isNavOpen ? 'w-64' : 'w-16'}`}>
      <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="p-4 hover:bg-[var(--c64-brown)] hover:text-[var(--c64-light)]"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex-1 pt-4">
        <Link href="/chat" className="nav-item flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          {isNavOpen && 'Chat'}
        </Link>
        <Link href="/todo" className="nav-item flex items-center">
          <CheckSquare className="w-5 h-5 mr-2" />
          {isNavOpen && 'Todo List'}
        </Link>
        <Link href="/calendar" className="nav-item flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          {isNavOpen && 'Calendar'}
        </Link>
        <Link href="/journal" className="nav-item flex items-center">
          <BookText className="w-5 h-5 mr-2" />
          {isNavOpen && 'Journal'}
        </Link>
        <Link href="/ui" className="nav-item flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          {isNavOpen && 'UI Options'}
        </Link>
      </div>
    </div>
  );
} 