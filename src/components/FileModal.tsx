import { useState } from 'react';
import type { FileStatus, OfficeFile, OfficeLocation } from '../types';
import {
  FILE_CATEGORIES,
  generateId,
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

interface FileModalProps {
  existing?: OfficeFile | null;
  defaultLocationId?: string | null;
  locations: OfficeLocation[];
  onSave: (file: OfficeFile) => void;
  onClose: () => void;
}

export function FileModal({
  existing,
  defaultLocationId = null,
  locations,
  onSave,
  onClose,
}: FileModalProps) {
  const [sno, setSno] = useState(existing?.sno ?? '');
  const [title, setTitle] = useState(existing?.title ?? '');
  const [fileCode, setFileCode] = useState(existing?.fileCode ?? '');
  const [locationId, setLocationId] = useState(
    existing?.locationId ?? defaultLocationId ?? ''
  );
  const [positionDetail, setPositionDetail] = useState(existing?.positionDetail ?? '');
  const [category, setCategory] = useState(existing?.category ?? FILE_CATEGORIES[0]);
  const [status, setStatus] = useState<FileStatus>(existing?.status ?? 'stored');
  const [checkedOutTo, setCheckedOutTo] = useState(existing?.checkedOutTo ?? '');
  const [tagsText, setTagsText] = useState(existing?.tags.join(', ') ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');

  const locationOptions = getSortedLocationOptions(locations);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const now = new Date().toISOString();
    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const isCheckedOut = status === 'checked_out';

    onSave({
      id: existing?.id ?? generateId('file'),
      sno: sno.trim() || undefined,
      title: title.trim(),
      fileCode: fileCode.trim().toUpperCase(),
      category: category.trim() || 'General',
      locationId: locationId || null,
      positionDetail: positionDetail.trim(),
      status,
      checkedOutTo: isCheckedOut ? checkedOutTo.trim() : '',
      checkedOutAt: isCheckedOut ? existing?.checkedOutAt ?? now : null,
      tags,
      notes: notes.trim(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{existing ? 'Edit File' : 'Add File'}</DialogTitle>
          <DialogDescription>
            Enter the File Name, File Number, and where it is Stored On.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-4 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">S.No</span>
              <Input
                value={sno}
                onChange={(e) => setSno(e.target.value)}
                placeholder="e.g., 1"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">File Number</span>
              <Input
                value={fileCode}
                onChange={(e) => setFileCode(e.target.value)}
                placeholder="e.g., FIN-042"
              />
            </label>

            <label className="col-span-2 flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">File Name *</span>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., GST Returns FY 2025-26"
                required
                autoFocus
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">Stored On *</span>
              <Select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
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
                placeholder="e.g., 3rd blue binder from left"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">Category</span>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {FILE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-foreground">Status</span>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as FileStatus)}
              >
                <option value="stored">In Place</option>
                <option value="checked_out">Taken Out</option>
                <option value="archived">Archived</option>
              </Select>
            </label>

            {status === 'checked_out' ? (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">With Whom? *</span>
                <Input
                  value={checkedOutTo}
                  onChange={(e) => setCheckedOutTo(e.target.value)}
                  placeholder="e.g., Rahul"
                  required
                />
              </label>
            ) : (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">Tags</span>
                <Input
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="gst, audit"
                />
              </label>
            )}
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground">
              Notes (optional)
            </span>
            <Textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any extra clue to find this file"
            />
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{existing ? 'Save Changes' : 'Save File'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
