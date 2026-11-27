import { useMemo, useState } from 'react';
import { CheckCircle2, Layers, AlertCircle } from 'lucide-react';
import type { OfficeFile, OfficeLocation } from '../types';
import { getSortedLocationOptions } from '../utils/fileMapHelpers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input, Select, Textarea } from '@/components/ui/input';

interface BulkPlaceModalProps {
  files: OfficeFile[];
  locations: OfficeLocation[];
  onConfirm: (options: {
    matchedFileIds: Set<string>;
    locationId: string | null;
    positionDetail: string;
  }) => void;
  onClose: () => void;
}

export function BulkPlaceModal({
  files,
  locations,
  onConfirm,
  onClose,
}: BulkPlaceModalProps) {
  const [numbersText, setNumbersText] = useState('');
  const [locationId, setLocationId] = useState('');
  const [positionDetail, setPositionDetail] = useState('');

  const locationOptions = getSortedLocationOptions(locations);

  const { matchedFiles, notFoundCodes } = useMemo(() => {
    const tokens = numbersText
      .split(/[,\n]+/)
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);

    const uniqueTokens = Array.from(new Set(tokens));
    const byCode = new Map<string, OfficeFile[]>();
    for (const f of files) {
      const code = f.fileCode.trim().toUpperCase();
      if (!code) continue;
      const list = byCode.get(code) ?? [];
      list.push(f);
      byCode.set(code, list);
    }

    const matched: OfficeFile[] = [];
    const seenIds = new Set<string>();
    const missing: string[] = [];

    for (const token of uniqueTokens) {
      const found = byCode.get(token);
      if (found && found.length > 0) {
        for (const f of found) {
          if (!seenIds.has(f.id)) {
            seenIds.add(f.id);
            matched.push(f);
          }
        }
      } else {
        missing.push(token);
      }
    }

    return { matchedFiles: matched, notFoundCodes: missing };
  }, [numbersText, files]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchedFiles.length === 0) return;
    onConfirm({
      matchedFileIds: new Set(matchedFiles.map((f) => f.id)),
      locationId: locationId || null,
      positionDetail: positionDetail.trim(),
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            Bulk Update &ldquo;Stored On&rdquo;
          </DialogTitle>
          <DialogDescription>
            Type or paste File Numbers separated by commas, then pick where they are
            stored.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground">
              File Numbers (comma-separated) *
            </span>
            <Textarea
              rows={3}
              value={numbersText}
              onChange={(e) => setNumbersText(e.target.value)}
              placeholder="e.g., FIN-014, FIN-015, VND-089, HR-021"
              required
              autoFocus
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">Stored On *</span>
              <Select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                required
              >
                <option value="">-- Select Place --</option>
                {locationOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">
                Exact Spot (optional)
              </span>
              <Input
                value={positionDetail}
                onChange={(e) => setPositionDetail(e.target.value)}
                placeholder="e.g., Top shelf, left side"
              />
            </label>
          </div>

          {/* Live Match Preview */}
          {numbersText.trim() && (
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-slate-50 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle2 size={14} />
                  Matched {matchedFiles.length}{' '}
                  {matchedFiles.length === 1 ? 'file' : 'files'}
                </span>
                {notFoundCodes.length > 0 && (
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                    <AlertCircle size={13} />
                    {notFoundCodes.length} not found
                  </span>
                )}
              </div>

              {matchedFiles.length > 0 && (
                <div className="max-h-32 overflow-y-auto rounded-lg border border-border bg-card p-2">
                  <div className="flex flex-col gap-1">
                    {matchedFiles.map((f) => (
                      <div key={f.id} className="flex items-center gap-2 text-[11.5px]">
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 font-bold text-primary">
                          {f.fileCode}
                        </span>
                        <span className="truncate text-foreground">{f.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {notFoundCodes.length > 0 && (
                <div className="text-[11px] text-amber-800">
                  Not found: <strong>{notFoundCodes.join(', ')}</strong>
                </div>
              )}
            </div>
          )}

          <div className="mt-1 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={matchedFiles.length === 0 || !locationId}>
              Update {matchedFiles.length}{' '}
              {matchedFiles.length === 1 ? 'File' : 'Files'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
