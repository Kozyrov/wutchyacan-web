import React from 'react';
import { Option } from '../../../app/types';

export interface BladeProps {
  menuOption: Option;
  action: (selectedOption: Option) => void;
}

const Blade = ({ menuOption, action }: BladeProps) => {
  return (
    <div>
      <button type="button" onClick={() => action(menuOption)}>
        {menuOption.label}
      </button>
    </div>
  );
};

export default Blade;
