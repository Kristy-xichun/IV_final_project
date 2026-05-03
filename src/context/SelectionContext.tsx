'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type HostFilter = 'all' | 'individual' | 'small' | 'medium' | 'professional';

interface SelectionState {
  selected: Set<string>;
  hovered: string | null;
  hostFilter: HostFilter;
  toggleSelected: (name: string) => void;
  clearSelected: () => void;
  setHovered: (name: string | null) => void;
  setHostFilter: (filter: HostFilter) => void;
  resetAll: () => void;
}

const SelectionContext = createContext<SelectionState | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const [hostFilter, setHostFilter] = useState<HostFilter>('all');

  const toggleSelected = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const clearSelected = () => setSelected(new Set());

  const resetAll = () => {
    setSelected(new Set());
    setHovered(null);
    setHostFilter('all');
  };

  return (
    <SelectionContext.Provider value={{
      selected, hovered, hostFilter,
      toggleSelected, clearSelected, setHovered, setHostFilter, resetAll
    }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider');
  return ctx;
}
