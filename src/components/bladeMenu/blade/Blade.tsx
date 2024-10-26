import React from 'react';
import { Option } from '../../../app/types';

export interface BladeProps {
  menuOption: Option;
  action: (optionId: string) => void;
}

const Blade = ({ menuOption, action }: BladeProps) => {
  return (
    <div>
      <button type="button" onClick={() => action(menuOption.id)}>
        {menuOption.label}
      </button>
    </div>
  );
};

export default Blade;
