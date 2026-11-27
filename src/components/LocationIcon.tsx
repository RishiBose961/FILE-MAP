import { Archive, Box, Building2, FolderKanban, Layers, Table2 } from 'lucide-react';
import type { LocationType } from '../types';

interface LocationIconProps {
  type: LocationType;
  size?: number;
  color?: string;
}

export function LocationIcon({ type, size = 16, color }: LocationIconProps) {
  const props = { size, style: color ? { color } : undefined };

  switch (type) {
    case 'room':
      return <Building2 {...props} />;
    case 'cabinet':
      return <Archive {...props} />;
    case 'shelf':
      return <Layers {...props} />;
    case 'drawer':
      return <FolderKanban {...props} />;
    case 'box':
      return <Box {...props} />;
    case 'desk':
      return <Table2 {...props} />;
  }
}
