import { DeepPartial } from 'typeorm';
import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { InvestmentInterface } from './interfaces/investment.interface';
import { CreateInvestmentInterface } from './interfaces/create-investment.interface';
import { Investment } from '../../../backend/entities/investments.entity';
import { getInvestmentById } from './get-investment-by-id';
import { InvestmentConstants } from '../../../backend/constants/investment-constants';
import { getDealById } from '../deals/get-deal-by-id';

export const createinvestment = async (
  data: DeepPartial<CreateInvestmentInterface>,
  userId: number
) => {
  const connection = await getDatabaseConnection();

  if (data.dealId) {
    const dealRecord = await getDealById(data.dealId);
    const investmentRecord = await connection.manager.findOne(Investment, {
      where: {
        dealId: dealRecord.id,
        userId,
      },
    });

    if (investmentRecord) {
      throw new createHttpError.NotFound(
        InvestmentConstants.investmentAlreadyCreated
      );
    }
    const investment = connection.manager.create(Investment, {
      ...data,
      userId,
    }) as InvestmentInterface;
    await connection.manager.save(investment);

    return getInvestmentById(investment.id, userId);
  }
};
