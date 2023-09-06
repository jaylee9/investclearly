import theme from '@/config/theme';
import { SelectVariant } from './Select';
import { AccordionVariant } from './Accordion';

const { palette, typography, customShadows } = theme;

interface UseInputStylesProps {
  variant: 'filled' | 'outlined';
  errorText?: string;
  error?: boolean;
  isFilledWhite: boolean;
  height: 'base' | 'large';
}

export const useInputStyles = ({
  variant,
  errorText,
  error,
  isFilledWhite,
  height,
}: UseInputStylesProps) => {
  return {
    filled: {
      width: '100%',
      borderRadius: '120px',
      '& .MuiOutlinedInput-root': {
        background: isFilledWhite
          ? palette.common.white
          : palette.background.default,
        borderRadius: '120px',
        border: `1px solid ${palette.background.default}`,
        transition: 'border 0.3s ease-in-out',
      },
    },
    outlined: {
      width: '100%',
      borderRadius: '12px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        border: `1px solid ${
          errorText || error ? palette.error.light : palette.background.default
        } ${errorText || error ? '!important' : ''}`,
        transition: 'border 0.3s ease-in-out',
        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
          {
            padding: '0px',
            borderRadius: 0,
            marginLeft: '15px',
          },
      },
    },
    root: {
      position: 'relative',
      '& .MuiInputBase-root': {
        height: height === 'base' ? '44px' : '56px',
        fontSize: typography.body1,
        border:
          variant === 'outlined' ? `1px solid ${palette.secondary.dark}` : '',
      },
      '& fieldset': {
        border: 'none',
      },
      '& .MuiOutlinedInput-root:hover': {
        border: `1px solid ${palette.secondary.dark}`,
      },
      '& .MuiOutlinedInput-root.Mui-focused': {
        border: `1px solid ${palette.primary.light}`,
        background: palette.common.white,
      },
      '& .MuiFormHelperText-root': {
        color: palette.error.light,
        fontSize: typography.caption,
        position: 'absolute',
        bottom: '-20px',
      },
    },
  };
};

interface UseCheckboxProps {
  error?: boolean;
}

export const useCheckboxStyles = ({ error }: UseCheckboxProps) => {
  return {
    root: {
      '&.MuiCheckbox-root': {
        padding: 0,
        marginRight: '12px',
        color: error ? palette.error.light : palette.text.disabled,
        '&:hover': {
          color: palette.secondary.dark,
        },
        '&:active': {
          color: palette.text.secondary,
        },
        '&.Mui-disabled': {
          color: palette.background.paper,
        },
        '&.Mui-checked': {
          color: palette.primary.light,
          '&:hover': {
            color: palette.primary.dark,
          },
          '&:active': {
            color: palette.primary.main,
          },
          '&.Mui-disabled': {
            color: palette.background.paper,
          },
        },
      },
    },
  };
};

interface UseButtonStylesProps {
  color: 'primary' | 'error';
  variant: 'main' | 'secondary' | 'tertiary' | 'white' | 'auth';
}

const disabledButtonBackground = {
  main: palette.text.disabled,
  secondary: palette.background.default,
  tertiary: 'transparent',
  white: palette.common.white,
  auth: 'transparent',
};
const disabledButtonColor = {
  main: palette.common.white,
  secondary: palette.text.disabled,
  tertiary: palette.text.disabled,
  white: palette.common.white,
  auth: palette.text.disabled,
};

export const useButtonStyles = ({ color, variant }: UseButtonStylesProps) => {
  return {
    main: {
      background: palette[color].light,
      color: palette.common.white,
      '&:hover': {
        background: palette[color].dark,
      },
      '&:active': {
        background: palette[color].main,
      },
    },
    secondary: {
      color: palette[color].light,
      background: palette[color].contrastText,
      '&:hover': {
        background: palette[color].contrastText,
        color: palette[color].dark,
      },
      '&:active': {
        color: palette[color].main,
      },
    },
    tertiary: {
      background: 'transparent',
      color: palette[color].light,
      '&:hover': {
        background: 'transparent',
        color: palette[color].dark,
      },
      '&:active': {
        color: palette[color].main,
      },
    },
    white: {
      background: palette.common.white,
      color: palette[color].light,
      '&:hover': {
        background: palette.common.white,
        color: palette[color].dark,
      },
      '&:active': {
        color: palette[color].main,
      },
    },
    auth: {
      background: 'transparent',
      color: palette.common.black,
      border: `1px solid ${palette.secondary.dark}`,
      '&:hover': {
        background: 'transparent',
        border: `1px solid ${palette.background.paper}`,
      },
      '&:active': {
        background: palette.background.default,
        border: `1px solid ${palette.secondary.dark}`,
      },
    },
    root: {
      fontSize: typography.body1,
      fontWeight: 600,
      paddingX: '24px',
      paddingY: '12px',
      borderRadius: '48px',
      height: '44px',
      textTransform: 'none',
      '&.Mui-disabled': {
        background: disabledButtonBackground[variant],
        color: disabledButtonColor[variant],
      },
    },
  };
};

export const useDealCardStyles = () => {
  return {
    baseDealCardContent: {
      padding: '16px 20px',
    },
    baseDealName: {
      fontWeight: 600,
      maxWidth: '190px',
    },
    baseDealLocation: {
      color: theme.palette.text.secondary,
      marginBottom: '12px',
    },
    baseDealDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.palette.text.secondary,
      '& i': {
        fontSize: '24px',
        color: theme.palette.primary.light,
      },
    },
    largeRoot: {
      display: 'flex',
      borderRadius: '12px',
      width: '100%',
      background: palette.common.white,
      gap: '16px',
      alignItems: 'stretch',
      '& img': {
        borderRadius: '12px 0px 0px 12px',
        height: 'auto',
      },
    },
    largeContent: {
      padding: '24px 24px 24px 0px',
      boxSizing: 'border-box',
      width: '100%',
    },
    largeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      '& i': {
        fontSize: '24px',
        color: palette.text.secondary,
        cursor: 'pointer',
      },
    },
    largeHeaderLeftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    largeDealTitle: { fontWeight: 600, maxWidth: '700px' },
    promoted: {
      padding: '4px 12px',
      color: palette.common.white,
      borderRadius: '12px',
      background: palette.secondary.main,
      fontWeight: 600,
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
    },
    sponsorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: palette.text.secondary,
    },
    sponsorRating: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      '& .icon-Star': {
        fontSize: '12px',
        color: palette.secondary.main,
      },
      color: palette.secondary.main,
      '& span': {
        '&:last-child': {
          color: palette.text.secondary,
        },
      },
    },
    sponsorProperties: {
      display: 'flex',
    },
    sponsorPropertiesColumn: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    sponsorProperty: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      '& i': {
        fontSize: '24px',
        color: palette.primary.light,
      },
    },
  };
};

interface UseSelectStylesProps {
  variant: SelectVariant;
}

export const useSelectStyles = ({ variant }: UseSelectStylesProps) => {
  return {
    root: {
      color:
        variant === SelectVariant.Light
          ? palette.text.disabled
          : palette.common.black,
      paddingRight: '12px',
      fontSize: '15px',
      borderRadius: '12px',
      width: '100%',
      height: '44px',
      boxShadow: 'none',
      border: 'none',
      background: palette.common.white,
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: palette.secondary.dark,
        borderWidth: '1px',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: palette.primary.light,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.background.paper}`,
      },
    },
    menuPaper: {
      '& .MuiPaper-root': {
        background: palette.common.white,
        borderRadius: '12px',
        border: `1px solid ${palette.background.default}`,
        marginTop: '4px',
        '& ul': {
          padding: '0px',
        },
        '& li': {
          padding: '6px 24px',
          '&:hover': {
            background: palette.background.default,
          },
        },
        '& .Mui-disabled': {
          display: 'none',
        },
      },
    },
  };
};

