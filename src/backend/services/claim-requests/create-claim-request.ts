import { DeepPartial } from 'typeorm';
import createHttpError from 'http-errors';
import { getDatabaseConnection } from '../../config/data-source-config';
import { getDealById } from '../deals/get-deal-by-id';
import { CreateClaimRequestInterface } from './interfaces/create-claim-request.interface';
import { ClaimEntityTypes } from '../../constants/enums/claim-entity-types';
import { ClaimedRequests } from '../../entities/claimedRequests.entity';
import { ClaimTypes } from '../../constants/enums/claim-types';
import { getSponsorById } from '../sponsors/get-sponsor-by-id';
import { sendClaimDealRequestEmail } from '../mails/send-claim-deal-request-email';
import { sendSuggestEditDealEmail } from '../mails/send-suggest-edit-deal-email';
import { sendClaimSponsorRequestEmail } from '../mails/send-claim-sponsor-request-email';
import { getUserById } from '../users/get-user-by-id';
import { ClaimRequestConstants } from '../../constants/claim-request-constants';

export const createClaimRequest = async (
  data: DeepPartial<CreateClaimRequestInterface>,
  userId: number
) => {
  const { entityId, entityType, claimType } = data;
  const connection = await getDatabaseConnection();
  const user = await getUserById(userId);
  let claimRequest = null;

  const claimRequestRecord = await connection.manager.findOne(ClaimedRequests, {
    where: { entityId, entityType, claimType, userId },
  });

  if (claimRequestRecord) {
    throw new createHttpError.BadRequest(
      ClaimRequestConstants.claimRequestAlreadyCreated
    );
  }

  if (entityType === ClaimEntityTypes.deal && entityId) {
    const dealRecord = await getDealById(entityId);
    claimRequest = connection.manager.create(ClaimedRequests, {
      ...data,
      userId,
    });

    await connection.manager.save(claimRequest);
    if (claimType === ClaimTypes.claimDeal) {
      await sendClaimDealRequestEmail(user, dealRecord, claimRequest);
    }

    if (claimType === ClaimTypes.suggestEditDeal) {
      await sendSuggestEditDealEmail(dealRecord, claimRequest);
    }
  }

  if (entityType === ClaimEntityTypes.sponsor && entityId) {
    const sponsorRecord = await getSponsorById(entityId);
    claimRequest = connection.manager.create(ClaimedRequests, {
      ...data,
      userId,
    });
    await connection.manager.save(claimRequest);

    if (claimType === ClaimTypes.claimSponsorProfile) {
      await sendClaimSponsorRequestEmail(user, sponsorRecord, claimRequest);
    }
  }

  return claimRequest;
};
