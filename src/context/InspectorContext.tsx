"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { sound } from "../utils/audio";

export interface ComponentMetadata {
  id: string;
  name: string;
  propsSummary?: string;
  renderTiming?: string;
  architectureNotes?: string;
  hierarchy?: string[];
  techStack?: string[];
  rect?: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

export interface InspectorContextValue {
  isInspectorActive: boolean;
  toggleInspector: () => void;
  setInspectorActive: (active: boolean) => void;
  hoveredMeta: ComponentMetadata | null;
  setHoveredMeta: (meta: ComponentMetadata | null) => void;
  selectedMeta: ComponentMetadata | null;
  setSelectedMeta: (meta: ComponentMetadata | null) => void;
}

const InspectorContext = createContext<InspectorContextValue | undefined>(undefined);

export function InspectorProvider({ children }: { children: React.ReactNode }) {
  const [isInspectorActive, setIsInspectorActive] = useState(false);
  const [hoveredMeta, setHoveredMeta] = useState<ComponentMetadata | null>(null);
  const [selectedMeta, setSelectedMeta] = useState<ComponentMetadata | null>(null);

  const toggleInspector = useCallback(() => {
    sound.playClick();
    setIsInspectorActive((prev) => {
      const next = !prev;
      if (!next) {
        setHoveredMeta(null);
        setSelectedMeta(null);
      }
      return next;
    });
  }, []);

  const setInspectorActive = useCallback((active: boolean) => {
    setIsInspectorActive(active);
    if (!active) {
      setHoveredMeta(null);
      setSelectedMeta(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      isInspectorActive,
      toggleInspector,
      setInspectorActive,
      hoveredMeta,
      setHoveredMeta,
      selectedMeta,
      setSelectedMeta,
    }),
    [isInspectorActive, toggleInspector, setInspectorActive, hoveredMeta, selectedMeta]
  );

  return <InspectorContext.Provider value={value}>{children}</InspectorContext.Provider>;
}

export function useInspector(): InspectorContextValue {
  const context = useContext(InspectorContext);
  if (!context) {
    throw new Error("useInspector must be used within an InspectorProvider");
  }
  return context;
}

