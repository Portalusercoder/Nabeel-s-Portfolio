export default {
  register() {},

  async bootstrap({ strapi }) {
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (!publicRole) return;

    const publicActions = [
      "api::blog-post.blog-post.find",
      "api::blog-post.blog-post.findOne",
      "api::resource.resource.find",
      "api::resource.resource.findOne",
      "api::newsletter-subscriber.newsletter-subscriber.create",
    ];

    for (const action of publicActions) {
      const permission = await strapi.db
        .query("plugin::users-permissions.permission")
        .findOne({ where: { action, role: publicRole.id } });

      if (!permission) {
        await strapi.db.query("plugin::users-permissions.permission").create({
          data: { action, role: publicRole.id },
        });
      }
    }

    const authenticatedRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "authenticated" } });

    if (!authenticatedRole) return;

    const authActions = [
      "api::blog-post.blog-post.find",
      "api::blog-post.blog-post.findOne",
      "api::blog-post.blog-post.create",
      "api::blog-post.blog-post.update",
      "api::blog-post.blog-post.delete",
      "api::newsletter-subscriber.newsletter-subscriber.find",
      "api::newsletter-subscriber.newsletter-subscriber.findOne",
      "api::resource.resource.find",
      "api::resource.resource.findOne",
      "api::resource.resource.create",
      "api::resource.resource.update",
      "api::resource.resource.delete",
    ];

    for (const action of authActions) {
      const permission = await strapi.db
        .query("plugin::users-permissions.permission")
        .findOne({ where: { action, role: authenticatedRole.id } });

      if (!permission) {
        await strapi.db.query("plugin::users-permissions.permission").create({
          data: { action, role: authenticatedRole.id },
        });
      }
    }
  },
};
