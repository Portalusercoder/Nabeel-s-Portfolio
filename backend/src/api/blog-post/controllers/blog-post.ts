import { factories } from "@strapi/strapi";
import { seedBlogPosts } from "../../../utils/seed-blog-posts";

export default factories.createCoreController("api::blog-post.blog-post", ({ strapi }) => ({
  async syncFromSite(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized("Authentication required");
    }

    const result = await seedBlogPosts(strapi);
    ctx.body = {
      data: {
        message: "Blog posts synced from site content",
        ...result,
      },
    };
  },
}));
