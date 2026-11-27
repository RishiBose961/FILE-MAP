import type { FileMapData, LocationType, OfficeFile, OfficeLocation } from '../types';

export const LOCATION_TYPES: { value: LocationType; label: string }[] = [
  { value: 'room', label: 'Room / Zone' },
  { value: 'cabinet', label: 'Cabinet / Almirah' },
  { value: 'shelf', label: 'Shelf / Rack' },
  { value: 'drawer', label: 'Drawer' },
  { value: 'box', label: 'Box / Carton' },
  { value: 'desk', label: 'Desk / Table' },
];

export const LOCATION_COLORS = [
  '#4f46e5', // Indigo
  '#0284c7', // Sky
  '#059669', // Emerald
  '#d97706', // Amber
  '#dc2626', // Red
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#475569', // Slate
];

export const FILE_CATEGORIES = [
  'Finance & Tax',
  'HR & Payroll',
  'Legal & Contracts',
  'Client Files',
  'Vendor & Purchase',
  'Operations',
  'Compliance',
  'Archive',
  'General',
];

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function buildLocationMap(locations: OfficeLocation[]): Map<string, OfficeLocation> {
  const map = new Map<string, OfficeLocation>();
  for (const loc of locations) {
    map.set(loc.id, loc);
  }
  return map;
}

export function getLocationPath(
  locationId: string | null,
  locationMap: Map<string, OfficeLocation>
): OfficeLocation[] {
  const chain: OfficeLocation[] = [];
  const visited = new Set<string>();
  let currentId = locationId;

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId);
    const loc = locationMap.get(currentId);
    if (!loc) break;
    chain.unshift(loc);
    currentId = loc.parentId;
  }

  return chain;
}

export function getLocationBreadcrumb(
  locationId: string | null,
  locationMap: Map<string, OfficeLocation>
): string {
  const path = getLocationPath(locationId, locationMap);
  if (path.length === 0) return 'Unassigned Location';
  return path
    .map((l) => (l.code && l.code !== l.name ? `${l.name} (${l.code})` : l.name))
    .join(' › ');
}

export function getDescendantLocationIds(
  rootId: string,
  locations: OfficeLocation[]
): Set<string> {
  const ids = new Set<string>([rootId]);
  let added = true;
  while (added) {
    added = false;
    for (const loc of locations) {
      if (loc.parentId && ids.has(loc.parentId) && !ids.has(loc.id)) {
        ids.add(loc.id);
        added = true;
      }
    }
  }
  return ids;
}

