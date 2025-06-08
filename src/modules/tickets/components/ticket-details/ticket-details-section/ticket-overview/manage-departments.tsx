import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import React from 'react';

import { TypographyName } from './contact-info';

interface Department {
  id: number;
  name: string;
  can_delete: boolean;
}

interface ManageDepartmentProps {
  associatedDepartment: Department[];
  allDepartment: Department[];
  onDepartmentChange: (newDepartment: number | null) => void;
}

export const ManageDepartment: React.FC<ManageDepartmentProps> = ({
  associatedDepartment,
  allDepartment,
  onDepartmentChange,
}) => {
  const selectedDepartmentId = associatedDepartment[0]?.id ?? '';

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    if (value === '') {
      onDepartmentChange(null); // no department selected
    } else {
      onDepartmentChange(Number(value));
    }
  };

  return (
    <FlexBox flexDirection="column" padding="0px 20px" gap={'5px'} width="100%">
      <TypographyName variant="h6">Department</TypographyName>
      <Select
        value={selectedDepartmentId}
        onChange={handleChange}
        displayEmpty
        size="small"
      >
        <MenuItem value="">None</MenuItem>
        {allDepartment.map((dept) => (
          <MenuItem key={dept.id} value={dept.id}>
            {dept.name}
          </MenuItem>
        ))}
      </Select>
    </FlexBox>
  );
};
