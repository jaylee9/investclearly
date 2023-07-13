import createHttpError from "http-errors";
import { getDatabaseConnection } from "../../config/data-source-config";
import { AuthConstants } from "../../constants/auth-constants";
import { User } from "../../entities/user.entity";

export const getUserByField = async (fieldName: string, value: any) => {
  const connection = await getDatabaseConnection();

  if (fieldName === AuthConstants.emailField) {
    value = value.toLowerCase();
  }

  const user = await connection.manager.findOne(User, { where: { [fieldName]: value } });

  if (!user) {
    throw new createHttpError.BadRequest(AuthConstants.somethingGoesWrong);
  }

  return user;
}
