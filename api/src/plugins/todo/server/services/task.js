'use strict';

/**
 *  service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

function getPluginStore() {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'todo',
  });
}
async function createDefaultConfig() {
  const pluginStore = getPluginStore();
  const value = {
    disabled: false,
  };
  await pluginStore.set({ key: 'settings', value });
  return pluginStore.get({ key: 'settings' });
}

module.exports = createCoreService('plugin::todo.task', {
  async count() {
    return await strapi.query('plugin::todo.task').count();
  },
  async getSettings() {
    const pluginStore = getPluginStore();
    let config = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }
    return config;
  },
  async setSettings(settings) {
    const value = settings;
    const pluginStore = getPluginStore();
    await pluginStore.set({ key: 'settings', value });
    return pluginStore.get({ key: 'settings' });
  },
  async create(data) {
    return await strapi.query('plugin::todo.task').create(data);
  },
  async update(id, data) {
    return await strapi.query('plugin::todo.task').update({
      where: { id },
      data,
    });
  },
});
