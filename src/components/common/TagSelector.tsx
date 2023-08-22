import { Box } from '@mui/material';
import { useTagSelectorStyles } from './styles';
import Input from './Input';
import { ChangeEventHandler, ReactNode, useState } from 'react';

interface TagSelectorProps {
  inputValue: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  activeTag: string;
  onClearTags: () => void;
  children: ReactNode;
}

const TagSelector = ({
  inputValue,
  onChange,
  activeTag,
  onClearTags,
  children,
}: TagSelectorProps) => {
  const classes = useTagSelectorStyles();
  const [showVariants, setShowVariants] = useState(false);
  return (
    <Box sx={classes.root}>
      <Input isSearch showClearOption value={inputValue} onChange={onChange} />
      {children}
    </Box>
  );
};

export default TagSelector;
