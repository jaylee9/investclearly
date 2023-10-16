import { User } from '../../entities/user.entity';
import { getDatabaseConnection } from '../../config/data-source-config';
import { Deal } from '../../entities/deals.entity';
import { Attachment } from '../../entities/attachments.entity';
import { TargetTypesConstants } from '../../constants/target-types-constants';
import { dealMapper } from '../../mappers/deal.mapper';
import { BookmarkConstants } from '../../constants/bookmark-constants';
import { sendSponsorPostedNewDeal } from '../mails/send-sponsor-posted-new-deal';

export const sendMailToUsersWithNewDealsFromBookmarkedSponsors = async (
  dealId: number
) => {
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
        .leftJoinAndSelect('deals.sponsor', 'sponsor')
        .where('deals.id = :dealId', { dealId })
        .andWhere('sponsor.id IN (:...sponsorIds)', { sponsorIds })
        .getOne();

      if (user && deal) {
        sendSponsorPostedNewDeal(user, dealMapper(deal));
      }
    }
  }
};
