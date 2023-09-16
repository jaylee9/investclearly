import { Investment } from '../entities/investments.entity';
import { InvestmentInterface } from '../services/investments/interfaces/investment.interface';
import { dealMapper } from './deal.mapper';
import { userMapper } from './user.mapper';

export const investmentMapper = (
  investment: Investment
): InvestmentInterface => {
  return {
    id: investment.id,
    status: investment.status,
    dealId: investment.dealId,
    userId: investment.userId,
    dateOfInvestment: investment.dateOfInvestment || null,
    totalInvested: investment.totalInvested || 0,
    user: userMapper(investment.user),
    deal: dealMapper(investment.deal),
    createdAt: investment.createdAt,
    updatedAt: investment.updatedAt,
  };
};
