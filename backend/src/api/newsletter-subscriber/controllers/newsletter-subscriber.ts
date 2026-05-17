import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::newsletter-subscriber.newsletter-subscriber",
  ({ strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;
      ctx.request.body = {
        data: {
          ...data,
          subscribedAt: new Date().toISOString(),
        },
      };
      return super.create(ctx);
    },
  })
);
