import { useEffect, useMemo, useRef, useState } from 'react';
import {
  DoorOpen,
  Edit2,
  FileText,
  Grid,
  MapPin,
  Move,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import type {
  BlueprintRect,
  LocationType,
  OfficeFile,
  OfficeLocation,
  RoomOpening,
  WallSide,
} from '../types';
import {
  buildLocationMap,
  generateId,
  getDescendantLocationIds,
  getLocationBreadcrumb,
  matchesFileQuery,
} from '../utils/fileMapHelpers';
import { LocationIcon } from './LocationIcon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface OfficeBlueprintProps {
  locations: OfficeLocation[];
  files: OfficeFile[];
  selectedLocationId: string | null;
  searchQuery: string;
  onSelectLocation: (id: string) => void;
  onUpdateLocationRect: (id: string, rect: BlueprintRect) => void;
  onUpdateLocationOpenings: (id: string, openings: RoomOpening[]) => void;
  onAutoArrange: (updates: { id: string; rect: BlueprintRect }[]) => void;
  onAddPlace: (type?: LocationType, parentId?: string | null) => void;
  onEditLocation: (loc: OfficeLocation) => void;
  onAddFileHere: (locationId: string) => void;
  onEditFile: (file: OfficeFile) => void;
}

const GRID = 20;

function snap(val: number): number {
  return Math.max(0, Math.round(val / GRID) * GRID);
}

function getDefaultSize(type: LocationType): { w: number; h: number } {
  switch (type) {
    case 'room':
      return { w: 340, h: 240 };
    case 'cabinet':
      return { w: 140, h: 90 };
    case 'desk':
      return { w: 150, h: 80 };
    case 'shelf':
      return { w: 130, h: 70 };
    case 'drawer':
      return { w: 120, h: 65 };
    case 'box':
      return { w: 110, h: 70 };
  }
}

function getFallbackRect(loc: OfficeLocation, index: number): BlueprintRect {
  if (loc.blueprint) return loc.blueprint;
  const size = getDefaultSize(loc.type);
  if (loc.type === 'room') {
    const col = index % 2;
    const row = Math.floor(index / 2);
    return { x: 20 + col * 380, y: 20 + row * 280, ...size };
  }
  const col = index % 4;
  const row = Math.floor(index / 4);
  return { x: 40 + col * 170, y: 60 + row * 120, ...size };
}

