// components/EllipsisText.tsx
import { Tooltip, Typography, TypographyProps } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import { useEllipsisTextStyles } from './styles';

interface EllipsisTextProps extends TypographyProps {
  text: string;
}

const EllipsisText: React.FC<EllipsisTextProps> = ({
  text,
  sx,
  ...typographyProps
}) => {
  const classes = useEllipsisTextStyles();
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsTruncated(element.offsetWidth < element.scrollWidth);
    }
  }, [text]);

  return (
    <Tooltip title={isTruncated ? text : ''}>
      <Typography
        ref={textRef}
        noWrap
        sx={{
          ...classes.root,
          ...sx,
        }}
        {...typographyProps}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

export default EllipsisText;
