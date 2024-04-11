import Listing from '../model/listing.model.js';


export const createListing = async (req, res, next) => {
    try {
        console.log('inside');
      const listing = await Listing.create(req.body);
      console.log('listing',listing);
      return res.status(201).json(listing);
    } catch (error) {
      next(error);
    }
  };
  