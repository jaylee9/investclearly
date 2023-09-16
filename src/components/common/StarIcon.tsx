import theme from '@/config/theme';

interface StarIconProps {
  filled?: boolean;
  fontSize?: string;
}

const StarIcon = ({ filled = false, fontSize }: StarIconProps) => {
  return (
    <i
      className="icon-Star"
      style={{
        fontSize: fontSize || '16px',
        color: filled
          ? theme.palette.secondary.main
          : theme.palette.background.paper,
      }}
    ></i>
  );
};

export default StarIcon;
