import Link from 'next/link';
import { Search } from '@mui/icons-material';
import {
  type ChangeEvent,
  type FC,
  type KeyboardEventHandler,
  useState,
} from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { GlobalSearchVariant } from './GlobalSearch';
import { useGlobalSearchStyles } from '../styles';
import { Box, Slide } from '@mui/material';

interface GlobalSearchInputProps {
  variant: GlobalSearchVariant;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
  searchLink: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isMobileSearchInput: boolean;
  handleChangeValue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClearInput: () => void;
  value: string | string[];
  mobileSearchInputHandler: (event: React.MouseEvent) => void;
}

export const GlobalSearchInput: FC<GlobalSearchInputProps> = ({
  variant,
  handleKeyDown,
  searchLink,
  handleChange,
  isMobileSearchInput,
  handleChangeValue,
  handleClearInput,
  value,
  mobileSearchInputHandler,
}) => {
  const [isTransitionDone, setIsTransitionDone] = useState(true);
  const mobileSearchInputButtonStyles = {
    opacity: isTransitionDone ? 1 : 0,
    transition: !isTransitionDone ? 'none' : '.25s',
  };
  const { isMobile } = useBreakpoints();
  const classes = useGlobalSearchStyles({
    variant,
  });

  const slideAnimationEndHandler = () => {
    if (isMobileSearchInput) {
      setIsTransitionDone(!isTransitionDone);
    }
    setTimeout(() => {
      setIsTransitionDone(!isTransitionDone);
    }, 250);
  };

  return (
    <Box sx={classes.searchInputWrapper}>
      {variant === GlobalSearchVariant.LARGE && (
        <Input
          variant="filled"
          isFilledWhite
          isSearch
          showClearOption={false}
          placeholder="Deals, Sponsors, and Asset Class"
          sxCustomStyles={classes.searchInput}
          height="large"
          onKeyDown={handleKeyDown}
          autoComplete="off"
          endComponent={
            isMobile ? (
              <Link href={searchLink}>
                <Button sxCustomStyles={classes.searchButton}>
                  <Search />
                </Button>
              </Link>
            ) : (
              <Link href={searchLink}>
                <Button
                  customStyles={{
                    boxSizing: 'border-box',
                    padding: '12px 40px !important',
                    height: '48px !important',
                    position: 'relative',
                    left: '5px',
                    bottom: '1px',
                  }}
                >
                  Search
                </Button>
              </Link>
            )
          }
          onChange={handleChange}
        />
      )}
      {variant === GlobalSearchVariant.SMALL ? (
        <>
          <Slide
            mountOnEnter
            unmountOnExit
            direction="right"
            in={isMobileSearchInput}
            addEndListener={slideAnimationEndHandler}
          >
            <Box sx={classes.globalSearchMobileInputWrapper}>
              <Input
                isSearch
                showClearOption
                placeholder="Search"
                variant="filled"
                onChange={handleChangeValue}
                onClear={handleClearInput}
                value={value}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              <Button variant="tertiary" onClick={mobileSearchInputHandler}>
                Cancel
              </Button>
            </Box>
          </Slide>
          <Button
            variant="dark"
            onClick={mobileSearchInputHandler}
            style={mobileSearchInputButtonStyles}
          >
            <Search />
          </Button>
        </>
      ) : (
        variant === GlobalSearchVariant.BASE && (
          <Input
            isSearch
            showClearOption
            placeholder="Search"
            variant="filled"
            onChange={handleChangeValue}
            onClear={handleClearInput}
            value={value}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        )
      )}
    </Box>
  );
};
