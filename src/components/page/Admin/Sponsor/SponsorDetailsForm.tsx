import ProfilePictureUploader, {
  ProfilePictureUploaderVariant,
} from '@/components/common/ProfilePictureUploader';
import { Controller, useForm } from 'react-hook-form';

const SponsorDetailsForm = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = handleSubmit(data => console.log(data));
  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="profilePicture"
        render={({ field: { onChange } }) => (
          <ProfilePictureUploader
            onChange={onChange}
            variant={ProfilePictureUploaderVariant.SPONSOR}
          />
        )}
      />
    </form>
  );
};

export default SponsorDetailsForm;
