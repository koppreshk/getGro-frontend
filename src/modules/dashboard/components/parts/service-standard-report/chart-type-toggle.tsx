import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

interface ChartTypeToggleProps {
  value: 'pie' | 'bar';
  onChange: (value: 'pie' | 'bar') => void;
}

export const ChartTypeToggle: React.FC<ChartTypeToggleProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: 'pie' | 'bar' | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="Chart Type Toggle"
    >
      <ToggleButton
        value="pie"
        aria-label="Pie Chart"
        title="Show as Pie Chart"
      >
        <PieChartIcon />
      </ToggleButton>
      <ToggleButton
        value="bar"
        aria-label="Bar Chart"
        title="Show as Bar Chart"
      >
        <BarChartIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
