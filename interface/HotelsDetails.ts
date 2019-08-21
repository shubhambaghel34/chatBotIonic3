export interface Hotelsdetails {
    startDate: string;
    endDate: string;
    currency: string;
    hotels?: (HotelsEntity)[] | null;
    attributeDefinitions?: (AttributeDefinitionsEntity)[] | null;
    attributeClassDefinitions?: (AttributeClassDefinitionsEntity)[] | null;
    ratePlanDefinitions?: (RatePlanDefinitionsEntity)[] | null;
  }
  export interface HotelsEntity {
    hotelMnemonic: string;
    currency: string;
    productDefinitions?: (ProductDefinitionsEntity)[] | null;
    bonusRatePlans?: (BonusRatePlansEntity)[] | null;
    rateDetails: RateDetails;
  }
  export interface ProductDefinitionsEntity {
    productCode: string;
    productTypeCode: string;
    attributeCodes?: (string)[] | null;
    productName?: string | null;
    description?: string | null;
    maximumNumberParticipant?: number | null;
    extraPersonStart?: number | null;
    isFlowThrough: boolean;
    isDisplayable: boolean;
    isPremium: boolean;
    isAvailable: boolean;
    otaCode?: string | null;
    pacCode?: string | null;
    productTypeName?: string | null;
  }
  export interface BonusRatePlansEntity {
    code: string;
  }
  export interface RateDetails {
    offers?: (OffersEntity)[] | null;
    taxDefinitions?: (TaxDefinitionsEntity)[] | null;
  }
  export interface OffersEntity {
    ratePlanCode: string;
    productUses?: (ProductUsesEntity)[] | null;
    ratesDefinition: RatesDefinition;
    policies: Policies;
    totalRate: TotalRateOrTotalBaseOccupancyRateOrTotalExtraOccupancyRate;
    totalBaseOccupancyRate: TotalRateOrTotalBaseOccupancyRateOrTotalExtraOccupancyRate;
    hasRateChange: boolean;
    availableStatus: string;
    dailyRates?: (DailyRatesEntity)[] | null;
    totalExtraOccupancyRate?: TotalRateOrTotalBaseOccupancyRateOrTotalExtraOccupancyRate1 | null;
  }
  export interface ProductUsesEntity {
    periods?: (PeriodsEntity)[] | null;
    pricingFrequency: string;
    pricingMethod: string;
    productCode: string;
    quantity?: number | null;
    guestCounts?: GuestCounts | null;
    isDefaultPricingBased: boolean;
    isProductIncludedInOffer: boolean;
    numberOfAvailableProducts?: number | null;
    dailyExtraPersonCharge?: string | null;
  }
  export interface PeriodsEntity {
    start: string;
    end: string;
  }
  export interface GuestCounts {
    AQC10: number;
  }
  export interface RatesDefinition {
    rates?: (RatesEntity)[] | null;
    average: string;
    checkin: string;
  }
  export interface RatesEntity {
    id: number;
    start: string;
    end: string;
    amount: string;
  }
  export interface Policies {
    guarantee: Guarantee;
    cancellationNoShow: CancellationNoShow;
    earlyDeparture: EarlyDeparture;
    hold: Hold;
    isRefundable: boolean;
    checkinTime: string;
    checkoutTime: string;
    deposit?: Deposit | null;
    isPrepaid?: boolean | null;
  }
  export interface Guarantee {
    isRequired?: boolean | null;
    time: string;
    type: string;
  }
  export interface CancellationNoShow {
    feeType: string;
    feeValue: string;
    amount: string;
    description: string;
    deadline: Deadline;
    isGracePeriod: boolean;
  }
  export interface Deadline {
    deadlineValue?: number | null;
    dateTime: string;
    deadlineType: string;
  }
  export interface EarlyDeparture {
    feeType: string;
    feeValue: string;
    amount: string;
  }
  export interface Hold {
    is24HourHold: boolean;
  }
  export interface Deposit {
    isRequired: boolean;
    feeType: string;
    feeValue: string;
    amount: string;
    description: string;
    deadline: Deadline1;
  }
  export interface Deadline1 {
    dateTime: string;
    deadlineType: string;
  }
  export interface TotalRateOrTotalBaseOccupancyRateOrTotalExtraOccupancyRate {
    amountBeforeTax: string;
    baseAmount: string;
    amountAfterTax: string;
    taxGroups?: (TaxGroupsEntity)[] | null;
    totalTaxes: string;
    daily?: (DailyEntity)[] | null;
  }
  export interface TaxGroupsEntity {
    amount: string;
    code: string;
    isIncludedInRate: boolean;
    taxDefIds?: (number)[] | null;
  }
  export interface DailyEntity {
    amountType: string;
    baseAmount: string;
    amountAfterTax?: string | null;
  }
  export interface DailyRatesEntity {
    start: string;
    end: string;
    dailyTotalRate: DailyTotalRate;
  }
  export interface DailyTotalRate {
    amountBeforeTax: string;
    baseAmount: string;
    amountAfterTax: string;
    rateDefId: number;
  }
  export interface TotalRateOrTotalBaseOccupancyRateOrTotalExtraOccupancyRate1 {
    amountBeforeTax: string;
    baseAmount: string;
    amountAfterTax: string;
    taxGroups?: (TaxGroupsEntity)[] | null;
    totalTaxes: string;
    daily?: (DailyEntity)[] | null;
  }
  export interface TaxDefinitionsEntity {
    id: number;
    description: string;
    code: string;
    chargeFrequency: string;
    chargeUnit: string;
    isInclusive: boolean;
    value: string;
    valueType: string;
    currency?: string | null;
    start: string;
    end: string;
    dow: string;
    formattedDescription: string;
  }
  export interface AttributeDefinitionsEntity {
    code: string;
    classPath?: (string)[] | null;
    name: string;
    prioritySequence: string;
    description?: string | null;
  }
  export interface AttributeClassDefinitionsEntity {
    prioritySequence: string;
    code: string;
    name: string;
    isFilterable: boolean;
  }
  export interface RatePlanDefinitionsEntity {
    code: string;
    name: string;
    description?: string | null;
    additionalDescriptions?: AdditionalDescriptions | null;
    isFreeNight: boolean;
    isRewardNight: boolean;
    advanceBooking: AdvanceBooking;
    isGroupRatePlan: boolean;
    isTentative: boolean;
    isLoyaltyIdRequired: boolean;
    isPackage?: boolean | null;
    isVoucherRequired: boolean;
    isRewardEarned: boolean;
    isIdRequired: boolean;
    taxInclusionMode: string;
    customDisplay?: string | null;
    isCommissionable: boolean;
    areAmountsConfidential: boolean;
    qualifiers?: (string)[] | null;
    packageDetails?: PackageDetails | null;
    maxLengthOfStay?: number | null;
    checkinDays?: string | null;
    stayOverDays?: string | null;
  }
  export interface AdditionalDescriptions {
    longRateName: string;
    longRateDesc: string;
    shortRateName: string;
    shortRateDesc?: string | null;
  }
  export interface AdvanceBooking {
    isAdvancePurchase: boolean;
    minDays?: number | null;
  }
  export interface PackageDetails {
    themesAndElements?: (number)[] | null;
  }
  