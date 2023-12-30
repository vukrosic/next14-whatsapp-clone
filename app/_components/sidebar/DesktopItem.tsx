import clsx from 'clsx';
import Link from "next/link";
import Button from '../Button';
import Image from 'next/image';

interface DesktopItemProps {
  label: string;
  icon: string;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon,
  active
}) => {

  return (
    <li key={label}>
      <div className='group flex rounded-md p-2 text-sm leading-6 active:bg-slate-950'>
        <Image className='hover:cursor-pointer' src={icon} alt={label} width={24} height={24} />
      </div>
    </li>
  );
}

export default DesktopItem;