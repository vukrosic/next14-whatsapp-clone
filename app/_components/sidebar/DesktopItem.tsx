import clsx from 'clsx';
import Link from "next/link";
import Button from '../Button';
import Image from 'next/image';
import StatusSheet from './sheets/StatusSheet';


interface DesktopItemProps {
  button: React.ReactNode;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  button
}) => {

  return (
    <li>
      {button}
    </li>
  );
}

export default DesktopItem;