export const useAccordionStyles = ({
  variant,
}: {
  variant: AccordionVariant;
}) => {
  const background =
    variant === 'primary' ? palette.common.white : 'transparent';
  const padding = variant === 'primary' ? '0px 16px' : '0';
  const borderBottom =
    variant === 'primary' ? `1px solid ${palette.background.paper}` : 'none';

  return {
    root: {
      width: '100%',
      background,
      boxShadow: 'none',
      borderRadius: '0px !important',
      padding,
      borderBottom,
      margin: '0px !important',
      '& .MuiButtonBase-root': {
        '&:first-child': {
          minHeight: 0,
        },
      },
      '&:before': {
        display: 'none',
      },
      '& .MuiAccordionSummary-content': {
        '& .MuiTypography-root': {
          fontWeight: 600,
          color:
            variant === 'primary'
              ? palette.common.black
              : palette.primary.light,
        },
      },
      '& .MuiAccordionDetails-root': {
        padding: '0px 0px 16px 0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      },
      '& div': {
        padding: 0,
      },
      '& .MuiSvgIcon-root ': {
        fill:
          variant === 'primary' ? palette.common.black : palette.primary.light,
      },
      '& .MuiAccordionSummary-content.Mui-expanded': {
        margin: variant === 'primary' ? '20px 0' : '12px 0',
      },
    },
  };
};

export const useSliderStyles = () => {
  return {
    root: {
      color: palette.primary.light,
      '& .MuiSlider-thumb': {
        width: '16px',
        height: '16px',
      },
      '& .MuiSlider-rail': {
        backgroundColor: palette.background.paper,
        opacity: 1,
      },
    },
    inputsWrapper: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
  };
};

export const usePaginationStyles = () => {
  return {
    root: {
      '& .MuiPaginationItem-page.Mui-selected': {
        color: theme.palette.common.black,
        backgroundColor: 'transparent',
        '&:active': {
          backgroundColor: 'transparent',
        },
      },
      '& .MuiPaginationItem-page': {
        color: theme.palette.text.secondary,
      },
      '& .MuiPaginationItem-root': {
        '& i': {
          color: palette.text.secondary,
          fontSize: '24px',
        },
      },
      '& .MuiPaginationItem-root.Mui-disabled': {
        '& i': {
          color: palette.text.disabled,
        },
      },
    },
  };
};

export const useLoadingStyles = () => {
  return {
    root: {
      color: palette.primary.light,
    },
  };
};

export const useTabsStyles = () => {
  return {
    root: {
      '& .MuiTabs-indicator': {
        backgroundColor: palette.primary.light,
      },
    },
    tab: {
      '&.MuiTab-root': {
        '&.Mui-selected': {
          '& p': {
            color: palette.primary.light,
          },
          '& .MuiTypography-caption': {
            background: palette.primary.light,
            color: palette.common.white,
          },
        },
        '& p': {
          fontWeight: 600,
          color: palette.text.secondary,
        },
        '& .MuiTypography-caption': {
          background: palette.background.paper,
          borderRadius: '20px',
          padding: '0px 6px',
          color: palette.text.secondary,
        },
      },
    },
    label: {
      textTransform: 'none !important',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };
};

export const useSponsorCardStyles = () => {
  return {
    baseWrapper: {
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow: theme.customShadows.header,
      border: `1px solid ${theme.palette.background.paper}`,
      height: '218px',
    },
    baseTitle: {
      maxWidth: '250px',
    },
    baseImage: {
      borderRadius: '100px',
      marginBottom: '12px',
    },
    baseRating: {
      color: theme.palette.secondary.main,
      '& i': {
        fontSize: '16px',
      },
      '& span': {
        color: theme.palette.text.secondary,
      },
    },
    largeRoot: {
      display: 'flex',
      borderRadius: '12px',
      width: '100%',
      background: palette.common.white,
      gap: '16px',
      alignItems: 'stretch',
      padding: '24px',
    },
    largeContent: {
      boxSizing: 'border-box',
      width: '100%',
    },
    largeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      '& i': {
        fontSize: '24px',
        color: palette.text.secondary,
        cursor: 'pointer',
      },
    },
    largeHeaderLeftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    activelyRising: {
      padding: '4px 12px',
      color: palette.common.white,
      borderRadius: '12px',
      background: palette.secondary.main,
      fontWeight: 600,
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
    },
    sponsorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: palette.text.secondary,
    },
    sponsorRating: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      '& .icon-Star': {
        fontSize: '12px',
        color: palette.secondary.main,
      },
      color: palette.secondary.main,
      '& span': {
        '&:last-child': {
          color: palette.text.secondary,
        },
      },
    },
    sponsorProperties: {
      display: 'flex',
    },
    sponsorPropertiesColumn: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    sponsorProperty: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      '& i': {
        fontSize: '24px',
        color: palette.primary.light,
      },
    },
  };
};

