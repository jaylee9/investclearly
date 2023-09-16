import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Investment } from '../../../backend/entities/investments.entity';
import { investmentMapper } from '../../../backend/mappers/investment.mapper';
import { InvestmentConstants } from '../../../backend/constants/investment-constants';

export const getInvestmentById = async (id: number, userId: number) => {
  const connection = await getDatabaseConnection();
  const investment = await connection.manager
    .createQueryBuilder()
    .select('investments')
    .from(Investment, 'investments')
    .leftJoinAndSelect('investments.user', 'user')
    .leftJoinAndSelect('investments.deal', 'deal')
    .where('investments.id = :id', { id })
    .andWhere('investments.userId = :userId', { userId })
    .getOne();

  if (!investment) {
    throw new createHttpError.NotFound(InvestmentConstants.investmentNotFound);
  }

  return investmentMapper(investment);
};
