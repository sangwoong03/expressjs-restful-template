module.exports = class ListingController {
  constructor(service) {
    this.listingService = service.listingService;
  }

  async getListings(req, res) {
    const params = req.query;

    const listings = await this.listingService.getListings(params);
    return res.status(200).json({ data: listings });
  }

  async getListing(req, res) {
    const { id } = req.params;

    const listing = await this.listingService.getListing(id);
    return res.status(200).json({ data: listing });
  }

  async createListing(req, res) {
    return res.status(201).end();
  }

  createEndpoints(app, routerFactory) {
    const subRouter = routerFactory.Router();

    subRouter.get('/', (req, res) => this.getListings(req, res));
    subRouter.get('/:id', (req, res) => this.getListing(req, res));
    subRouter.post('/', (req, res) => this.createListing(req, res));

    app.use('/api/listings', subRouter);
  }
};
