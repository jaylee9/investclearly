import React from 'react';
import Layout from '@/components/common/Layout';
import useHeaderProps from '@/hooks/useHeaderProps';
import useTermsConditionPageStyles from '@/pages_styles/termsConditionsPageStyles';
import { Box, Typography } from '@mui/material';
import theme from '@/config/theme';

const TermsConditionsPage = () => {
  const classes = useTermsConditionPageStyles();
  const headerProps = useHeaderProps({
    type: 'search-dark',
    isLinks: true,
    isSignIn: true,
    isSearch: true,
    isShadow: true,
  });
  return (
    <Layout {...headerProps}>
      <Box sx={classes.root}>
        <Box sx={classes.wrapper}>
          <Box sx={classes.content}>
            <Box>
              <Typography variant="h2" sx={classes.mainTitle}>
                Terms & Conditions
              </Typography>
              <Typography variant="body1" sx={classes.text}>
                Thank you for visiting this website. We at Invest Clearly, LLC,
                a Delaware limited liability company (“Invest Clearly”) want
                this to be a positive experience for you and others. For that
                reason, we have put in place the following terms of use for this
                website. Your access and use of this website is subject to the
                terms below. We hope you enjoy the content you find here. If you
                have questions or comments, you can contact us at the email
                address or mailing address found at the end of these terms.
              </Typography>
            </Box>
            <Box sx={classes.contentWrapper}>
              <Box sx={classes.mainInfoWrapper}>
                <Box>
                  <Typography variant="h5">
                    Overview of our Terms of Use
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    These Terms of Use (“Terms”) govern the use of our website
                    www.goinvestclearly.com (this “Site”), as well as other
                    website content, social media content channels, products,
                    goods, services, promotions, software, technology and any
                    other materials that we may provide through the Site, as
                    well as other services that link to, or contain references
                    to, this document and are published or made available by
                    Invest Clearly and our affiliates as applicable (all of the
                    foregoing collectively referenced hereinafter as
                    “Services”). Please read these Terms carefully. These Terms
                    do not govern sites, applications, destinations, or services
                    linked to from the Site or Services that we do not own or
                    control.
                    <br /> You can access the Terms any time in the footer of
                    the Site’s home page, via the menu button or on the Site
                    description screen, or as otherwise indicated depending on
                    the Services you are using. BY ACCESSING, VISITING OR USING
                    THE SITE OR SERVICES, YOU CONSENT TO THESE TERMS. IF YOU DO
                    NOT AGREE TO THESE TERMS, PLEASE IMMEDIATELY CEASE USE OF
                    THE SITE AND ANY OTHER OF THE SERVICES GOVERNED BY THESE
                    TERMS. WE ADVISE THAT YOU PRINT OR RETAIN A DIGITAL COPY A
                    COPY OF THESE TERMS FOR FUTURE REFERENCE.
                    <br /> In addition to reviewing the Terms, please also
                    review our Privacy Notice (“Privacy Notice”) and any other
                    terms and conditions that may be posted elsewhere in the
                    Site or otherwise communicated to our users through the Site
                    or Services, because the Privacy Notice and all such other
                    terms and conditions are also part of the agreement between
                    you and us. Additional terms will apply to any transactions
                    you make through our Site or Services, and such will be
                    provided during the specific process (for example, if you
                    purchase products or services for sale on the Site). Those
                    terms may vary from the Terms provided herein.
                    <br /> IF YOU ARE UNDER 16 YEARS OF AGE, YOU MUST ACCESS
                    AND/OR USE THE SITE AND/OR SERVICES ONLY WITH THE
                    INVOLVEMENT OF YOUR PARENT OR GUARDIAN.
                    <br />
                    We may in our sole and absolute discretion change these
                    Terms or our Privacy Notice from time to time to comply with
                    laws or to meet our changing business requirements. These
                    revisions shall be effective for new users immediately upon
                    being posted to the Services; however, for existing
                    customers, the applicable revisions shall be effective 30
                    days after posting unless otherwise stated. If you do not
                    agree with any of the changes, you must discontinue using
                    any and all Services. By continuing to use our Site or any
                    other of our Services after any changes are posted, you
                    expressly accept any applicable changes. Please note our
                    employees, customer service representatives, or other agents
                    are not authorized to modify any provision of these Terms,
                    either verbally or in writing.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Forward Looking Statements
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    This Site may contain links to forward-looking statements
                    within the meaning of the federal securities laws. These
                    forward-looking statements are not historical facts, but
                    rather are based on current expectations, estimates, and
                    projections about the applicable industry, beliefs, and
                    assumptions. These statements are not guarantees of future
                    performance and are subject to certain risks, uncertainties
                    and other factors, some of which are beyond the issuer’s
                    control, are difficult to predict and could cause actual
                    results to differ materially from those expressed or
                    forecasted. You should not place undue reliance on these
                    forward-looking statements, which reflect the issuer’s
                    management’s view only on the date of this memorandum.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    No Securities Being Offered
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    You expressly acknowledge and agree that Invest Clearly is
                    not offering any interest in any entity of any kind or any
                    other type of securities (each, a “Security”) as defined in
                    the United States Securities Act of 1933, the Securities
                    Exchange Act of 1934, any related laws, rules, and
                    regulations adopted or enacted in connection therewith, and
                    any equivalent laws, rules, and regulations of any state.
                    Invest Clearly is simply acting as a platform to connect
                    sponsors, investors, and other parties and to provide a
                    means for exchanging information and ideas. Invest Clearly
                    has not reviewed any of the information provided by any
                    other user, nor has it evaluated any opportunity that any
                    other party may offer on this Site. Invest Clearly is not
                    responsible for, and does not confirm the accuracy or
                    completeness of, any of the information that is contained on
                    this Site. Each User is obligated to confirm whether any
                    information that it receives is complete and accurate, and
                    must engage any applicable legal, accounting, tax, or other
                    professional to confirm that the information that it
                    receives, or the potential investment opportunity that it
                    may consider, is adequate. Each User must conduct its own
                    due diligence to confirm whether any other user meets the
                    User’s requirements.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">Release and Indemnity</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    You hereby release and discharge Invest Clearly and any
                    affiliates (the “Invest Clearly Affiliates”) from any and
                    all claims, suits, rights of action, losses, charges,
                    damages, demands, debts, or causes of action, in law or in
                    equity, that you have, or may come to have, against Invest
                    Clearly and/or the Invest Clearly Affiliates, arising out
                    of, or relating to, your use of the Services. You understand
                    and agree that this Release is a condition precedent to your
                    access to the Services. You acknowledge that you are aware
                    of Section 1542 of the California Civil Code, which provides
                    that “a general release does not extend to claims which the
                    creditor [or claimant] does not know or suspect to exist in
                    his/her favor at the time of executing the release, which,
                    if known by him/her, must have materially affected his/her
                    settlement with the debtor [or opposing party].”
                    Nonetheless, it is your intent to release Invest Clearly and
                    the Invest Clearly Affiliates, fully and finally. You hereby
                    waive any benefits you may have pursuant to California Civil
                    Code Section 1542 to the fullest extent permitted by law and
                    assume the risk of any and all claims against Invest Clearly
                    and the Invest Clearly Affiliates, or any of them, which you
                    do not know or suspect to exist whether through ignorance,
                    oversight, error or otherwise.
                    <br />
                    You agree to indemnify, defend and hold harmless, Invest
                    Clearly and Invest Clearly Afﬁliates, our ofﬁcers,
                    directors, employees, contractors, agents, licensors and
                    suppliers, from and against any and all losses, liabilities,
                    expenses, damages and costs, including reasonable
                    attorneys&apos; fees and court costs, arising or resulting
                    from any violation or breach of these Terms of Use. If you
                    cause a technical disruption of any of our Services, or the
                    Site or the systems that the Services or Site are hosted on,
                    you agree to be responsible for any and all losses,
                    liabilities, expenses, damages and costs, including
                    reasonable attorneys&apos; fees and court costs, arising or
                    resulting from that disruption. THE USER FURTHER AGREES TO
                    INDEMNIFY AND HOLD HARMLESS INVEST CLEARLY AND ITS INVEST
                    CLEARLY AFFILIATES FROM AND AGAINST ANY AND ALL LIABILITIES
                    OR CLAIMS (INCLUDING ALL ATTORNEYS’ FEES AND COSTS INCURRED
                    BY INVEST CLEARLY IN ENFORCING THIS INDEMNIFICATION) MADE AS
                    A RESULT OF USER’S USE OF THIS SITE, USER’S INVESTMENT IN
                    ANY OPPORTUNITY DESCRIBED ON THIS SITE, THE ENGAGEMENT BY
                    THE USER OF ANY PARTY THROUGH THE USE OF THIS SITE, OR THE
                    USE OF ANY INFORMATION CONTAINED ON THIS SITE.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Limitations of Use of Site
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    The User acknowledges that no Securities or any other type
                    of offering of any kind may be made by or through this Site.
                    If at any time any User offers or attempts to offer any
                    Security of any type, the User’s access to this Site may be
                    suspended indefinitely.
                    <br />
                    The information contained within this Site is neither an
                    offer to sell nor a solicitation of an offer to buy any
                    securities. Invest Clearly does not offer for sale any
                    Securities of any kind either on behalf of itself or on
                    behalf of any other user or offeror.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Intellectual Property; Limited License to the Services
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Our Site, Services, products, information and other content
                    (“Invest Clearly Works”) are intellectual property owned by
                    Invest Clearly and are protected by the copyright laws of
                    the United States and other countries. These Invest Clearly
                    Works are provided to you under license pursuant to the
                    following terms, unless otherwise indicated expressly and in
                    writing; you do not acquire any interest in any of the
                    Invest Clearly Works other than the rights licensed to you
                    by the terms below.
                    <br />
                    For any Services that enable you to access, view, download,
                    share or use in any other fashion the Invest Clearly Works
                    only after you become validly authorized by us, we grant you
                    a limited, revocable, non-exclusive, non-sublicensable,
                    non-transferable license to access and use the specific
                    Invest Clearly Works FOR YOUR PERSONAL, NON-COMMERCIAL USE
                    ONLY. None of these Invest Clearly Works may be copied,
                    shared, or distributed at any time except as expressly
                    provided on the Site or Services (for example, permissible
                    downloading or sharing of any informational materials).
                    <br />
                    Any use of the Site, Services and Invest Clearly Works other
                    than as specifically authorized by these terms, without our
                    prior written permission is strictly prohibited and will
                    automatically terminate the license granted herein without
                    any further action by Invest Clearly. Such unauthorized use
                    may also violate applicable laws such as (but not limited
                    to) copyright and trademark laws. This license is revocable
                    at any time.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">Trademark Notices</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    The trademark, logo, and other website marks, graphics,
                    logos, designs, page headers, button icons, scripts and
                    service names that we use are trademarks or trade dress of
                    Invest Clearly in the U.S. and/or other countries. Invest
                    Clearly’s trademarks and trade dress may not be used,
                    including as part of trademarks and/or as part of domain
                    names, in connection with any product or service in any
                    manner that is likely to cause confusion and may not be
                    copied, imitated, or used, in whole or in part, without the
                    prior written permission of Invest Clearly. All other
                    trademarks and logos on our Site or other of our Services
                    are the property of their respective owners.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">User Conduct</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Each User may only use the Site and other Services for
                    lawful purposes, and must not use them in a way that
                    infringes the rights of anyone else or that restricts or
                    inhibits anyone else&apos;s enjoyment of any Services. In
                    using any Services, and in particular, our Site, you
                    expressly acknowledge you are prohibited from, and agree
                    that you will not without our prior express written consent:
                    <br />
                    i. copy, reproduce, or improperly use or access any content
                    you access or obtain from the Site or the Services;
                    <br />
                    ii. modify, distribute, re-post or sell any content you
                    access or obtain from the Site or the Services except as
                    permitted on the Site or Services;
                    <br />
                    iii. circumvent or disable any content protection system or
                    digital rights management technology used with any Services;
                    <br /> iv. decompile, reverse engineer, disassemble or
                    otherwise reduce any Services to a human-readable form;
                    <br />
                    v. remove identification, copyright or other proprietary
                    notices in or on the Services
                    <br />
                    vi. use the content on our Site for any commercial
                    exploitation whatsoever.
                    <br />
                    vii. disrupt or interfere with the security of, or otherwise
                    abuse, our Site, or any of our Services, system resources,
                    accounts, servers, or networks connected to or accessible
                    through the Site or affiliated or linked sites;
                    <br />
                    viii. access content, data or portions of our Site that are
                    not intended for you, or log onto a server or account that
                    you are not authorized to access;
                    <br />
                    ix. attempt to probe, scan, or test the vulnerability of the
                    Services, including websites, applications, or any
                    associated system or network, or breach security or
                    authentication measures without proper authorization;
                    <br />
                    x. access any Services or our Site through any automated
                    means, such as “robots,” “spiders,” or “offline readers”;
                    <br />
                    xi. interfere or attempt to interfere with the use of our
                    Site or applications or the Services by any other user, host
                    or network, including, without limitation by means of
                    submitting a virus, overloading, &quot;flooding,&quot;
                    &quot;spamming,&quot; &quot;mail bombing,&quot; or
                    &quot;crashing&quot;;
                    <br />
                    xii. use any data mining, “scraping”, web crawling, robots,
                    or similar data gathering and extraction methods on our
                    Site;
                    <br />
                    xiii. send automated queries of any sort to our Site,
                    including meta-searching and “offline” searches of our Site;
                    <br />
                    xiv. harass, “stalk”, disrupt or interfere with any other
                    user&apos;s enjoyment of our Site or affiliated or linked
                    sites;
                    <br />
                    xv. post or submit any content or other data that is
                    libelous, defamatory, threatening, obscene, invasive of
                    privacy, abusive, illegal, objectionable, fraudulent or will
                    otherwise violate the rights of third parties;
                    <br />
                    xvi. upload, post, or otherwise transmit through or on our
                    Site any viruses or other harmful, disruptive, or
                    destructive files;
                    <br />
                    xvii. use, frame, or utilize framing techniques to enclose
                    any Invest Clearly trademark, logo, or other proprietary
                    information (including the images found at our Site, the
                    content of any text, or the layout/design of any page or
                    form contained on a page) without Invest Clearly’s express
                    written consent;
                    <br />
                    xviii. use meta tags or any other &quot;hidden text&quot;
                    utilizing an Invest Clearly name, trademark, or product name
                    without Invest Clearly’s express written consent;
                    <br />
                    xix. deep link to our Site without Invest Clearly’s express
                    written consent;
                    <br />
                    xx. create or use a false identity on our Site, share your
                    account information, or allow any person besides yourself to
                    use your account to access our Site (except as permitted in
                    on the Site);
                    <br />
                    xxi. harvest or otherwise collect information about Invest
                    Clearly users, including email addresses and phone numbers;
                    <br />
                    xxii. download, “rip,” or otherwise attempt to obtain
                    unauthorized access to any Services, content or other
                    materials; and
                    <br />
                    xxiii. post any copyrighted material unless the copyright is
                    owned by you or unless you have an express license from the
                    copyright owner permitting such posting.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Modifications to Invest Clearly Services
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Invest Clearly reserves the right at any time and from time
                    to time to modify, suspend, discontinue or terminate the
                    Invest Clearly Services (or any part thereof) with or
                    without notice. You agree that Invest Clearly will not be
                    liable to you or to any third party for any modification,
                    suspension, discontinuation or termination of the Invest
                    Clearly Services.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Termination of Access to Invest Clearly Services
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    You agree that Invest Clearly, in its sole discretion, may
                    terminate your access to any of the Invest Clearly Services,
                    and/or remove, discard or modify any User-generated content
                    within the Service, for any reason, including, without
                    limitation, for lack of use or if Invest Clearly believes
                    that you have violated or acted inconsistently with the
                    letter or spirit of these Terms. You agree that any
                    termination of your access to the Invest Clearly Services
                    may be affected without prior notice and acknowledge and
                    agree that Invest Clearly may immediately deactivate or
                    delete your account and all related information and files in
                    your account and/or bar any further access to such files or
                    the Invest Clearly Services. If you use the Site in
                    violation of these Terms, Invest Clearly may, in its sole
                    discretion, retain all data collected from your use of the
                    Site. Further, you agree that Invest Clearly shall not be
                    liable to you or any third party for the discontinuation or
                    termination of your access to the Invest Clearly Services,
                    or collection of information notwithstanding in the case of
                    your violation of this Agreement, even if advised of a claim
                    for damages.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Third Party Links and Services
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Our Site and Services may contain links to other websites or
                    services. We may also feature goods and services of third
                    parties on one or more of our social media feeds or
                    channels. These links are provided as a convenience to you
                    and as an additional avenue of access to the information
                    contained therein. We have not necessarily reviewed the
                    information on those other sites and are not responsible for
                    the content of those other sites or any products or services
                    that may be offered through other sites. Inclusion of links
                    to other sites should not be viewed as an endorsement of the
                    content of linked sites. Further, your dealings with any
                    third parties found on or through the Site or Services, the
                    purchase of goods or services, and any terms, conditions,
                    warranties or representations associated with such
                    activities, including privacy terms, are solely between you
                    and the third party. You agree that Invest Clearly will have
                    no liability for any loss or damage of any kind incurred as
                    a result of any activities you undertake in connection with
                    the use of or reliance on any content, goods, services,
                    information or other materials available, or through such
                    third parties, through the Site or Services.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">Privacy Notice</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    As noted elsewhere herein, the data that we obtain from you
                    through your use of any of the Services, is subject to our
                    Privacy Notice. The Privacy Notice can be viewed on our
                    Privacy Notice page, attached to this document. The Privacy
                    Notice contains terms and conditions that govern our
                    collection and use of the information you provide to us,
                    including our respective rights relative to that
                    information. Please review the applicable Privacy Notice
                    before you use the Services. If you are unwilling to accept
                    the terms and conditions of the Privacy Notice, please do
                    not use our Services.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">International Users</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Our Site is controlled, operated, and administered by Invest
                    Clearly from its offices within the United States of
                    America. We recognize that it is possible for you to obtain
                    access to the Services and Site from any jurisdiction in the
                    world, but we have no practical ability to prevent such
                    access. The Services and Site have been designed to comply
                    with the laws of the State of Maine and of the United
                    States. Invest Clearly makes no representation or warranty
                    that the materials contained within our Site are appropriate
                    or available for use at other locations outside of the
                    United States, and access to them from territories where the
                    contents or products available through the Site are illegal
                    is prohibited.
                    <br />
                    By accessing or otherwise using the Site and Services, you
                    represent and warrant that: (a) your access to and use of
                    the Services, or any content or software therein, will
                    comply with any and all requirements in these Terms; (b) you
                    are not located in a country that is subject to a U.S.
                    government embargo, or that has been designated by the U.S.
                    government as a terrorist supporting country, and that you
                    are not listed on any U.S. government list of prohibited or
                    restricted parties; and (c) you will comply with all
                    applicable local, national, and international laws, rules,
                    regulations and ordinances in connection with your use of
                    any of our Site or Services.
                    <br />
                    Privacy provisions applicable to persons in the EU,
                    California, Australia and other places may be found in our
                    Privacy Notice.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">DMCA Copyright Policy </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Invest Clearly respects the intellectual property rights of
                    others, and we require users of our Site and Service to do
                    the same. Site and Service users remain the original
                    copyright owner in all content provided on the community.
                    Use of the material in a manner that is inconsistent with
                    the terms and conditions set forth herein is strictly
                    prohibited.
                    <br />
                    Invest Clearly has adopted the following policy concerning
                    copyright infringement in accordance with the Digital
                    Millennium Copyright Act (&quot;DMCA&quot;), as codified in
                    17 U.S.C § 512. The contact information for our designated
                    agent to receive notification of claimed copyright or
                    intellectual property infringement (&quot;Copyright
                    Agent&quot;) is listed at the end of this policy.
                    <br />
                    If you believe in good faith your work has been copied in a
                    way that constitutes copyright infringement, or that your
                    intellectual property rights have been otherwise violated,
                    please provide the following DMCA requirements to Invest
                    Clearly’s Copyright Agent:
                    <br />• Information reasonably sufficient for Invest Clearly
                    to contact you: name, address, phone and e-mail address (if
                    available);
                    <br /> • A description of the copyrighted work or
                    intellectual property that you claim has been infringed, or
                    if multiple works, a listing of such works; • Information
                    reasonably sufficient to permit Invest Clearly to locate
                    your work on the Site;
                    <br />• A statement, made by you, that you have a good faith
                    belief that the disputed use of the material is not
                    authorized by the copyright owner, its agent or the law;
                    <br /> • A statement by you, made under penalty of perjury,
                    that the information in your notice is accurate and that you
                    are the copyright owner, or authorized to act on the
                    copyright owner&apos;s behalf;
                    <br /> • A physical or electronic signature of the copyright
                    owner, or a person authorized to act on behalf of the owner
                    of an exclusive right that is allegedly infringed.
                    <br />
                    Upon receiving a proper notification of alleged copyright
                    infringement as described above, we will remove or disable
                    access to the allegedly infringing content and promptly
                    notify the alleged infringer of your claim. Please submit
                    your statement to Invest Clearly by mail or email as set
                    forth below: <br />
                    Email: Support@goinvestclearly.com <br />
                    Mailing Address: <br />
                    &nbsp;Invest Clearly, LLC <br />
                    &nbsp;Attn: Copyright Agent <br />
                    &nbsp;28 State St Suite 4 <br />
                    &nbsp;Gorham, ME 04038
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Governing Law; Dispute Resolution{' '}
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    As the Services and Site are controlled by Invest Clearly
                    from Maine, you agree that Maine and U.S. law will apply
                    regardless of your residence or the location where you use
                    the Site and Services. In the event of any controversy or
                    claim arising out of or relating to these Terms or the
                    breach thereof (“Dispute”), the Parties agree to negotiate
                    for a period of thirty (30) days following a party’s notice
                    of such Dispute. In the event that negotiation does not
                    resolve the Dispute, the Parties agree that such Dispute
                    shall be settled by arbitration in Cumberland County, ME
                    before a single arbitrator knowledgeable in commercial
                    contracts and administered by the American Arbitration
                    Association in accordance with its Commercial Arbitration
                    Rules, and judgment on the award rendered by the arbitrator
                    may be entered in any court having jurisdiction thereof.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Limitation of Actions Brought Against Invest Clearly
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    You agree that any claim or cause of action arising out of
                    your use of the Services or these Terms must be filed within
                    one year after such claim or cause of action arose or it
                    shall forever be barred, notwithstanding any statute of
                    limitations or other law to the contrary. Within this
                    period, any failure by Invest Clearly to enforce or exercise
                    any provision of this Agreement or related right shall not
                    constitute a waiver of that right or provision.
                    <br />
                    If you have any questions or concerns with respect to the
                    Site, Services or these Terms, you may contact a
                    representative of Invest Clearly at:
                    <br />
                    Email: Support@goinvestclearly.com <br />
                    Mailing Address: <br />
                    &nbsp;Invest Clearly, LLC <br />
                    &nbsp;28 State St Suite 4 <br />
                    &nbsp;Gorham, ME 04038
                    <br />
                    BY USING THIS SITE THE USER IS AGREEING TO THE FOREGOING
                    TERMS AND CONDITIONS (INCLUDING THE WAIVER, INDEMNIFICATION,
                    AND RELEASE). THE UNDERSIGNED CERTIFIES THAT HE/SHE HAS READ
                    THIS DOCUMENT AND FULLY UNDERSTAND ITS CONTENT AND ACCEPTS
                    ALL TERMS AND CONDITIONS.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={classes.contentWrapper}>
              <Box>
                <Typography variant="h4" sx={classes.blockTitle}>
                  INVEST CLEARLY, LLC
                </Typography>
                <Typography variant="body1" sx={classes.text}>
                  Privacy Notice <br />
                  (Effective: October 13, 2023)
                </Typography>
              </Box>
              <Box sx={classes.mainInfoWrapper}>
                <Box>
                  <Typography variant="h5">
                    OUR COMMITMENT TO YOUR PRIVACY
                  </Typography>
                  <Box display="flex">
                    <Typography variant="body1" sx={classes.text}>
                      <Typography variant="h5" component="span">
                        INVEST CLEARLY, LLC
                      </Typography>
                      (&quot;[Invest Clearly]&quot;, &quot;we&quot;,
                      &quot;our&quot; or &quot;us&quot;) recognizes the
                      importance of data privacy and security. Privacy is a
                      matter of trust, and we are committed to managing personal
                      data lawfully, fairly and transparently. We want our
                      website users, visitors, current and prospective clients,
                      job seekers, employees and other business partners
                      (collectively, &quot;you&quot; or &quot;your&quot;) to
                      understand the ways we collect, use, and share personal
                      data about you. This Privacy Notice (“Privacy Notice”)
                      governs the use of our website, www.goinvestclearly.com
                      (“the Site”), applications, social media channels, other
                      website content, streaming services, products, goods,
                      services, promotions, software, technology and any other
                      materials that we may provide (“Services”) and other
                      services that link to, or contain references to, this
                      document and are published or made available by Invest
                      Clearly and its affiliates as applicable (“we”, “us” or
                      “our”). “Services” as used hereinafter shall include the
                      Site. “Products” as used herein means any products or
                      services we offer for purchase through the Site.
                      <br />
                      This Privacy Notice describes the following topics:
                      <br />• <i>The types of data that we collect</i>
                      <br />• <i>Ways we collect your personal data</i>
                      <br />• <i>Ways we use your personal data</i>
                      <br />• <i>Ways we share your personal data</i>
                      <br />•{' '}
                      <i>Ways we retain and safeguard your personal data</i>
                      <br />•{' '}
                      <i>
                        Your rights and choices about how we collect, use, and
                        share your personal data
                      </i>
                      <br />
                      You can access this Privacy Notice any time in the footer
                      of the Site’s home page, via the menu button or on the
                      Site description screen, or as otherwise indicated,
                      depending on the Site you are using. BY PURCHASING A
                      SERVICE FROM US, REGISTERING FOR ANY ASPECT OF THE SITE,
                      OR OTHERWISE ACCESSING, VISITING, OR USING THE SITE, YOU
                      CONSENT TO THIS PRIVACY NOTICE. IF YOU DO NOT AGREE WITH
                      THE TERMS OF THIS PRIVACY NOTICE, YOU SHOULD NOT ACCESS,
                      VISIT AND/OR USE THE SITE OR SERVICES. WE ADVISE THAT YOU
                      PRINT OR RETAIN A DIGITAL COPY OF THIS PRIVACY NOTICE FOR
                      FUTURE REFERENCE.
                      <br />
                      In addition to reviewing this Privacy Notice, please also
                      review our Terms of Use and any other terms and conditions
                      that may be posted elsewhere on the Site or otherwise
                      communicated to our users, because the Terms of Use and
                      all such terms and conditions are also part of the
                      Agreement between you and us.
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h5">
                    THE TYPES OF DATA ACQUIRED ABOUT YOU
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Personally Identifiable Information (PII).
                    <br />
                    “Personally Identifiable Information” that alone or in
                    combination with other information or in certain contexts
                    can be used to identify, distinguish, or trace you or the
                    device(s) (collectively, “Device”) used to access the Site
                    is referred to in this document as “PII”. PII, together with
                    all other information about you and/or your Device(s) that
                    we acquire, is referred to collectively as your “personal
                    data.” “Content” as used herein refers generally to any type
                    of information, including text, images, video, whether
                    sourced from you, us or third parties. We acquire PII that
                    may include, in certain contexts, your name, postal address,
                    zip code, email address, and telephone number. We also
                    acquire your IP address, User ID, and/or Device ID, which
                    certain jurisdictions consider to be PII because it could be
                    used to identify an individual or Device if it were combined
                    with other identifying information.
                    <br />
                    Sensitive PII
                    <br />
                    In certain circumstances, such as when purchasing a Product,
                    you may provide a credit, debit, or payment account number
                    or other payment information which we recognize as more
                    sensitive than other PII. We generally do not request on, or
                    through the Site, other Data that is often considered
                    “highly sensitive,” such as other financial account
                    information (e.g., credit report information, bank account
                    numbers), personal health information, or government-issued
                    identification numbers (e.g., social security number,
                    drivers’ license number, or passport number). However, we
                    will collect such Sensitive PII when necessary to offer you
                    certain services or if you offer contractor services to or
                    apply for a job with Invest Clearly or receive an offer of
                    employment.
                    <br /> Anonymous Data
                    <br />
                    Some of the personal data that we acquire cannot identify,
                    distinguish, or trace you or your Device, even if combined
                    with other identifying information, and some Personal Data
                    that could be considered PII when combined with other
                    identifying information is not used in a way that
                    identifies, distinguishes or traces you or your Device but
                    is instead used in an anonymous way, often aggregated with
                    other anonymous Personal Data about other users.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    WAYS WE COLLECT YOUR PERSONAL DATA
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    In General
                    <br />
                    <br />
                    We collect only personal data that you provide to us
                    voluntarily and, where applicable, with your consent. Invest
                    Clearly takes measures to ensure that we collect personal
                    data for specified, explicit, and legitimate reasons only —
                    namely, to provide products and services to you and meet our
                    legal obligations. We also take steps to limit the personal
                    data we collect to only the minimum necessary to carry out
                    our business objectives. We may collect your personal data
                    when you:
                    <br />• <i>Contact us by phone or online; </i>
                    <br />• <i>Create a user account;</i>
                    <br />•{' '}
                    <i>
                      Interact with our social media pages (such as Instagram,
                      Facebook, Twitter or LinkedIn);
                    </i>
                    <br />• <i>Sign up for our newsletters or alerts;</i>
                    <br />• <i>View our Invest Clearly content;</i>
                    <br />• <i>Attend an event that we may host;</i>
                    <br />•{' '}
                    <i>When you apply for a job with Invest Clearly; and/or</i>
                    <br />•{' '}
                    <i>
                      Communicate with us via email or other channels, such as
                      our Contact Us form.
                    </i>
                    <br />
                    In these instances, we may collect personal data such as
                    your name, email address, postal address, and phone number.
                    <br />
                    <br />
                    Log Files
                    <br />
                    <br />
                    We may use log files to record data about each user’s visit
                    to our Site. When you visit the Site, we may collect the IP
                    (Internet Protocol) address connected to your computer (or
                    the proxy server you use to access the World Wide Web), your
                    computer operating system, the type of browser you are
                    using, mobile device operating system (if you are accessing
                    the Site using a mobile device), as well as the name of your
                    ISP (Internet Service Provider) or your mobile carrier. We
                    may use this information to analyze overall trends to help
                    improve the Site. We do not share log data with third
                    parties unless required by law to do so.
                    <br />
                    Data Acquired Elsewhere.
                    <br />
                    We may also acquire your personal data offline or otherwise
                    outside of the Site. For example, we may purchase or
                    otherwise acquire such personal data from third-party data
                    suppliers. We reserve the right to merge or co-mingle this
                    other personal data with your personal data collected on or
                    through the Site.
                    <br />
                    Social Network Integration.
                    <br />
                    If you choose to access, visit and/or use any third-party
                    social networking service(s) that may be integrated with the
                    Site, we may receive your personal data that has been made
                    available to those services, including information about
                    your contacts on those services. For example, some social
                    networking services allow you to push Content from our Site
                    to your contacts or to pull information about your contacts
                    so you can connect with them on or through our Site. Some
                    social networking services may also facilitate your
                    registration for our Site or enhance or personalize your
                    experience on our Site. Your decision to use a social
                    networking service in connection with our Site is voluntary.
                    However, you should make sure you are comfortable with the
                    personal data that the third-party social networking
                    services may make available to us by visiting those
                    services’ privacy policies and/or modifying your privacy
                    settings directly with those services. We reserve the right
                    to use, transfer, assign, sell, share, and provide access to
                    all of your personal data that we receive through
                    third-party social networking services in the same ways as
                    all of your personal data we receive through our Site (as
                    described below).
                    <br />
                    <br />
                    Cookies and Similar Tracking Technologies
                    <br />
                    <br />
                    <i>Use of Cookies on the Site</i>
                    <br />
                    Invest Clearly may use “cookies,” or small text files, to
                    collect data about Site usage and trends, to improve the
                    quality of the Site, and to customize your experience on the
                    Site. We may save one or more cookies on your computer. You
                    can remove or block cookies using the settings in your
                    browser, but in some cases doing so may impact your ability
                    to use the Site.
                    <br />
                    We may use another type of cookie, called a
                    &quot;session&quot; cookie, to collect data about your visit
                    to the Site. Session cookies used by the Site expire after
                    you close your web browser.
                    <br />
                    <i>
                      Use of Third-Party Cookies and Other Tracking Technologies
                      on the Site
                    </i>
                    <br />
                    Invest Clearly may use Google Maps™ mapping service, Google
                    Analytics, or any other analytics service provider to
                    optimize the Site&apos;s service and experience. Google
                    Maps, Google Analytics, or any other analytics service
                    provider may use cookies, tags, or other technologies to
                    collect data about a user&apos;s behavior and their mobile
                    devices. We do not use Google Maps mapping service to
                    collect or process data that uniquely identifies an
                    individual except as needed to offer products and services
                    to you, including the hosting of your life tribute content.
                    Refer to the Google Privacy Policy for more information on
                    Google Maps and Google Analytics services. Refer to the
                    terms and conditions and privacy policy of any other
                    analytics service provider for more information.
                    <br />
                    <i>Use of Beacons for Email Marketing</i>
                    <br />
                    Invest Clearly may use &quot;beacons&quot; (which are like
                    cookies) in email marketing communications with our clients
                    and other stakeholders to collect data about recipients’
                    actions (e.g., the number of recipients who open the message
                    or click on a link in the message) such as email marketing
                    communications.
                    <br />
                    <i>Notice and Consent for Use of Cookies</i>
                    <br />
                    In accordance with the EU General Data Protection Regulation
                    (see below), Invest Clearly may provide you with clear and
                    conspicuous notice that summarizes our use of cookies, seeks
                    your consent for the use of such cookies, and outlines the
                    ways you can control such cookies when visiting the Site. If
                    no such notice presents itself to users who visit our Site,
                    this means that Invest Clearly does not implement cookies.
                    <br />
                    <br />
                    Your Consent to Our Collection of Your Personal Data
                    <br />
                    <br />
                    By using this Site or otherwise digitally communicating with
                    Invest Clearly, you consent to our collection of your
                    personal data for our legitimate business uses. If you do
                    not consent to such collection of your personal data, please
                    do not digitally communicate with Invest Clearly.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    WAYS WE USE YOUR PERSONAL DATA
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    In General
                    <br />
                    <br />
                    Invest Clearly may use your personal data for our legitimate
                    business purposes. In particular, we may use your personal
                    data to communicate with you and provide you with our
                    products and services. For example, we may use your personal
                    data for the following reasons:
                    <br />• <i>Send you newsworthy updates </i>
                    <br />• <i>Send you invitations to events</i>
                    <br />• <i>Answer questions you submit to us</i>
                    <br />• <i>Administer our business processes</i>
                    <br />•{' '}
                    <i>Comply with our legal and contractual obligations</i>
                    <br />
                    If you apply for a job or contractor position with Invest
                    Clearly, we may also use your personal data to process your
                    application, conduct background screening, or check
                    references. Once hired, we may use your personal data to
                    facilitate payment (and benefits, as applicable).
                    <br />
                    <br />
                    Opting-Out of Uses of Your Personal Data
                    <br />
                    If you wish to request that Invest Clearly refrain from
                    using your personal data in the ways described herein,
                    please submit your request to Invest Clearly by using the
                    information in the{' '}
                    <i style={{ textDecoration: 'underline' }}>
                      How to Contact Us
                    </i>{' '}
                    section below. This may necessitate disabling or deletion of
                    your account or account data.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    WAYS WE SHARE YOUR PERSONAL DATA
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    In General
                    <br />
                    <br />
                    In the context of the uses of personal data mentioned in the
                    Ways We Use Your Personal Data section above, we may share
                    your personal data with third parties we engage to help
                    provide products and services to you. These third parties
                    include, but are not limited to, organizations that provide
                    the following services:
                    <br />• <i>Software support </i>
                    <br />•{' '}
                    <i>Customer relationship management (CRM) platform</i>
                    <br />• <i>Website hosting</i>
                    <br />• <i>Business resilience and disaster recovery</i>
                    <br />• <i>User authentication</i>
                    <br />• <i>Auditing platforms and accounting</i>
                    <br />• <i>Legal advice and counsel</i>
                    <br />• <i>Management consulting</i>
                    <br />• <i>Mailing and logistics</i>
                    <br />• <i>Email marketing</i>
                    <br />• <i>Marketing research</i>
                    <br />• <i>Invest Clearly social media channels</i>
                    <br />• <i>Media partners</i>
                    <br />
                    <br />
                    Other Sharing Circumstances
                    <br />
                    <br />
                    We may also share your personal data in other circumstances,
                    such as the following:
                    <br />•{' '}
                    <i>
                      As required by law, or in response to a subpoena or other
                      government information request
                    </i>
                    <br />•{' '}
                    <i>
                      If we believe that the disclosure is in the interest of
                      your security or the security of Invest Clearly (including
                      exchanging information with other companies and
                      organizations for the purposes of fraud protection and
                      credit risk reduction)
                    </i>
                    <br />• <i>If another company acquires or merges with us</i>
                    <br />•{' '}
                    <i>
                      If we go out of business, enter bankruptcy, or experience
                      some other change of control
                    </i>
                    <br />
                    <br />
                    Sharing Aggregate Information
                    <br />
                    <br />
                    When Invest Clearly requests demographic information
                    collected during an information request or registration, you
                    have the option not to provide this information. However, we
                    encourage you to share your demographic information so that
                    we may gain a better understanding of your needs and so that
                    we can serve you in a more personalized manner. We may also
                    share aggregate non-personal data with strategic partners.
                    Under these circumstances, we do not disclose information
                    that can uniquely identify you.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">PERSONAL DATA RETENTION</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Invest Clearly may retain your personal data for at least as
                    long as you transact business with us as such data retention
                    is necessary to provide you with products and services.
                    Invest Clearly may retain and use your personal data as
                    necessary to comply with our legal obligations and policies,
                    resolve disputes and enforce our agreements.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">DATA TRANSFERS</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Data Transfers from EU/EEA to the US or Elsewhere
                    <br />
                    <br />
                    If you are in the European Union/European Economic Area
                    (EU/EEA), please be aware that we operate in the United
                    States (US). As such, Invest Clearly may transfer your
                    personal data from the EU/EEA to the US to provide you with
                    products and services, or otherwise communicate with you.
                    Invest Clearly takes measures to adequately safeguard your
                    personal data when transferred to the United States or
                    elsewhere. In doing so, we aim to comply with applicable
                    data privacy laws and regulations.
                    <br />
                    When Invest Clearly transfers personal data from the EU/EEA
                    to countries or international organizations based outside
                    the EU/EEA, the transfer takes place on the basis of legally
                    permitted grounds, such as with your informed consent prior
                    to the transfer, or via standard contractual clauses (i.e.,
                    pre-defined data protection clauses added to contracts) with
                    those clients for whom we transfer such personal data.
                    <br />
                    <br />
                    Data Transfers from Australia to the US or Elsewhere
                    <br />
                    <br />
                    If you are a citizen of Australia, please be aware that we
                    operate in the United States. As such, Invest Clearly may
                    transfer your personal data from Australia to the US to
                    provide you with products and services, or otherwise
                    communicate with you. Invest Clearly takes measures to
                    adequately safeguard your personal data when transferred
                    from Australia to the US or elsewhere.
                    <br />
                    <br />
                    Data Transfers from Other Regulated Countries or
                    Jurisdictions to the US or Elsewhere
                    <br />
                    <br />
                    If you are a citizen of a country or jurisdiction not
                    specifically mentioned in this Privacy Notice, please be
                    aware that we operate in the United States. As such, Invest
                    Clearly may transfer your personal data from your home
                    country or jurisdiction to the US to provide you with
                    products and services, or otherwise communicate with you.
                    Invest Clearly takes measures to adequately safeguard your
                    personal data when transferred from a country or
                    jurisdiction not specifically mentioned in this Privacy
                    Notice to the US or elsewhere.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">YOUR PRIVACY RIGHTS</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Your Privacy Rights Under GDPR
                    <br />
                    <br />
                    If you are in the European Union (EU), you have certain data
                    privacy rights, as defined by the General Data Protection
                    Regulation (GDPR). Invest Clearly describes these rights in
                    our Supplemental Privacy Notice for Individuals in the
                    European Union.
                    <br />
                    <br />
                    Your Privacy Rights Under CCPA
                    <br />
                    <br />
                    If you are a resident of California, you have certain data
                    privacy rights, as defined by the California Consumer
                    Privacy Act of 2018 (CCPA). Invest Clearly describes these
                    rights in our{' '}
                    <i>
                      Supplemental Privacy Notice for Residents of California.
                    </i>
                    <br />
                    <br />
                    Your Privacy Rights Under the Australia Privacy Act
                    <br />
                    <br />
                    If you are a citizen of Australia, you have certain data
                    privacy rights, as defined by the Australia Privacy Act.
                    Invest Clearly describes these rights in our{' '}
                    <i>
                      Supplemental Privacy Notice for Citizens of Australia.
                    </i>
                    <br />
                    <br />
                    Your Privacy Rights Under Other Regulated Countries or
                    Jurisdictions
                    <br />
                    <br />
                    If you are a citizen or resident of regulated countries or
                    jurisdictions not specifically mentioned in this Privacy
                    Notice, you may have certain data privacy rights, as defined
                    by the laws and regulations of such regulated countries or
                    jurisdictions. Invest Clearly commits to honor the privacy
                    rights of individuals from such regulated countries or
                    jurisdictions. If you have a question about these rights,
                    please use the information in the{' '}
                    <i style={{ textDecoration: 'underline' }}>
                      How to Contact Us
                    </i>{' '}
                    section below.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    INDIVIDUALS UNDER THE AGE OF 16
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Invest Clearly does not intend this Site for use by
                    individuals under 16 years of age. Those under the age of 16
                    should avoid providing any personal data to the Site without
                    verifiable parental consent.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">DATA SECURITY</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    We constantly strive to align our data security practices
                    with industry-accepted standards for securely handling,
                    transmitting, and storing personal data. To prevent
                    unauthorized access and to maintain data accuracy and the
                    correct use of information, Invest Clearly implements
                    administrative, physical, and technical measures to
                    safeguard and secure the information we collect on the Site.
                    We utilize industry-accepted encryption technologies and
                    strengths to reduce the risk that others can view
                    information passing between our Site and your browser.
                    <br />
                    Since the Internet is not a completely secure environment,
                    we cannot ensure or warrant the security of any information
                    you transmit to us. Invest Clearly offers no guarantees that
                    information cannot or will not be accessed, disclosed,
                    altered, or destroyed by a breach of any of our
                    administrative, physical, or technical measures.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    NOTIFICATION IN EVENT OF DATA BREACH
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    International, federal, and state laws and regulations may
                    require Invest Clearly to notify our clients and/or
                    individual victims in the event of a breach of personal
                    data. In such an unfortunate event, we will promptly notify
                    our clients and/or data breach victims, in accordance with
                    notification procedures defined in our internal policies and
                    as required by applicable law.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    OPTING OUT OF SHARING YOUR PERSONAL DATA
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    You have choices regarding the ways we share your personal
                    data with third parties. In many cases, you must opt out by
                    using the mechanism provided by our third-party service
                    providers. For instance, you may opt out of email
                    communications from us by clicking the “unsubscribe” link in
                    the email message. If you wish to opt out of our sharing of
                    your personal data, please submit your request to Invest
                    Clearly via the{' '}
                    <i style={{ textDecoration: 'underline' }}>
                      How to Contact Us
                    </i>{' '}
                    section below. As noted above, this may necessitate deletion
                    of your data or your account with us.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">LINKS</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    This Site may contain links to and from other third-party
                    sites. Please be aware that Invest Clearly is not
                    responsible for the privacy practices of these third-party
                    sites. We encourage you to be aware when you leave our Site
                    and to read the privacy notices of each third-party website
                    that collects your personal data.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">HOW TO CONTACT US</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    You may contact us directly via post or email:
                    <br />
                    Invest Clearly, LLC
                    <br />
                    28 State Street Suite 4
                    <br />
                    Gorham, ME 04038
                    <br />
                    support@goinvestclearly.com
                    <br />
                    <br />
                    If you request to opt out of our marketing communications or
                    those of our partners, there may be a 30-day period before
                    such opt-out will take effect.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    UPDATES TO THIS PRIVACY NOTICE
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Invest Clearly created this Privacy Notice on{' '}
                    <span style={{ textDecoration: 'underline' }}>
                      October 13, 2023
                    </span>
                    . We reserve the right, at our discretion, to change,
                    modify, add, or remove portions of this Privacy Notice at
                    any time. Your continued use of the Site following
                    reasonable notice of such modifications constitutes your
                    acceptance of any changes to this Privacy Notice.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={classes.contentWrapper}>
              <Box>
                <Typography variant="h4" sx={classes.blockTitle}>
                  <span style={{ color: theme.palette.primary.main }}>
                    INVEST CLEARLY,
                  </span>{' '}
                  LLC
                </Typography>
                <Typography variant="body1" sx={classes.text}>
                  Supplemental Privacy Notice for Individuals in the European
                  Union and United Kingdom <br />
                  (Effective: October 13, 2023)
                </Typography>
              </Box>
              <Box sx={classes.mainInfoWrapper}>
                <Box>
                  <Typography variant="h5">
                    YOUR PRIVACY RIGHTS UNDER GDPR
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    <b>Invest Clearly, LLC</b> (&quot;Invest Clearly&quot;,
                    &quot;we&quot;, &quot;our&quot; or &quot;us&quot;) provides
                    this Supplemental Privacy Notice to individuals (“you”,
                    “your”, “data subject”) in the European Union (EU) and
                    United Kingdom (UK). You have certain data privacy rights,
                    as defined by the EU’s General Data Protection Regulation
                    (GDPR) and the UK General Data Protection Regulation (UK
                    GDPR). Your privacy rights relative to your relationship
                    with Invest Clearly may vary depending on circumstances, as
                    described below. References to “Services” below apply to our
                    website, www.goinvestclearly.com, and our social media
                    channels.
                    <br />
                    <br />
                    If you are interested in reading Invest Clearly’s{' '}
                    <i>Privacy Notice</i>, please see above
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Legal Basis for Processing Personal Information
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    If you are an individual residing in the European Union or
                    the UK, our legal basis for collecting and using the
                    personal information described above will depend on the
                    personal information concerned and the specific context in
                    which we collect it.
                    <br />
                    We will normally collect personal information from you only
                    (i) where we need the personal information to perform a
                    contract with you, (ii) where the processing is in our
                    legitimate interests and not overridden by your rights, or
                    (iii) where we have your consent to do so. In some cases, we
                    may also have a legal obligation to collect personal
                    information from you or may otherwise need the personal
                    information to protect your vital interests or those of
                    another person.
                    <br />
                    If we collect and use your personal information in reliance
                    on our legitimate interests (or those of any third party),
                    this interest will normally be to operate our platform and
                    communicate with you as necessary to provide our services to
                    you and for our legitimate commercial interest, for
                    instance, when responding to your queries, improving our
                    platform or undertaking marketing.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    How Long We Keep Your Information For
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    We will keep your personal information for as long as we
                    have an ongoing legitimate business need to do so (for
                    example, to provide you with a service you have requested or
                    to comply with applicable legal, tax or accounting
                    requirements).
                    <br />
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete or
                    anonymize it or, if this is not possible (for example,
                    because your personal information has been stored in backup
                    archives), then we will securely store your personal
                    information and isolate it from any further processing until
                    deletion is possible.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Where We Store or Process Your Information
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    The information we collect from you may be transferred to,
                    processed, and stored at, a destination outside the US,
                    European Union, or UK. Specifically, Invest Clearly’s
                    servers are located in the US, but when we collect your
                    personal information, we may process it in another country.
                    <br />
                    Such destinations or countries may not have laws which
                    protect your information to the same extent as in your home
                    country. It may be processed by us or by our service
                    providers operating outside the US, EU, or UK, but we will
                    take appropriate steps to ensure that your information is
                    treated securely and in accordance with this Privacy Notice.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    Privacy Rights for Individuals Communicating with Invest
                    Clearly Directly
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    For data subjects who communicate directly with Invest
                    Clearly via digital media (i.e., email, our Contact Us form,
                    direct messages through our Services, phone, fax, etc.),
                    your privacy rights include the following:
                    <br />•{' '}
                    <i>
                      <u>Access:</u> You have the right to request that we
                      provide you access to a copy of your personal data held by
                      Invest Clearly.
                    </i>
                    <br />•{' '}
                    <i>
                      <u>Correction, Amendment and Deletion: </u> You have the
                      right to request a correction or amendment of your
                      personal data held by Invest Clearly. You also have a
                      right to request that Invest Clearly deletes certain
                      personal data about you.
                    </i>
                    <br />•{' '}
                    <i>
                      <u>Restriction: </u> You have the right to request that we
                      restrict processing of your personal data held by Invest
                      Clearly if you contest the accuracy of your personal data
                      held by Invest Clearly or the lawfulness of Invest
                      Clearly’s processing of your personal data.
                    </i>
                    <br />•{' '}
                    <i>
                      <u>Portability:</u> You have the right to receive your
                      personal data held by Invest Clearly in a structured,
                      commonly used and machine-readable format. You also have
                      the right to transmit your personal data to another
                      organization without hindrance from Invest Clearly.
                    </i>
                    <br />•{' '}
                    <i>
                      <u>Objection:</u> You have the right to object, on grounds
                      relating to your particular situation, to Invest Clearly’s
                      processing of personal data about you, unless Invest
                      Clearly demonstrates compelling legitimate grounds for
                      continuing such processing. You also have the right to
                      object to any automated decision-making (such as user
                      profiling) used by Invest Clearly.
                    </i>
                    <br />•{' '}
                    <i>
                      <u>Complaints:</u> You have the right to lodge a complaint
                      or concern about our data privacy practices with Invest
                      Clearly directly and/or with an appropriate supervisory
                      authority.
                    </i>
                    <br />
                    If you wish to exercise any of your rights, as described
                    above, please submit your request to Invest Clearly by using
                    the information in the How to Contact Us section below. We
                    respond to all requests we receive from individuals wishing
                    to exercise their data protection rights in accordance with
                    applicable data protection laws.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    How to Lodge a Complaint Under GDPR and UK GDPR
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    If you are in the EU and wish to lodge a complaint about our
                    data privacy practices with a regulatory authority in your
                    country, you can find details at this link:
                    https://ec.europa.eu/info/law/law-topic/data-protection/reform/rights-citizens_en.
                    <br />
                    <br />
                    If you are in the UK and wish to lodge a complaint about our
                    data privacy practices with a regulatory authority in your
                    country, you can find details at this link:
                    https://ico.org.uk/global/contact-us/
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">HOW TO CONTACT US</Typography>
                  <Typography variant="body1" sx={classes.text}>
                    If you have questions or concerns, you may contact Invest
                    Clearly directly via post or email:
                    <br />
                    Invest Clearly, LLC
                    <br />
                    c/o Privacy Official
                    <br />
                    28 State Street, Suite 4
                    <br />
                    Gorham, ME 04038
                    <br />
                    email: support@goinvestclearly.com
                    <br />
                    <br />
                    If you request to opt-out of our marketing communications or
                    those of our partners, there may be a 30-day period before
                    such opt-out will take effect.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5">
                    UPDATES TO THIS <i>SUPPLEMENTAL PRIVACY NOTICE</i>
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Invest Clearly created this{' '}
                    <i>Supplemental Privacy Notice</i> on October 13, 2023 . We
                    reserve the right, at our discretion, to change, modify,
                    add, or remove portions of this{' '}
                    <i>Supplemental Privacy Notice</i>
                    at any time. Your continued use of the Site following
                    reasonable notice of such modifications constitutes your
                    acceptance of any changes to this{' '}
                    <i>Supplemental Privacy</i>
                  </Typography>
                </Box>
              </Box>
              <Box sx={classes.contentWrapper}>
                <Box>
                  <Typography variant="h4" sx={classes.blockTitle}>
                    INVEST CLEARLY, LLC
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Supplemental Privacy Notice for Citizens of Australia <br />
                    (Effective: October 13, 2023)
                  </Typography>
                </Box>
                <Box sx={classes.mainInfoWrapper}>
                  <Box>
                    <Typography variant="h5">
                      YOUR PRIVACY RIGHTS UNDER THE AUSTRALIA PRIVACY ACT
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      Invest Clearly, LLC (&quot;Invest Clearly&quot;,
                      &quot;we&quot;, &quot;our&quot; or &quot;us&quot;)
                      provides this <i>Supplemental Privacy Notice</i> to
                      citizens of Australia (“you”, “your” or “individuals”).
                      You have certain data privacy rights, as defined in the
                      Australian Privacy Act of 1988 (&quot;Australian Privacy
                      Act&quot;). Your privacy rights relative to your
                      relationship with Invest Clearly may vary depending on
                      circumstances, as described below. This Notice applies to
                      information we collect through our website,
                      www.goinvestclearly.com, as well as our social media
                      channels.
                      <br />
                      If you are interested in reading Invest Clearly’s{' '}
                      <i>Privacy Notice</i>, please see above.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      Privacy Rights for Individuals Communicating with Invest
                      Clearly Directly
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      If you are an Australian citizen, please note that Invest
                      Clearly may be subject to the Australian Privacy
                      Principles (APPs) defined in the Australian Privacy Act.
                      <br />
                      The following are specific points you should know:
                      <br />•{' '}
                      <i>
                        We require our subcontractors to undertake a similar
                        obligation.
                      </i>
                      <br />•{' '}
                      <i>
                        We will not use or disclose your personal information
                        for our direct marketing purposes unless:
                      </i>
                      <br />
                      &nbsp;&nbsp;&nbsp;&#9675;
                      <i>
                        You have consented (opted-in) to receive direct
                        marketing
                      </i>
                      <br />
                      &nbsp;&nbsp;&nbsp;&#9675;
                      <i>
                        You would reasonably expect us to use your personal
                        information for marketing; or
                      </i>
                      <br />
                      &nbsp;&nbsp;&nbsp;&#9675;
                      <i>
                        We believe you may be interested in the marketing
                        material, but it is impractical for us to obtain your
                        consent.
                      </i>
                      <br />
                      You may opt out of any marketing materials we send you
                      through an unsubscribe mechanism or by contacting us using
                      the information in the{' '}
                      <i>
                        <u>How to Contact Us</u>
                      </i>{' '}
                      section below. If you have requested not to receive
                      further direct marketing messages, we may continue to
                      provide you with messages that are not regarded as “direct
                      marketing” under the Australian Privacy Act, including
                      changes to our terms and other information related to your
                      account.
                      <br />
                      <br />
                      Our computer servers are located in the United States. In
                      addition, we or our third-party service providers may use
                      “cloud” technology to store or process personal
                      information, which may result in the storage of data
                      outside Australia. It is not practicable for us to specify
                      in advance which country will have jurisdiction over this
                      type of offshore activity. Our third-party service
                      providers, however, are required to comply with the
                      Australian Privacy Act in relation to the transfer or
                      storage of personal information overseas.
                      <br />
                      If you believe the personal information that we hold about
                      you is inaccurate, out of date, incomplete, irrelevant, or
                      misleading, please contact us using the information in the{' '}
                      <i>
                        <u>How to Contact Us</u>
                      </i>{' '}
                      section below. We will take reasonable steps, consistent
                      with our obligations under the Australian Privacy Act, to
                      correct that information upon your request.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      How to Lodge a Complaint Under the Australia Privacy Act
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      If you are an Australian resident and have a complaint
                      about a privacy matter, please contact us by using the
                      information in the{' '}
                      <i>
                        <u>How to Contact Us</u>
                      </i>{' '}
                      section below. If your complaint is not resolved to your
                      satisfaction, you can contact the Office of the Australian
                      Information Commissioner (OAIC)  at this link:
                      https://www.oaic.gov.au/privacy/privacy-complaints/.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">HOW TO CONTACT US</Typography>
                    <Typography variant="body1" sx={classes.text}>
                      If you have questions or concerns, you may contact Invest
                      Clearly directly via post or email:
                      <br />
                      Invest Clearly, LLC
                      <br />
                      c/o Privacy Official
                      <br />
                      28 State Street, Suite 4
                      <br />
                      Gorham, ME 04038
                      <br />
                      email: support@goinvestclearly.com
                      <br />
                      <br />
                      If you request to opt out of our marketing communications
                      or those of our partners, there may be a 30-day period
                      before such opt-out will take effect.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      UPDATES TO THIS <i>SUPPLEMENTAL PRIVACY NOTICE</i>
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      Invest Clearly created this{' '}
                      <i>Supplemental Privacy Notice</i> on October 13, 2023. We
                      reserve the right, at our discretion, to change, modify,
                      add, or remove portions of this{' '}
                      <i>Supplemental Privacy Notice</i> at any time. Your
                      continued use of the Site following reasonable notice of
                      such modifications constitutes your acceptance of any
                      changes to this
                      <i>Supplemental Privacy Notice</i>.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={classes.contentWrapper}>
                <Box>
                  <Typography variant="h4" sx={classes.blockTitle}>
                    INVEST CLEARLY, LLC
                  </Typography>
                  <Typography variant="body1" sx={classes.text}>
                    Supplemental Privacy Notice for California Residents <br />
                    (Effective: October 13, 2023)
                  </Typography>
                </Box>
                <Box sx={classes.mainInfoWrapper}>
                  <Box>
                    <Typography variant="h5">
                      YOUR PRIVACY RIGHTS UNDER THE CALIFORNIA CONSUMER PRIVACY
                      ACT
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      <b>Invest Clearly, LLC</b> (&quot;Invest Clearly&quot;,
                      &quot;we&quot;, &quot;our&quot; or &quot;us&quot;)
                      provides this Supplemental Privacy Notice to residents of
                      the state of California (“you”, “your”, “consumer”). You
                      have certain data privacy rights, as defined in the
                      California Consumer Privacy Act of 2018
                      (&quot;CCPA&quot;). This applies to users of our websites
                      and services found at: www.goinvestclearly.com and our
                      social media channels. References to “Services” herein
                      applies to our website and our social media channels. Your
                      privacy rights relative to your relationship with Invest
                      Clearly may vary depending on circumstances, as described
                      below.
                      <br />
                      If you are interested in reading Invest Clearly’s{' '}
                      <i>Privacy Notice</i>, please follow this <b>link</b>.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      Privacy Rights for Consumers Communicating with Invest
                      Clearly Directly
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      For consumers who communicate directly with Invest Clearly
                      via digital media (i.e., email, our Contact Us form,
                      direct messages through social media channels, phone, fax,
                      etc.), your privacy rights include the following:
                      <br />•{' '}
                      <i>
                        <u>Access:</u> You have the right to request that we
                        provide you access to a copy of your personal
                        information held by Invest Clearly, covering the twelve
                        (12) calendar months preceding your request.
                      </i>
                      <br />•{' '}
                      <i>
                        <u>Portability:</u> You have the right to receive your
                        personal information held by Invest Clearly in a
                        structured, commonly-used and machine-readable format.
                        You also have the right to transmit your personal
                        information to another organization without hindrance
                        from Invest Clearly.
                      </i>
                      <br />•{' '}
                      <i>
                        <u>Correction, Amendment and Deletion:</u> You have the
                        right to request a correction or amendment of your
                        personal information held by Invest Clearly. You also
                        have a right to request that Invest Clearly deletes
                        certain personal information about you.
                      </i>
                      <br />•{' '}
                      <i>
                        <u>Opt-Out of Sharing: </u> You have the right to
                        request that we do not sell (where applicable) your
                        personal information to third parties.
                      </i>
                      <br />•{' '}
                      <i>
                        <u>Prohibition on Discrimination:</u> You have the right
                        to exercise your rights under CCPA without fear of
                        discrimination by Invest Clearly.
                      </i>
                      <br />
                      If you wish to exercise any of your rights, as described
                      above, please submit your request to Invest Clearly by
                      using the information in the{' '}
                      <i>
                        <u>How to Contact Us</u>
                      </i>{' '}
                      section below.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      Prohibition on Sales of Personal Information About
                      California Residents
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      Invest Clearly does not “sell” personal information about
                      residents of California to third parties, per the meaning
                      of this term defined in the California Consumer Privacy
                      Act (Cal. Civ. Code §1798.140(t)). As such, Invest Clearly
                      does not make available a clear and conspicuous link
                      entitled, “Do Not Sell My Personal Information,” per CCPA
                      requirements for those businesses that sell personal
                      information. Should our business practices change, Invest
                      Clearly may implement such a link on its Site.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      OTHER CALIFORNIA PRIVACY RIGHTS
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      California Civil Code Section §1798.83 permits users of
                      our Services that are California residents to request
                      certain information regarding our disclosure of personal
                      information to third-parties for their direct marketing
                      purposes. If you wish to exercise your rights under
                      California law, as described above, please submit your
                      request to Invest Clearly by using the information in the{' '}
                      <i>
                        <u>How to Contact Us</u>
                      </i>{' '}
                      section below.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">HOW TO CONTACT US</Typography>
                    <Typography variant="body1" sx={classes.text}>
                      If you have questions or concerns, you may contact Invest
                      Clearly directly via post or email:
                      <br />
                      Invest Clearly, LLC
                      <br />
                      c/o Privacy Official
                      <br />
                      28 State Street, Suite 4
                      <br />
                      Gorham, ME 04038
                      <br />
                      Email:support@goinvestclearly.com
                      <br />
                      <br />
                      If you request to opt-out of our marketing communications
                      or those of our partners, there may be a 30-day period
                      before such opt-out will take effect.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      UPDATES TO THIS SUPPLEMENTAL PRIVACY NOTICE
                    </Typography>
                    <Typography variant="body1" sx={classes.text}>
                      Invest Clearly created this{' '}
                      <i>Supplemental Privacy Notice</i>on October 13, 2023. We
                      reserve the right, at our discretion, to change, modify,
                      add, or remove portions of this
                      <i>Supplemental Privacy Notice</i> at any time. Your
                      continued use of the Site following reasonable notice of
                      such modifications constitutes your acceptance of any
                      changes to this <i>Supplemental Privacy Notice</i>.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TermsConditionsPage;
