const {
  CityFilterBuilder,
  PriceFilterBuilder,
  ListingTypeFilterBuilder,
  AccomodationsFilterBuilder,
  BedFilterBuilder,
  BedroomFilterBuilder,
  BathFilterBuilder,
} = require('../models/builders');

module.exports = class ListingService {
  constructor(listingDao) {
    this.listingDao = listingDao;
  }

  getListings(params) {
    const { limit, offset, ...filterOptions } = params;

    const builderFactory = {
      city: CityFilterBuilder,
      price_range: PriceFilterBuilder,
      listing_type_id: ListingTypeFilterBuilder,
      num_guests: AccomodationsFilterBuilder,
      num_bedrooms: BedroomFilterBuilder,
      num_beds: BedFilterBuilder,
      num_baths: BathFilterBuilder,
    };
    const builders = Object.entries(filterOptions).map(
      ([key, value]) => new builderFactory[key](value)
    );

    return this.listingDao.getListings(builders, +limit, +offset);
  }

  async getListing(id) {
    const [listing, images] = await Promise.all([
      this.listingDao.getListing(id),
      this.listingDao.getListingImages(id),
    ]);

    const responseDto = {
      ...listing,
      images,
    };

    return responseDto;
  }

  createListing() {}
};
