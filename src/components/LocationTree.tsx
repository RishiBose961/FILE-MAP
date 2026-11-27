import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Plus } from 'lucide-react';
import type { OfficeFile, OfficeLocation } from '../types';
import { getDescendantLocationIds } from '../utils/fileMapHelpers';
import { LocationIcon } from './LocationIcon';
import { cn } from '@/lib/utils';

interface LocationTreeProps {
  locations: OfficeLocation[];
  files: OfficeFile[];
  selectedLocationId: string | null;
  onSelectLocation: (id: string) => void;
  onAddChildLocation: (parentId: string) => void;
  onEditLocation: (location: OfficeLocation) => void;
}

export function LocationTree({
  locations,
  files,
  selectedLocationId,
  onSelectLocation,
  onAddChildLocation,
  onEditLocation,
}: LocationTreeProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const childrenByParent = new Map<string | null, OfficeLocation[]>();
  for (const loc of locations) {
    const list = childrenByParent.get(loc.parentId) ?? [];
    list.push(loc);
    childrenByParent.set(loc.parentId, list);
  }
  for (const [, list] of childrenByParent) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const countFilesInSubtree = (locId: string) => {
    const ids = getDescendantLocationIds(locId, locations);
    return files.filter((f) => f.locationId && ids.has(f.locationId)).length;
  };

  const renderNode = (loc: OfficeLocation, depth: number) => {
    const children = childrenByParent.get(loc.id) ?? [];
    const hasChildren = children.length > 0;
    const isCollapsed = collapsed.has(loc.id);
    const isSelected = selectedLocationId === loc.id;
    const fileCount = countFilesInSubtree(loc.id);

    return (
      <div key={loc.id}>
        <div
          style={{ paddingLeft: `${10 + depth * 18}px` }}
          onClick={() => onSelectLocation(loc.id)}
          className={cn(
            'group flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] transition-colors',
            isSelected
              ? 'bg-accent font-semibold text-accent-foreground'
              : 'text-slate-700 hover:bg-secondary'
          )}
        >
          <button
            type="button"
            onClick={(e) => toggleCollapse(loc.id, e)}
            style={{ visibility: hasChildren ? 'visible' : 'hidden' }}
            aria-label="Toggle sub-places"
            className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-slate-200/70 cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          </button>

          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: loc.color }}
          />
          <LocationIcon type={loc.type} size={15} color={loc.color} />

          <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate">
            <span className="truncate">{loc.name}</span>
            {loc.code && loc.code !== loc.name && (
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {loc.code}
              </span>
            )}
          </span>

          <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground group-hover:hidden">
            {fileCount}
          </span>

          <div
            className="hidden items-center gap-0.5 group-hover:flex"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              title="Add place inside"
              onClick={() => onAddChildLocation(loc.id)}
              className="inline-flex h-6 w-6 items-center justify-center rounded bg-card text-muted-foreground shadow-xs hover:text-primary cursor-pointer"
            >
              <Plus size={13} />
            </button>
            <button
              type="button"
              title="Edit place"
              onClick={() => onEditLocation(loc)}
              className="inline-flex h-6 w-6 items-center justify-center rounded bg-card text-muted-foreground shadow-xs hover:text-primary cursor-pointer"
            >
              <Edit2 size={13} />
            </button>
          </div>
        </div>

        {hasChildren && !isCollapsed && (
          <div>{children.map((child) => renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  const roots = childrenByParent.get(null) ?? [];

  if (roots.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">No office places yet</p>
        <p className="mt-1 text-xs">
          Click <strong>+ New Room / Place</strong> above to start mapping your office.
        </p>
      </div>
    );
  }

  return <div className="flex flex-col gap-0.5 p-2">{roots.map((r) => renderNode(r, 0))}</div>;
}
