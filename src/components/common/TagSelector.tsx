import { Box, Fade, InputAdornment, Typography } from '@mui/material';
import { useTagSelectorStyles } from './styles';
import Input from './Input';
import { ReactNode, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface TagSelectorProps {
  inputValue: string;
  onChange: (value: string) => void;
  activeTag: string;
  onClearTags: () => void;
  children: ReactNode;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const TagSelector = ({
  inputValue,
  onChange,
  activeTag,
  onClearTags,
  children,
  open,
  handleClose,
  handleOpen,
}: TagSelectorProps) => {
  const classes = useTagSelectorStyles();
  const ref = useRef(null);

  const onClearInput = () => {
    handleClose();
    onChange('');
    onClearTags();
  };
  useOnClickOutside(ref, handleClose);
  return (
    <Box sx={classes.root} onClick={handleOpen} ref={ref}>
      <Input
        value={inputValue}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        variant="filled"
        disabled={!!activeTag}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className="icon-Search" style={{ fontSize: 24 }}></i>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Fade in={!!inputValue || !!activeTag}>
                <InputAdornment position="end" onClick={onClearInput}>
                  <i
                    className="icon-Cross"
                    style={{ cursor: 'pointer', fontSize: 24 }}
                  ></i>
                </InputAdornment>
              </Fade>
            </InputAdornment>
          ),
        }}
      />
      <Fade in={!!activeTag}>
        <Box sx={classes.tag}>
          <Typography variant="body1" className="tag-title">
            {activeTag}
          </Typography>
        </Box>
      </Fade>
      <Fade in={open}>
        <Box sx={classes.variantsWrapper}>{children}</Box>
      </Fade>
    </Box>
  );
};

export default TagSelector;
