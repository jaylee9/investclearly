import theme from '@/config/theme';

const { palette, customShadows } = theme;

interface UseAddEditSponsorModalStylesProps {
  isAdded: boolean;
}

export const useAddEditSponsorModalStyles = ({
  isAdded,
}: UseAddEditSponsorModalStylesProps) => {
  return {
    root: {
      width: '100vw',
      height: '100vh',
      background: palette.common.white,
      overflow: 'auto',
    },
    header: {
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${palette.background.default}`,
      boxShadow: customShadows.header,
      '& .icon-Cross': {
        cursor: 'pointer',
        fontSize: '24px',
        color: palette.text.secondary,
      },
    },
    leftPart: {
      display: 'flex',
      gap: '32px',
      alignItems: 'center',
      '& p': {
        fontWeight: 600,
      },
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0px 32px',
      gap: '32px',
    },
    content: {
      borderRadius: '12px',
      background: palette.common.white,
      boxShadow: customShadows.header,
      padding: isAdded ? '64px 0px' : '40px 40px 16px',
      width: '790px',
    },
    title: {
      fontWeight: 600,
      marginBottom: '32px',
    },
    sponsorAddedContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
      '& h3': {
        fontWeight: 600,
      },
      '& .sponsors-button': {
        width: '420px',
      },
    },
  };
};

export const useSponsorDetailsFormStyles = () => {
  return {
    profilePictureUploaderWrapper: {
      marginBottom: '12px',
    },
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '40px',
    },
    doubleInputsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      '& > div': {
        width: '50% !important',
      },
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'end',
      paddingTop: '16px',
      gap: '8px',
    },
  };
};

export const useFinancialMetricsFormStyles = () => {
  return {
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '600px',
      marginBottom: '50px',
    },
    doubleInputsWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      '& > div': {
        width: '50% !important',
      },
    },
    symbol: {
      color: palette.text.disabled,
    },
    buttonsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    editButtonsWrapper: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'end',
    },
  };
};
