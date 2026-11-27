import { useState } from 'react';
import { Download, FileSpreadsheet, Upload } from 'lucide-react';
import type { ExcelImportRow, OfficeLocation } from '../types';
import { FILE_CATEGORIES, getSortedLocationOptions } from '../utils/fileMapHelpers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select } from '@/components/ui/input';

interface ExcelImportModalProps {
  locations: OfficeLocation[];
  existingFileCodes: Set<string>;
  onConfirm: (options: {
    rows: ExcelImportRow[];
    locationId: string | null;
    category: string;
    skipDuplicates: boolean;
  }) => void;
  onNotify: (message: string) => void;
  onClose: () => void;
}

const SAMPLE_ROWS = [
  { sno: '1', filename: 'GST Returns FY 2025-26', fileNumber: 'FIN-014' },
  { sno: '2', filename: 'Vendor Invoices Q3', fileNumber: 'VND-089' },
  { sno: '3', filename: 'Employee Offer Letters & NDAs', fileNumber: 'HR-021' },
];

export function ExcelImportModal({
  locations,
  existingFileCodes,
  onConfirm,
  onNotify,
  onClose,
}: ExcelImportModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<ExcelImportRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [locationId, setLocationId] = useState<string>('');
  const [category, setCategory] = useState<string>(FILE_CATEGORIES[0]);
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const locationOptions = getSortedLocationOptions(locations);

  const handlePickFile = async () => {
    setError(null);
    const res = await window.fileMapApi.importExcel();
    if (res.canceled) return;
    if (res.error) {
      setError(res.error);
      return;
    }
    if (!res.rows || res.rows.length === 0) {
      setError('No rows found in this Excel/CSV file.');
      return;
    }
    setFileName(res.fileName ?? 'Uploaded Excel');
    setRows(res.rows);
  };

  const handleDownloadSample = async () => {
    const res = await window.fileMapApi.downloadSampleExcel();
    if (!res.canceled && res.filePath) {
      onNotify(`Saved sample Excel to ${res.filePath}`);
    }
  };

  const duplicateCount = (rows ?? []).filter(
    (r) => r.fileCode && existingFileCodes.has(r.fileCode.toUpperCase())
  ).length;

  const willImportCount = rows
    ? skipDuplicates
      ? rows.length - duplicateCount
      : rows.length
    : 0;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-emerald-600" />
            Upload Excel / CSV File List
          </DialogTitle>
          <DialogDescription>
            {rows
              ? `Previewing ${rows.length} rows from ${fileName}. You can leave "Stored On" empty and update it later.`
              : 'Your Excel sheet should have columns: sno, filename, and file number.'}
          </DialogDescription>
        </DialogHeader>

        {!rows ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-slate-50/80 p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  Sample Excel Format
                </span>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={handleDownloadSample}
                >
                  <Download size={12} />
                  Download Sample (.xlsx)
                </Button>
              </div>

              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="border-b border-border bg-slate-50 text-[11px] font-semibold text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">sno</th>
                      <th className="px-3 py-2">filename</th>
                      <th className="px-3 py-2">file number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SAMPLE_ROWS.map((r) => (
                      <tr key={r.sno}>
                        <td className="px-3 py-1.5 text-muted-foreground">{r.sno}</td>
                        <td className="px-3 py-1.5 font-medium text-foreground">
                          {r.filename}
                        </td>
                        <td className="px-3 py-1.5 font-semibold text-primary">
                          {r.fileNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Supports <code>.xlsx</code>, <code>.xls</code>, and <code>.csv</code>.
                You can update where each file is stored later.
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={handlePickFile}>
                <Upload size={14} />
                Choose Excel / CSV File
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">
                  Stored On (Optional — can update later)
                </span>
                <Select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                >
                  <option value="">-- Not Placed Yet (Update Later) --</option>
                  {locationOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-foreground">
                  Default Category
                </span>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {FILE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            {duplicateCount > 0 && (
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span>
                  Skip <strong>{duplicateCount}</strong> rows whose File Number already
                  exists in files.bson
                </span>
              </label>
            )}

            {/* Preview Table */}
            <div className="max-h-60 overflow-y-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="sticky top-0 border-b border-border bg-slate-50 text-[11px] font-semibold uppercase text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">S.No</th>
                    <th className="px-3 py-2">File Number</th>
                    <th className="px-3 py-2">File Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.slice(0, 50).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="px-3 py-1.5 text-muted-foreground">
                        {row.sno || idx + 1}
                      </td>
                      <td className="px-3 py-1.5 font-semibold text-primary">
                        {row.fileCode || '—'}
                      </td>
                      <td className="px-3 py-1.5 text-foreground">{row.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length > 50 && (
                <div className="border-t border-border bg-slate-50 px-3 py-1.5 text-center text-[11px] text-muted-foreground">
                  Showing first 50 of {rows.length} rows
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <Button type="button" size="sm" variant="outline" onClick={handlePickFile}>
                Choose Another File
              </Button>

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={willImportCount === 0}
                  onClick={() =>
                    onConfirm({
                      rows,
                      locationId: locationId || null,
                      category,
                      skipDuplicates,
                    })
                  }
                >
                  Import {willImportCount} Files
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