export const useYesNoButtonStyles = () => {
  return {
    root: {
      display: 'flex',
      gap: '12px',
    },
    block: {
      padding: '12px 12px 24px 24px',
      border: `1px solid ${palette.background.paper}`,
      cursor: 'pointer',
      borderRadius: '8px',
      width: '240px',
      transition: 'border 0.3s ease-in-out',
    },
    header: {
      display: 'flex',
      width: '100%',
      justifyContent: 'end',
    },
    activeBlock: {
      border: `1px solid ${palette.primary.light}`,
    },
    radioButton: {
      width: '20px',
      height: '20px',
      border: `1px solid ${palette.text.disabled}`,
      borderRadius: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border 0.3s ease-in-out, background 0.3s ease-in-out',
    },
    activeRadioButton: {
      border: `1px solid ${palette.primary.light}`,
      background: palette.primary.light,
      '& .icon-Check': {
        color: palette.common.white,
        fontSize: '20px',
      },
    },
    mainContent: {
      display: 'flex',
      alignItems: 'center',
      justifyBetween: 'center',
      flexDirection: 'column',
      gap: '12px',
      '& p': {
        fontWeight: 600,
        color: palette.common.black,
      },
    },
    icon: {
      width: '32px',
      height: '32px',
      fontSize: '28px',
      borderRadius: '100px',
      background: 'rgba(113,124,137,0.2)',
      color: palette.text.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
    },
    activeIcon: {
      color: palette.primary.light,
      background: 'rgba(79,127,248,0.2)',
    },
  };
};

