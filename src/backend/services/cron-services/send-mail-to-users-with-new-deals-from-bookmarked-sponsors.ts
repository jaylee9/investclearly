import moment from 'moment';
import { User } from '../../entities/user.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { MomentConstants } from '../../constants/moment-constants';
import { Attachment } from '../../entities/attachments.entity';
import { TargetTypesConstants } from '../../constants/target-types-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { BookmarkConstants } from '../../constants/bookmark-constants';
import { sendSponsorPostedNewDeals } from '../mails/send-sponsor-posted-new-deals';
import { DealConstants } from '../../constants/deal-constants';

export const sendMailToUsersWithNewDealsFromBookmarkedSponsors = async () => {
  const connection = await getDatabaseConnection();

  const users = await connection.manager
    .createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.newDealFromTheSponsorYouSavedEmail = :value', {
      value: true,
    })
    .leftJoinAndSelect(
      'user.bookmarks',
      'bookmarks',
      'bookmarks.entityType = :entityType',
      { entityType: BookmarkConstants.entityTypes.sponsor }
    )
    .getMany();

  for (const user of users) {
    if (user.bookmarks?.length) {
      const sponsorIds = user.bookmarks.map(item => item.entityId);
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
        .andWhere('sponsor.id IN (:...sponsorIds)', { sponsorIds })
        .andWhere(
          'deals.createdAt <= :toDateEndOfTheDay AND deals.createdAt >= :fromDate',
          { fromDate, toDateEndOfTheDay }
        )
        .limit(DealConstants.maxAmountNewDealsAtBookmarkedSponsor)
        .getMany();

      if (
        user &&
        deals?.length === DealConstants.maxAmountNewDealsAtBookmarkedSponsor
      ) {
        sendSponsorPostedNewDeals(
          user,
          await Promise.all(deals.map(dealMapper))
        );
      }
    }
  }
};
