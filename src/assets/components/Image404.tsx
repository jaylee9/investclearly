import { useBreakpoints } from '@/hooks/useBreakpoints';
import { type FC } from 'react';

const Image404: FC = () => {
  const { isMobile, isTablet } = useBreakpoints();
  const width = isMobile ? 'calc(100% - 32px)' : isTablet ? 470 : 596;
  const maxWidth = isMobile ? '340px' : '100%';

  return (
    <svg
      style={{ maxWidth }}
      width={width}
      height="202"
      viewBox="0 0 596 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 170.448V128.011L80.9453 0.699219H99.0204H119.453H150.102V128.011H173.286V170.448H150.102V201.884H97.8416V170.448H0ZM53.8325 128.011L97.4486 57.2823V128.011H53.8325Z"
        fill="#B1C4F6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M422.538 170.448V128.011L503.483 0.699219H521.558H541.991H572.64V128.011H595.824V170.448H572.64V201.884H520.38V170.448H422.538ZM476.371 128.011L519.987 57.2823V128.011H476.371Z"
        fill="#B1C4F6"
      />
      <circle cx="298.715" cy="100.738" r="100.738" fill="#B1C4F6" />
      <mask
        id="mask0_1465_66279"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="197"
        y="0"
        width="203"
        height="202"
      >
        <circle cx="298.716" cy="100.738" r="100.738" fill="#1E2B43" />
      </mask>
      <g mask="url(#mask0_1465_66279)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M331.438 81.4219H359.588V104.703H368.9V93.6981H403.399V101.952H412.076V116.356L420.271 127.138H430.067V93.6981L458.217 109.254V207.143H430.067V190.422H420.754V225.344H386.255L388.222 215.397H379.906V218.148H345.407V194.867H334.19V208.836H303.289V193.174H285.298V194.866H265.614V182.803H252.492L236.618 182.802V189.998H201.484V101.316H223.285V94.1209H229.211V86.9245L242.333 90.5225V94.1209H258.419V119.519H265.614V113.486L285.298 106.184V129.89H303.289V102.164L310.061 95.3911H331.438V81.4219Z"
          fill="#83A2F3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M383.164 81.1504H380.128V88.6384H361.915V103.008H344.307L339.45 107.865V168.378H324.877V155.83L315.77 148.072V119.603H283.591V143.485H271.853V165.627L260.161 176.676H248.376V113.329L223.483 98.3525V157.247H216.603V116.972H187.257V130.734H173.494V218.569H202.84V204.807H206.077V245.082H235.423V201.164H235.828V264.511H265.174V251.356H274.081V231.32H304.032V207.438H313.949V243.665H319.413V256.213H351.592V190.843H365.963V196.105H390.046V260.867H422.225V218.57H425.868V121.426L404.011 130.735V173.032H398.142V108.27H390.856V88.6384H383.164V81.1504Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default Image404;
