import clsx from 'clsx';
import Link from "next/link";
import Button from '../Button';
import Image from 'next/image';
import StatusSheet from './sheets/StatusSheet';


interface DesktopItemProps {
  label: string;
  icon: string;
  active?: boolean;
  button?: React.ReactNode;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon,
  active,
  button
}) => {

  return (
    <li key={label}>
      <div className='group flex rounded-md p-2 text-sm leading-6 active:bg-slate-950'>
        {button}
      </div>
    </li>
  );
}

export default DesktopItem;