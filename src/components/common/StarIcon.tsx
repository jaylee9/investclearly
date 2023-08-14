import theme from '@/config/theme';

interface StarIconProps {
  filled?: boolean;
}

const StarIcon = ({ filled = false }: StarIconProps) => {
  return (
    <i
      className="icon-Star"
      style={{
        fontSize: '16px',
        color: filled
          ? theme.palette.secondary.main
          : theme.palette.background.paper,
      }}
    ></i>
  );
};

export default StarIcon;
