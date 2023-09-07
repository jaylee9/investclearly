import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import useTermsConditionPageStyles from '@/pages_styles/termsConditionsPageStyles';
import { Box, Typography } from '@mui/material';

const TermsConditionsPage = () => {
  const classes = useTermsConditionPageStyles();
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
  });
  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.wrapper}>
          <Box sx={classes.content}>
            <Box>
              <Typography variant="h2" sx={classes.mainTitle}>
                Terms & Conditions
              </Typography>
              <Typography variant="caption" sx={classes.lastUpdate}>
                Last updated: May 25, 2023
              </Typography>
              <Typography variant="body1" sx={classes.text}>
                Lorem ipsum dolor sit amet consectetur. Convallis enim porttitor
                dui consectetur quis. Ipsum sapien semper pulvinar et
                consectetur nibh ut laoreet elementum. Nulla orci sociis est
                morbi nisi bibendum. Aliquam dictum commodo aliquam urna eget
                amet. Luctus enim libero ut eleifend lorem facilisi faucibus.
                Vitae placerat sit sollicitudin tellus.
              </Typography>
            </Box>
            <Box sx={classes.contentWrapper}>
              <Box>
                <Typography variant="h4" sx={classes.blockTitle}>
                  1.Definitions
                </Typography>
                <Typography variant="body1" sx={classes.text}>
                  Lorem ipsum dolor sit amet consectetur. Nisi orci tincidunt
                  sed molestie eget enim rhoncus morbi molestie. Augue varius
                  arcu accumsan tincidunt pretium a suspendisse et pellentesque.
                  Sodales amet habitant sem est neque quisque sed amet duis.
                  Eget turpis purus gravida faucibus nunc penatibus congue.
                  Suspendisse ornare dolor morbi odio. Dolor fames nisi rhoncus
                  tortor nulla faucibus. In vestibulum ut faucibus libero
                  faucibus consequat iaculis. Tempor erat sit mattis adipiscing
                  neque malesuada habitasse sed. Volutpat urna placerat faucibus
                  ornare mattis egestas in quam suspendisse.
                </Typography>
              </Box>
              <Box sx={classes.mainInfoWrapper}>
                <Box>
                  <Typography variant="h5">1.1 Deals</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Lorem ipsum dolor sit amet consectetur. Egestas sapien non
                    justo in odio massa sagittis quis. Risus interdum eleifend
                    hac vitae gravida tincidunt ullamcorper adipiscing. Diam
                    risus tellus sed leo. Adipiscing semper nunc at non
                    elementum nunc massa vestibulum malesuada. Nec dictum
                    vulputate at proin dignissim ornare a risus ac. Vehicula eu
                    ut leo lectus accumsan accumsan non tempor habitasse.
                    Iaculis sit faucibus euismod vel pellentesque lectus
                    hendrerit enim viverra. Ipsum pretium id commodo ipsum
                    mauris. Et tellus suspendisse suspendisse adipiscing.
                    Interdum lectus augue etiam at in duis pulvinar diam. Eu
                    nulla lorem vitae facilisis sed laoreet in pellentesque
                    scelerisque.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">1.2 Sponsors</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Lorem ipsum dolor sit amet consectetur. Egestas sapien non
                    justo in odio massa sagittis quis. Risus interdum eleifend
                    hac vitae gravida tincidunt ullamcorper adipiscing. Diam
                    risus tellus sed leo. Adipiscing semper nunc at non
                    elementum nunc massa vestibulum malesuada. Nec dictum
                    vulputate at proin dignissim ornare a risus ac. Vehicula eu
                    ut leo lectus accumsan accumsan non tempor habitasse.
                    Iaculis sit faucibus euismod vel pellentesque lectus
                    hendrerit enim viverra. Ipsum pretium id commodo ipsum
                    mauris. Et tellus suspendisse suspendisse adipiscing.
                    Interdum lectus augue etiam at in duis pulvinar diam. Eu
                    nulla lorem vitae facilisis sed laoreet in pellentesque
                    scelerisque.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">1.3 Users</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Lorem ipsum dolor sit amet consectetur. Egestas sapien non
                    justo in odio massa sagittis quis. Risus interdum eleifend
                    hac vitae gravida tincidunt ullamcorper adipiscing. Diam
                    risus tellus sed leo. Adipiscing semper nunc at non
                    elementum nunc massa vestibulum malesuada. Nec dictum
                    vulputate at proin dignissim ornare a risus ac. Vehicula eu
                    ut leo lectus accumsan accumsan non tempor habitasse.
                    Iaculis sit faucibus euismod vel pellentesque lectus
                    hendrerit enim viverra. Ipsum pretium id commodo ipsum
                    mauris. Et tellus suspendisse suspendisse adipiscing.
                    Interdum lectus augue etiam at in duis pulvinar diam. Eu
                    nulla lorem vitae facilisis sed laoreet in pellentesque
                    scelerisque.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={classes.contentWrapper}>
              <Box>
                <Typography variant="h4" sx={classes.blockTitle}>
                  1.Definitions
                </Typography>
                <Typography variant="body1" sx={classes.text}>
                  Lorem ipsum dolor sit amet consectetur. Nisi orci tincidunt
                  sed molestie eget enim rhoncus morbi molestie. Augue varius
                  arcu accumsan tincidunt pretium a suspendisse et pellentesque.
                  Sodales amet habitant sem est neque quisque sed amet duis.
                  Eget turpis purus gravida faucibus nunc penatibus congue.
                  Suspendisse ornare dolor morbi odio. Dolor fames nisi rhoncus
                  tortor nulla faucibus. In vestibulum ut faucibus libero
                  faucibus consequat iaculis. Tempor erat sit mattis adipiscing
                  neque malesuada habitasse sed. Volutpat urna placerat faucibus
                  ornare mattis egestas in quam suspendisse.
                </Typography>
              </Box>
              <Box sx={classes.mainInfoWrapper}>
                <Box>
                  <Typography variant="h5">1.1 Deals</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Lorem ipsum dolor sit amet consectetur. Egestas sapien non
                    justo in odio massa sagittis quis. Risus interdum eleifend
                    hac vitae gravida tincidunt ullamcorper adipiscing. Diam
                    risus tellus sed leo. Adipiscing semper nunc at non
                    elementum nunc massa vestibulum malesuada. Nec dictum
                    vulputate at proin dignissim ornare a risus ac. Vehicula eu
                    ut leo lectus accumsan accumsan non tempor habitasse.
                    Iaculis sit faucibus euismod vel pellentesque lectus
                    hendrerit enim viverra. Ipsum pretium id commodo ipsum
                    mauris. Et tellus suspendisse suspendisse adipiscing.
                    Interdum lectus augue etiam at in duis pulvinar diam. Eu
                    nulla lorem vitae facilisis sed laoreet in pellentesque
                    scelerisque.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">1.2 Sponsors</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Lorem ipsum dolor sit amet consectetur. Egestas sapien non
                    justo in odio massa sagittis quis. Risus interdum eleifend
                    hac vitae gravida tincidunt ullamcorper adipiscing. Diam
                    risus tellus sed leo. Adipiscing semper nunc at non
                    elementum nunc massa vestibulum malesuada. Nec dictum
                    vulputate at proin dignissim ornare a risus ac. Vehicula eu
                    ut leo lectus accumsan accumsan non tempor habitasse.
                    Iaculis sit faucibus euismod vel pellentesque lectus
                    hendrerit enim viverra. Ipsum pretium id commodo ipsum
                    mauris. Et tellus suspendisse suspendisse adipiscing.
                    Interdum lectus augue etiam at in duis pulvinar diam. Eu
                    nulla lorem vitae facilisis sed laoreet in pellentesque
                    scelerisque.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">1.3 Users</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Lorem ipsum dolor sit amet consectetur. Egestas sapien non
                    justo in odio massa sagittis quis. Risus interdum eleifend
                    hac vitae gravida tincidunt ullamcorper adipiscing. Diam
                    risus tellus sed leo. Adipiscing semper nunc at non
                    elementum nunc massa vestibulum malesuada. Nec dictum
                    vulputate at proin dignissim ornare a risus ac. Vehicula eu
                    ut leo lectus accumsan accumsan non tempor habitasse.
                    Iaculis sit faucibus euismod vel pellentesque lectus
                    hendrerit enim viverra. Ipsum pretium id commodo ipsum
                    mauris. Et tellus suspendisse suspendisse adipiscing.
                    Interdum lectus augue etiam at in duis pulvinar diam. Eu
                    nulla lorem vitae facilisis sed laoreet in pellentesque
                    scelerisque.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TermsConditionsPage;