export function getSortedLocationOptions(
  locations: OfficeLocation[]
): { id: string; label: string; depth: number }[] {
  const map = buildLocationMap(locations);
  return locations
    .map((loc) => {
      const path = getLocationPath(loc.id, map);
      return {
        id: loc.id,
        label: path.map((p) => p.name).join(' › '),
        depth: path.length - 1,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatShortDate(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function matchesFileQuery(
  file: OfficeFile,
  query: string,
  locationMap: Map<string, OfficeLocation>
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const breadcrumb = getLocationBreadcrumb(file.locationId, locationMap).toLowerCase();
  const haystack = [
    file.title,
    file.fileCode,
    file.category,
    file.positionDetail,
    file.checkedOutTo,
    file.notes,
    breadcrumb,
    ...file.tags,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

export function createSampleData(): FileMapData {
  const now = new Date().toISOString();

  const locations: OfficeLocation[] = [
    {
      id: 'loc_rm_acc',
      name: 'Accounts Room',
      type: 'room',
      parentId: null,
      code: 'RM-101',
      color: '#4f46e5',
      notes: 'Main finance and audit records room',
      blueprint: { x: 20, y: 20, w: 360, h: 250 },
      openings: [
        { id: 'op_1', kind: 'door', wall: 'bottom', position: 25, width: 40 },
        { id: 'op_2', kind: 'window', wall: 'top', position: 35, width: 58 },
        { id: 'op_3', kind: 'window', wall: 'top', position: 75, width: 58 },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'loc_cab_a',
      name: 'Steel Cabinet A',
      type: 'cabinet',
      parentId: 'loc_rm_acc',
      code: 'CAB-A',
      color: '#0284c7',
      notes: 'Left wall, near window',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'loc_sh_a1',
      name: 'Top Shelf 1',
      type: 'shelf',
      parentId: 'loc_cab_a',
      code: 'SH-1',
      color: '#059669',
      notes: 'Current FY tax & GST binders',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'loc_sh_a2',
      name: 'Middle Shelf 2',
      type: 'shelf',
      parentId: 'loc_cab_a',
      code: 'SH-2',
      color: '#059669',
      notes: 'Vendor bills & bank statements',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'loc_rm_hr',
      name: 'HR & Admin Cabin',
      type: 'room',
      parentId: null,
      code: 'RM-102',
      color: '#7c3aed',
      notes: 'Employee records & legal agreements',
      blueprint: { x: 400, y: 20, w: 340, h: 250 },
      openings: [
        { id: 'op_4', kind: 'door', wall: 'left', position: 70, width: 40 },
        { id: 'op_5', kind: 'window', wall: 'right', position: 45, width: 58 },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'loc_dr_hr1',
      name: 'Locked Drawer 1',
      type: 'drawer',
      parentId: 'loc_rm_hr',
      code: 'DR-1',
      color: '#db2777',
      notes: 'Key with HR Manager',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'loc_box_arc',
      name: 'Archive Carton 04',
      type: 'box',
      parentId: 'loc_rm_hr',
      code: 'BOX-04',
      color: '#d97706',
      notes: 'Bottom rack behind reception',
      createdAt: now,
      updatedAt: now,
    },
  ];

  const files: OfficeFile[] = [
    {
      id: 'file_gst_2526',
      title: 'GST Returns & GSTR-3B Filings (FY 2025-26)',
      fileCode: 'FIN-014',
      category: 'Finance & Tax',
      locationId: 'loc_sh_a1',
      positionDetail: '2nd blue lever-arch binder from left',
      status: 'stored',
      checkedOutTo: '',
      checkedOutAt: null,
      tags: ['gst', 'tax', '2025-26', 'audit'],
      notes: 'Monthly reconciled copies with challans.',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'file_vendor_inv',
      title: 'Vendor Invoices — Q3 Hardware & Office Supplies',
      fileCode: 'VND-089',
      category: 'Vendor & Purchase',
      locationId: 'loc_sh_a2',
      positionDetail: 'Right stack, yellow plastic folder',
      status: 'stored',
      checkedOutTo: '',
      checkedOutAt: null,
      tags: ['invoices', 'vendors', 'q3'],
      notes: 'Includes signed delivery challans.',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'file_emp_contracts',
      title: 'Employee Offer Letters & NDAs (2024-2026)',
      fileCode: 'HR-021',
      category: 'HR & Payroll',
      locationId: 'loc_dr_hr1',
      positionDetail: 'Alphabetical hanging folders A-Z',
      status: 'stored',
      checkedOutTo: '',
      checkedOutAt: null,
      tags: ['hr', 'nda', 'contracts', 'confidential'],
      notes: 'Original signed copies.',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'file_office_lease',
      title: 'Office Building Lease Agreement & Floor Plan',
      fileCode: 'LEG-003',
      category: 'Legal & Contracts',
      locationId: 'loc_dr_hr1',
      positionDetail: 'Front red pouch',
      status: 'checked_out',
      checkedOutTo: 'Priya (Admin)',
      checkedOutAt: now,
      tags: ['lease', 'legal', 'property'],
      notes: 'Taken for renewal review with landlord.',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'file_old_audit',
      title: 'Statutory Audit Files (FY 2022-23)',
      fileCode: 'ARC-104',
      category: 'Archive',
      locationId: 'loc_box_arc',
      positionDetail: 'Top layer inside carton',
      status: 'archived',
      checkedOutTo: '',
      checkedOutAt: null,
      tags: ['audit', 'archive', '2022-23'],
      notes: 'Closed and sealed for 5-year retention.',
      createdAt: now,
      updatedAt: now,
    },
  ];

  return {
    version: 1,
    updatedAt: now,
    locations,
    files,
  };
}
