import { useForm } from 'react-hook-form';

const SponsorDetailsForm = () => {
  const { handleSubmit } = useForm();
  const onSubmit = handleSubmit(data => console.log(data));
  return <form onSubmit={onSubmit}></form>;
};

export default SponsorDetailsForm;