function RoomOpeningSymbol({
  opening,
  roomWidth,
  roomHeight,
}: {
  opening: RoomOpening;
  roomWidth: number;
  roomHeight: number;
}) {
  const isHorizontal = opening.wall === 'top' || opening.wall === 'bottom';
  const wallLen = isHorizontal ? roomWidth : roomHeight;
  const maxOffset = Math.max(16, wallLen - opening.width - 12);
  const offset = 6 + (opening.position / 100) * maxOffset;
  const size = opening.width;

  if (opening.kind === 'window') {
    const style: React.CSSProperties =
      opening.wall === 'top'
        ? { left: offset, top: -4, width: size, height: 8 }
        : opening.wall === 'bottom'
        ? { left: offset, bottom: -4, width: size, height: 8 }
        : opening.wall === 'left'
        ? { top: offset, left: -4, width: 8, height: size }
        : { top: offset, right: -4, width: 8, height: size };

    return (
      <div
        style={style}
        title={`Window (${opening.wall} wall)`}
        className="pointer-events-none absolute z-20 flex items-center justify-center rounded-[2px] border border-sky-600 bg-sky-100"
      >
        <div
          className={cn(
            'bg-sky-500/70',
            isHorizontal ? 'h-0.5 w-full' : 'h-full w-0.5'
          )}
        />
      </div>
    );
  }

  // Architectural Door with quarter-circle swing arc pointing inward
  const doorSize = size;
  let containerStyle: React.CSSProperties = {};
  let gapStyle: React.CSSProperties = {};
  let pathD = '';
  let leafLine: { x1: number; y1: number; x2: number; y2: number } = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };

  if (opening.wall === 'top') {
    containerStyle = { left: offset, top: -2, width: doorSize, height: doorSize + 2 };
    gapStyle = { left: 0, top: 0, width: doorSize, height: 4 };
    leafLine = { x1: 0, y1: 2, x2: 0, y2: doorSize };
    pathD = `M 0 ${doorSize} A ${doorSize} ${doorSize} 0 0 0 ${doorSize} 2`;
  } else if (opening.wall === 'bottom') {
    containerStyle = { left: offset, bottom: -2, width: doorSize, height: doorSize + 2 };
    gapStyle = { left: 0, bottom: 0, width: doorSize, height: 4 };
    leafLine = { x1: 0, y1: doorSize, x2: 0, y2: 2 };
    pathD = `M 0 2 A ${doorSize} ${doorSize} 0 0 1 ${doorSize} ${doorSize}`;
  } else if (opening.wall === 'left') {
    containerStyle = { top: offset, left: -2, width: doorSize + 2, height: doorSize };
    gapStyle = { top: 0, left: 0, width: 4, height: doorSize };
    leafLine = { x1: 2, y1: 0, x2: doorSize, y2: 0 };
    pathD = `M ${doorSize} 0 A ${doorSize} ${doorSize} 0 0 1 2 ${doorSize}`;
  } else {
    containerStyle = { top: offset, right: -2, width: doorSize + 2, height: doorSize };
    gapStyle = { top: 0, right: 0, width: 4, height: doorSize };
    leafLine = { x1: doorSize, y1: 0, x2: 2, y2: 0 };
    pathD = `M 2 0 A ${doorSize} ${doorSize} 0 0 0 ${doorSize} ${doorSize}`;
  }

  return (
    <div
      style={containerStyle}
      title={`Door (${opening.wall} wall)`}
      className="pointer-events-none absolute z-20"
    >
      <div style={gapStyle} className="absolute bg-[#f8fbff]" />
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${doorSize + 2} ${doorSize + 2}`}
        className="overflow-visible"
      >
        <path
          d={pathD}
          fill="none"
          stroke="#b45309"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1={leafLine.x1}
          y1={leafLine.y1}
          x2={leafLine.x2}
          y2={leafLine.y2}
          stroke="#b45309"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function OfficeBlueprint({
  locations,
  files,
  selectedLocationId,
  searchQuery,
  onSelectLocation,
  onUpdateLocationRect,
  onUpdateLocationOpenings,
  onAutoArrange,
  onAddPlace,
  onEditLocation,
  onAddFileHere,
  onEditFile,
}: OfficeBlueprintProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const locationMap = useMemo(() => buildLocationMap(locations), [locations]);

  const blueprintItems = useMemo(() => {
    const rooms = locations.filter((l) => l.type === 'room');
    const furniture = locations.filter((l) => {
      if (l.type === 'room') return false;
      if (!l.parentId) return true;
      const parent = locationMap.get(l.parentId);
      return !parent || parent.type === 'room';
    });
    return [...rooms, ...furniture];
  }, [locations, locationMap]);

  const [dragState, setDragState] = useState<{
    id: string;
    mode: 'move' | 'resize';
    startX: number;
    startY: number;
    origRect: BlueprintRect;
    currentRect: BlueprintRect;
  } | null>(null);

  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;

      if (dragState.mode === 'move') {
        setDragState((prev) =>
          prev
            ? {
                ...prev,
                currentRect: {
                  ...prev.origRect,
                  x: snap(prev.origRect.x + dx),
                  y: snap(prev.origRect.y + dy),
                },
              }
            : null
        );
      } else {
        setDragState((prev) =>
          prev
            ? {
                ...prev,
                currentRect: {
                  ...prev.origRect,
                  w: Math.max(100, snap(prev.origRect.w + dx)),
                  h: Math.max(60, snap(prev.origRect.h + dy)),
                },
              }
            : null
        );
      }
    };

    const handleMouseUp = () => {
      if (
        dragState.currentRect.x !== dragState.origRect.x ||
        dragState.currentRect.y !== dragState.origRect.y ||
        dragState.currentRect.w !== dragState.origRect.w ||
        dragState.currentRect.h !== dragState.origRect.h
      ) {
        onUpdateLocationRect(dragState.id, dragState.currentRect);
      }
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, onUpdateLocationRect]);

  const getRect = (loc: OfficeLocation, idx: number): BlueprintRect => {
    if (dragState && dragState.id === loc.id) {
      return dragState.currentRect;
    }
    return getFallbackRect(loc, idx);
  };

  const handleAutoArrangeClick = () => {
    const rooms = blueprintItems.filter((l) => l.type === 'room');
    const others = blueprintItems.filter((l) => l.type !== 'room');
    const updates: { id: string; rect: BlueprintRect }[] = [];

    rooms.forEach((room, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const rx = 20 + col * 380;
      const ry = 20 + row * 280;
      updates.push({ id: room.id, rect: { x: rx, y: ry, w: 340, h: 240 } });

      const children = others.filter((o) => o.parentId === room.id);
      children.forEach((child, ci) => {
        const cCol = ci % 2;
        const cRow = Math.floor(ci / 2);
        const size = getDefaultSize(child.type);
        updates.push({
          id: child.id,
          rect: {
            x: rx + 20 + cCol * 155,
            y: ry + 45 + cRow * 100,
            ...size,
          },
        });
      });
    });

    const orphans = others.filter(
      (o) => !o.parentId || !rooms.some((r) => r.id === o.parentId)
    );
    const startY = rooms.length > 0 ? Math.ceil(rooms.length / 2) * 280 + 40 : 20;
    orphans.forEach((o, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const size = getDefaultSize(o.type);
      updates.push({
        id: o.id,
        rect: { x: 20 + col * 170, y: startY + row * 110, ...size },
      });
    });

    onAutoArrange(updates);
  };

  const selectedLoc = selectedLocationId ? locationMap.get(selectedLocationId) ?? null : null;
  const selectedChildPlaces = useMemo(
    () => (selectedLoc ? locations.filter((l) => l.parentId === selectedLoc.id) : []),
    [selectedLoc, locations]
  );
  const selectedFiles = useMemo(() => {
    if (!selectedLoc) return [];
    const ids = getDescendantLocationIds(selectedLoc.id, locations);
    return files.filter((f) => f.locationId && ids.has(f.locationId));
  }, [selectedLoc, locations, files]);

  const handleAddOpening = (kind: 'door' | 'window') => {
    if (!selectedLoc) return;
    const current = selectedLoc.openings ?? [];
    const next: RoomOpening = {
      id: generateId('op'),
      kind,
      wall: kind === 'door' ? 'bottom' : 'top',
      position: 50,
      width: kind === 'door' ? 40 : 58,
    };
    onUpdateLocationOpenings(selectedLoc.id, [...current, next]);
  };

  const handleUpdateOpening = (
    openingId: string,
    patch: Partial<RoomOpening>
  ) => {
    if (!selectedLoc) return;
    const current = selectedLoc.openings ?? [];
    onUpdateLocationOpenings(
      selectedLoc.id,
      current.map((o) => (o.id === openingId ? { ...o, ...patch } : o))
    );
  };

  const handleDeleteOpening = (openingId: string) => {
    if (!selectedLoc) return;
    const current = selectedLoc.openings ?? [];
    onUpdateLocationOpenings(
      selectedLoc.id,
      current.filter((o) => o.id !== openingId)
    );
  };

  const doorCount = (selectedLoc?.openings ?? []).filter((o) => o.kind === 'door').length;
  const windowCount = (selectedLoc?.openings ?? []).filter((o) => o.kind === 'window').length;

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Blueprint Canvas Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-card px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Grid size={14} className="text-primary" />
              Office Floor Blueprint
            </span>
            <div className="hidden items-center gap-3 text-[11px] text-muted-foreground sm:flex">
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-2 w-4 rounded-[1px] border border-sky-600 bg-sky-100" />
                Window
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="inline-block h-2.5 w-2.5 rounded-tr-full border-t border-r border-dashed border-amber-700" />
                Door
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              size="xs"
              variant="outline"
              onClick={() => onAddPlace('room', null)}
            >
              <Plus size={12} />
              Room
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                onAddPlace(
                  'cabinet',
                  selectedLoc?.type === 'room' ? selectedLoc.id : null
                )
              }
            >
              <Plus size={12} />
              Cupboard
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                onAddPlace(
                  'desk',
                  selectedLoc?.type === 'room' ? selectedLoc.id : null
                )
              }
            >
              <Plus size={12} />
              Desk
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() =>
                onAddPlace(
                  'box',
                  selectedLoc?.type === 'room' ? selectedLoc.id : null
                )
              }
            >
              <Plus size={12} />
              Box
            </Button>
            <Button
              size="xs"
              variant="secondary"
              onClick={handleAutoArrangeClick}
              title="Neatly arrange all rooms and cupboards on the grid"
            >
              <RotateCcw size={12} />
              Auto-Arrange
            </Button>
          </div>
        </div>

        {/* Scrollable Blueprint Grid */}
        <div className="relative flex-1 overflow-auto bg-[#f0f6ff] p-4">
          {blueprintItems.length === 0 ? (
            <Card className="mx-auto mt-12 flex max-w-md flex-col items-center gap-3 border-dashed p-8 text-center">
              <MapPin size={28} className="text-primary" />
              <h3 className="text-base font-bold">Draw Your Office Blueprint</h3>
              <p className="text-xs text-muted-foreground">
                Add Rooms (with Doors & Windows), Cupboards, Desks, or Boxes, then drag
                them into place to match your real office.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onAddPlace('room', null)}>
                  <Plus size={14} />
                  Add Room
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddPlace('cabinet', null)}
                >
                  <Plus size={14} />
                  Add Cupboard
                </Button>
              </div>
            </Card>
          ) : (
            <div
              ref={canvasRef}
              className="relative min-h-170 min-w-230 rounded-xl border-2 border-sky-200 bg-[#f8fbff] shadow-inner"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(14, 165, 233, 0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.10) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {blueprintItems.map((loc, idx) => {
                const rect = getRect(loc, idx);
                const isRoom = loc.type === 'room';
                const isSelected = selectedLocationId === loc.id;
                const subtreeIds = getDescendantLocationIds(loc.id, locations);
                const locFiles = files.filter(
                  (f) => f.locationId && subtreeIds.has(f.locationId)
                );
                const searchMatches = searchQuery.trim()
                  ? locFiles.filter((f) =>
                      matchesFileQuery(f, searchQuery, locationMap)
                    ).length
                  : 0;

                return (
                  <div
                    key={loc.id}
                    style={{
                      left: rect.x,
                      top: rect.y,
                      width: rect.w,
                      height: rect.h,
                      zIndex: isRoom ? (isSelected ? 5 : 1) : isSelected ? 30 : 15,
                      borderColor: isSelected ? '#4f46e5' : loc.color,
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      onSelectLocation(loc.id);
                      setDragState({
                        id: loc.id,
                        mode: 'move',
                        startX: e.clientX,
                        startY: e.clientY,
                        origRect: rect,
                        currentRect: rect,
                      });
                    }}
                    className={cn(
                      'absolute select-none rounded-lg transition-shadow',
                      isRoom
                        ? 'border-[3px] bg-white/65 backdrop-blur-[1px]'
                        : 'border-2 bg-white shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing',
                      isSelected && 'ring-3 ring-primary/25 shadow-md',
                      searchMatches > 0 &&
                        'ring-4 ring-amber-400/70 border-amber-500'
                    )}
                  >
                    {/* Doors & Windows on Room walls */}
                    {isRoom &&
                      (loc.openings ?? []).map((opening) => (
                        <RoomOpeningSymbol
                          key={opening.id}
                          opening={opening}
                          roomWidth={rect.w}
                          roomHeight={rect.h}
                        />
                      ))}

                    {/* Header bar */}
                    <div
                      className={cn(
                        'flex items-center justify-between gap-1.5 px-2.5 py-1.5',
                        isRoom
                          ? 'border-b border-dashed border-sky-200/80'
                          : 'border-b border-slate-100'
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-1.5">
                        <LocationIcon type={loc.type} size={14} color={loc.color} />
                        <span className="truncate text-xs font-bold text-slate-800">
                          {loc.name}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {locFiles.length}
                      </span>
                    </div>

                    {/* Body */}
                    {!isRoom && (
                      <div className="flex flex-col justify-between p-2 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1 capitalize">
                          <Move size={10} className="text-slate-400" />
                          <span>{loc.type === 'cabinet' ? 'Cupboard' : loc.type}</span>
                        </div>
                        {searchMatches > 0 && (
                          <div className="mt-1 inline-flex self-start rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                            {searchMatches} match{searchMatches > 1 ? 'es' : ''}
                          </div>
                        )}
                      </div>
                    )}

                    {isRoom && searchMatches > 0 && (
                      <div className="m-2 inline-flex rounded bg-amber-100 px-2 py-0.5 text-[10.5px] font-bold text-amber-800">
                        {searchMatches} matching file{searchMatches > 1 ? 's' : ''} inside
                      </div>
                    )}

                    {/* Resize Handle */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        onSelectLocation(loc.id);
                        setDragState({
                          id: loc.id,
                          mode: 'resize',
                          startX: e.clientX,
                          startY: e.clientY,
                          origRect: rect,
                          currentRect: rect,
                        });
                      }}
                      title="Drag to resize"
                      className="absolute bottom-0 right-0 z-30 h-3.5 w-3.5 cursor-nwse-resize rounded-tl bg-slate-300/70 hover:bg-primary/60"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Inspector Panel */}
      <aside className="flex w-80 shrink-0 flex-col border-l border-border bg-card">
        {selectedLoc ? (
          <>
            <div className="border-b border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${selectedLoc.color}18` }}
                  >
                    <LocationIcon
                      type={selectedLoc.type}
                      size={18}
                      color={selectedLoc.color}
                    />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      {getLocationBreadcrumb(selectedLoc.id, locationMap)}
                    </div>
                    <h3 className="text-base font-bold">{selectedLoc.name}</h3>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEditLocation(selectedLoc)}
                  title="Edit place"
                >
                  <Edit2 size={14} />
                </Button>
              </div>

              {selectedLoc.notes && (
                <p className="mt-2 text-xs text-muted-foreground">{selectedLoc.notes}</p>
              )}

              <div className="mt-3 flex gap-2">
                <Button
                  size="xs"
                  className="flex-1"
                  onClick={() => onAddFileHere(selectedLoc.id)}
                >
                  <Plus size={13} />
                  Add File Here
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => onAddPlace('shelf', selectedLoc.id)}
                >
                  <Plus size={13} />
                  Add Shelf
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {/* Doors & Windows section for Rooms */}
              {selectedLoc.type === 'room' && (
                <div className="mb-4 rounded-xl border border-border bg-slate-50/80 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        Doors & Windows
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {doorCount} {doorCount === 1 ? 'Door' : 'Doors'}, {windowCount}{' '}
                        {windowCount === 1 ? 'Window' : 'Windows'}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleAddOpening('door')}
                      >
                        <DoorOpen size={12} />
                        + Door
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleAddOpening('window')}
                      >
                        + Window
                      </Button>
                    </div>
                  </div>

                  {(selectedLoc.openings ?? []).length > 0 && (
                    <div className="mt-2.5 flex flex-col gap-2">
                      {(selectedLoc.openings ?? []).map((op, i) => (
                        <div
                          key={op.id}
                          className="rounded-lg border border-border bg-card p-2 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold capitalize text-foreground">
                              {op.kind} #{i + 1}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <Select
                                value={op.wall}
                                onChange={(e) =>
                                  handleUpdateOpening(op.id, {
                                    wall: e.target.value as WallSide,
                                  })
                                }
                                className="h-7 w-24 px-2 text-[11px]"
                              >
                                <option value="top">Top Wall</option>
                                <option value="bottom">Bottom</option>
                                <option value="left">Left Wall</option>
                                <option value="right">Right Wall</option>
                              </Select>
                              <button
                                type="button"
                                onClick={() => handleDeleteOpening(op.id)}
                                title="Remove"
                                className="inline-flex h-6 w-6 items-center justify-center rounded text-slate-400 hover:bg-red-50 hover:text-destructive cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-[11px] text-muted-foreground">
                              Position
                            </span>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={op.position}
                              onChange={(e) =>
                                handleUpdateOpening(op.id, {
                                  position: Number(e.target.value),
                                })
                              }
                              className="h-1.5 flex-1 accent-primary cursor-pointer"
                            />
                            <span className="w-8 text-right text-[11px] font-medium text-slate-600">
                              {op.position}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedChildPlaces.length > 0 && (
                <div className="mb-4">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Inside {selectedLoc.name} ({selectedChildPlaces.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedChildPlaces.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onSelectLocation(child.id)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-slate-50 px-2 py-1 text-xs font-medium hover:bg-secondary cursor-pointer"
                      >
                        <LocationIcon type={child.type} size={12} color={child.color} />
                        {child.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Files Stored Here ({selectedFiles.length})
              </div>

              {selectedFiles.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  No files stored here yet.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {selectedFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => onEditFile(file)}
                      className="cursor-pointer rounded-lg border border-border bg-slate-50/70 p-2.5 transition-colors hover:bg-secondary/70"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                          <FileText size={12} />
                          {file.fileCode || 'NO CODE'}
                        </span>
                        <Badge
                          variant={
                            file.status === 'checked_out' ? 'warning' : 'success'
                          }
                        >
                          {file.status === 'checked_out'
                            ? `With ${file.checkedOutTo}`
                            : 'In Place'}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-foreground">
                        {file.title}
                      </div>
                      {file.positionDetail && (
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          Spot: {file.positionDetail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-xs text-muted-foreground">
            <MapPin size={24} className="mb-2 text-slate-400" />
            Click any Room, Cupboard, or Desk on the blueprint to see its files, doors,
            and windows.
          </div>
        )}
      </aside>
    </div>
  );
}
