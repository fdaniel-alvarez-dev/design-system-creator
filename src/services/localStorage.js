const STORAGE_KEY = 'design-system-creator';
const AI_CONFIG_KEY = 'ai-configurations';

export const StorageService = {
  // Métodos existentes para design systems (mantener sin cambios)
  saveDesignSystem(system) {
    const systems = this.getAllDesignSystems();
    const updatedSystems = [...systems, { ...system, id: Date.now() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSystems));
    return system;
  },

  getAllDesignSystems() {
    const systems = localStorage.getItem(STORAGE_KEY);
    return systems ? JSON.parse(systems) : [];
  },

  updateDesignSystem(id, updatedSystem) {
    const systems = this.getAllDesignSystems();
    const updatedSystems = systems.map(system => 
      system.id === id ? { ...system, ...updatedSystem } : system
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSystems));
    return updatedSystem;
  },

  deleteDesignSystem(id) {
    const systems = this.getAllDesignSystems();
    const filteredSystems = systems.filter(system => system.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSystems));
  },

  // Métodos para configuraciones AI que integran con el sistema general
  saveAIConfiguration(config) {
    // Guardar en la sección AI específica
    const configurations = this.getAIConfigurations();
    const newConfig = {
      ...config,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updatedConfigs = [...configurations, newConfig];
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(updatedConfigs));

    // También crear una entrada en el sistema de diseño general
    const designSystem = {
      name: `AI Component - ${new Date().toLocaleDateString()}`,
      description: config.componentDescription,
      type: 'ai-component',
      aiConfigId: newConfig.id,
      settings: {
        model: config.model,
        temperature: config.temperature,
        maxTokens: config.maxTokens,
        styleGuide: config.styleGuide,
        customInstructions: config.customInstructions
      }
    };
    
    this.saveDesignSystem(designSystem);
    return newConfig;
  },

  getAIConfigurations() {
    const configs = localStorage.getItem(AI_CONFIG_KEY);
    return configs ? JSON.parse(configs) : [];
  },

  updateAIConfiguration(id, updatedConfig) {
    const configs = this.getAIConfigurations();
    const updatedConfigs = configs.map(config => 
      config.id === id ? { ...config, ...updatedConfig } : config
    );
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(updatedConfigs));

    // También actualizar la entrada correspondiente en el sistema de diseño
    const systems = this.getAllDesignSystems();
    const relatedSystem = systems.find(sys => sys.aiConfigId === id);
    if (relatedSystem) {
      this.updateDesignSystem(relatedSystem.id, {
        description: updatedConfig.componentDescription,
        settings: {
          model: updatedConfig.model,
          temperature: updatedConfig.temperature,
          maxTokens: updatedConfig.maxTokens,
          styleGuide: updatedConfig.styleGuide,
          customInstructions: updatedConfig.customInstructions
        }
      });
    }

    return updatedConfig;
  },

  deleteAIConfiguration(id) {
    const configs = this.getAIConfigurations();
    const filteredConfigs = configs.filter(config => config.id !== id);
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(filteredConfigs));

    // También eliminar la entrada correspondiente en el sistema de diseño
    const systems = this.getAllDesignSystems();
    const relatedSystem = systems.find(sys => sys.aiConfigId === id);
    if (relatedSystem) {
      this.deleteDesignSystem(relatedSystem.id);
    }
  }
};