export const useMultiButtonsStyles = () => {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '600px',
      gap: '8px',
    },
    multiButton: {
      padding: '4px 16px',
      borderRadius: '24px',
      border: `1px solid ${palette.background.paper}`,
      cursor: 'pointer',
      transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease',
    },
    activeMultiButton: {
      color: palette.common.white,
      background: palette.primary.light,
      border: `1px solid ${palette.primary.light}`,
      transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease',
    },
    label: {
      fontWeight: 600,
      marginBottom: '8px',
    },
  };
};

interface UseReviewCardStylesProps {
  isExtended: boolean;
}

export const useReviewCardStyles = ({
  isExtended,
}: UseReviewCardStylesProps) => {
  return {
    root: {
      padding: '24px 28px',
      border: `1px solid ${palette.background.paper}`,
      borderRadius: '8px',
      boxShadow: customShadows.base,
    },
    reviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    reviewHeaderInfo: {
      display: 'flex',
      gap: '12px',
    },
    reviewHeaderMainInfo: {
      '& h5': {
        fontWeight: 600,
      },
      '& span': {
        color: palette.text.disabled,
      },
    },
    defaultIndicatior: {
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
      padding: '0px 12px',
      borderRadius: '16px',
      height: '26px',
      '& i': {
        fontSize: '16px',
      },
    },
    verifiedIndicator: {
      background: palette.success.contrastText,
      color: palette.success.main,
    },
    unverifiedIndicator: {
      background: palette.error.contrastText,
      color: palette.error.main,
    },
    ratingWrapper: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      marginBottom: '4px',
      '& p': {
        fontWeight: 600,
        color: palette.secondary.main,
      },
    },
    fullComment: {
      color: palette.text.secondary,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: isExtended ? 'none' : 3,
      marginBottom: '16px',
    },
    readFullLink: {
      fontWeight: 600,
      color: palette.primary.light,
      cursor: 'pointer',
    },
    deleteIcon: {
      fontSize: '24px',
      marginRight: '8px',
    },
    optionalButtonWrapper: {
      marginTop: '20px',
    },
  };
};

export const useModalStyles = () => {
  return {
    root: {
      padding: '32px',
      borderRadius: '12px',
      background: palette.common.white,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      '& .icon-Cross': {
        fontSize: '24px',
        color: palette.text.secondary,
      },
    },
    iconWrapper: {
      padding: '8px',
      border: `1px solid ${palette.background.paper}`,
      borderRadius: '4px',
      position: 'absolute',
      top: 16,
      right: 16,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};

export const useCustomTextAreaStyles = () => {
  return {
    root: {
      width: '100%',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      padding: '9px 16px',
      fontSize: '15px',
      borderRadius: '12px',
      border: `1px solid ${palette.background.paper}`,
      transition: 'border 0.3s ease-in-out',
      color: palette.common.black,
      outline: 'none',
    },
    errorText: {
      position: 'absolute',
      color: palette.error.light,
      bottom: '-20px',
      left: 0,
    },
  };
};

export const useUserAvatarStyles = () => {
  return {
    root: {
      borderRadius: '100px',
      background: palette.common.black,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& p': {
        color: palette.common.white,
        fontWeight: 500,
      },
    },
  };
};

export const useStepsComponentStyles = () => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    stepWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    defaultStep: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      '& .icon-Check': {
        fontSize: '24px',
        transition: 'opacity 0.3s',
      },
      '& .step-status': {
        borderRadius: '1230px',
        color: palette.common.white,
        background: palette.text.disabled,
        width: '26px',
        height: '26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        transition: 'background 0.3s',
      },
      '& .step-status-current': { background: palette.primary.light },
      '& .step-status-completed': { background: palette.success.main },
      '& .step-label': {
        fontWeight: 600,
        color: palette.text.secondary,
        transition: 'color 0.3s',
      },
      '& .step-label-current': { color: palette.primary.light },
      '& .step-label-completed': { color: palette.common.black },
    },
    divider: {
      width: '24px',
      height: '2px',
      background: palette.background.paper,
    },
  };
};

