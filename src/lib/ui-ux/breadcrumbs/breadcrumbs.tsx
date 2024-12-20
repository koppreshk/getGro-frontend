import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Link, LinkProps, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import { RefreshButton } from '..';
import { FlexBox } from '../flexbox/flexbox';

const StyledTypography = styled(Typography)`
  && {
    text-transform: capitalize;
    font-weight: 500;
  }
`;

interface LinkRouterProps extends LinkProps {
  to: string;
}

const breadCrumbName = (word: string) => {
  return word.split('-').join(' ');
};

const LinkRouter = (props: LinkRouterProps) => {
  return <Link {...props} component={RouterLink} />;
};

interface BreadCrumbsProps {
  hideRefreshBtn?: boolean;
}
export const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { hideRefreshBtn } = props;
  const location = useLocation();
  const color = useTheme();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <FlexBox justifyContent="space-between" padding="5px 20px">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext fontSize="small" />}
      >
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <StyledTypography
              color={color.pallete.primaryPurpleText}
              variant="caption"
              key={value}
            >
              {breadCrumbName(value)}
            </StyledTypography>
          ) : (
            <LinkRouter underline="hover" key={value} color="inherit" to={to}>
              <StyledTypography variant="caption" color="inherit" key={value}>
                {breadCrumbName(value)}
              </StyledTypography>
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
      {hideRefreshBtn ? null : <RefreshButton />}
    </FlexBox>
  );
};
