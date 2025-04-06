import { Button, Typography } from '@mui/material';
import { FileUploadField } from 'lib/form-fields';
import { FlexBox, IChangeArgs } from 'lib/ui-ux';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { styled } from 'styled-components';

import GetGroLogoImg from '../../../../../assets/svg/favicon.svg?react';

const Container = styled(FlexBox)`
  border: 1px solid ${(props) => props.theme.pallete.formFieldBorderColor};
  border-radius: 12px;
  padding: 16px;
`;

const LogoBox = styled(FlexBox)`
  width: 64px;
  height: 64px;
  border: 2px solid ${(props) => props.theme.pallete.primaryPurple}; /* Purple border */
  border-radius: 8px;
  padding: 4px;
  background-color: #fff;
  margin-right: 16px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoUploader: React.FC = () => {
  const { watch, resetField } = useFormContext();

  const validate = (value: IChangeArgs): boolean | string => {
    console.log('Validate value:', value);
    if (!value) {
      return 'Logo is required';
    }
    if (value.selectedFiles[0].size > 2 * 1024 * 1024) {
      return 'File size exceeds 2MB';
    }
    return true;
  };
  return (
    <Container>
      <LogoBox justifyContent="center" alignItems="center">
        {watch('logo')?.selectedFiles[0]?.content ? (
          <img
            src={watch('logo')?.selectedFiles[0].content}
            alt="Company Logo"
          />
        ) : (
          <GetGroLogoImg />
        )}
      </LogoBox>
      <Info>
        <Typography variant="h4">Logo</Typography>
        <Typography variant="body3">Max file size: 2MB</Typography>
        <Typography variant="body3">Best dimensions: 32×32 pixels</Typography>
        <FlexBox gap={'30px'} style={{ margin: '10px 0' }} alignItems="center">
          <FileUploadField
            name="logo"
            accept="image/*"
            readMode="readAsDataURL"
            rules={{ validate: validate }}
            onRenderButton={(args) => (
              <Button {...args} size="small" variant="outlined">
                Change Logo
              </Button>
            )}
          />
          <Button variant="outlined" onClick={() => resetField('logo')}>
            Remove Icon
          </Button>
        </FlexBox>
      </Info>
    </Container>
  );
};

export default LogoUploader;
