import moment from 'moment';
import { User } from '../../entities/user.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { MomentConstants } from '../../constants/moment-constants';
import { sendDealMatchedYourInvestmentPreferences } from '../mails/send-deal-mathing-your-investment-preferences';
import { Attachment } from '../../entities/attachments.entity';
import { TargetTypesConstants } from '../../constants/target-types-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { LocationTargetTypesConstants } from '../../../backend/constants/location-target-types-constants';
import { Location } from '../../entities/locations.entity';

export const sendMailToUsersWithMatchedDealsByInvestmentPreferences =
  async () => {
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
          moment().subtract(1, 'days').format(MomentConstants.dateStart) + 'Z';
        const toDate = moment(fromDate, MomentConstants.yearMonthDay).add(
          1,
          'days'
        );

        const toDateEndOfTheDay =
          moment(toDate).format(MomentConstants.dateEnd) + 'Z';

        const deal = await connection.manager
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
          .leftJoinAndMapMany(
            'deals.locations',
            Location,
            'locations',
            'locations.entityId = deals.id AND locations.entityType = :dealEntityType',
            { dealEntityType: LocationTargetTypesConstants.deal }
          )
          .leftJoinAndSelect('deals.sponsor', 'sponsor')
          .where('deals.assetClass IN (:...assetClasses)', {
            assetClasses,
          })
          .andWhere(
            'deals.createdAt <= :toDateEndOfTheDay AND deals.createdAt >= :fromDate',
            { fromDate, toDateEndOfTheDay }
          )
          .andWhere('deals.isDealPublished = :isPublished', {
            isPublished: true,
          })
          .getOne();

        if (user && deal) {
          sendDealMatchedYourInvestmentPreferences(user, dealMapper(deal));
        }
      }
    }
  };
