import Popover from '@mui/material/Popover';
import { PopoverProps } from '@mui/material/Popover';
import { ReactNode, useState } from 'react';
import theme from '@/config/theme';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface CustomPopoverProps extends Omit<PopoverProps, 'open'> {
  trigger: ReactNode;
  children: ReactNode;
  popoverId?: string;
  open: boolean;
  handleClose: () => void;
}

const CustomPopover = ({
  trigger,
  children,
  popoverId,
  open,
  handleClose,
  ...props
}: CustomPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    handleClose();
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl) && open;
  const id = open ? popoverId || 'popover' : undefined;
  const { palette, customShadows } = theme;
  return (
    <>
      <div aria-describedby={id} onClick={handleClick}>
        {trigger}
      </div>
      <Popover
        className={inter.className}
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: props.anchorOrigin?.vertical || 'bottom',
          horizontal: props.anchorOrigin?.horizontal || 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            background: palette.common.white,
            paddingY: '8px',
            borderRadius: '12px',
            boxShadow: customShadows.base,
          },
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default CustomPopover;
