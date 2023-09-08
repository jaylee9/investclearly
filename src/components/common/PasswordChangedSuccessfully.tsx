import { Typography } from '@mui/material';
import Button from '@/components/common/Button';
import Link, { LinkProps } from 'next/link';

import { usePasswordChangedSuccessfullyStyles } from './styles';

type PasswordChangedSuccessfullyProps = {
  href: LinkProps['href'];
};

const PasswordChangedSuccessfully = ({
  href,
}: PasswordChangedSuccessfullyProps): JSX.Element => {
  const styles = usePasswordChangedSuccessfullyStyles();

  return (
    <>
      <Typography
        variant="h2"
        fontWeight={600}
        marginBottom="8px"
        maxWidth="420px"
      >
        Password changed successfully!
      </Typography>
      <Typography variant="body1" sx={styles.text}>
        You can now log in with your new password
      </Typography>
      <Link href={href}>
        <Button customStyles={{ width: '100%' }}>Log in</Button>
      </Link>
    </>
  );
};

export default PasswordChangedSuccessfully;
