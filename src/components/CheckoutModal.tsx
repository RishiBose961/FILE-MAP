import { useState } from 'react';
import type { OfficeFile } from '../types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface CheckoutModalProps {
  file: OfficeFile;
  onConfirm: (personName: string) => void;
  onClose: () => void;
}

export function CheckoutModal({ file, onConfirm, onClose }: CheckoutModalProps) {
  const [personName, setPersonName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim()) return;
    onConfirm(personName.trim());
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Who is taking this file?</DialogTitle>
          <DialogDescription>{file.title}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground">
              Person Name / Desk *
            </span>
            <Input
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="e.g., Amit (Desk 4)"
              required
              autoFocus
            />
          </label>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm Taken Out</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
