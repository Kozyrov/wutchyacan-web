import React from 'react';
import { Option } from '../../app/types';
import Blade from './blade/Blade';

interface BladeMenuProps {
  label: string;
  addOptionAction?: () => void;
  selectAction: (selectedOption: Option) => void;
  menuOptions: Option[];
}

const BladeMenu = ({
  label,
  addOptionAction,
  menuOptions,
  selectAction,
}: BladeMenuProps) => {
  const [isToggled, setIsToggled] = React.useState(true);

  return (
    <div className="flex-col">
      <div className="flex">
        <h1>{label}</h1>
        {addOptionAction && (
          <button type="button" onClick={addOptionAction}>
            add
          </button>
        )}
        <button type="button" onClick={() => setIsToggled(!isToggled)}>
          toggle
        </button>
      </div>
      {isToggled && (
        <div>
          {menuOptions.map(option => (
            <Blade key={option.id} menuOption={option} action={selectAction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BladeMenu;
