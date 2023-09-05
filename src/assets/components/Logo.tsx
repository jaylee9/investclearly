import theme from '@/config/theme';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Link } from '@mui/material';

export enum LogoVariant {
  Default = 'default',
  Light = 'light',
  LightText = 'light-text',
}

interface LogoProps {
  variant?: LogoVariant;
}

const Logo = ({ variant = LogoVariant.Default }: LogoProps) => {
  const { isLargeDesktop } = useBreakpoints();
  const { palette } = theme;
  const leftPartColor =
    variant === LogoVariant.Default || variant === LogoVariant.LightText
      ? palette.primary.light
      : palette.common.white;

  const rightPartColor =
    variant === LogoVariant.Default
      ? palette.common.black
      : palette.common.white;

  return (
    <Link href="/" style={{ lineHeight: 0 }}>
      <svg
        width={isLargeDesktop ? '154' : '112'}
        height={isLargeDesktop ? '44' : '32'}
        viewBox="0 0 140 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.2852 16.6512V13.8595H45.3616V3.3386H43.2852V0.546884H50.9451V3.3386H48.8686V13.8595H50.9451V16.6512H43.2852Z"
          fill={rightPartColor}
        />
        <path
          d="M58.7813 9.03739L57.2354 5.80731H57.1662V16.6512H53.8669V0.546884H57.6969L62.1036 8.16066L63.6495 11.3907H63.7187V0.546884H67.018V16.6512H63.188L58.7813 9.03739Z"
          fill={rightPartColor}
        />
        <path
          d="M74.3003 16.6512L69.1091 0.546884H72.6622L75.0617 8.27602L76.3306 13.3288H76.3998L77.6227 8.27602L80.0221 0.546884H83.4599L78.2225 16.6512H74.3003Z"
          fill={rightPartColor}
        />
        <path
          d="M85.5685 16.6512V0.546884H96.5277V3.66161H89.0754V6.96091H95.4664V10.0526H89.0754V13.5364H96.5277V16.6512H85.5685Z"
          fill={rightPartColor}
        />
        <path
          d="M104.797 16.928C103.382 16.928 102.182 16.6896 101.198 16.2128C100.214 15.7206 99.3753 15.09 98.6831 14.3209L100.99 11.9906C102.082 13.2211 103.428 13.8364 105.028 13.8364C105.889 13.8364 106.528 13.6595 106.943 13.3057C107.358 12.9519 107.566 12.4828 107.566 11.8983C107.566 11.4523 107.443 11.0831 107.197 10.7909C106.951 10.4832 106.451 10.2756 105.697 10.1679L104.105 9.96028C102.398 9.74494 101.144 9.22966 100.344 8.41445C99.5598 7.59924 99.1676 6.51485 99.1676 5.16129C99.1676 4.43837 99.306 3.77697 99.5829 3.1771C99.8598 2.57722 100.252 2.06195 100.76 1.63127C101.283 1.20059 101.913 0.869893 102.651 0.639173C103.405 0.393071 104.259 0.27002 105.212 0.27002C106.428 0.27002 107.497 0.462286 108.42 0.84682C109.342 1.23135 110.135 1.79277 110.796 2.53108L108.466 4.88443C108.081 4.43837 107.612 4.07691 107.058 3.80004C106.52 3.5078 105.835 3.36167 105.005 3.36167C104.22 3.36167 103.636 3.50011 103.251 3.77697C102.867 4.05383 102.675 4.43837 102.675 4.93057C102.675 5.4843 102.821 5.88422 103.113 6.13032C103.421 6.37642 103.913 6.5533 104.59 6.66097L106.182 6.91477C107.843 7.17625 109.073 7.69153 109.873 8.46059C110.673 9.21428 111.073 10.291 111.073 11.6907C111.073 12.4597 110.934 13.1673 110.657 13.8133C110.381 14.4593 109.973 15.0131 109.435 15.4745C108.912 15.9359 108.258 16.2974 107.474 16.5589C106.689 16.805 105.797 16.928 104.797 16.928Z"
          fill={rightPartColor}
        />
        <path
          d="M120.154 3.66161V16.6512H116.647V3.66161H112.286V0.546884H124.514V3.66161H120.154Z"
          fill={rightPartColor}
        />
        <path
          d="M50.4144 40.0001C49.3223 40.0001 48.3379 39.8309 47.4612 39.4925C46.5845 39.1387 45.8385 38.6234 45.2232 37.9467C44.608 37.2545 44.1311 36.4008 43.7927 35.3857C43.4544 34.3551 43.2852 33.1554 43.2852 31.7864C43.2852 30.4329 43.4544 29.2331 43.7927 28.1872C44.1311 27.1259 44.608 26.2414 45.2232 25.5339C45.8385 24.811 46.5845 24.2649 47.4612 23.8958C48.3379 23.5266 49.3223 23.3421 50.4144 23.3421C51.9064 23.3421 53.1369 23.6497 54.1059 24.2649C55.075 24.8648 55.8517 25.8185 56.4362 27.1259L53.4138 28.6948C53.1984 28.018 52.8601 27.4796 52.3986 27.0797C51.9526 26.6644 51.2912 26.4568 50.4144 26.4568C49.3839 26.4568 48.5533 26.7952 47.9226 27.472C47.3074 28.1334 46.9998 29.1024 46.9998 30.379V32.9631C46.9998 34.2398 47.3074 35.2165 47.9226 35.8932C48.5533 36.5546 49.3839 36.8853 50.4144 36.8853C51.2758 36.8853 51.9602 36.6546 52.4678 36.1932C52.9908 35.7164 53.3753 35.1473 53.6214 34.4859L56.4824 36.147C55.8825 37.3776 55.0904 38.3312 54.1059 39.008C53.1369 39.6694 51.9064 40.0001 50.4144 40.0001Z"
          fill={rightPartColor}
        />
        <path
          d="M58.9365 39.7232V23.6189H62.4434V36.6085H68.5806V39.7232H58.9365Z"
          fill={rightPartColor}
        />
        <path
          d="M71.171 39.7232V23.6189H82.1302V26.7336H74.6779V30.033H81.0689V33.1246H74.6779V36.6085H82.1302V39.7232H71.171Z"
          fill={rightPartColor}
        />
        <path
          d="M95.1064 39.7232L93.9528 35.8932H88.577L87.4234 39.7232H83.8703L89.1769 23.6189H93.5144L98.7518 39.7232H95.1064ZM91.2995 26.8029H91.1841L89.4076 32.917H93.0991L91.2995 26.8029Z"
          fill={rightPartColor}
        />
        <path
          d="M104.487 39.7232H100.98V23.6189H108.617C109.355 23.6189 110.024 23.742 110.624 23.9881C111.224 24.2342 111.731 24.5879 112.147 25.0494C112.577 25.4954 112.908 26.0338 113.139 26.6644C113.37 27.2951 113.485 27.9949 113.485 28.764C113.485 29.8561 113.239 30.8097 112.747 31.6249C112.27 32.4401 111.539 33.0323 110.555 33.4015L113.716 39.7232H109.816L107.002 33.8168H104.487V39.7232ZM108.178 30.8635C108.701 30.8635 109.109 30.7328 109.401 30.4713C109.709 30.1945 109.863 29.7945 109.863 29.2716V28.2564C109.863 27.7334 109.709 27.3412 109.401 27.0797C109.109 26.8029 108.701 26.6644 108.178 26.6644H104.487V30.8635H108.178Z"
          fill={rightPartColor}
        />
        <path
          d="M116.526 39.7232V23.6189H120.033V36.6085H126.171V39.7232H116.526Z"
          fill={rightPartColor}
        />
        <path
          d="M130.656 39.7232V33.4245L125.142 23.6189H129.064L132.525 30.033H132.571L135.893 23.6189H139.7L134.186 33.4015V39.7232H130.656Z"
          fill={rightPartColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.3655 5.58458L8.05331 28.8968L0 20.8434V15.2588L8.05331 23.3121L31.3655 0V5.58458Z"
          fill={leftPartColor}
        />
        <path
          d="M4.02122 29.7571L4.02122 39.408L0 39.408L1.00442e-07 25.7358L4.02122 29.7571Z"
          fill={leftPartColor}
        />
        <path
          d="M12.0637 29.7568V39.4078L8.04248 39.4078L8.04248 33.7781L12.0637 29.7568Z"
          fill={leftPartColor}
        />
        <path
          d="M20.1062 21.7144V39.4077L16.085 39.4077L16.085 25.7356L20.1062 21.7144Z"
          fill={leftPartColor}
        />
        <path
          d="M28.1487 13.6724L28.1487 39.4082L24.1274 39.4081L24.1274 17.6936L28.1487 13.6724Z"
          fill={leftPartColor}
        />
      </svg>
    </Link>
  );
};

export default Logo;
