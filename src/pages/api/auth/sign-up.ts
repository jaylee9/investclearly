import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from "yup";
import { validateRequest } from "../../../backend/utils/yup";
import { apiHandler } from "../../../backend/utils/api-handler";
import { ValidationAuthConstants } from '../../../backend/constants/validation/auth-constants';
import { register } from '../../../backend/services/auth/register';
import { SignUpInterface } from '../../../backend/services/auth/interfaces/sign-up.interface';

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required(ValidationAuthConstants.firstNameRequired),
  lastName: Yup.string().required(ValidationAuthConstants.lastNameRequired),
  email: Yup.string().required(ValidationAuthConstants.emailRequired),
  password: Yup.string().required(ValidationAuthConstants.passwordRequired),
});

const signUp = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const body: SignUpInterface = request.body;
  validateRequest(body, signUpSchema);

  const userData = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  }

  const newUserEmail = await register(userData);

  response.status(201).json({ email: newUserEmail });
}

export default apiHandler({ POST: signUp });