export const useTagSelectorStyles = () => {
  return {
    root: {
      position: 'relative',
    },
    variantsWrapper: {
      overflow: 'auto',
      maxHeight: '475px',
      padding: '8px 24px',
      background: theme.palette.common.white,
      width: '100%',
      borderRadius: '16px',
      border: `1px solid ${theme.palette.background.paper}`,
      boxShadow: theme.customShadows.base,
      boxSizing: 'border-box',
      position: 'absolute',
      zIndex: 10,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      marginTop: '8px',
    },
    tag: {
      position: 'absolute',
      top: 6,
      left: 50,
      background: palette.common.white,
      padding: '2px 12px',
      borderRadius: '16px',
      border: `1px solid ${palette.background.paper}`,
      '& .tag-title': {
        whiteSpace: 'nowrap',
        maxWidth: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  };
};

export const useFileUploaderStyles = () => {
  return {
    root: {},
    dropZone: {
      width: '100%',
      borderRadius: '8px',
      border: `1px dashed ${palette.background.paper}`,
      padding: '32px 0px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      '& .icon-Upload': {
        fontSize: '36px',
        color: palette.text.secondary,
      },
      marginBottom: '12px',
    },
    dropZoneContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoText: {
      color: palette.text.secondary,
      '& .fileLength': {
        transition: 'color 0.3s ease, font-weight 0.3s ease',
      },
      '& .fileLengthError': {
        color: palette.error.light,
        fontWeight: 600,
        transition: 'color 0.3s ease, font-weight 0.3s ease',
      },
    },
    filesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '12px',
      '& .error': {
        border: `1px solid ${palette.error.light}`,
      },
    },
    file: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderRadius: '8px',
      border: `1px solid ${palette.background.paper}`,
    },
    mainFileInfo: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      '& .icon-File': {
        color: palette.text.secondary,
        fontSize: '24px',
      },
      '& .error-text': {
        color: palette.error.light,
      },
    },
    fileName: {
      fontWeight: 600,
      marginBottom: '4px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: '200px',
      textOverflow: 'ellipsis',
    },
    fileSize: {
      color: palette.text.secondary,
    },
    actionsWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '24px',
      '& i': {
        cursor: 'pointer',
      },
      '& .icon-Reload': {
        color: palette.text.secondary,
      },
      '& .icon-Delete': {
        color: palette.error.light,
      },
    },
    additionalInfo: {
      maxWidth: '75%',
      color: palette.text.secondary,
    },
  };
};

export const useTableStyles = () => {
  return {
    root: {
      background: palette.common.white,
      boxShadow: 'none',
      borderRadius: 0,
    },
    tableHeader: {
      '&.MuiTableHead-root': {
        background: palette.background.default,
      },
      '& th': {
        color: palette.text.secondary,
        fontSize: typography.caption,
        fontWeight: 600,
        borderBottom: 'none',
        padding: '8px',
        '&:first-of-type': {
          paddingLeft: '24px',
        },
      },
    },
    bodyCell: {
      fontSize: typography.body1,
      borderBottom: `1px solid ${palette.background.paper}`,
      '& p': {
        margin: 0,
      },
    },
    actionCell: {
      paddingRight: '24px',
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      padding: '8px 24px',
      '& span': {
        color: palette.text.secondary,
      },
    },
  };
};

export const useEllipsisTextStyles = () => {
  return {
    root: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
    },
  };
};
