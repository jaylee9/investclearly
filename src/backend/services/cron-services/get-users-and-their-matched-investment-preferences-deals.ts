import moment from 'moment';
import { User } from '../../entities/user.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { MomentConstants } from '../../constants/moment-constants';
import { dealsMatchedYourInvestmentPreferences } from '../mails/send-deals-mathing-your-investment-preferences';
import { Attachment } from '../../entities/attachments.entity';
import { TargetTypesConstants } from '../../constants/target-types-constants';
import { dealMapper } from '../../mappers/deal.mapper';

export const getUsersAndTheirMatchedInvestmentPreferencesDeals = async () => {
  const connection = await getDatabaseConnection();

  const users = await connection.manager
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.newDealMathingYourInvestmentPreferencesEmail = :value', {
      value: true,
    })
    .getMany();

  for (const user of users) {
    const assetClasses = user.assetClasses;
    if (assetClasses?.length) {
      const fromDate =
        moment().subtract(6, 'days').format(MomentConstants.dateStart) + 'Z';
      const toDate = moment(fromDate, MomentConstants.yearMonthDay).add(
        6,
        'days'
      );

      const toDateEndOfTheDay =
        moment(toDate).format(MomentConstants.dateEnd) + 'Z';

      const deals = await connection.manager
        .createQueryBuilder()
        .select('deals')
        .from(Deal, 'deals')
        .leftJoinAndMapMany(
          'deals.attachments',
          Attachment,
          'attachments',
          'attachments.entityId = deals.id AND attachments.entityType = :entityType',
          { entityType: TargetTypesConstants.deals }
        )
        .leftJoinAndSelect('deals.sponsor', 'sponsor')
        .where('deals.assetClass IN (:...assetClasses)', {
          assetClasses,
        })
        .andWhere(
          'deals.createdAt <= :toDateEndOfTheDay AND deals.createdAt >= :fromDate',
          { fromDate, toDateEndOfTheDay }
        )
        .limit(3)
        .getMany();

      if (user && deals?.length === 3) {
        dealsMatchedYourInvestmentPreferences(
          user,
          await Promise.all(deals.map(dealMapper))
        );
      }
    }
  }
};
