import { useState } from 'react';
import type { LocationType, OfficeLocation } from '../types';
import {
  LOCATION_COLORS,
  LOCATION_TYPES,
  generateId,
  getDescendantLocationIds,
  getSortedLocationOptions,
} from '../utils/fileMapHelpers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input, Select, Textarea } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LocationModalProps {
  existing?: OfficeLocation | null;
  defaultParentId?: string | null;
  defaultType?: LocationType;
  locations: OfficeLocation[];
  onSave: (location: OfficeLocation) => void;
  onClose: () => void;
}

export function LocationModal({
  existing,
  defaultParentId = null,
  defaultType,
  locations,
  onSave,
  onClose,
}: LocationModalProps) {
  const [code, setCode] = useState(existing?.code || existing?.name || '');
  const [type, setType] = useState<LocationType>(
    existing?.type ?? defaultType ?? (defaultParentId ? 'shelf' : 'room')
  );
  const [parentId, setParentId] = useState<string>(
    existing?.parentId ?? defaultParentId ?? ''
  );
  const [color, setColor] = useState(existing?.color ?? LOCATION_COLORS[0]);
  const [notes, setNotes] = useState(existing?.notes ?? '');

  const blockedIds = existing
    ? getDescendantLocationIds(existing.id, locations)
    : new Set<string>();
  const parentOptions = getSortedLocationOptions(locations).filter(
    (opt) => !blockedIds.has(opt.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCode = code.trim().toUpperCase();
    if (!formattedCode) return;

    const now = new Date().toISOString();
    onSave({
      id: existing?.id ?? generateId('loc'),
      name: formattedCode,
      type,
      parentId: parentId || null,
      code: formattedCode,
      color,
      notes: notes.trim(),
      blueprint: existing?.blueprint,
      openings: existing?.openings,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>
            {existing ? 'Edit Office Place' : 'Add Office Place'}
          </DialogTitle>
          <DialogDescription>
            Enter a Short Code for the Room, Cabinet, Shelf, Drawer, or Box.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground">Short Code *</span>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g., CAB-A, RM-101, SH-2"
              required
              autoFocus
            />
          </label>

          <div className="grid grid-cols-3 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">Type</span>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as LocationType)}
              >
                {LOCATION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </Select>
            </label>

            <label className="col-span-2 flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">
                Inside Which Place?
              </span>
              <Select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option value="">Main / Top-Level Place</option>
                {parentOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground">Color Label</span>
            <div className="flex items-center gap-2">
              {LOCATION_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Select color ${c}`}
                  style={{ backgroundColor: c }}
                  className={cn(
                    'h-6 w-6 rounded-full border-2 border-transparent transition-transform cursor-pointer',
                    color === c && 'scale-115 border-slate-900 ring-2 ring-slate-900/15'
                  )}
                />
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground">
              Extra Clue (optional)
            </span>
            <Textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Left wall near window, key with Admin"
            />
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {existing ? 'Save Changes' : 'Save Place'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
